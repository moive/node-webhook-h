import chalk from "chalk";
import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    // //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    // working: express v4
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
    //   res.sendFile(indexPath);
    // });

    // SPA fallback with midleware, working v5
    this.app.use((req, res, next) => {
      if (!req.path.startsWith("/api")) {
        const indexPath = path.join(
          __dirname,
          `../../../${this.publicPath}/index.html`,
        );
        return res.sendFile(indexPath);
      }
      next();
    });

    // Opcional: middleware de 404 final
    this.app.use((req, res) => {
      res.status(404).json({ error: "Endpoint not found" });
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(
        chalk.cyan(`Server running on port: ${chalk.bold(this.port)}`),
      );
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
