const req = require('request');

module.exports = geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ '+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoibWFoZXNod2FyIiwiYSI6ImNrYTN3NHFkdDBndjczcm8ycDE5MHZjdG4ifQ.LMYzb_AoEn0PjD99uj4wAA';

    req({url: url, json: true}, (error, response)=>{

       // const geography = response.body.features[0];

        const {text, place_name, center, properties} = response.body.features[0];
        //console.log(response.body.features[0])
        //console.log(text, place_name, center, properties)

        if(error){
            callback("Invalid Location Name", undefined);
        } else if (response.body.features.length == 0){
            callback("No Locations present", undefined);
        } else {
            callback(undefined,{
                text, place_name, center, properties
            });
        }
    })
}