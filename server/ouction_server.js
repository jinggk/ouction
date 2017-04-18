"use strict";
exports.__esModule = true;
var express = require("express");
var ws_1 = require("ws");
var app = express();
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = (function () {
    function Comment(id, productId, timetamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timetamp = timetamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, '2017-02-02 22:22:22', '张三', 3, '东西不错1'),
    new Comment(2, 1, '2017-03-02 22:22:22', '李四', 4, '东西不错11'),
    new Comment(3, 1, '2017-04-02 22:22:22', '王五', 2, '东西不错222'),
    new Comment(4, 2, '2017-05-02 22:22:22', '赵六', 5, '东西不错33333'),
    new Comment(5, 3, '2017-06-02 22:22:22', '李三', 1, '东西不错4444444'),
    new Comment(6, 5, '2017-07-02 22:22:22', '王思聪', 3, '东西不错55555555'),
];
var products = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第一个商品", ["电子商品1", "硬件设备"]),
    new Product(2, "第二个商品", 2.99, 2.5, "这是第二个商品", ["电子商品2", "硬件设备"]),
    new Product(3, "第三个商品", 3.99, 1.5, "这是第三个商品", ["电子商品3", "硬件设备"]),
    new Product(4, "第四个商品", 4.99, 4.5, "这是第四个商品", ["电子商品4", "硬件设备"]),
    new Product(5, "第五个商品", 5.99, 3, "这是第五个商品", ["电子商品5", "硬件设备"]),
    new Product(6, "第六个商品", 6.99, 4, "这是第六个商品", ["电子商品6", "硬件设备"]),
];
app.get('/', function (req, res) {
    res.send('hello express');
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category !== '-1' && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/comment/:id', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.id == req.params.id; }));
});
var server = app.listen(8001, "192.168.106.45", function () {
    console.log('服务器已启动，地址是： http://localhost:8001');
});
var subscriptions = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webSocket) {
    webSocket.on('message', function (message) {
        console.log('message is   ' + message);
        var messageObject = JSON.parse(message);
        var productIds = subscriptions.get(webSocket) || [];
        subscriptions.set(webSocket, productIds.concat([messageObject.productId]));
    });
});
var currentBids = new Map();
setInterval(function () {
    products.forEach(function (product) {
        var currentBid = currentBids.get(product.id) || product.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(product.id, newBid);
    });
    subscriptions.forEach(function (productIds, ws) {
        if (ws.readyState === 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            console.log('newBids is   ' + JSON.stringify(newBids));
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions["delete"](ws);
        }
    });
}, 2000);
