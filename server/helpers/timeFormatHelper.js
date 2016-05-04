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

module.exports =   (request, response) => {
    var timeString = decodeURI(request.params.time),
    stregex = /([0-9]*)(\s)?([a-z,A-Z]{3,})?(\s)?([0-9]*)/g,
    unixTime,date, month, year, status = 200, errorFlag, timeObj = {};

    newTimeString = timeString.split(stregex).filter((x) => {
      return x !== '' && x !== ' ' && x !== undefined;
    });
    // console.log(newTimeString);
    var word = (newTimeString.filter((x)=> { return x.match(/\D{3,}/i)})).toString(),
        num1 = +(newTimeString.filter((x)=> { return +(x) > 70})),
        num2 = +(newTimeString.filter((x)=> { return +(x) < 32}));
    if(num1 && !num2 && !word) {//Number alone is Unix time
        unixTime = new Date(num1);
        dateString = +(unixTime.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));
        timeObj = {unixTime: unixTime, naturalTime: dateString};
    } else if(word){
        var month = getMonthFromWord(word);
        num1 = num1;
        num2 = num2;
        if(num1 >= 1 && num1 <= 31) {
            date = num1;
            if(num2) {
                if(num2 >= 1 && (num2 >= 1000 && num2 <= 9999)) {
                year = num2;
                } else if(num2 >= 70 && num2 < 100) {
                    num2 = setTens(num2);
                    year = `19${num2}`;
                } else if(num2 < 70 && num2 >= 1) {
                    num2 = setTens(num2);
                    year = `20${num2}`;
                } else {
                    errorFlag = true;
                }
            }
        } else if(num2 >= 1 && num2 <= 31) {
            date = num2;
            if(num1) {
                if(num1 >= 1 && (num1 >= 1000 && num1 <= 9999)) {
                year = num1;
                } else if(num1 >= 70 && num1 < 100) {
                    num1 = setTens(num1);
                    year = `19${num1}`;
                } else if(num1 < 70 && num1 >= 1) {
                    num1 = setTens(num1);
                    year = `20${num1}`;
                } else {
                    errorFlag = true;
                }
            }
        } else if(num1 >= 1000 && num1 <= 9999) {
            if(num2) {
                errorFlag = true;
            } else {
                year = num1;
            }
        } else if(num2 >= 1000 && num2 <= 9999) {
            if(num1) {
                errorFlag = true;
            } else {
                year = num2;
            }
        } else {
            errorFlag = true;
        }
        if(errorFlag || !month){
            timeObj = {unixTime: null, naturalTime: null}
        } else {
            month = month || "January";
            date = date || "1";
            year = year || "1970";
            var naturalString = `${month} ${date}, ${year}`;
            unixTime = new Date(naturalString);
            naturalString = unixTime.toLocaleString('en-us',{year: 'numeric', month: 'long', day: 'numeric' }); //get the string from the unix time to account for not-quite-wrong-but-not-right inputs like 'feb30'.
            timeObj = {unixTime: +unixTime, naturalTime: naturalString};
        }

    } else {
        timeObj = {unixTime: null, naturalTime: null};
        status = 500;
    }

    response.status(status).json(timeObj);
}
