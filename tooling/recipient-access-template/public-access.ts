import type { PublicCapsulePayload, RecipientAccessRecord } from "./recipient-access.types";

export interface PublicAccessService {
  issueToken(capsuleId: string, recipient?: { name?: string; email?: string }): RecipientAccessRecord;
  buildLockedPayload(input: { id: string; title: string; unlockDate: string }): PublicCapsulePayload;
}

export const createPublicAccessService = (
  createToken: () => string
): PublicAccessService => ({
  issueToken(capsuleId, recipient) {
    return {
      capsuleId,
      token: createToken(),
      recipientName: recipient?.name,
      recipientEmail: recipient?.email
    };
  },
  buildLockedPayload(input) {
    return {
      id: input.id,
      title: input.title,
      unlockDate: input.unlockDate,
      status: "locked"
    };
  }
});
