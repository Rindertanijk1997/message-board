const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Skapa ett nytt meddelande
module.exports.createMessage = async (event) => {
  try {
    const { username, text } = JSON.parse(event.body); // Parsar JSON från event.body
    const createdAt = new Date().toISOString(); // Timestamp för meddelandet
    const id = Math.random().toString(36).slice(2); // Genererar ett enkelt unikt ID

    const params = {
      TableName: 'MessagesTable', // DynamoDB-tabellnamnet
      Item: { id, username, text, createdAt }
    };

    // Lägg till meddelandet i DynamoDB
    await dynamo.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message created successfully', id }),
      headers: {
        'Access-Control-Allow-Origin': '*', // Tillåter alla domäner
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', // Tillåtna HTTP-metoder
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create message' }),
      headers: {
        'Access-Control-Allow-Origin': '*', // CORS header
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', // Tillåtna metoder
      }
    };
  }
};

// Uppdatera ett meddelande
exports.updateMessage = async (event) => {
  try {
    const { id, text } = JSON.parse(event.body); // Extraherar ID och text från event.body

    const params = {
      TableName: 'MessagesTable',
      Key: { id },
      UpdateExpression: 'set text = :text', // Uppdaterar text-attributet
      ExpressionAttributeValues: {
        ':text': text
      },
      ReturnValues: 'UPDATED_NEW' // Returnerar de nya värdena efter uppdatering
    };

    const result = await dynamo.update(params).promise(); // Uppdaterar meddelandet i DynamoDB

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*', // CORS header
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', // Tillåtna metoder
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update message' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      }
    };
  }
};

// Ta bort ett meddelande
exports.deleteMessage = async (event) => {
  try {
    const { id } = JSON.parse(event.body); // Extraherar ID från event.body

    const params = {
      TableName: 'MessagesTable',
      Key: { id }
    };

    await dynamo.delete(params).promise(); // Raderar meddelandet i DynamoDB

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message deleted successfully' }),
      headers: {
        'Access-Control-Allow-Origin': '*', // CORS header
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS', // Tillåtna metoder
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete message' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      }
    };
  }
};
