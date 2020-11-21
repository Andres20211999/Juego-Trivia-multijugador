const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);

//models

const questionsModel = require('./models/questions')


app.set('port', (process.env.PORT || 3000));



// Se indica el directorio donde se almacenarán las plantillas
app.set('views', './views');

const FAKE_UPLOADS_DIR = __dirname + '/public/';
app.use('/coupon', express.static(FAKE_UPLOADS_DIR));

app.use(cors())

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'ejs');
app.get('/trivia', (req, res) => {
  res.render("index")
})


app.get("/", async (req, res) => {
  const questions = await questionsModel.find({})
  return res.status(200).json({ data: questions })
})
http.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.use(cors())

io.on('connection', (socket) => {
  console.log("hoilaooam")

  socket.on("resultUser", function (data) {

    socket.broadcast.emit("msg", data)
  })
});
