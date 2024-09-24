const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',  // Tillåt alla ursprung
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',  // Tillåt alla nödvändiga metoder
  'Access-Control-Allow-Headers': 'Content-Type',  // Tillåt Content-Type header
};

// Skapa ett nytt meddelande
module.exports.createMessage = async (event) => {
  try {
    const { username, text } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = Math.random().toString(36).slice(2); 

    const params = {
      TableName: 'MessagesTable',
      Item: { id, username, text, createdAt }
    };

    await dynamo.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message created successfully', id }),
      headers: defaultHeaders
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create message' }),
      headers: defaultHeaders
    };
  }
};

// Hämta alla meddelanden
module.exports.getAllMessages = async () => {
  try {
    const params = {
      TableName: 'MessagesTable',
    };

    const data = await dynamo.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
      headers: defaultHeaders
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve messages' }),
      headers: defaultHeaders
    };
  }
};

// Uppdatera ett meddelande
module.exports.updateMessage = async (event) => {
  const { id } = event.pathParameters; // Hämta ID från URL
  const { text } = JSON.parse(event.body); 

  const params = {
    TableName: 'MessagesTable',
    Key: { id },
    UpdateExpression: 'set #txt = :t',
    ExpressionAttributeNames: {
      '#txt': 'text' // Använder ett alias för att undvika att använda reserverat ord direkt
    },
    ExpressionAttributeValues: {
      ':t': text
    },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const data = await dynamo.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message updated successfully', updatedAttributes: data.Attributes }),
      headers: defaultHeaders
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update message', details: error.message }),
      headers: defaultHeaders
    };
  }
};

// Ta bort ett meddelande
module.exports.deleteMessage = async (event) => {
  const { id } = event.pathParameters; // Hämta ID från URL

  const params = {
    TableName: 'MessagesTable',
    Key: { id }
  };

  try {
    await dynamo.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message deleted successfully' }),
      headers: defaultHeaders
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete message' }),
      headers: defaultHeaders
    };
  }
};
