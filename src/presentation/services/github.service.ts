import { GithubIssuesPayload, GithubStarPayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    let message: string = "";

    const { action, sender, repository, starred_at } = payload;
    message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  }

  onIssue(payload: GithubIssuesPayload): string {
    const { action, issue } = payload;

    if (action === "opened") {
      return `An issue was opened with this title ${issue.title}`;
    }
    if (action === "closed") {
      return `An issue was closed with this title ${issue.user.login}`;
    }
    if (action === "reopened") {
      return `An issue was reopened with this title ${issue.user.login}`;
    }
    return `Unknown action ${action}`;
  }
}
