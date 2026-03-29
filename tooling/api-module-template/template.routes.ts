import { Router } from "express";
import { createTemplateController } from "./template.controller";
import { createTemplateService } from "./template.service";

export const createTemplateRouter = () => {
  const router = Router();
  const service = createTemplateService();
  const controller = createTemplateController(service);

  router.get("/", controller.list);

  return router;
};
