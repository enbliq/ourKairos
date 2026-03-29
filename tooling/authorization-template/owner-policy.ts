import type { Actor, OwnedResource } from "./authorization.types";

export const canReadOwnedResource = (actor: Actor, resource: OwnedResource) =>
  actor.role === "admin" || actor.userId === resource.ownerId;

export const canMutateOwnedResource = (actor: Actor, resource: OwnedResource) =>
  actor.role === "admin" || actor.userId === resource.ownerId;

export const shouldRedactOwnerFields = (actor: Actor | null, resource: OwnedResource) => {
  if (!actor) {
    return true;
  }

  return !canReadOwnedResource(actor, resource);
};

export const assertCanMutateOwnedResource = (actor: Actor, resource: OwnedResource) => {
  if (!canMutateOwnedResource(actor, resource)) {
    throw new Error("Forbidden");
  }
};
