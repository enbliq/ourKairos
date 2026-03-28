import path from 'node:path';
import dotenv from 'dotenv';
import mongoose, { Types } from 'mongoose';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type CapsuleStatus = 'DRAFT' | 'SEALED' | 'UNLOCKED';

type UserSeed = {
  _id: Types.ObjectId;
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
};

type CapsuleSeed = {
  _id: Types.ObjectId;
  id: string;
  ownerId: string;
  title: string;
  message: string | null;
  unlockDate: Date | null;
  status: CapsuleStatus;
  createdAt: Date;
  updatedAt: Date;
};

type FakerLike = {
  seed: (seed: number) => number;
  image: { avatar: () => string };
  lorem: {
    sentence: () => string;
    paragraph: () => string;
  };
};

const TOTAL_CAPSULES = 60;
const DAY_MS = 24 * 60 * 60 * 1000;

const buildObjectId = (seed: number): Types.ObjectId =>
  new Types.ObjectId(seed.toString(16).padStart(24, '0'));

const addDays = (daysFromNow: number): Date =>
  new Date(Date.now() + daysFromNow * DAY_MS);

const loadFaker = async (): Promise<FakerLike> => {
  try {
    const module = (await import('@faker-js/faker')) as { faker?: FakerLike };
    if (!module.faker) {
      throw new Error('Missing faker export');
    }
    return module.faker;
  } catch {
    throw new Error(
      'Missing dependency "@faker-js/faker". Run: pnpm --filter api add -D @faker-js/faker',
    );
  }
};

const buildUsers = (faker: FakerLike): UserSeed[] => {
  const now = new Date();
  const baseline = new Date(now.getTime() - 30 * DAY_MS);

  const firstId = buildObjectId(1001);
  const secondId = buildObjectId(1002);
  const thirdId = buildObjectId(1003);

  return [
    {
      _id: firstId,
      id: firstId.toHexString(),
      email: 'test1@ourkairos.com',
      name: 'Test User One',
      avatarUrl: faker.image.avatar(),
      provider: 'credentials',
      createdAt: baseline,
      updatedAt: now,
    },
    {
      _id: secondId,
      id: secondId.toHexString(),
      email: 'test2@ourkairos.com',
      name: 'Test User Two',
      avatarUrl: faker.image.avatar(),
      provider: 'google',
      createdAt: baseline,
      updatedAt: now,
    },
    {
      _id: thirdId,
      id: thirdId.toHexString(),
      email: 'test3@ourkairos.com',
      name: 'Test User Three',
      avatarUrl: faker.image.avatar(),
      provider: 'credentials',
      createdAt: baseline,
      updatedAt: now,
    },
  ];
};

const resolveCapsuleStatus = (index: number): CapsuleStatus => {
  const remainder = index % 5;
  if (remainder === 0 || remainder === 1) return 'DRAFT';
  if (remainder === 2 || remainder === 3) return 'SEALED';
  return 'UNLOCKED';
};

const resolveUnlockDate = (status: CapsuleStatus, index: number): Date | null => {
  if (status === 'DRAFT') {
    if (index % 3 === 0) return null;
    return addDays(2 + (index % 30));
  }
  if (status === 'SEALED') return addDays(5 + (index % 45));
  return addDays(-(1 + (index % 20)));
};

const buildCapsules = (users: UserSeed[], faker: FakerLike): CapsuleSeed[] => {
  const capsules: CapsuleSeed[] = [];

  for (let index = 0; index < TOTAL_CAPSULES; index += 1) {
    const owner = users[index % users.length];
    const status = resolveCapsuleStatus(index);
    const objectId = buildObjectId(5000 + index);

    capsules.push({
      _id: objectId,
      id: objectId.toHexString(),
      ownerId: owner.id,
      title: faker.lorem.sentence().slice(0, 100),
      message: index % 7 === 0 ? null : faker.lorem.paragraph(),
      unlockDate: resolveUnlockDate(status, index),
      status,
      createdAt: addDays(-(90 - index)),
      updatedAt: addDays(-(15 - (index % 15))),
    });
  }

  return capsules;
};

const seed = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  const teardown = process.argv.includes('--teardown');
  const faker = await loadFaker();
  faker.seed(424242);

  await mongoose.connect(mongoUri);

  const usersCollection = mongoose.connection.collection('users');
  const capsulesCollection = mongoose.connection.collection('capsules');

  if (teardown) {
    await Promise.all([
      usersCollection.deleteMany({}),
      capsulesCollection.deleteMany({}),
    ]);
    console.log('Teardown complete: cleared users and capsules.');
  }

  const users = buildUsers(faker);
  const capsules = buildCapsules(users, faker);

  await usersCollection.bulkWrite(
    users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { $set: user },
        upsert: true,
      },
    })),
  );

  await capsulesCollection.bulkWrite(
    capsules.map((capsule) => ({
      updateOne: {
        filter: { _id: capsule._id },
        update: { $set: capsule },
        upsert: true,
      },
    })),
  );

  const draftCount = capsules.filter((capsule) => capsule.status === 'DRAFT').length;
  const draftNullUnlockDateCount = capsules.filter(
    (capsule) => capsule.status === 'DRAFT' && capsule.unlockDate === null,
  ).length;
  const draftFutureUnlockDateCount = capsules.filter(
    (capsule) =>
      capsule.status === 'DRAFT' &&
      capsule.unlockDate !== null &&
      capsule.unlockDate.getTime() > Date.now(),
  ).length;

  console.log(`Seed complete: users=${users.length}, capsules=${capsules.length}`);
  console.log(
    `Draft mix: total=${draftCount}, nullUnlockDate=${draftNullUnlockDateCount}, futureUnlockDate=${draftFutureUnlockDateCount}`,
  );
};

seed()
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
