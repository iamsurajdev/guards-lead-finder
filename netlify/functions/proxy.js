exports.handler = async (event) => {
  const path = event.queryStringParameters?.path || '';
  const apiKey = event.queryStringParameters?.key || '';
  const url = `https://api.company-information.service.gov.uk${path}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
        'Accept': 'application/json'
      }
    });
    const data = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: data
    };
  } catch (err) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: err.message }) };
  }
};