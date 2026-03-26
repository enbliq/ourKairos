export const createMemoryRepository = <T extends { id: string }>(seed: T[] = []) => {
  const records = new Map(seed.map((record) => [record.id, record]));

  return {
    findById(id: string) {
      return records.get(id) ?? null;
    },
    list() {
      return Array.from(records.values());
    },
    save(record: T) {
      records.set(record.id, record);
      return record;
    }
  };
};
