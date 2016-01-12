var express = require('express'),
    router  = express.Router();

router.route('/')
    .get(function(request, response) {
        response.send("Time required");
    });

router.use(function(request, response, next) {
    var path = request.path;
    
    process.stdout.write(path + '\n');
    next();
});

function getMonthFromWord(word) {
    word = word.slice(0,3).toLowerCase();
    switch(word) {
        case "jan":
            return "January";
            break;
        case "feb":
            return "February";
            break;
        case "mar":
            return "March";
            break;
        case "apr":
            return "April";
            break;
        case "may":
            return "May";
            break;
        case "jun":
            return "June";
            break;
        case "jul":
            return "July";
            break;
        case "aug":
            return "August";
            break;
        case "sep":
            return "September";
            break;
        case "oct":
            return "October";
            break;
        case "nov":
            return "November";
            break;
        case "dec":
            return "December";
            break;
        default:
            return "";
    }
} 

router.route('/:time')
    .get(function(request, response) {
        var timeString = request.params.time,
        stregex = /([0-9]*)([a-z,A-Z]{3,})?([0-9]*)/g,
        unixTime,date, month, year;

        newTimeString = timeString.split(stregex).slice(1,4);
        var word = newTimeString[1],
            num1 = +newTimeString[0], //preferred date, Unix time if alone
            num2 = +newTimeString[2]; //preferred year
//Are the numbers valid date/year?

//Number + word is date & month if the number is one or two digits; date & year if number is four digits; null values if three, or more than four digits.
//If there are two numbers and a word, one number must be a valid date.  The other can be two digits (will default to some year between 1970 and 2069) or four digits.  If the first number is a valid date, the second will always be interpreted as a year.  If the first number is a four digit year, the second number must be a valid date.
        if(num1 && !num2 && !word) {//Number alone is Unix time
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            unixTime = new Date(num1);
            dateString = unixTime.toLocaleString('en-us', options);
            unixTime = +unixTime;
            timeObj = {unixTime: unixTime, naturalTime: dateString};            
        }
        // var month = word && getMonthFromWord(word);
        
        // var timeObj = {
        //     date: date || "1", //Only want defaults if there is some valid input, null object otherwise
        //     month: month || "January",
        //     year: year || "1970"
        // };
        response.send(timeObj);
    });

module.exports = router;