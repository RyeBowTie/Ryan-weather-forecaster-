var city = $("#city");
var submit = $("#submit");
var card = $(".card")
var cardTitle = $(".card-title");
var temperature = $(".temperature");
var dateTime = $(".date");
var weather = $(".conditions");
var humid = $(".humidity");
var wind = $(".windSpeed");
var uv = $(".uvIndex");

submit.on("click", function () {
    card.css("display", "flex");
    
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city.val() + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96"
    
    fetch(requestUrl) 
    .then (function (response) {  
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        
        var date = [];
        var dailyTemp = [];
        var conditions = [];
        var humidity = [];
        var windSpeed = [];
        var uvIndex = [];

        for (var i = 0; i <data.list.length; i+= 8) {
            dailyTemp.push(data.list[i].main.temp);
            
            var dateSplit = data.list[i].dt_txt.split(" "); 
            date.push(dateSplit[0]);
            
            conditions.push(data.list[i].weather[0].icon);
            
            humidity.push(data.list[i].main.humidity);

            windSpeed.push(data.list[i].wind.speed);
        };
                
        cardTitle.each(function (index, ele) {
            cardTitle.text(data.city.name); 
        });

        dateTime.each(function (index, ele) {
            $(ele).text(date[index]);
        });

        temperature.each(function (index, ele) {
            $(ele).text(`Temp: ${dailyTemp[index]}°C`);
        });

        weather.each(function (index, ele) {
            $(ele).attr("src", "http://openweathermap.org/img/wn/" + conditions[index] +"@2x.png")
        });

        humid.each(function (index, ele) {
            $(ele).text(`Humidity: ${humidity[index]}%`);
        });

        wind.each(function (index, ele) {
            $(ele).text(`Wind Speed: ${windSpeed[index]}km/h`);
        })
    })
})    


