module.exports = {
  name: "URL Shortener",
  description: "A simple API to shorten URLs and route them through this domain",
  instructions: "Any URL sent to /short/new/ will be returned as a shorten URL within a JSON object.  If no protocol is specified in the URL, it will be stored with HTTPS, otherwise it keeps whichever is specified.  Any shortened URL sent to /short/ will result in immediate redirection of the user's browser to the stored URL.  If the user tries to shorten a URL that has already been shortened, they are sent the original shortened URL - no duplicates will be made",
  examples: [
    {
      input: "/short/new/www.google.com",
      output: "{'shortUrl': 'https://www.shadesofmarkup.com/short/Yik9L'}"
    },
    {
      input: "'https://www.shadesofmarkup.com/short/Yik9L'",
      output: "<User is redicted to https://www.google.com>"
    },
    {
      input: "/short/new/http://www.unsafesite.com",
      output: "{'shortUrl': 'https://www.shadesofmarkup.com/short/Q7GgmLK'}"
    },
    {
      input: "https://www.shadesofmarkup.com/short/Q7GgmLK",
      output: "<User is redirected to http://www.unsafesite.com>"
    }
  ]
}
