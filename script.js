var city = $("#city");
var submit = $("#submit")

console.log(city)
submit.on("click", function () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.val() + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96"


    fetch(requestUrl) 
    .then (function (response) {
        
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        console.log(data.city)
        console.log(data.list[0].main)
        console.log(data.list[0].rain)
        console.log(data.list[0].weather)
        console.log(data.list[0].wind)
        
    })
})    
