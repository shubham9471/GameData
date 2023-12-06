// eventPublisher.js
const amqp = require('amqplib');

async function publishEvent(eventName, eventData) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'events';

    // Declare the exchange if it doesn't exist
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    // Publish the event to the exchange
    channel.publish(exchange, '', Buffer.from(JSON.stringify({ name: eventName, data: eventData })));

    console.log(`Event ${eventName} published`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing event:', error);
  }
}

module.exports = { publishEvent };
