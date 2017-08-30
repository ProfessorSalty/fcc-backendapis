module.exports = {
  name: "Timestamp formatter",
  description: "A microservice that parses and processes both Unix Epoch and natural language time formats",
  instructions: "Passing either a Unix Epoch timestamp or a natural language time string into the URL will return a JSON object containing both.  The natural language string must contain the month as a string, but the date and year can be in any format, separated by spaces.  The string can be passed either unencoded or URL encoded. Strings that cannot be interpreted will default, in whole or in part, to January 1st, 1970.  Unprocessable inputs will result in null values.",
  examples: [
    {
      input: "http://api.gregoftheweb.com.com/time/March 6 1987",
      output: '{ "unixTime": 542012400000, "naturalTime": "March 6, 1987"}'
    },
    {
      input: "http://api.gregoftheweb.com.com/time/6March1987",
      output: '{ "unixTime": 542012400000, "naturalTime": "March 6, 1987"}'
    },
    {
      input: "http://api.gregoftheweb.com.com/time/542012400000",
      output: '{ "unixTime": 542012400000, "naturalTime": "March 6, 1987"}'
    },
    {
      input: "http://api.gregoftheweb.com.com/time/1987Mar6",
      output: '{ "unixTime": 542012400000, "naturalTime": "March 6, 1987"}'
    },
    {
      input: "http://api.gregoftheweb.com.com/time/dogberries",
      output: '{"unixTime": null,"naturalTime": null}'
    }
  ]
}
