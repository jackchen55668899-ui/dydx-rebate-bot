const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;
const REF_LINK = process.env.REF_LINK;
const CHANNEL_ID = process.env.CHANNEL_ID;

bot.start((ctx) => {
  const name = ctx.from.username || ctx.from.first_name || 'Trader';
  ctx.reply(`Welcome ${name}! Use /rebate to see your rebate link and /link to grab the referral.`);
});

bot.command('rebate', (ctx) => {
  const message = `Current rebate: 40% on dYdX perpetuals. Trade with ${REF_LINK} and check your snapshot on Telegram channel.`;
  ctx.reply(message);
});

bot.command('link', (ctx) => {
  ctx.reply(`Open dYdX with 40% rebate: ${REF_LINK}`);
});

bot.on('text', (ctx) => {
  if (ctx.update.message.text.startsWith('/admin') && ctx.from.id.toString() === ADMIN_ID) {
    ctx.reply('Admin command acknowledged.');
  } else {
    ctx.reply('Send /rebate or /link to get your rebate info.');
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
