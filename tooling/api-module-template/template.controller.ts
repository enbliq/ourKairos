import type { Request, Response } from "express";
import type { TemplateService } from "./template.types";

export const createTemplateController = (service: TemplateService) => ({
  list: async (_request: Request, response: Response) => {
    const records = await service.list();
    response.json({ data: records });
  }
});
