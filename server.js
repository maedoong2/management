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

const multer = require('multer');
//storage방식으로 할 경우, 필요하다.
const path = require('path');

//dest로 할 경우, 무작위로 이름이 생성되어 보안에 용이하지만 확장자가 따로 나오지 않는다.
// const upload = multer({dest: './upload'});

const storage =  multer.diskStorage({
        destination : function(req, file, cb) {
            cb(null, './upload');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + '_'+file.originalname);
             // .valueOf()는 millisecond로 (숫자로만) 가져오게함. path.extname(file.originalname)은 해당 파일의 확장자만을 추출한다.
        }
    });
const upload = multer({ storage: storage});

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

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    console.log(upload);
    let sql = 'INSERT INTO  management.customer VALUES (null, ?, ?, ?, ?, ?)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
            console.log(rows);
        })

});

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버가 동작중이라면 메세지를 뜨게 한다.
//cf) 숫자 1 옆의 ` 특수문자를 사용해줘야 변수를 넣을 수 있다.
