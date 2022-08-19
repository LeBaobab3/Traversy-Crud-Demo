const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db"); //we imported the function we built

//Load config
dotenv.config({ path: "./config/config.env" });

//Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars (our templating engine)
//add the word .engine after exphbs
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs"); //we can add files in our veiw folder

//Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join("public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
// app.use("/dashboard", require("./routes/index"));

const PORT = process.env.PORT || 8500;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
