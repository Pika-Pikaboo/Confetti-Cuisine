const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  useNewUrlParser: true,
}); // connecting to local database

const db = mongoose.connection; // assign connected database to db variable
mongoose.Promise = global.Promise;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose");
}); // display messsage for once when it's done

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController");

app.set("view engine", "ejs"); // tell the view engine of Express.js to use ejs format
// set the view engine of Express.js to ejs engine
app.set("port", process.env.PORT || 3000); // set the port number

app.use(layouts); // middleware to use ejs layouts
app.use(express.static("public")); // for static files such as images, css and js
app.use(
  express.urlencoded({
    extended: false,
  })
); // middleware to encode incoming url context
app.use(express.json()); // middleware to encode incoming data to json format

app.get("/", homeController.showCourses);
app.get("/courses", homeController.showCourses); // home page
app.get("/contact", subscribersController.getSubscriptionPage); // contact page viewer page
app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
  }
);

app.post("/subscribe", subscribersController.saveSubscriber); // contact form submission

app.use(errorController.pageNotFoundError); // custom error middleware
app.use(errorController.internalServerError); // custom error middleware

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});
