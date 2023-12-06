// eventSubscriber.js
const amqp = require('amqplib');

async function subscribeToEvents() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'events';

    // Declare the exchange if it doesn't exist
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    // Declare a temporary queue
    const q = await channel.assertQueue('', { exclusive: true });

    // Bind the queue to the exchange
    await channel.bindQueue(q.queue, exchange, '');

    // Consume messages from the queue
    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        const event = JSON.parse(msg.content.toString());
        console.log(`Received event: ${event.name} - Data:`, event.data);
        // Process the received event data as needed
      }
    }, { noAck: true });

    console.log('Event subscriber listening for events');

  } catch (error) {
    console.error('Error subscribing to events:', error);
  }
}

module.exports = { subscribeToEvents };
