const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');

// GET problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});
// GET problems

// POST problem

module.exports = router;