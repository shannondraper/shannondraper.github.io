function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + ":" + min + ":" + sec; /* adding time to the div */
    var t = setTimeout(function () { currentTime() }, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}
currentTime();
/* calling currentTime() function to initiate the process */

const hourSwitch = document.getElementById("hour-switch");
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
min < 10 ? min = "0" + min : min;
sec < 10 ? sec = "0" + sec : sec;



const clockElement = document.getElementById("clock");
clockElement.innerText = hour + ":" + min + ":" + sec;
var t = setTimeout(function () { currentTime() }, 1000);
// const sunriseTime = document.getElementById("sunriseTime");
// const sunsetTime = document.getElementById("sunsetTime");


function checkCurrentTime(hour, min, sec) {
    if (!hourSwitch.checked) {
        hour = date.getHours();
        clockElement.innerText = hour + ":" + min + ":" + sec;

    } else if (hourSwitch.checked && hour > 12) {
        hour = hour - 12;
        clockElement.innerText = hour + ":" + min + ":" + sec + " PM";

    } else if (hourSwitch.checked && hour === 12) {
        hour = 12;
        clockElement.innerText = hour + ":" + min + ":" + sec + " PM";

    } else if (hourSwitch.checked && hour === 0) {
        hour = 12;
        clockElement.innerText = hour + ":" + min + ":" + sec + " AM";

    } else if (hourSwitch.checked && hour < 12) {
        clockElement.innerText = hour + ":" + min + ":" + sec + " AM";
    } else {
        clockElement.innerText = 'something went wrong';
    }
}

// function convertSunriseAndSunset(sunriseTime, sunsetTime) {

// }

$(hourSwitch).click(function () {
    checkCurrentTime(hour, min, sec);

});
