
path = require("path")
fs = require("fs")

exports.lr = function (req, res) {
    var filePath = path.resolve("./data/LR-data.json");
    var data = fs.createReadStream(filePath);
    data.pipe(res);
};

exports.nn = function (req, res) {
    var filePath = path.resolve("./data/NN-data.json");
    var data = fs.createReadStream(filePath);
    data.pipe(res);
};