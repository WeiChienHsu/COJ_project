// let problems = [
//     {
//         "id":1,
//         "name":"Two Sum",
//         "desc":"Given an array of integers, find two numbers such that they add up to a specific target number.\n\nThe function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.",
//         "difficulty":"easy"
//     },
//     {
//         "id":2,
//         "name":"3Sum",
//         "desc":"Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
//         "difficulty":"medium"
//     },
//     {
//         "id":3,
//         "name":"4Sum",
//         "desc":"Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?\n\nFind all unique quadruplets in the array which gives the sum of target.",
//         "difficulty":"medium"
//     },
//     {
//         "id":4,
//         "name":"Triangle Count",
//         "desc":"Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?",
//         "difficulty":"hard"},
//     {
//         "id":5,
//         "name":"Sliding Window Maximum",
//         "desc":"This is copied from Wei-Chein Hsu.",
//         "difficulty":"super"
//     }];

const ProblemModel = require('../models/problemModel');

const getProblems = function(){
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                console.log("In the problem service get problems");
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

const getProblem = function(id){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, (err, problem) => {
            if (err) {
                console.log("In the problem service get problem");
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

const addProblem = function(newProblem){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, (err, data) => {
            if (data) { 
                // find a same id
                reject('Problem already exists!');
            } else {
                ProblemModel.count({}, (err, count) => {
                    newProblem.id = count + 1;
                    //Save into MongoDB
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                });
            }
        });
    });
}


module.exports = {
    getProblems,
    getProblem,
    addProblem
}