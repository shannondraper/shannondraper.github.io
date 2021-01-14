var weatherApp = {};
weatherApp.weatherKey = "8cd63ae941195f10ef3c7b1f21e1f658";
//https://darksky.net/dev/docs/forecast

//init function. Call other functions from in here.
weatherApp.init = function () {
	weatherApp.getWeatherData();
};

//call the init function
$(function () {
	weatherApp.init();
});

// ajax call to get weather data.
weatherApp.getWeatherData = function (coordinates) {
	$('#loader').show();
	$.ajax({
		url: `https://api.darksky.net/forecast/${weatherApp.weatherKey}/43.585891,-79.5835271?units=si`,
		method: "GET",
		dataType: "jsonp"
	}).then(function (data) {
		$('#loader').hide();
		weatherApp.showWeatherData(data);
		weatherApp.showIcon(data)
		weatherApp.getTemperatureData(data)
		console.log(data);
	});
};



weatherApp.showWeatherData = function (weather) {
	const currentWeather = weather.currently;
	const dailyWeather = weather.daily;
	const timeZone = weather.timezone;
	const splitTimeZone = timeZone.split('/', 2);//split the timezone at the '/' and select the second index number to obtain city

	// get Date information
	const currentDate = new Date(); //returns an object
	const stringDate = currentDate.toString(); //converts object to string
	var hour = currentDate.getHours();
	const min = ('0' + currentDate.getMinutes()).slice(-2); //should give back two digits

	if (hour > 18 || hour < 6) {
		$('body').css('background', 'linear-gradient(to bottom, #05082B 0%,#1E296D 100%)');
	}
	//determine if current time is AM or PM
	var AMPM = "PM"
	if (hour > 12) {
		hour = hour - 12
	}
	else if (hour < 12) {
		AMPM = "AM"
	}

	const sunrise = dailyWeather.data[0].sunriseTime;
	// convert to milliseconds and  
	// then create a new Date object 
	const dateObj = new Date((sunrise * 1000) - (5 * 60 * 60 * 1000));
	const utcString = dateObj.toUTCString();
	const sunriseNewTime = utcString.slice(-12, -7);

	const sunset = dailyWeather.data[0].sunsetTime;
	const sunsetObj = new Date((sunset * 1000) - (5 * 60 * 60 * 1000));
	const utcStringSunset = sunsetObj.toUTCString();
	const sunsetNewTime = utcStringSunset.slice(-12, -7);

	//Date info
	var dateZero = new Date(dailyWeather.data[0].time * 1000)
	var dateZeroString = dateZero.toString();
	var dateZeroObject = dateZeroString.split(' ');



	// function getTemperatureData(temperature, temperatureScale) {
	// temperatureScale is °C or °F

	// }

	//Weather Data for Today!
	const currentTemp = $('<h2>').text(Math.round(currentWeather.temperature) + "°C");
	const feelsLike = $('<h2 class="clearData">').text(Math.round(currentWeather.apparentTemperature) + "°C");
	const tomorrowTemp = $('<h2 class="clearData">').text(Math.round(dailyWeather.data[0].temperatureMax) + "°C");
	const dailyLowTemp = $('<span class="clearData">').text(Math.round(dailyWeather.data[0].apparentTemperatureMin) + "°C" + " / ");
	const dailyHighTemp = $('<span class="clearData">').text(Math.round(dailyWeather.data[0].apparentTemperatureMax) + "°C");

	const tomorrowIcon = $('<p class="clearData">').text(dailyWeather.data[1].icon);
	const tomorrowSummary = $('<p class="clearData">').text(dailyWeather.data[1].summary);
	const splitDate = stringDate.split(' ').slice(0, 4).join(' '); //splits string to only show today's date
	const todaysDate = $('<h3>').text(splitDate + " ");
	// const currentTime = $('<h3>').text(" " + "//" + " " + hour + ":" + min + AMPM);
	const city = $('<h2>').text(splitTimeZone[1]);
	const iconSummary = $('<p>').text(currentWeather.summary);
	const humidity = $('<h2 class="clearData">').text(Math.round(currentWeather.humidity * 100) + "%");
	const pop = $('<h2 class="clearData">').text(Math.round(currentWeather.precipProbability * 100) + "%");
	const dailySummary = $('<p class="clearData">').text(dailyWeather.summary);
	const sunriseTime = $('<h3 id="sunriseTime">').text('Sunrise: ' + sunriseNewTime);
	const sunsetTime = $('<h3 id="sunset">').text('Sunset: ' + sunsetNewTime);


	// empty HTML so new data can replace it
	$('.clearData').html('');

	$(".cityName").append(city);
	$(".dateAndTime").append(todaysDate);
	$(".mainTemp").append(currentTemp);
	$(".lowHighTemp").append(dailyLowTemp, dailyHighTemp);
	$(".iconSummary").append(iconSummary);
	$(".feelsLike").append(feelsLike);
	$(".humidity").append(humidity);
	$(".pop").append(pop);
	$(".currentDescription").append(dailySummary);
	$(".tomorrowTemp").append(tomorrowTemp);
	$(".tomorrowSummary").append(tomorrowSummary);
	$(".sunriseTime").append(sunriseTime);
	$(".sunsetTime").append(sunsetTime);

}

