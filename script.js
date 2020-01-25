const startButton = document.getElementById('startButton')
const nextButton = document.getElementById('nextButton')
const rulesContainerElement = document.getElementById ('rules')
const timerContainerElement = document.getElementById ('timer')
const questionContainerElement = document.getElementById ('questionContainer')
const scoreEL = document.getElementById ('score')
const bottomEL = document.getElementById ('bottom')
let currentQuestionIndex, shuffledQuestions
const questionEl = document.getElementById('question')
const answerButtonsEL = document.getElementById('answerButtons')
let timer=75
let right=0
let score=0


startButton.addEventListener('click', startGame)


function startGame(){
  // console.log('started');
  startButton.classList.add('hide')
  
  rulesContainerElement.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  timerContainerElement.classList.remove('hide')
  currentQuestionIndex = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
 // console.log(shuffledQuestions)
  setNextQuestion()
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
    timer = timer - 20
  }
  console.log("timer: " + timer)
  // scoreEl.innerText = ("score: " + score)
  // scoreEl.innerText = timer

  

  if (shuffledQuestions.length > currentQuestionIndex + 1){
    currentQuestionIndex++
    setNextQuestion()
  }
  else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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