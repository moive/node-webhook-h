import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./server";

(() => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
