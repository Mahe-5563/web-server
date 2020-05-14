const req = require('request');


module.exports = forecast = (location, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e752d4425097d7a519ece22b50190dc0&query='+encodeURIComponent(location)+'&units=m'

    req({url: url, json: true}, (error, response)=>{
        
        const {temperature, pressure, uv_index, weather_descriptions} = response.body.current
        
        //console.log(temperature, pressure, uv_index, weather_descriptions)
        //console.log(response.body.current)

        if(error){
            callback("Invalid Location Name", undefined);
        } else if (forecast == 0){
            callback("No Forecast present", undefined);
        } else {
            callback(undefined, {
                temperature, 
                pressure, 
                uv_index, 
                weather_descriptions 
            });
        }

    })
}

