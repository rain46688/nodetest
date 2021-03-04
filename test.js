const nodemailer = require('nodemailer');//노드 메일러 불러오기
const email = {
    //나는 구글을 사용했지만 다른거 사용하면 넣어도됨
    //response: '535-5.7.8 Username and Password not accepted 에러나면 구글 계정의 '보안 수준이 낮은 앱 액세스' 이부분 문제임
    host : "smtp.gmail.com",
    port : 465,
    secure: "false",
    auth : {
        user : "minsu87750@gmail.com",
        pass : "alstn8775*"
    }
};

const send = async (option) => {
    nodemailer.createTransport(email).sendMail(option, (error, info) => {
        if(error){
            console.log(error);
        }else {
            console.log(info);
            return info.response;
        }
    });
};

//데이터 입력
let email_data = {
    from: 'minsu87750@gmail.com',
    to: 'minsu87750@gmail.com',
    subject: 'ㅎㅎㅎ',
    text: 'gggg'
}

//발송하기
send(email_data);