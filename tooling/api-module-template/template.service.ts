import type { TemplateRecord, TemplateService } from "./template.types";

export const createTemplateService = (): TemplateService => ({
  async list(): Promise<TemplateRecord[]> {
    return [];
  }
});
