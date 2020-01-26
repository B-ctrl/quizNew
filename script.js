const startButton = document.getElementById('startButton')
const nextButton = document.getElementById('nextButton')
const resultsButton = document.getElementById('resultsButton')
const submitNameEL = document.getElementById('submitName')
const viewLeaderboardButtonEL = document.getElementById('viewLeaderboard')
const resetLeaderboardButtonEL = document.getElementById('resetLeaderboard')
const viewLeaderboardEL = document.getElementById('leaderboard')
const NameEL = document.getElementById('Name')
const mainbodyEL = document.getElementById('mainbody')
const rulesContainerElement = document.getElementById ('rules')
const quizTimeLeftEl = document.getElementById ('quizTimeLeft')
const timeoutEl = document.getElementById ('timeout')
const questionContainerElement = document.getElementById ('questionContainer')
const scoreEL = document.getElementById ('score')
const scoreResultEL = document.getElementById ('scoreResult')
const bottomEL = document.getElementById ('bottom')
let currentQuestionIndex, shuffledQuestions
const questionEl = document.getElementById('question')
const answerButtonsEL = document.getElementById('answerButtons')
const Score1EL = document.getElementById('Score1')
const Name1EL = document.getElementById('Name1')

let timer=500
var totalSeconds = timer
var finalScore = 0
var currentName = "Bob"
var highScores = []
var sortedHighScoreList = [
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
]
const maxHighScores = 5



viewLeaderboardButtonEL.addEventListener('click', viewLeaderboard)

function viewLeaderboard(){
  scoreEL.classList.add('hide')
  viewLeaderboardEL.classList.remove('hide')
  
  sortedHighScoreList.map(Score =>{
    console.log("${score.name}-${score.Score}");
  });
}






startButton.addEventListener('click', startGame)



submitNameEL.addEventListener('click', recordScore)

function recordScore(){
 
  currentName = document.getElementById("Name").value
  //console.log(currentName)
  //console.log(totalSeconds)

  highScores.push({"Score": totalSeconds, "Name": currentName}) 
  sortedHighScoreList = highScores.sort ( (a,b) => b.Score - a.Score)  
  sortedHighScoreList.splice(maxHighScores)

  console.log(sortedHighScoreList)

  submitNameEL.classList.add('hide')
 // document.getElementById("Score1").innerHTML = sortedHighScoreList.
  resetLeaderboardButtonEL.classList.remove('hide')
  viewLeaderboardButtonEL.classList.remove('hide')

}


function startGame(){
  
  // console.log('started');
  resetLeaderboardButtonEL.classList.add('hide')
  viewLeaderboardButtonEL.classList.add('hide')
  viewLeaderboardEL.classList.add('hide')
  mainbodyEL.classList.remove('bodyright')
  mainbodyEL.classList.remove('bodywrong')
  startButton.classList.add('hide')
  timeoutEl.classList.add('hide')
  scoreEL.classList.add('hide')
  totalSeconds = 75  
  console.log(timer)
  rulesContainerElement.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  quizTimeLeftEl.classList.remove('hide')
  currentQuestionIndex = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  update = setInterval("checkTime()", 1000)
  checkTime()
 // console.log(shuffledQuestions)
  setNextQuestion()
}

/*
totalSeconds = setInterval(myTimer ,1000);
function myTimer() {
  document.getElementById("quizTimeLeft").innerHTML = 'Time remaining: ' + totalSeconds;
  totalSeconds--;
}
*/


function checkTime(){  
  document.getElementById("quizTimeLeft").innerHTML = 'Time remaining: ' + totalSeconds;
  if (totalSeconds <=0){
    myStopFunction()
    //alert("time's up")
  }
  else{
    totalSeconds-- 
  }
}

function myStopFunction(){
  clearInterval(update)
}


function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
      if (answer.correct){
        button.dataset.correct = answer.correct;
      }
    button.addEventListener('click', selectAnswer)
    answerButtonsEL.appendChild(button)
  })
}

function resetState(){
  nextButton.classList.add('hide')
  while(answerButtonsEL.firstChild){
    answerButtonsEL.removeChild(answerButtonsEL.firstChild)
  }
}

function selectAnswer(e){
  const selectedButton = e.target
  console.log(selectedButton)
  const correct = selectedButton.dataset.correct
  console.log(correct)
  if (correct !== 'true'){
    totalSeconds = totalSeconds - 20
    mainbodyEL.classList.remove('bodyright')
    mainbodyEL.classList.add('bodywrong')
  }
  if (correct == 'true'){
    mainbodyEL.classList.remove('bodywrong')
    mainbodyEL.classList.add('bodyright')
  }

  console.log("timer: " + totalSeconds)

  if(totalSeconds <= 0){
    mainbodyEL.classList.remove('bodyright')
    mainbodyEL.classList.add('bodywrong')
    quizTimeLeftEl.classList.add('hide')
    timeoutEl.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    scoreEL.classList.add('hide')
    finalScore = totalSeconds
    myStopFunction()
    console.log('they ran out of time')
    startButton.innerText = 'Restart Quiz!'
    startButton.classList.remove('hide')
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1){
    currentQuestionIndex++
    setNextQuestion()
    console.log(shuffledQuestions.length)
    console.log(currentQuestionIndex)
    console.log(' total seconds in set question function: ' + totalSeconds)
  }

  else {
    if(totalSeconds > 0){
      document.getElementById("scoreResult").innerHTML = ('Your Score: ' + totalSeconds);
      quizTimeLeftEl.classList.add('hide')
      questionContainerElement.classList.add('hide')
      scoreEL.classList.remove('hide')
      submitNameEL.classList.remove('hide')
      finalScore = totalSeconds
      myStopFunction()
      console.log('Final score: ' + finalScore)
      startButton.innerText = 'Restart Quiz!'
      startButton.classList.remove('hide')
    }
    else{
      quizTimeLeftEl.classList.add('hide')
      mainbodyEL.classList.remove('bodyright')
      mainbodyEL.classList.add('bodywrong')
      timeoutEl.classList.remove('hide')
      questionContainerElement.classList.add('hide')
      scoreEL.classList.add('hide')
      finalScore = totalSeconds
      myStopFunction()
      console.log('they ran out of time')
      startButton.innerText = 'Restart Quiz!'
      startButton.classList.remove('hide')
    }
  }
  
}


const questions = [
  {
    question: 'what is 2 + 2?',
    answers: [
      {text: '4', correct: true},
      {text: '14', correct: false},
      {text: '24', correct: false},
      {text: '34', correct: false},     
    ]
  },
  {
    question: 'what is 3 + 3?',
    answers: [
      {text: '4', correct: false},
      {text: '6', correct: true},
      {text: '24', correct: false},
      {text: '34', correct: false},     
    ]
  },
  {
    question: 'what is 4 + 4?',
    answers: [
      {text: '4', correct: false},
      {text: '14', correct: false},
      {text: '8', correct: true},
      {text: '34', correct: false},     
    ]
  },
  {
    question: 'what is 5 + 5?',
    answers: [
      {text: '4', correct: false},
      {text: '14', correct: false},
      {text: '24', correct: false},
      {text: '10', correct: true},     
    ]
  },
  {
    question: 'what is 6 + 1?',
    answers: [
      {text: '4', correct: false},
      {text: '7', correct: true},
      {text: '24', correct: false},
      {text: '34', correct: false},     
    ]
  },
]