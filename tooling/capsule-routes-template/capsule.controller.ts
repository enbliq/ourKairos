import type { Request, Response } from "express";

export interface CapsuleControllerDependencies {
  createDraft(input: unknown): Promise<unknown>;
  listByOwner(ownerId: string): Promise<unknown>;
  getById(id: string): Promise<unknown>;
  updateDraft(id: string, input: unknown): Promise<unknown>;
  seal(id: string): Promise<unknown>;
}

export const createCapsuleController = (dependencies: CapsuleControllerDependencies) => ({
  create: async (request: Request, response: Response) => {
    response.status(201).json(await dependencies.createDraft(request.body));
  },
  list: async (request: Request, response: Response) => {
    response.json(await dependencies.listByOwner(request.params.ownerId));
  },
  detail: async (request: Request, response: Response) => {
    response.json(await dependencies.getById(request.params.id));
  },
  update: async (request: Request, response: Response) => {
    response.json(await dependencies.updateDraft(request.params.id, request.body));
  },
  seal: async (request: Request, response: Response) => {
    response.json(await dependencies.seal(request.params.id));
  }
});
