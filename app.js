const path = require("path");
const express = require("express");
//!Change: Mongoose is no longer required
//const mongoose = require('mongoose')
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
//!Change: MongoStore does not requre (session)
const MongoStore = require("connect-mongo"); //(session)
const connectDB = require("./config/db");
