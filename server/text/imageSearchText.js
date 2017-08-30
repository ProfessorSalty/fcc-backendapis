module.exports = {
  name: "Image search abstraction layer",
  description: "Get and save a robust Flickr search by sending only a few parameters",
  instructions: "By sending search string with the query parameter searchTerm, the user will receive a JSON object with the number of pages and an array of photo objects, each with the Flickr title and a link to the Flickr page.  The search terms are paginated and can be paged through with the pageNumber parameter.",
  examples: [
    {
      input: "https://api.gregoftheweb.com/image?searchTerm=piglets&pageNumber=1",
      output: `{
        "pages": 3,
        "photos": [
          {
            "title": "Woman student feeding pigs, Cowra Experiment Farm 1919",
            "url": "https://www.flickr.com/photos/29454428@N08/25330942791"
          },
          {
            "title": "Feeding pig, 1922",
            "url": "https://www.flickr.com/photos/124448282@N08/15971210044"
          },
          {
            "title": "Little boy bottle feeding piglet, 1920",
            "url": "https://www.flickr.com/photos/124448282@N08/14958335112"
          },
          {
            "title": "Image from page 310 of \"Wandering words. Reprinted, by permission, from papers published in the \"Daily telegraph\" and foreign journals and magazines. By Sir Edwin Arnold. With illustrations from drawings by Ben Boothby and from photographs\" (1894)",
            "url": "https://www.flickr.com/photos/126377022@N07/14763858961"
          },
          {
            "title": "Image from page 288 of \"Shans at home. With two chapters on Shan history and literature\" (1910)",
            "url": "https://www.flickr.com/photos/126377022@N07/14577649139"
          },
          {
            "title": "Image from page 248 of \"The road to Oz; in which is related how Dorothy Gale of Kansas, the Shaggy Man, Button Bright, and Polychrome the Rainbow's daughter met on an enchanted road and followed it all the way to the marvelous land of Oz\" (1909)",
            "url": "https://www.flickr.com/photos/126377022@N07/14730179696"
          },
          {
            "title": "Image from page 216 of \"The road to Oz; in which is related how Dorothy Gale of Kansas, the Shaggy Man, Button Bright, and Polychrome the Rainbow's daughter met on an enchanted road and followed it all the way to the marvelous land of Oz\" (1909)",
            "url": "https://www.flickr.com/photos/126377022@N07/14566721557"
          },
          {
            "title": "Image from page 214 of \"The road to Oz; in which is related how Dorothy Gale of Kansas, the Shaggy Man, Button Bright, and Polychrome the Rainbow's daughter met on an enchanted road and followed it all the way to the marvelous land of Oz\" (1909)",
            "url": "https://www.flickr.com/photos/126377022@N07/14566514678"
          },
          {
            "title": "Image from page 233 of \"Dorothy and the wizard in Oz; a faithful record of their amazing adventures in an underground world, and how with the aid of their friends Zeb Hugson, Eureka the Kitten, and Jim the Cab-Horse, they finally reached the wonderful Lan",
            "url": "https://www.flickr.com/photos/126377022@N07/14749959881"
          },
          {
            "title": "Image from page 233 of \"Dorothy and the wizard in Oz; a faithful record of their amazing adventures in an underground world, and how with the aid of their friends Zeb Hugson, Eureka the Kitten, and Jim the Cab-Horse, they finally reached the wonderful Lan",
            "url": "https://www.flickr.com/photos/126377022@N07/14566468999"
          }
        ]
      }`
    }
  ]
}
