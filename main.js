const express = require("express");
const dotenv = require("dotenv");

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

    //* ruters
    app.use(mainRouter);

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
