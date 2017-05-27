const router = require('express').Router();
const db = require('../db/models');
const redis = require('../db/redis');

const postQuestion = async (req, res) => {
  console.log(req.body, ' THIS IS THE REQ DOT BODY   ');
  try {
    const quiz = await db.Quiz.findOne({ where: { id: req.body.quiz_id } });
    console.log('this is the qui we tryna hit', quiz);
    if (quiz) {
      req.body['quiz_id'] = quiz.id;
      req.body['name'] = req.body.name;
      req.body['choices'] = req.body.choices;
      req.body['correct'] = req.body.correct;
      const newQuestion = await db.Question.create(req.body);
      console.log('Question created');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(newQuestion);
    } else {
      console.log('Topic not found');
      res.status(404).send('Topic not found');
    }
  } catch (error) {
    console.log('Error in postQuestion');
    res.status(500).send(error);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await db.Question.findOne({ where: { id: req.params.question_id } });
    if (question) {
      req.body['name'] = req.body.name;
      req.body['choices'] = req.body.choices;
      req.body['correct'] = req.body.correct;
      const updatedQuestion = await question.update(req.body);
      console.log('Question updated!');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(updatedQuestion);
    } else {
      console.log('Question not found');
      res.status(404).send('Question not found');
    }
  } catch (error) {
    console.log('Error in updateQuestion');
    res.status(500).send(error);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await db.Question.findOne({ where: { id: req.params.question_id } });
    if (question) {
      const deletedQuestion = question.destroy({ force: true });
      console.log('Question deleted!');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(deletedQuestion);
    } else {
      console.log('Question not found');
      res.status(404).send('Question not found');
    }
  } catch (error) {
    console.log('Error in deleteQuestion');
    res.status(500).send(error);
  }
};

router.post('/', postQuestion);
router.put('/:question_id', updateQuestion);
router.delete('/:question_id', deleteQuestion);

module.exports = router;
