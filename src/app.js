const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express
const dir_path = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partial");

//setup views and handlebars
app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

//Setup static directory to serve
app.use(express.static(dir_path));

const directories = {
  home: "",
  weather: "/weather",
  help: "/help",
  products: "/products",
};

app.get(directories.home, (req, res) => {
  res.render("index", {
    title: "Index Page",
    name: "maheshwar",
  });
});

/* app.get(directories.weather, (req, res)=>{
    res.render('weather',{
        title:'Weather Page',
        name:"maheshwar"
    })
}); */

app.get(directories.help, (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "maheshwar",
  });
});

app.get(directories.weather, (req, res) => {
  
  const address = req.query.address;

  if (!address) {
    res.send("A Query is required in the String");
  } else {
    geocode(address, (error, { text, place_name, center, properties } = {}) => {
      error
        ? res.send({
            error: "Geocode is " + error,
          })
        : text &&
          forecast(
            text,
            (
              error,
              { temperature, pressure, uv_index, weather_descriptions } = {}
            ) => {
              error
                ? res.send({
                    error: "Forecast is " + error,
                  })
                : res.send({
                    Forecast: {temperature, pressure, uv_index, weather_descriptions},
                    Location: {text, place_name, center, properties},
                  });
            }
          );
    });
  }
});

app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(8002, () => {
  console.log("LISTENING!");
});
