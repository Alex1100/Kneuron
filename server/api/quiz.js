const router = require('express').Router();
const db = require('../db/models');
<<<<<<< HEAD
const redis = require('../db/redis');
=======
// const redis = require('../db/redis');
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76

const postQuiz = async (req, res) => {
  try {
    const topic = await db.Topic.findOne({ where: { id: req.body.topic_id } });
    if (topic) {
      req.body['topic_id'] = topic.id;
      req.body['name'] = req.body.name;
      const quiz = await db.Quiz.create(req.body);
      console.log('Quiz created!');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(quiz);
    } else {
      console.log('Topic does not exist');
      res.status(404).send('Topic does not exist');
    }
  } catch (error) {
    console.log('Error in postQuiz ', error);
    res.status(500).send(error);
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await db.Quiz.findOne({ where: { id: req.params.quiz_id } });
    if (quiz) {
      req.body['name'] = req.body.name;
      const updatedQuiz = await quiz.update(req.body);
      console.log('Quiz updated!');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(updatedQuiz);
    } else {
      console.log('Quiz does not exist');
      res.status(404).send('Quiz does not exist');
    }
  } catch (error) {
    console.log('Error in updateQuiz ', error);
    res.status(500).send(error);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await db.Quiz.findOne({ where: { id: req.params.quiz_id } });
    if (quiz) {
      const deletedQuiz = await quiz.destroy({ force: true });
      console.log('Quiz deleted');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(deletedQuiz);
    } else {
      console.log('Quiz does not exist');
      res.status(404).send('Quiz does not exist');
    }
  } catch (error) {
    console.log('Error in deleteQuiz ', error);
    res.status(500).send(error);
  }
};

router.post('/', postQuiz);
router.put('/:quiz_id', updateQuiz);
router.delete('/:quiz_id', deleteQuiz);

module.exports = router;
