const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(process.env.APP_PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on PORT ${process.env.APP_PORT}`);
});
