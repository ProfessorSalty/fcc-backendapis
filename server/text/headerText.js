module.exports = {
  name: "Request Header Parser",
  description: "Parse the HTTP request header for IP address, language and you browser's user agent",
  instructions: "Making a GET request to https://www.shadesofmarkup.com/header/parse will return a JSON object with the IP address, language and user agent as reported by your browser.  No input is possible.",
  examples: [
    {
      input: "https://www.shadesofmarkup.com/header/parse",
      output: '{"ipaddress": "23.75.345.200","language": "en-us","software": "Running Search Scripts"}'
    }
  ]
}
