# Discord Countdown Bot 🤖⏰

A Discord bot that automatically sends daily countdown messages to a specified channel at a specific time.

## Features

- ✅ Daily automated countdown messages
- ✅ Customizable time and timezone
- ✅ Beautiful embed formatting
- ✅ Easy configuration via environment variables
- ✅ Free to host on platforms like Railway, Render, or fly.io

## Prerequisites

- Node.js (v16 or higher)
- A Discord account
- A Discord server where you have admin permissions

## Setup Instructions

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Under "Privileged Gateway Intents", enable:
   - **Server Members Intent** (optional, but recommended)
   - **Message Content Intent** (optional)
6. Click "Reset Token" and copy your bot token (keep it secret!)

### 2. Invite the Bot to Your Server

1. In the Discord Developer Portal, go to "OAuth2" > "URL Generator"
2. Select the following scopes:
   - `bot`
3. Select the following bot permissions:
   - `Send Messages`
   - `View Channels`
   - `Embed Links`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### 3. Get Your Channel ID

1. Enable Developer Mode in Discord:
   - User Settings > Advanced > Developer Mode (toggle on)
2. Right-click on the channel where you want countdown messages
3. Click "Copy Channel ID"

### 4. Configure the Bot

1. Clone or download this project
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` with your configuration:
   ```env
   DISCORD_BOT_TOKEN=your_bot_token_here
   CHANNEL_ID=your_channel_id_here
   TARGET_DATE=2026-12-31
   COUNTDOWN_TIME=09:00
   TIMEZONE=America/New_York
   CUSTOM_MESSAGE=
   ```

**Configuration Options:**
- `DISCORD_BOT_TOKEN`: Your bot token from Discord Developer Portal
- `CHANNEL_ID`: The channel ID where messages will be sent
- `TARGET_DATE`: The date you're counting down to (format: YYYY-MM-DD)
- `COUNTDOWN_TIME`: Daily message time in 24-hour format (HH:MM)
- `TIMEZONE`: Your timezone (see [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
- `CUSTOM_MESSAGE`: Optional custom message to display (leave empty for default)

### 5. Install Dependencies

```bash
npm install
```

### 6. Run the Bot Locally

```bash
npm start
```

You should see:
```
🤖 Bot logged in as YourBot#1234
📍 Target Channel ID: 123456789
🎯 Target Date: Wed Dec 31 2026
⏰ Daily Message Time: 09:00 (America/New_York)
```

## Deployment (Free Hosting)

### Option 1: Railway (Recommended)

1. Create account at [Railway.app](https://railway.app)
2. Click "New Project" > "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy! Railway will keep your bot running 24/7

### Option 2: Render

1. Create account at [Render.com](https://render.com)
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Choose "Free" plan
8. Deploy!

**Note**: Render free tier may spin down after inactivity. For 24/7 uptime, consider Railway.

### Option 3: fly.io

1. Install flyctl: [Installation Guide](https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up: `flyctl auth signup`
3. Launch app: `flyctl launch`
4. Set secrets:
   ```bash
   flyctl secrets set DISCORD_BOT_TOKEN=your_token
   flyctl secrets set CHANNEL_ID=your_channel_id
   flyctl secrets set TARGET_DATE=2026-12-31
   flyctl secrets set COUNTDOWN_TIME=09:00
   flyctl secrets set TIMEZONE=America/New_York
   ```
5. Deploy: `flyctl deploy`

## Common Timezones

- `America/New_York` - Eastern Time
- `America/Chicago` - Central Time
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time
- `Europe/London` - GMT/BST
- `Europe/Paris` - Central European Time
- `Asia/Tokyo` - Japan Time
- `Australia/Sydney` - Australian Eastern Time

[Full timezone list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Customization

### Change the Message Format

Edit the `formatCountdownMessage()` or `createCountdownEmbed()` functions in `bot.js` to customize how messages appear.

### Test Immediately

Uncomment this line in `bot.js` to send a test message when the bot starts:
```javascript
// sendCountdownMessage();
```

### Add Commands

You can extend the bot to accept commands for changing settings on the fly. Add command handling in the `messageCreate` event.

## Troubleshooting

### Bot doesn't send messages
- Verify the bot has "Send Messages" permission in the channel
- Check that the CHANNEL_ID is correct
- Ensure the bot is online (check Railway/Render logs)

### Wrong timezone
- Verify your timezone string matches the [tz database format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Check server logs to confirm the scheduled time

### Bot goes offline
- Free hosting platforms may have limitations
- Railway offers 500 hours/month free (enough for 24/7)
- Consider upgrading to a paid plan for guaranteed uptime

## Support

If you encounter issues:
1. Check the console/logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your bot token is valid and hasn't been regenerated
4. Confirm the bot has proper permissions in Discord

## License

ISC License - Feel free to modify and use as needed!

---

Made with ❤️ for Discord communities
