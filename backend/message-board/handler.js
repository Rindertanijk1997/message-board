const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Skapa ett nytt meddelande
module.exports.createMessage = async (event) => {
  try {
    const { username, text } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = Math.random().toString(36).slice(2); // Genererar ett enkelt unikt ID

    const params = {
      TableName: 'MessagesTable',
      Item: { id, username, text, createdAt }
    };

    await dynamo.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message created successfully', id }),
      headers: {
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create message' }),
      headers: {
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      }
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
      headers: {
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Methods': 'GET'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve messages' }),
      headers: {
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Methods':
        'GET',
      }
    };
  }
};

module.exports.getAllMessages = async () => {
  const params = {
    TableName: 'MessagesTable',
  };

  try {
    const data = await dynamo.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve messages' }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
};

// put
module.exports.updateMessage = async (event) => {
  const { id } = event.pathParameters; // Hämta ID från URL
  const { text } = JSON.parse(event.body); // Anta att vi bara uppdaterar texten

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
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update message', details: error.message }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};

//Delete
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
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete message' }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