//onClick of day of week, display details.
$('.forecastDay').click(function () {
	$(this).children('.forecastData').toggleClass('hide');
});

//onClick of ABOUT THIS PROJECT, display details and adds blur to background elements.
$('.aboutThisProject').click(function () {
	$('.projectDetails').removeClass('hide')
	$('section, footer, .contactPersonal, .aboutThisProject, .poweredBy, .headerInfo, .dotted').addClass('blur');
});

//close ABOUT THIS PROJECT, hide details, remove blur from background elements
$('.fa-window-close').click(function () {
	$('.projectDetails').addClass('hide')
	$('section, footer, .contactPersonal, .aboutThisProject, .poweredBy, .headerInfo, .dotted').removeClass('blur');

});

//choose icons that correspond with weather data
weatherApp.showIcon = function (weather) {
	const currentWeather = weather.currently;
	const dailyWeather = weather.daily;
	const currentWeatherIcon = currentWeather.icon;
	const iconSummary = $(".iconSummary");

	//display weather icon depending on the currentWeather.icon data:
	appendWeatherIcon(currentWeatherIcon, iconSummary);

	const dayNumber = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
	dayNumber.forEach(function (day, index) {
		const indexOfDay = index + 1;
		const indexofDayNumber = dayNumber.indexOf(day)

		var dateOne = new Date(dailyWeather.data[indexOfDay].time * 1000)
		var dateOneString = dateOne.toString();
		var dateOneObject = dateOneString.split(' ');
		const dayOneDay = $('<h4 class="clearData">').text(dateOneObject[0]); // MON
		const dayOneMonth = $('<p class="clearData">').text(dateOneObject[1] + " " + dateOneObject[2]); // MONTH + DAY
		const dayOneIcon = $('<p class="clearData">').text(dailyWeather.data[indexOfDay].icon);
		const dayOneLow = $('<h4 class="clearData">').text("Low: " + Math.round(dailyWeather.data[indexOfDay].apparentTemperatureMin) + "°C");
		const dayOneHigh = $('<h4 class="clearData">').text("High: " + Math.round(dailyWeather.data[indexOfDay].apparentTemperatureMax) + "°C");
		const dayOneHumidity = $('<h4 class="clearData">').text("Humidity: " + Math.round(dailyWeather.data[indexOfDay].humidity * 100) + "%");
		const dayOnePop = $('<h4 class="clearData">').text("P.O.P.: " + Math.round(dailyWeather.data[indexOfDay].precipProbability * 100) + "%");
		const dayOneSummary = $('<p class="clearData">').text(dailyWeather.data[indexOfDay].summary);

		if (index === indexofDayNumber) {
			var day = dayNumber[indexofDayNumber];
			var targetElement = $(`.forecast${day}, .forecast${day}Icon`);

			$(`.date${day}Day`).append(dayOneDay, dayOneMonth);
			$(`.forecast${day}Low`).append(dayOneLow);
			$(`.forecast${day}High`).append(dayOneHigh);
			$(`.forecast${day}Humidity`).append(dayOneHumidity);
			$(`.forecast${day}Pop`).append(dayOnePop);
			$(`.forecast${day}Summary`).append(dayOneSummary);
		}
		const dailyWeatherIcon = dailyWeather.data[indexOfDay].icon;

		// append icon for to each day in the 7 day forecast
		appendWeatherIcon(dailyWeatherIcon, targetElement);
	})
	// append icon to tomorrow's weather forecast
	const tomorrowsForecastElement = $('.tomorrowIcon');
	const tomorrowsForecastIcon = dailyWeather.data[1].icon;
	appendWeatherIcon(tomorrowsForecastIcon, tomorrowsForecastElement);
}

