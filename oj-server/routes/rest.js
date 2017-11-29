const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');

// GET problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});
// GET problems
router.get('/problems/:id', (req, res) =>{
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem))
} )
// POST problem

module.exports = router;