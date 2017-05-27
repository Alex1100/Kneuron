const router = require('express').Router();
const db = require('../db/models');
// const redis = require('../db/redis');
const antiHasher = require('./util').antiHasher;

// Controller
// Get All Cohorts For a Given Teacher with Async
const fetchCohorts = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher.userType === 0) {
      const teacherCohort = await db.Cohort.findAll({ where: { teacher_id: teacher.id } });
      if (teacherCohort) {
        console.log(`${teacher.fName} ${teacher.lName}'s Cohorts Grabbed: `, teacherCohort);
        res.status(200).send(teacherCohort);
      } else {
        res.status(404).send(`Coudn't Get ${teacher.fName}'s Cohorts`);
      }
    }
  } catch (error) {
    console.log('ASYNC issue', error);
    res.status(500).send(error);
  }
};

// Post a Cohort For a Given Teacher with Async
const postCohort = async (req, res) => {
  // Find a Teacher by their email and see if they are in the DB or Not...
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.body.auth_token) } });
    if (teacher.userType === 0) {
      // If Teacher Found the  Find Their Cohort where subject === req.body.subject and their teacherId: as their id
      // Switch with findOrCreate
      const teacherCohort = await db.Cohort.findOne({ where: { teacher_id: teacher.id, subject: req.body.subject.toUpperCase() } });
      if (teacherCohort) {
        // If That cohort found then say cohort already exists
        res.status(204).send(`${teacher.fName} ${teacher.lName} already has a ${teacherCohort.subject} cohort`);
      } else {
        // Else Create the Cohort
        req.body['teacher_id'] = teacher.id;
        req.body['time'] = req.body.time.toUpperCase();
        req.body['subject'] = req.body.subject.toUpperCase();
        const newCohort = await db.Cohort.create(req.body);
        if (newCohort) {
          console.log(`${teacher.fName} ${teacher.lName} just added a new ${newCohort.subject} cohort to their schedule.`, newCohort);
          // redis.set('dbTeacherCheck', false);
          res.status(201).send(newCohort);
        } else {
          res.status(404).send('Failed To Create New Cohort');
        }
      }
    } else {
      res.status(500).send('Not a teacher');
    }
  } catch (error) {
    console.log('Teacher Does Not Exist In The DB...', error);
    res.status(404).send(error);
  }
};

// Update a Cohort For a Given Teacher with Async
const updateCohort = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.body.auth_token) } });
    console.log('got past anti hasher  ', teacher.id);
    if (teacher) {
      console.log('this is the subject ', req.body.subject.toUpperCase());
      console.log('this is teacher id again  ', teacher.id);
      const cohort = await db.Cohort.findOne({ where: { subject: req.body.subject.toUpperCase(), teacher_id: teacher.id } });
      console.log('on line 66  ', cohort);
      if (cohort) {
        cohort.subject = req.body.subject.toUpperCase();
        const updatedCohort = await db.Cohort.update({
          subject: cohort.subject,
          time: req.body.time,
        }, { where: { id: cohort.id } });
        if (updatedCohort) {
          // redis.set('dbTeacherCheck', false);
          res.status(201).send(updatedCohort);
        } else {
          console.log(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort`);
          res.status(500).send(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${cohort.subject} cohort`);
        }
      } else {
        console.log(`${teacher.fName} ${teacher.lName} doesn't exist in the DB or Network Error`);
        res.status(404).send(`${teacher.fName} ${teacher.lName}'s cohort doesn't exist in the DB or Network Error`);
      }
    } else {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `);
    }
  } catch (error) {
    console.log('Async Error, Check the logs and Backend: ', error);
    res.status(500).send(error);
  }
};

// Delete a Cohort For a Given Teacher with Async
const deleteCohort = async (req, res) => {
  console.log(req.params.cohort_id);
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    console.log(teacher.id);
    if (teacher) {
      const cohort = await db.Cohort.findOne({ where: { id: req.params.cohort_id } });
      console.log(cohort);
      if (cohort) {
        cohort.destroy({ force: true });
        console.log('Cohort Was Successfully Deleted: ', cohort);
        // redis.set('dbTeacherCheck', false);
        res.status(201).send(`${cohort} was destroyed from DB`);
      } else {
        console.log('Cohort with teacher_id and cohort_id not found');
        res.status(500).send('Cohort with teacher_id and cohort_id not found');
      }
    }
  } catch (error) {
    console.log('Error Deleting Selected Cohort... Cohort Does Not Exist: ', error);
    res.status(500).send(error);
  }
};
// Controller

router.get('/:auth_token', fetchCohorts);
router.post('/', postCohort);
router.put('/', updateCohort);
router.delete('/:auth_token/:cohort_id', deleteCohort);

module.exports = router;
