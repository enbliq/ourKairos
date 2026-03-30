import { Router } from "express";
import { createCapsuleController, type CapsuleControllerDependencies } from "./capsule.controller";

export const createCapsuleRouter = (dependencies: CapsuleControllerDependencies) => {
  const router = Router();
  const controller = createCapsuleController(dependencies);

  router.post("/capsules", controller.create);
  router.get("/owners/:ownerId/capsules", controller.list);
  router.get("/capsules/:id", controller.detail);
  router.patch("/capsules/:id", controller.update);
  router.post("/capsules/:id/seal", controller.seal);
  router.post("/capsules/:id/duplicate", controller.duplicate);

  return router;
};
