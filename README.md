# node-webhook-h

A project is to test webhooks with github and discord

## Installation

1. Clone the repository
2. Clone .env-template to .env
3. Execute command `npm i`
4. Run the server `npm run dev`
5. Test the webhook

## create secret token

1. Execute command `node -e "console.log(require('crypto').randomBytes(20).toString('hex'))"`
