const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

//url에서 정보를 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application.json에서 정보를 가져옴 
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello pre nlogg! see you soon')
})

app.post('/register', (req, res) => {
  //회원 가입 할 때 팔요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 