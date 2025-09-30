const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const allRoutes = require("./routes/allRoutes");
const editRoute = require("./routes/editRoute");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const methodOverride = require("method-override");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));



// Method override
app.use(methodOverride("_method"));


// Live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());


liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Routes
app.use(allRoutes);
app.use(editRoute);


// DB connect
mongoose
  .connect(process.env.DATADB || "mongodb://localhost:27017/all-data")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });