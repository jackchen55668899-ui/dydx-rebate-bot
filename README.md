# dYdX Rebate Bot

## Overview
A lightweight Telegraf bot that sits in your Telegram channel and delivers referral links + rebate reminders. It supports `/start`, `/rebate`, `/link`, and (for your admin ID) `/admin` diagnostics so you can confirm status quickly.

## Files
- `bot.js` – main bot logic (Telegraf + dotenv). Replies use the `REF_LINK`, `ADMIN_ID`, and channel context.
- `.env` – local env vars for BOT_TOKEN, ADMIN_ID, CHANNEL_ID, REF_LINK.
- `package.json` – Node scripts plus dependencies (`telegraf`, `dotenv`). `npm start` runs `node bot.js`.
- `README.md` – this file.

## Setup
1. Clone / copy this folder.
2. Run `npm install` (already set to install Telegraf + dotenv).
3. Create a `.env` (or use the template) with:
   ```env
   BOT_TOKEN=8758234679:AAFC6j6HERj37BHgD6Q4chJrk6M9UL32WnE
   ADMIN_ID=8295413068
   CHANNEL_ID=-100XXXXXXXXX  # replace with your actual channel ID
   REF_LINK=https://t.me/pocketprotectorbot?start=r-davidchen5678
   ```
4. Start locally:
   ```powershell
   npm start
   ```
   Keep the PowerShell window open; the bot runs until you stop it.

## Commands the bot supports
- `/start` – friendly welcome message.
- `/rebate` – explains the 40% rebate + directs people to your referral.
- `/link` – posts the referral link again.
- `/admin` – restricted to `ADMIN_ID` only; replies with a simple acknowledgement to confirm you're reaching the running instance.
- Any other text replies with a pointer to `/rebate` and `/link`.

## Deployment (Railway / Render / Heroku)
1. Push this folder to GitHub.
2. Create a new project on your preferred platform and connect the repo.
3. Set the environment variables there (same values as the `.env` above, except you might use a production referral link with UTMs).
4. Use `npm start` as the run command.
5. Once the build succeeds, the platform keeps the bot online. Send `/rebate` in Telegram to verify.

## Optional extras
- Add the bot as an admin inside your channel so it can post there (needs "post messages" and "invite users").
- Use a Process Manager (PM2 or `railway run npm start --watch`) if you take it off Railway for manual machines.

Let me know if you want a `Procfile` or Dockerfile version.