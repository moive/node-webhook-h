import { Request, Response } from "express";

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    const signature = req.header("x-hub-signature-256") ?? "unknown";
    const payload = req.body;

    // console.log({ githubEvent, signature });
    console.log(JSON.stringify(payload));

    res.status(201).send("Accepted!!");
  };
}
