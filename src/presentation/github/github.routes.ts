import { Router } from "express";
import { GithubController } from "./github.controller";

const { webhookHandler } = new GithubController();

export class GithubRoutes {
  static get routes(): Router {
    const router = Router();
    router.post("/", webhookHandler);

    return router;
  }
}
