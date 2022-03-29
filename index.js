const express=require('express');
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "day17"    //数据库的名字
});
//这个cors包就是用来解决跨域问题的
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));  //这个是用来接收post的表达数据
app.use(express.json());   
let usersList;

// 注册
app.get("/register", (req,res) => {
  let {username,password} = req.query;
  console.log(req.query);
  db.query(`insert into users (username,password) values ("${username}", "${password}")`, (err, results)=>{
    if(err) return console.log(err.message);
    return res.send("注册成功");
  })

})

// 登录
app.get("/login", (req,res)=>{
  // 拿到用户名，密码
  let {username, password} = req.query;
  db.query(`select * from users where username="${username}" and password="${password}"`, (err, results) =>{
    if(err) return console.log(err.message);
    // 从数据库拿到的数据需要这样处理两次
    let dataString = JSON.stringify(results);
    let data = JSON.parse(dataString);
    console.log(data);
    usersList = data;
    if(usersList.length > 0){
      return res.send("登录成功");
    }else{
      return res.send("登录失败");
    }
   
  })
})


app.get("/ziji", (req, res) => {
  console.log(req.query);
  res.send("接收成功");
});

app.listen(8080,() => {
  console.log('服务启动');
})