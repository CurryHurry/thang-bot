const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

// Configuration from environment variables
const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  channelId: process.env.CHANNEL_ID,
  targetDate: new Date(process.env.TARGET_DATE || '2026-12-31'),
  countdownTime: process.env.COUNTDOWN_TIME || '09:00',
  timezone: process.env.TIMEZONE || 'America/New_York',
  customMessage: process.env.CUSTOM_MESSAGE || ''
};

/**
 * Calculate countdown from current date to target date
 */
function calculateCountdown() {
  const now = new Date();
  const target = config.targetDate;
  const difference = target - now;

  if (difference <= 0) {
    return {
      isPast: true,
      message: 'The countdown has ended! 🎉'
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    isPast: false,
    days,
    hours,
    minutes,
    seconds,
    totalDays: days
  };
}

/**
 * Format countdown message
 */
function formatCountdownMessage(countdown) {
  if (countdown.isPast) {
    return countdown.message;
  }

  let message = `📅 **Countdown to ${config.targetDate.toDateString()}**\n\n`;
  
  if (config.customMessage) {
    message = `${config.customMessage}\n\n`;
  }

  message += `⏰ **${countdown.days}** days, **${countdown.hours}** hours, **${countdown.minutes}** minutes remaining!`;

  return message;
}

/**
 * Create a rich embed for the countdown message
 */
function createCountdownEmbed(countdown) {
  const embed = new EmbedBuilder()
    .setColor(countdown.isPast ? '#FF0000' : '#0099ff')
    .setTimestamp();

  if (countdown.isPast) {
    embed.setTitle('⏰ Countdown Complete!');
    embed.setDescription(countdown.message);
  } else {
    // Use custom message as the title if provided
    if (config.customMessage) {
      // Replace {days} placeholder with actual day count
      const titleWithDays = config.customMessage.replace('{days}', countdown.days);
      embed.setTitle(titleWithDays);
    } else {
      embed.setTitle('⏰ Daily Countdown');
    }

    let description = `Counting down to **${config.targetDate.toDateString()}**\n\n`;
    description += `🗓️ **${countdown.days}** Days\n`;
    description += `⏰ **${countdown.hours}** Hours\n`;
    description += `⏱️ **${countdown.minutes}** Minutes\n`;
    
    embed.setDescription(description);
    embed.addFields({
      name: '📊 Total Time Remaining',
      value: `${countdown.totalDays} days`,
      inline: false
    });
  }

  return embed;
}

/**
 * Send countdown message to the specified channel
 */
async function sendCountdownMessage() {
  try {
    const channel = await client.channels.fetch(config.channelId);
    
    if (!channel) {
      console.error('Channel not found!');
      return;
    }

    const countdown = calculateCountdown();
    const embed = createCountdownEmbed(countdown);

    await channel.send({ embeds: [embed] });
    console.log(`✅ Countdown message sent at ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error('❌ Error sending countdown message:', error);
  }
}

/**
 * Set up the cron schedule
 */
function setupSchedule() {
  // Parse the time (format: HH:MM)
  const [hour, minute] = config.countdownTime.split(':');
  
  // Cron format: minute hour * * *
  const cronExpression = `${minute} ${hour} * * *`;
  
  console.log(`📅 Schedule set for ${config.countdownTime} (${config.timezone})`);
  console.log(`📌 Cron expression: ${cronExpression}`);

  // Schedule the daily countdown message
  cron.schedule(cronExpression, () => {
    console.log('⏰ Cron job triggered!');
    sendCountdownMessage();
  }, {
    timezone: config.timezone
  });
}

// Bot ready event
client.once('ready', () => {
  console.log('=================================');
  console.log(`🤖 Bot logged in as ${client.user.tag}`);
  console.log('=================================');
  console.log(`📍 Target Channel ID: ${config.channelId}`);
  console.log(`🎯 Target Date: ${config.targetDate.toDateString()}`);
  console.log(`⏰ Daily Message Time: ${config.countdownTime} (${config.timezone})`);
  console.log('=================================');
  
  // Set up the daily schedule
  setupSchedule();
  
  // Optional: Send a test message on startup (comment out if you don't want this)
  sendCountdownMessage();
});

// Error handling
client.on('error', error => {
  console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
  console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.token).catch(error => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});
