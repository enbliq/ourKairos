export interface CreateCapsuleDto {
  title: string;
  message?: string;
  unlockDate: string;
}

export interface UpdateCapsuleDto extends Partial<CreateCapsuleDto> {}
