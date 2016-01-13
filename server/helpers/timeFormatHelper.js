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
            return false;
    }
} 

function setTens(num) {
    if(num < 10) {
        return '0' + num.toString();
    } else {
        return num;
    }
}

module.exports = function timeFormat(request, response) {
    var timeString = request.params.time,
    stregex = /([0-9]*)([a-z,A-Z]{3,})?([0-9]*)/g,
    unixTime,date, month, year, timeObj = {};

    newTimeString = timeString.split(stregex).slice(1,4);
    var word = newTimeString[1],
        num1 = +newTimeString[0], //preferred date, Unix time if alone
        num2 = +newTimeString[2]; //preferred year
//Are the numbers valid date/year?

//Number + word is date & month if the number is one or two digits; date & year if number is four digits; null values if three, or more than four digits.
//If there are two numbers and a word, one number must be a valid date.  The other can be two digits (will default to some year between 1970 and 2069) or four digits.  If the first number is a valid date, the second will always be interpreted as a year.  If the first number is a four digit year, the second number must be a valid date.
    if(num1 && !num2 && !word) {//Number alone is Unix time
        unixTime = new Date(num1);
        dateString = unixTime.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });
        timeObj = {unixTime: +unixTime, naturalTime: dateString};
    } else if(word){
        var month = getMonthFromWord(word);
        num1 = num1;
        num2 = num2;
        if(num1 >= 1 && num1 <= 31) {
            date = num1;
            if(num2 >= 1 && (num2 >= 1000 && num2 <= 9999)) {
                year = num2;
            } else if(num2 >= 70 && num2 < 100) {
                num2 = setTens(num2);
                year = `19${num2}`;
            } else if(num2 < 70 && num2 >= 1) {
                num2 = setTens(num2);
                year = `20${num2}`;
            } else {
                year = "Invalid entry";
            }
        } else if(num2 >= 1 && num2 <= 31) {
            date = num2;
            if(num1 >= 1 && (num1 >= 1000 && num1 <= 9999)) {
                year = num1;
            } else if(num1 >= 70 && num1 < 100) {
                num1 = setTens(num1);
                year = `19${num1}`;
            } else if(num1 < 70 && num1 >= 1) {
                num1 = setTens(num1);
                year = `20${num1}`;
            } else {
                year = "Invalid entry";
            }
        } else if(num1 >= 1000 && num1 <= 9999) {
            if(num2) {
                year = "Invalid entry";
            } else {
                year = num1;
            }
        } else if(num2 >= 1000 && num2 <= 9999) {
            if(num1) {
                year = "Invalid entry";
            } else {
                year = num2;
            }
        } else {
            year = "Invalid entry";
        }
        if(year === "Invalid entry" || !month){
            timeObj = {unixTime: null, naturalTime: null}
        } else {
            month = month || "January";
            date = date || "1";
            year = year || "1970";
            var naturalString = `${month} ${date}, ${year}`;
            unixTime = new Date(naturalString);
            timeObj = {unixTime: +unixTime, naturalTime: naturalString};
        }
         
    } else {
        timeObj = {unixTime: null, naturalTime: null};
    }
    
    response.send(timeObj);
}