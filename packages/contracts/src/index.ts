export type CapsuleStatus = "draft" | "sealed" | "unlocked";

export interface CapsuleRecipient {
  name?: string;
  email?: string;
  deliveryChannel: "link" | "email";
}

export interface CapsuleAttachment {
  kind: "image";
  url: string;
  mimeType: string;
}

export interface CapsuleGift {
  network: "stellar-testnet" | "stellar-mainnet";
  assetCode: string;
  amount: string;
  status: "pending" | "funded" | "released";
}

export interface CapsuleBase {
  title: string;
  message?: string;
  unlockDate: string;
  recipient: CapsuleRecipient;
}

export interface CreateCapsuleInput extends CapsuleBase {
  attachment?: CapsuleAttachment;
  gift?: CapsuleGift;
}

export interface UpdateCapsuleInput extends Partial<CreateCapsuleInput> {}

export interface CapsuleRecord extends CapsuleBase {
  id: string;
  status: CapsuleStatus;
  ownerId: string;
  attachment?: CapsuleAttachment;
  gift?: CapsuleGift;
  createdAt: string;
  updatedAt: string;
}
