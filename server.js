const express = require('express'); //익스프레스를 불러온다.
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능
const app = express();
const port = process.env.PORT || 5000; //서버의 포트번호

//bodyParser json 데이터 형식 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//restapi 데이터 설정
app.get('/api/customers', (req, res) =>{
    res.send([
        {
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1',
        'name' : '홍길동',
        'birthday' : '961222',
        'gender' : '남자',
        'job' : '대학생'
        },
        {
          'id' : 2,
          'image' : 'https://placeimg.com/64/64/2',
          'name' : '김다솔',
          'birthday' : '930310',
          'gender' : '여자',
          'job' : '개발자'
        },
        {
          'id' : 3,
          'image' : 'https://placeimg.com/64/64/3',
          'name' : '장발장',
          'birthday' : '900124',
          'gender' : '남자',
          'job' : '디자이너'
        }
      ]);
});
app.listen(port, () => console.log(`Listening on port ${port}`)); //서버가 동작중이라면 메세지를 뜨게 한다.
//cf) 숫자 1 옆의 ` 특수문자를 사용해줘야 변수를 넣을 수 있다.