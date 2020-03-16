var express = require('express');
var axios = require("axios");
var app = express();
var port = 3000;

var users = [
    { id: 1, name: "alice" },
    { id: 2, name: "bruce" },
    { id: 3, name: "mackin" }
];

// Other settings
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) { // 1
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.get('/users', function(req, res) {
    axios.get('http://internal-CRBS-internal-1483526971.ap-northeast-2.elb.amazonaws.com:8090/v0.0.3/crbs', {})
        .then(function(response) {
            res.json(response.data);
            console.log(response.data);
            console.log(users);
        });

});

app.post('/users', function(req, res) {
    /* post로 온 데이터 파싱 -> db 테이블 레코드 생성 로직 수행 */
    res.send("결과값");
});


app.listen(port, function() {
    console.log(`Server is running on ${port}port`);
});