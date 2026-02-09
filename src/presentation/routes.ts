import { Router } from "express";
import { GithubRoutes } from "./github/github.routes";
import { Github256Middleware } from "./middlewares/github-256.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use(Github256Middleware.verifyGithubSignature);
    router.use("/api/github", GithubRoutes.routes);
    return router;
  }
}
