'use strict';

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
          base = alphabet.length;

module.exports.encode = (num) => {

  let encodedString = '';

  while(num) {

    let remainder = num % base,
        newLetter = alphabet[remainder].toString();
        num = Math.floor(num/base);
        encodedString = newLetter + encodedString;
  }

  return encodedString;

};

module.exports.decode = (string) => {

  let decodedNum = 0;

  while(string) {

      let currentLetter = string[0],
          index = alphabet.indexOf(currentLetter),
          power = string.length - 1;
          decodedNum += index * (Math.pow(base, power));
          string = string.substring(1);

  }

  return decodedNum;

};
