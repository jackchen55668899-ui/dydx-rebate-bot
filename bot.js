require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = String(process.env.ADMIN_ID || '');
const CHANNEL_ID = process.env.CHANNEL_ID || '';
const REF_LINK = process.env.REF_LINK || '';

if (!BOT_TOKEN) {
  throw new Error('Missing BOT_TOKEN in environment variables');
}

const bot = new Telegraf(BOT_TOKEN);

const rebateCopy = `40% rebate on dYdX Layer-2 perpetuals.
Trade through ${REF_LINK}. The bot auto-applies the refund, with zero extra steps.
Every order counts toward your rebate.
Weekly leaderboard and funding reminders are posted right here.`;

const linkCopy = `Open dYdX with 40% rebate: ${REF_LINK}
Bookmark it, or come back to /link any time.`;

const weeklyBroadcast = `Weekly Rebate Rankings are live.
Top 10 traders by volume: check the pinned post.
New to rebates? Hit /rebate for the 40% guide or /link for your personal ref.
Trade smart, earn back.`;

// /start
bot.start(async (ctx) => {
  const name = ctx.from.first_name || ctx.from.username || 'Trader';
  const startCopy = `Welcome ${name}!
Use /rebate to see the 40% rebate details, /link to grab your referral, and stay tuned for weekly funding and arbitrage alerts in this channel.`;
  await ctx.reply(startCopy);
});

// /rebate
bot.command('rebate', async (ctx) => {
  await ctx.reply(rebateCopy);
});

// /link
bot.command('link', async (ctx) => {
  await ctx.reply(linkCopy);
});

// /admin
bot.command('admin', async (ctx) => {
  if (String(ctx.from.id) !== ADMIN_ID) return;

  await ctx.reply(`Admin OK
Channel ID: ${CHANNEL_ID || 'not-set'}
Deploy: ${process.env.RENDER_GIT_COMMIT || 'local'}`);
});

// 周一 09:00 UTC 自动发频道
cron.schedule('0 9 * * 1', async () => {
  if (!CHANNEL_ID) {
    console.log('Skip weekly broadcast: CHANNEL_ID not set');
    return;
  }

  try {
    await bot.telegram.sendMessage(CHANNEL_ID, weeklyBroadcast);
    console.log('Weekly broadcast sent');
  } catch (err) {
    console.error('Weekly broadcast failed:', err.message);
  }
});

bot.launch()
  .then(() => {
    console.log('Bot started successfully');
  })
  .catch((err) => {
    console.error('Bot launch failed:', err);
    process.exit(1);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));