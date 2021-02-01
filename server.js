const express = require('express'); //익스프레스를 불러온다.
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능
const app = express();
const port = process.env.PORT || 5000; //서버의 포트번호

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
}); //클라이언트 즉 이 서버에 접속하는 사용자 입장에서 이 /api/hello로 접속했을 때, 어떤 처리를 해줄 것인가를 정함.

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버가 동작중이라면 메세지를 뜨게 한다.
//cf) 숫자 1 옆의 ` 특수문자를 사용해줘야 변수를 넣을 수 있다.