"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const md5 = require('md5');
const axios = require('axios').default;
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
app.post('/translate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, content } = req.body;
    console.log(from, to, content)
    const apiUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
    const appid = "20230109001524187";
    const secret = "QQSswREmcykRQ1LA3JHr";
    const requestTranslate = (q) => {
        const salt = Math.random();
        const sign = md5(appid + q + salt + secret);
        const params = {
            q,
            from: from,
            to: to,
            salt,
            appid,
            sign,
        };
        return axios.get(apiUrl, {
            params,
        });
    };
    res.json((yield requestTranslate(content)).data);
}));
app.listen(port, () => {
    console.log("TS server running at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map