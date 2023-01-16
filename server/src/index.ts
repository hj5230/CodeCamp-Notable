"use strict";
import express = require("express");
import bodyParser = require("body-parser");
import fs = require("fs");
import cors = require("cors");
import { Express, Request, Response } from "express";
const md5 = require("md5");
const axios = require("axios").default;

const app: Express = express();
const port: number = 3001;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  let fileContent: string;
  fileContent = fs.readFileSync("./storage.json", "utf8");
  fileContent = JSON.parse(fileContent);
  res.send(fileContent);
});

app.post("/", (req: Request, res: Response) => {
  fs.writeFileSync("./storage.json", JSON.stringify(req.body));
  console.log(req.body);
  res.json("ok");
});

app.post("/translate", async (req: Request, res: Response) => {
  const { from, to, content } = req.body;
  const apiUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
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
  res.json((await requestTranslate(content)).data);
});

app.listen(port, () => {
  console.log("TS server running at http://localhost:" + port);
});