function appendWeatherIcon(iconName, targetElement) {
	const clearDataSpan = $('<span class="clearData">');

	if (iconName === "rain") { targetElement.append(clearDataSpan.html('<i class="wi wi-night-rain"></i>')); }
	else if (iconName === "clear-day") { targetElement.append(clearDataSpan.html('<i class="wi wi-day-sunny"></i>')); }
	else if (iconName === "clear-night") { targetElement.append(clearDataSpan.html('<i class="wi wi-night-clear"></i>')); }
	else if (iconName === "snow") { targetElement.append(clearDataSpan.html('<i class="wi wi-snow"></i>')); }
	else if (iconName === "sleet") { targetElement.append(clearDataSpan.html('<i class="wi wi-sleet"></i>')); }
	else if (iconName === "wind") { targetElement.append(clearDataSpan.html('<i class="wi wi-strong-wind"></i>')); }
	else if (iconName === "fog") { targetElement.append(clearDataSpan.html('<i class="wi wi-fog"></i>')); }
	else if (iconName === "cloudy") { targetElement.append(clearDataSpan.html('<i class="wi wi-cloudy"></i>')); }
	else if (iconName === "hail") { targetElement.append(clearDataSpan.html('<i class="wi wi-hail"></i>')); }
	else if (iconName === "thunderstorm") { targetElement.append(clearDataSpan.html('<i class="wi wi-thunderstorm"></i>')); }
	else if (iconName === "tornado") { targetElement.append(clearDataSpan.html('<i class="wi wi-tornado"></i>')); }
	else if (iconName === "partly-cloudy-day") { targetElement.append(clearDataSpan.html('<i class="wi wi-day-cloudy"></i>')); }
	else if (iconName === "partly-cloudy-night") { targetElement.append(clearDataSpan.html('<i class="wi wi-night-alt-cloudy"></i>')); }
	else { targetElement.append(clearDataSpan.html('<i class="wi wi-day-cloudy"></i>')); }
}

weatherApp.getTemperatureData = function (weather) {
	// temperature data variables in Celsius
	let currentTemp = Math.round(weather.currently.temperature);
	let feelsLike = Math.round(weather.currently.apparentTemperature);
	let tomorrowTemp = Math.round(weather.daily.data[0].temperatureMax);
	let dailyLowTemp = Math.round(weather.daily.data[0].apparentTemperatureMin);
	let dailyHighTemp = Math.round(weather.daily.data[0].apparentTemperatureMax);

	function ifFarenheitIsSelected(boolean, currentTempInCelsius) {
		if (boolean === true) {
			const currentTempInFarenheit = (currentTempInCelsius * 1.8) + 32;
			console.log('tempInFarenheit', currentTempInFarenheit + '°F');
		}
	}
	ifFarenheitIsSelected(true, currentTempInCelsius);
}