const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.createMessage = async (event) => {
  try {
    const { username, text } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = Math.random().toString(36).slice(2); // Enkel generering av unikt ID

    const params = {
        TableName: 'MessagesTable', // Se till att detta namn matchar det i din DynamoDB-tabell
        Item: {
            id,
            username,
            text,
            createdAt
        }
    };

    await dynamo.put(params).promise(); // Lägg till meddelandet i DynamoDB

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message created successfully', id }),
        headers: {
            'Access-Control-Allow-Origin': '*', // Lägg till korrekt CORS-header om nödvändigt
        }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create message' })
    };
  }
};

exports.updateMessage = async (event) => {
  const { id, text } = JSON.parse(event.body);

  const params = {
      TableName: 'MessagesTable',
      Key: { id },
      UpdateExpression: 'set text = :text',
      ExpressionAttributeValues: {
          ':text': text
      },
      ReturnValues: 'UPDATED_NEW'
  };

  try {
      const result = await dynamo.update(params).promise();
      return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not update message' }) };
  }
};

exports.deleteMessage = async (event) => {
  const { id } = JSON.parse(event.body);

  const params = {
      TableName: 'MessagesTable',
      Key: { id }
  };

  try {
      await dynamo.delete(params).promise();
      return { statusCode: 200, body: JSON.stringify({ message: 'Message deleted successfully' }) };
  } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not delete message' }) };
  }
};