const express = require("express");
const app = express();
const port = 3000; // react의 기본값은 3000이니까 3000이 아닌 아무 수
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
app.engine('html', require('ejs').renderFile)
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "script")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


   
    

  

app.get("", (req, res) => {
    

    connection.query("SELECT * FROM users", function (err, results, fields) {
        if (err) {
            console.log(err)
        }
        users = results
    
        
    })

    connection.query("SELECT favoriteColor, COUNT(*) as count FROM users GROUP BY favoriteColor", function (err, results, fields) {
      if (err) {
          console.log(err)
      }
     
      colors = results
     
      
  })


  connection.query("SELECT styles FROM users", function (err, results, fields) {
    if (err) {
        console.log(err)
    }
   
    styles = {}
    
    for(var i = 0; i< results.length; i++) {
      let arr = results[i].styles
      console.log(arr)
      for(var j = 0; j<arr.length; j++){
        // console.log(arr[j])
        if (arr[j] in styles) {

          styles[arr[j]] = styles[arr[j]] + 1
        } else {
          styles[arr[j]] = 1
        }
      }
    }
    
   
    
})


  connection.query("SELECT size FROM users", function(err, results, fields) {
    if (err) {
      console.log(err)
  }
 
    size = {"xs": 0,"s": 0, "m": 0, "l": 0, "xl": 0}
    console.log(results)
    for(var i = 0; i< results.length; i++) {
      let top = results[i].size.top
      let bottom = results[i].size.bottom
      size[top] = size[top] + 1
      size[bottom] = size[bottom] + 1
    }
    console.log(size)
    })

    res.render(__dirname + "/index.html", {users: users, colors: colors, styles: styles, size: size});
});


  app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});
  