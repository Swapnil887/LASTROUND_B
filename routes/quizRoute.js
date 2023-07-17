const express = require("express");
const { Usermodel } = require("../model/user.model");
const quizRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Quizmodel } = require("../model/quiz.model");


quizRouter.post("/create",async(req,res)=>{
    const  {creator,title,description,questions} = req.body
    try {
        if(questions.length<2 || questions.length>10)
        {
           return  res.json("give question in between two to")
        }
        var data =new Quizmodel({creator,title,description,questions})
        var x = await data.save()
        console.log(x)
        res.json("quiz created")
    } catch (error) {
        console.log(error)
        res.json("something went wrong while create quiz!")
    }
})

quizRouter.patch("/add/:id",async(req,res)=>{
    const id = req.params.id
    // const questions = req.body
    try {
        var x = await Quizmodel.updateOne({_id:id},{$push:{questions:req.body}})
        console.log(x)
        res.json(req.body)
    } catch (error) {
        
    }
})


quizRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    // const questions = req.body
    try {
        var x = await Quizmodel.deleteOne({_id:id})
        console.log(x)
        res.json("Data deleted")
    } catch (error) {
        
    }
})

quizRouter.get("/",async(req,res)=>{
    try {
        const data = await Quizmodel.find()
        res.json(data)
    } catch (error) {
        console.log(error)
        res.json("something went wrong in get")
    }
})

quizRouter.get("/:id",async (req,res)=>{
    const id = req.params.id;
    try {
        const quiz = await Quizmodel.find({_id:id})
        res.json(quiz)
    } catch (error) {
        console.log(error)
        res.json("something went wrong in take route")
    }
})

// quizRouter.get("/takequiz/:questionid",async(req,res)=>{
//     const {email,ans} = req.body;
//     const {questionid} = req.params
    
//     try {
//         const question = await Quizmodel.findOne({ 'questions._id': questionid }, { 'questions.$': 1 })

//         var arr = question.questions[0].correctOptions;
//         var marks = 0
//         if(arr.includes(ans))
//         {
//             marks=1
//         }else{
//             marks=0
//         }
//         const quiz = await Quizmodel.findOne({_id:question._id})
//         // console.log(quiz)
//         var leaderboard = quiz.leaderBoard
//         if(leaderboard.length==0)
//         {
//             var x = await Quizmodel.updateOne({_id:id},{$push:{questions:req.body}})
//             console.log(x)
//         }else{
//             const result = await Quizmodel.updateOne(
//                 { _id: "64b4ec69d59d8f16c95e4a8e" },
//                 { $push: { leaderBoard: {"email":"ssinghsolanki686@gmail.com","score":} } }
//               );
//             console.log(result)
//         }
//         console.log(arr)
//         res.json(question)
//     } catch (error) {
//         console.log(error)
//         res.json("something went wrong in take quiz")
//     }
// })




quizRouter.post("/takeQuiz/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { questionId, answerIndex, email, score } = req.body;
  
    try {
      const quiz = await Quiz.findOne({ _id: quizId });
  
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found." });
      }
  
      const question = quiz.questions.find(
        (q) => q._id.toString() === questionId
      );
      if (!question) {
        return res.status(404).json({ error: "Question not found." });
      }
  
      const correctAnswer = question.correctOptions[0];
      const isAnswerCorrect = answerIndex === correctAnswer;
      const response = {
        isCorrect: isAnswerCorrect,
        correctAnswer: correctAnswer,
      };
      
      if (isAnswerCorrect) {
        const existingUserIndex = quiz.leaderBoard.findIndex(
          (user) => user.email === email
        );
  
        if (existingUserIndex !== -1) {
          quiz.leaderBoard[existingUserIndex].score += score;
        } else {
          quiz.leaderBoard.push({ email: email, score: score });
        }
  
        await quiz.save();
  
        res.json(response);
      }
    } catch (err) {
      console.error("Error retrieving quiz:", err);
      res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  });
module.exports = {quizRouter}