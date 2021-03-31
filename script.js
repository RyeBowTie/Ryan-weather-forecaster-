var city = $("#city");
var submit = $("#submit")
var carTitle = $(".card-title")
var temperature = $(".card-text")

submit.on("click", function () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.val() + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96"

    fetch(requestUrl) 
    .then (function (response) {
        
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    
        carTitle.each(function (index, ele) {
            carTitle.text(data.city.name) 
        })
        for (var i = 0; i <data.list.length; i+=8) {
            temperature.each(function (index, ele) {
                temperature.text(data.list[i].main.temp)
                console.log(data.list[i].main.temp)
            })
        }
        
    })
})    
