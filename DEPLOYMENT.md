# Deployment Guide — dYdX Rebate Bot

## 1. Prerequisites
- SSH/HTTPS access to your GitHub account (`jackchen55668899-ui`).
- Railway or Render account with GitHub integration.
- A Telegram channel (ID: `-100xxxxxxxxx`).
- Referral link (used above): `https://t.me/pocketprotectorbot?start=r-davidchen5678`

## 2. GitHub setup (already done)
Repo: `https://github.com/jackchen55668899-ui/dydx-rebate-bot`
If you need to reinitialize locally:
```bash
cd tools/dydx-bot
git pull origin main
```

## 3. Environment variables
Set these inside Railway/Render (or `.env` locally):
```
BOT_TOKEN=8758234679:AAFC6j6HERj37BHgD6Q4chJrk6M9UL32WnE
ADMIN_ID=8295413068
CHANNEL_ID=-100xxxxxxxxx     # replace with channel_id (forward a channel message to @userinfobot)
REF_LINK=https://t.me/pocketprotectorbot?start=r-davidchen5678
```

## 4. Railway deployment steps
1. Visit <https://railway.app> → New Project → Deploy from GitHub. 
2. Select `jackchen55668899-ui/dydx-rebate-bot` repository. 
3. In Deployment settings:
   - **Run Command**: `npm start`
   - **Variables**: fill with values above.
4. Trigger deploy. 
5. Monitor logs for `Bot is running` confirmation.
6. In Telegram, send `/rebate` or `/link` to `@dydxoffical_bot` to verify.

## 5. Post-deploy checklist
- Ensure the bot is admin in your channel with `send messages` + `invite users`. 
- Pin a channel post featuring `/rebate` instructions + referral benefits.
- Watch Railway logs for fatal errors (~ daily). 
- If switching referral UTM, update `REF_LINK` in Railway vars and redeploy.
- After proving ROI, schedule content (TW04~TW06) with same link.

## 6. Optional
- Add `PM2` or `railway run npm start --watch` if you self-host. 
- Export logs by clicking `Logs → Download` for troubleshooting.

Let me know if you want a Render/Memakai template or direct `railway.` file.