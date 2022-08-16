const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db"); //we imported the function we built

//Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars (our templating engine)
//add the word .engine after exphbs
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs"); //we can add files in our veiw folder

const PORT = process.env.PORT || 8500;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
