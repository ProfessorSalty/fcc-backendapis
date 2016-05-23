module.exports = {
  name: "File Metadata Viewer",
  description: "Upload a file and receive a JSON object with the file's size in bytes",
  instructions: "The backedn is expecting a FormData object with the field 'file'. Use the FileData API to package the file and send it to /file/parse",
  examples: [
    {
      input: "<FormData object>",
      output: `{
  filename: "Example.txt",
  size: 32866
}`
    }
  ]
}
