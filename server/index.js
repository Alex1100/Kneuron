const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


require('dotenv').config();
require('dotenv').load();

const PORT = process.env.PORT || 5000;
const router = require('./api/index');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', express.static(path.join(__dirname, '../static/')));
app.use('/api', router);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/index.html'));
});

app.use(express.static(path.join(__dirname, '../static')));


io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.id);
  });
  socket.on('live-lecture', (data) => {
    const topics = data.topics;
    const teacherRoom = data.teacher;
    io.sockets.to(teacherRoom).emit('live-lecture', topics);
  });
  socket.on('pop-quiz', (data) => {
    const questions = data.questions;
    const time = data.time;
    const teacherRoom = data.id;
    const topic = data.topic;
    io.sockets.in(teacherRoom).emit('pop-quiz', { questions, time, topic });
  });
  socket.on('student-answers', (data) => {
    const correct = data.correct;
    const student = data.name;
    const teacherRoom = data.teacher;
    io.sockets.to(teacherRoom).emit('student-answers', {
      name: student,
      correct,
    });
  });
  socket.on('attendance', (data) => {
    const teacherRoom = data.id;
    io.sockets.in(teacherRoom).emit('attendance', { teacherRoom });
  });
  socket.on('student-track', (data) => {
    const name = data.name;
    const present = data.present;
    const teacherRoom = data.teacher;
    io.sockets.in(teacherRoom).emit('student-track', { name, present });
  });
  socket.on('student-question', (data) => {
    const question = data.question;
    const topic = data.topicId;
    const student = data.name;
    const teacherRoom = data.teacher;
    io.sockets.to(teacherRoom).emit('student-question', {
      name: student,
      question,
      topicId: topic,
    });
  });
  socket.on('leave', (data) => {
    io.sockets.to(data.id).emit('leave');
    socket.leave(data.id);
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log('There was an error connecting to the Server ', err);
  } else {
    console.log('You have connected to the server on PORT: ', PORT);
  }
});

// Catches all 404 routes.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).send(error);
});

module.exports = app;
