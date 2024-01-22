const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); // mysql 모듈 사용
const path = require("path");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alfndk12", //본인 비번
    database: "metaverse", // 사용하고자 하는 스키마
    port: 3306,
  });

app.use(
    cors({
      origin: "*", // 출처 허용 옵션
      credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
      optionsSuccessStatus: 200, // 응답 상태 200으로 설정
    })
);

app.set("port", process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post("/", (req,res) => {
    console.log("HELLO")
    const body = req.body
    // const values = [Object.values(req.body)]
    // console.log(values)
    
    const firstName = body.first
    const lastName = body.last
    const email = body.email
    const gender = body.gender
    const age = parseInt(body.age)
    const height = parseFloat(body.height)
    const size = JSON.stringify({"top":body.size[0], "bottom": body.size[1]})
    console.log(size)
    const color = body.color
    console.log(typeof(body.styles))
    let styles = typeof(body.styles) == "string" ? [body.styles] : body.styles

    console.log(...styles)
    const reasons = body.reasons

    const sql = "INSERT INTO users " + 
                "(firstName,lastName,email,gender,age,height,size,favoriteColor,styles,reasons) VALUES " +
                `("${firstName}", "${lastName}", "${email}", "${gender}", "${age}", "${height}", '${size}', "${color}", JSON_ARRAY("${styles}"), "${reasons}")`

    connection.query(
        sql,
        function (err, results, fields) { 
            if (err) {
                console.log(err)
            }
        })
    res.send("Survey Submitted")
})

app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});
  