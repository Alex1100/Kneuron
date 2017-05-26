const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db/models');
const hasher = require('./util').hasher;
const antiHasher = require('./util').antiHasher;
const redis = require('../db/redis');

const saltRounds = 10;

// Controllers
// Fetch ALL INFORMATION on Teacher
const fetchAllTeacherData = async (req, res) => {
  try {
    let redisTeacherData = await redis.get('allTeacherData');
    redisTeacherData = JSON.parse(redisTeacherData);
    const email = antiHasher(req.params.auth_token);
    if (redisTeacherData !== null && redisTeacherData.email === email) {
      res.status(200).send(redisTeacherData);
    } else {
      const allData = await db.User.findOne({
        where: {
          email: email,
          userType: 0,
        },
        include: [{
          model: db.Cohort,
          as: 'cohort',
          include: [{
            model: db.Lecture,
            include: [{
              model: db.Topic,
              include: [{
                model: db.Quiz,
                include: [{
                  model: db.Question,
                }],
              }],
            }],
          }],
        }],
      });
      console.log('All information front loaded ', allData);
      redis.set('allTeacherData', JSON.stringify(allData));
      res.status(200).send(allData);
    }
  } catch (error) {
    console.log('Some shit went wrong ', error);
    res.status(500).send(error);
  }
};

// Login Teach with Async
const fetchTeacher = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email } });
    const data = await bcrypt.compare(req.params.creds, user.password);
    if (data) {
      console.log('User Logged In: ', { user: user, id_token: hasher(`${req.params.email}`) });
      res.status(200).send({ user: user, id_token: hasher(req.params.email) });
    } else {
      res.status(404).send('Credentials incorrect');
    }
  } catch (error) {
    console.log('User Does Not Exist');
    res.status(404).send(error);
  }
};

// Sign Up Teacher with Async
const postTeacher = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    const person = await db.User.findOne({ where: { email: req.body.email } });
    if (person) {
      console.log('That email is taken. Please try another email.');
      res.status(404).send('That email is taken. Please try another email.');
    } else {
      const newUser = await db.User.create({
        email: req.body.email,
        password: hash,
        userType: 0,
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        school_id: req.body.school_id,
      });
      console.log('Signed Up New User: ', { user: newUser, id_token: hasher(req.body.email) });
      res.status(201).send({ user: newUser, id_token: hasher(req.body.email) });
    }
  } catch (error) {
    console.log('Invalid Login Credentials');
    res.status(404).send(error);
  }
};

// Update Teacher with Async
const updateTeacher = async (req, res) => {
  try {
    console.log(antiHasher(req.params.auth_token));
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher) {
      const updatedTeacher = await teacher.update({
        // email: req.body.email,
        // password: hasher(req.body.password),
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
      });
      if (updatedTeacher) {
        console.log('Teacher successfully updated ', updatedTeacher);
        res.status(200).send({ teacher: updatedTeacher, auth_token: hasher(updatedTeacher.email) });
      } else {
        console.log('Missing a parameter');
        res.status(500).send('Missing a parameter');
      }
    } else {
      console.log('Teacher not found');
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    console.log('Error with async in updateTeacher ', error);
    res.status(500).send(error);
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher) {
      teacher.destroy({ force: true });
      console.log('Teacher deleted');
      res.status(200).send(teacher);
    } else {
      console.log('Teacher not found');
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    console.log('ASYNC Error: ', error);
    res.status(500).send(error);
  }
};

// Controllers
router.get('/:auth_token', fetchAllTeacherData);
router.get('/:email/:creds', fetchTeacher);
router.post('/', postTeacher);
router.put('/:auth_token', updateTeacher);
router.delete('/:auth_token', deleteTeacher);

module.exports = router;
