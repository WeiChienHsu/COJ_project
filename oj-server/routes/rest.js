const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// get problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

// GET problems
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});
// POST problem
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        }, (error) => {
            res.status(400).send('Problem name already exists!');
        });
});

module.exports = router;