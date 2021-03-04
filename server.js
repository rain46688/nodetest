const express = require('express');
const oracledb = require('oracledb');
const app = express();
//웹소켓 만들때 이렇게 하는거임 express 가이드를 보고 하는것
const server = app.listen(8888, () => {
    console.log("서버 실행 8888 포트...");
});

app.set('views',__dirname+"/views");//디렉토리 설정
app.set('view engine', 'ejs');//엔진 설정 ejs는 자바스크립트랑 html을 같이 쓸수있게 해주는것 jsp랑 비슷한거
app.engine('html', require('ejs').renderFile);//ejs를 설치해줘야됨 npm install ejs --save
app.get('/', (req, res) => {
    res.render('index.html');//renger라는게 있음
});
app.get('/member', (req,res) => {
    oracledb.getConnection({
        user: 'student',
        password: 'student',
        host: 'localhost', 
        database: 'xe'
    }, function (err, conn) {
        if(err){
            console.log('접속 실패', err);
            return;
        }
        console.log('접속 성공');
         conn.execute("select * from member", {}, {outFormat:oracledb.OBJECT}, function (err, result) { 
                // Json 형태로 넘어오도록 설정
        if(err) throw err; 

        console.log("쿼리 읽기 성공");

        dataStr = JSON.stringify(result);
        //console.log(dataStr);
    
        arrStr = JSON.stringify(result.rows);
        var arr = JSON.parse(arrStr);
        console.log(arr);
 
        //res.send(arr[0].MEMBER_ID + " " + arr[0].MEMBER_NAME);
        res.render(__dirname + "/views/member.html", {mem:arr});
        console.log("__dirname :" +__dirname );
        });
    });
});
