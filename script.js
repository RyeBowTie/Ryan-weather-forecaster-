var city = $("#city");
var submit = $("#submit")
var carTitle = $(".card-title")
var temperature = $(".card-text")
var dateTime = $(".date")




submit.on("click", function () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city.val() + "&mode=json&units=metric&appid=4f071de0ce28a47df5c272c2ae6d1d96"
    
    fetch(requestUrl) 
    .then (function (response) {
        
        return response.json();
    })
    .then(function (data) {
        
        var date = [];
        var dailyTemp = [];
        for (var i = 0; i <data.list.length; i+= 8) {
            dailyTemp.push(data.list[i].main.temp);
            var dateSplit = data.list[i].dt_txt.split(" "); 
            date.push(dateSplit[0]);
        }
        console.log(date)
        carTitle.each(function (index, ele) {
            carTitle.text(data.city.name); 
        })

        dateTime.each(function (index, ele) {
            $(ele).text(date[index]);
        })

        temperature.each(function (index, ele) {
            $(ele).text(dailyTemp[index]);
        });
    })
})    


// for (var i = 0; i <data.list.length; i+=8) {
//     temperature.each(function (index, ele) {
//        $(ele).text(data.list[i].main.temp)
//         console.log(data.list[i].main.temp)
//     })
// }

// temperature.each(function (index, ele) {
//     for (var i = 0; i < data.list.length; i+=8){
//         $(ele).text(data.list[index].main.temp)
//         console.log(data.list[index].main.temp)
//     }
// })