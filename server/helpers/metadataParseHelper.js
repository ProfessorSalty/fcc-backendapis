'use strict';

module.exports = (request, response) => {
  let message;
  if(request.file) {
    let file = request.file,
        size = file.size;

        message = {
          filename: file.originalname,
          size: file.size
        };
  } else {
    message = "No file found!"
  }

  response.send(message);
};
