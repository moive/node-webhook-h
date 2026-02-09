import { GithubStarPayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    let message: string = "";

    const { action, sender, repository, starred_at } = payload;
    message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  }
}
