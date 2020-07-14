const Airtable = require('airtable');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  const {API_URL, API_CLIENT_ID, API_KEY } = process.env;

  try {
    // CONFIGURE YOUR AIRTABLE BASE CONNECTION
    Airtable.configure({
      endpointUrl: API_URL,
      apiKey: API_KEY
    });
    var base = Airtable.base(API_CLIENT_ID);

    const result = await base('Imported table').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
    }).firstPage()
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
