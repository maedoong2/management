const fs = require('fs');
const express = require('express'); //익스프레스를 불러온다.
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능
const app = express();
const port = process.env.PORT || 5000; //서버의 포트번호

//bodyParser json 데이터 형식 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/* DB 접속 연결 */
const data = fs.readFileSync('./database.json'); //해당 파일을 읽어온다.
const conf = JSON.parse(data); //json 형식으로 읽는다.
const mysql = require('mysql'); //mysql 라이브러리를 불러와 변수에 담는다.

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

//restapi 접속시
app.get('/api/customers', (req, res) =>{
    // res.send(직접데이터입력);
    // DB 연결에 대한 쿼리 입력 
    connection.query(
      "SELECT * FROM management.customer", 
      (err, rows, fields) => {
          res.send(rows); //rows에 결과가 담겨있고, 그것을 보낸다.
      }
    );
});
app.listen(port, () => console.log(`Listening on port ${port}`)); //서버가 동작중이라면 메세지를 뜨게 한다.
//cf) 숫자 1 옆의 ` 특수문자를 사용해줘야 변수를 넣을 수 있다.