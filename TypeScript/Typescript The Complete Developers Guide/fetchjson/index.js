"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'http://validate.jsontest.com/?json=%7B%22key%22:%22value%22%7D';
axios_1["default"].get(url).then(function (res) { return console.log(res.data); });
