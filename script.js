var city = $("#city");
var submit = $("#submit");
var card = $(".card")
var cardTitle = $(".card-title");
var temperature = $(".temperature");
var dateTime = $(".date");
var weather = $(".conditions");
var humid = $(".humidity");
var wind = $(".windSpeed");
var indexUv = $(".uvIndex");
var list = $(".list");


var pastSearches = [];


if (localStorage.length > 0) {
    getStorage(localStorage);
};


submit.on("click", getWeather); 


function getStorage (localStorage) {
    
    var searchList = localStorage.getItem("searches").split(",");
    for (var i = 0; i <searchList.length; i++) {
        createButton(searchList[i]);
    }
    pastSearches.push(searchList);
          
};


function createButton (city) {
    
    var button = $("<button>");
    button.val(city);
    button.text(city);
    button.on("click", getWeather);
    list.append(button);
};


function uvIndex(coord) {
    
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coord.lat + "&lon=" + coord.lon + "&exclude=minutely,hourly,daily,alerts&appid=4f071de0ce28a47df5c272c2ae6d1d96";

    fetch(uvUrl)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        uv = data.current.uvi;
        indexUv.text(uv)
        indexUv.css("color", "black")
        indexUv.css("padding", "5px");
        
        if (uv > 8) {
            indexUv.css("backgroundColor", "red")
        } else if(uv > 6) {
            indexUv.css("backgroundColor", "orange")
        } else if (uv > 3) {
            indexUv.css("backgroundColor", "yellow")
        } else {
            indexUv.css("backgroundColor", "green")
        };    
    });
};


function getWeather (event) {
    event.preventDefault();
    city.text(" ");

    if (city.val()) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city.val() + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96";
    };    
    
    if (event.target.value) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + event.target.value + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96"; 
        city.val(" "); 
    }; 
    
    fetch(requestUrl) 
    .then (function (response) {  
        return response.json();
    })
    .then(function (data) {
        
        var date = [];
        var dailyTemp = [];
        var conditions = [];
        var humidity = [];
        var windSpeed = [];
         
        if (data.cod === "200") {
            
            if (city.val() !== " ") {
                createButton(city.val());
                pastSearches.push(city.val());
                localStorage.setItem("searches", pastSearches); 
            };

            card.css("display", "flex");
            
            var coord = data.city.coord;
            uvIndex(coord);
            
            for (var i = 0; i <data.list.length; i+= 8) {
                dailyTemp.push(data.list[i].main.temp);            
                var dateSplit = data.list[i].dt_txt.split(" "); 
                date.push(dateSplit[0]);
                conditions.push(data.list[i].weather[0].icon);
                humidity.push(data.list[i].main.humidity);
                windSpeed.push(data.list[i].wind.speed);
            };
        } else {
            confirm("City not recognized");
            return
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
        });
    });
};    