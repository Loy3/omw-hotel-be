const dotenv = require("dotenv");
dotenv.config();

const config = {
    env: process.env["ENV"] ?? "dev",
    port: process.env["PORT"] ?? "3000",
}
module.exports = config;