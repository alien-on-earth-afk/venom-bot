const venom = require('venom-bot');
const axios = require('axios');

venom
  .create({
    session: 'bot-session' // session name
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error(error);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body && message.isGroupMsg === false) {
      const senderNumber = message.from.split('@')[0]; // remove @c.us
      console.log(`Received from ${senderNumber}: ${message.body}`);

      // Send the incoming message + sender to Flask API
      try {
        const response = await axios.post('https://wabotgemini.onrender.com/webhook', {
          message: message.body,
          sender: message.from
        });

        const botReply = response.data.response || "Sorry, I couldn't understand that.";

        // Send the response back to the user
        await client.sendText(message.from, botReply);
        console.log(`Replied to ${senderNumber}: ${botReply}`);
      } catch (error) {
        console.error('Error getting response from Flask:', error.message);
        await client.sendText(message.from, "Oops, something went wrong while processing your message.");
      }
    }
  });
}
