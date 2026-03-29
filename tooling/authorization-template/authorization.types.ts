export interface Actor {
  userId: string;
  role?: "user" | "admin";
}

export interface OwnedResource {
  ownerId: string;
  visibility?: "private" | "public";
}
