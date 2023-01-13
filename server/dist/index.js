"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    let fileContent;
    fileContent = fs.readFileSync('./storage.json', 'utf8');
    fileContent = JSON.parse(fileContent);
    res.send(fileContent);
});
app.post("/", (req, res) => {
    fs.writeFileSync('./storage.json', JSON.stringify(req.body));
    console.log(req.body);
    res.json('ok');
});
app.listen(port, () => {
    console.log("TS server running at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map