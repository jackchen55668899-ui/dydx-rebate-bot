```js
/* dYdX Rebate Bot – Render / Railway 最新 bot.js (2026-03-28) */
require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID; // 用户 Telegram ID
const CHANNEL_ID = process.env.CHANNEL_ID; // -100XXXXXXXXX (可选)
const REF_LINK = process.env.REF_LINK; // dYdX 推荐链接

/* >>>>> 新版英文 rebate 文案 <<<<< */
const rebateCopy = `🎯 40% rebate on dYdX Layer2 perpetuals. Trade through ${REF_LINK} and the bot automatically applies the refund—no extra steps, just trade as usual. Every order counts toward your rebate, and we publish weekly rebate rankings + funding reminders in the same channel.`;

/* ------------------ Commands ------------------ */
/* 欢迎 */
bot.start(ctx => {
  const name = ctx.from.username || ctx.from.first_name || 'Trader';
  ctx.reply(
    `Welcome ${name}! Use /rebate to see the 40% rebate details, ` +
    `/link to grab the referral, and stay tuned for funding / arbitrage tips in the channel.`
  );
});

/* 主 rebate */
bot.command('rebate', (ctx) => ctx.reply(rebateCopy));

/* 快捷拿链接 */
bot.command('link', (ctx) =>
  ctx.reply(
    `Tap here to open dYdX with the 40% rebate: ${REF_LINK}\n` +
    `You can always come back to this message or run /rebate to get the latest reminder.`
  )
);

/* 兜底 / 其它文字 / admin */
bot.on('text', (ctx) => {
  const isAdmin = ctx.from.id.toString() === ADMIN_ID;
  const txt = ctx.update.message.text || '';

  if (txt === '/admin' && isAdmin) {
    ctx.reply('Admin command acknowledged (version: 2026-03-28-render-new)');
    ctx.reply(`Channel ID: ${CHANNEL_ID || 'not-set'}`);
    return;
  }

  ctx.reply(
    'Send /rebate or /link to get your 40% rebate info, or check the pinned post for updates.'
  );
});

/* 优雅退出 */
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/* 启动 bot */
bot.launch()
  .then(() => console.log('Bot is running (v2026-03-28)'))
  .catch(err => { console.error('Launch error:', err); process.exit(1); });
```
