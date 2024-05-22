const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
async function main () {
    const app = express();
    const port = process.env.PORT;

    require("./src/config/mongoose.config");
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    });
}
main();
