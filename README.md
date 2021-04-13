# Ryan-weather-forecaster

 https://ryebowtie.github.io/Ryan-weather-forecaster-/
 
 1. When a user navigates to this page they are presetned with an input field and button asking them to input a city. 
  
  ![Forecast1](https://user-images.githubusercontent.com/74829094/114595343-47c5c600-9c5c-11eb-825b-b54deed89007.png)
  
  2. If the city is recognized the forecast for the next five days is presented, the city is saved in local storage, and a button is generated. 

![Forecast2](https://user-images.githubusercontent.com/74829094/114595446-65932b00-9c5c-11eb-8e0b-b5605666dad0.png)

3. If the city is not recognized an alert is displayed telling the user such. 

![Forecast2b](https://user-images.githubusercontent.com/74829094/114595727-b571f200-9c5c-11eb-84fe-ec8e6c8005be.png)

4. When a user clicks one of the generated buttons that city's data is displayed again. 

![Forecast3b](https://user-images.githubusercontent.com/74829094/114596184-4d6fdb80-9c5d-11eb-843a-c59aac241d31.png)

5. Buttons persist when website is reloaded. 

![Forecast4a](https://user-images.githubusercontent.com/74829094/114596380-945dd100-9c5d-11eb-9e6a-b9eeff9e5449.png)


Code 

On load the page checks if there is anything in local storage. If true those items are retrieved and buttons are generated using that data. When one of these buttons, or the main submit button is pressed the getWeather function is called. GetWeather checks where the event originates and alters the api url accordingly. When the call is returned arrays are generated to hold the incoming data and a check is run to see if the call was successful. If so that city is stored, and a button is generated which can be used to recall that city's information. A for loop is used to collect all the data and place them in the correct array. This also triggers the uvIndex function. THe UvIndex function makes a second api call using coordinate data from the first to get the UV Index and display it. If else statments are used to alter the background color of the UVIndex elements according to how severe it is. Info about UV severity from google. Info is displayed by looping through all elements of a certain class (i.e. .conditions) using an each loop whose index is then also used to iterate through the arrays of stored data.     

