const express = require("express");
const dotenv = require("dotenv");
const expressEjsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const moment = require("jalali-moment");
const methodOverride = require("method-override");


const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");

dotenv.config();

async function main () {
    //* constants
    const app = express();
    const port = process.env.PORT;

    //* data base connection
    require("./src/config/mongoose.config");

    //* utils
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    //* cookie settings
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

    //* template engine
    app.use(express.static("public"));
    app.use(expressEjsLayouts);
    app.use(methodOverride('_method'));
    app.set("view engine", "ejs");
    app.set("layout", "./layouts/panel/main.ejs");
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);

    //* ruters
    app.use(mainRouter);

    //* date & hour
    app.locals.moment = moment;

    //* swagger
    SwaggerConfig(app);

    //* error handler
    NotFoundHandler(app);
    AllExceptionHandler(app);
    
    //* server
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    });
}
main();
