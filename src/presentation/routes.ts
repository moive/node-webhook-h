import { Router } from "express";
import { GithubRoutes } from "./github/github.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/github", GithubRoutes.routes);
    return router;
  }
}
