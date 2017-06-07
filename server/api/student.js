const db = require('../db/models');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const redis = require('../db/redis');
const util = require('./util');


const saltRounds = 10;

const fetchAllStudentData = async (req, res) => {
  try {
    const email = util.antiHasher(req.params.auth_token);
    const allData = await db.User.findOne({
      where: {
        email,
        // id: req.params.id,
        userType: 1,
      },
      include: [{
        model: db.StudentCohort,
        include: [{
          model: db.Cohort,
          include: [{
            model: db.Lecture,
            include: [{
              model: db.Topic,
              include: [{
                model: db.Quiz,
                include: [{
                  model: db.Question,
                }],
    // const email = antiHasher(req.params.auth_token);
    // const allData = await db.User.findOne({
    //   where: {
    //     email: email,
    //     userType: 1,
    //   },
    //   include: [{
    //     model: db.Cohort,
    //     as: 'cohort',
    //     include: [{
    //       model: db.Lecture,
    //       include: [{
    //         model: db.Topic,
    //         include: [{
    //           model: db.Quiz,
    //           include: [{
    //             model: db.Question,
              }],
            }],
          }],
        }],
      }],
    });
    console.log('All information front loaded ', allData);
    res.status(200).send(allData);
  } catch (error) {
    console.log('Some shit went wrong ', error);
    res.status(500).send(error);
  }
};

const fetchStudent = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email, userType: 1 } });
    const data = await bcrypt.compare(req.params.creds, user.password);
    if (data) {
      console.log('User Logged In: ', { user: user, id_token: util.hasher(`${req.params.email}`) });
      res.status(200).send({ user: user, id_token: util.hasher(req.params.email) });
    } else {
      res.status(404).send('Credentials incorrect');
    }
  } catch (error) {
    console.log('Error in fetchStudent');
    res.status(500).send(error);
  }
};

const postStudent = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log("hiihihihih")
    const person = await db.User.findOne({ where: { email: req.body.email } });
    if (person) {
      console.log('That email is taken. Please try another email.');
      res.status(404).send('That email is taken. Please try another email.');
    } else {
      const newUser = await db.User.create({
        email: req.body.email.toLowerCase(),
        password: hash,
        userType: 1,
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        school_id: req.body.school_id,
        image: req.body.image,
      });
      console.log('Signed Up New User: ', { user: newUser, id_token: util.hasher(req.body.email) });
      res.status(201).send({ user: newUser, id_token: util.hasher(req.body.email) });
    }
  } catch (error) {
    console.log('Error in postStudent');
    res.status(500).send(error);
  }
};

const updateStudent = async (req, res) => {
  try {
    console.log(util.antiHasher(req.params.auth_token));
    const student = await db.User.findOne({ where: { email: util.antiHasher(req.params.auth_token) } });
    if (student) {
      const updatedStudent = await student.update({
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
      });
      if (updatedStudent) {
        console.log('Student successfully updated ', updatedStudent);
        res.status(200).send({ student: updatedStudent, auth_token: util.hasher(updatedStudent.email) });
      } else {
        console.log('Missing a parameter');
        res.status(500).send('Missing a parameter');
      }
    } else {
      console.log('Student not found');
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.log('Error with async in updateStudent ', error);
    res.status(500).send(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await db.User.findOne({ where: { email: util.antiHasher(req.params.auth_token) } });
    if (student) {
      student.destroy({ force: true });
      console.log('Student deleted');
      res.status(200).send(student);
    } else {
      console.log('Student not found');
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.log('ASYNC Error: ', error);
    res.status(500).send(error);
  }
};

// router.get('/:id', fetchAllStudentData);
router.get('/:auth_token', fetchAllStudentData);
router.get('/:email/:creds', fetchStudent);
router.post('/', postStudent);
router.put('/:auth_token', updateStudent);
router.delete('/:auth_token', deleteStudent);

module.exports = router;








// router.get('/:auth_token', (req, res, next) => {
//   const studentEmail = antiHasher(req.params.auth_token);
//   db.User.findOne({
//     where: { email: studentEmail, userType: 1 },
//     include: [{
//       model: db.StudentCohort,
//       include: [{
//         model: db.Cohort,
//         include: [{
//           model: db.Lecture,
//           include: [{
//             model: db.Topic,
//             include: [{
//               model: db.Quiz,
//               include: [{
//                 model: db.Question,
//               }],
//             }],
//           }],
//         }],
//       }],
//     }],
//   })
//     .then(data => res.status(200).send(data))
//     .catch(next);
// });

// router.get('/:email/:creds', (req, res, next) => {
//   db.User.findOne({ where: { email: req.params.email } })
//     .then((studentUser) => {
//       const valid = bcrypt.compare(req.params.creds, studentUser.password);
//       if (valid) {
//         res.status(200).send({ user: studentUser, id_token: hasher(req.params.email) });
//       }
//     })
//     .catch(next);
// });


// router.post('/', (req, res, next) => {
//   req.body['fName'] = req.body.fName;
//   req.body['lName'] = req.body.lName;
//   req.body['userType'] = 1;
//   req.body['email'] = req.body.email;
//   req.body['password'] = req.body.password;
//   req.body['username'] = req.body.username;
//   db.User.findOrCreate({
//     where: { email: req.body.email },
//     defaults: req.body,
//   })
//     .spread((user, created) => {
//       if (created) {
//         res.status(200).send(user);
//       }
//     })
//     .catch(next);
// });

// router.put('/:auth_token', updateStudent);

// router.delete('/:auth_token', deleteStudent);

