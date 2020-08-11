const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionCont = document.getElementById('question-container');
var scored = document.getElementById('scored');
var shuffleQuestions = '';
var currentQuestion = '';
var score = 0;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestion++
  setNextQuestion()
})

function startGame() {
  scored.innerText = score;

  shuffleQuestions = questions.sort(() => Math.random() - .5);
  currentQuestion = 0;
  startButton.classList.add('hide');
  questionCont.classList.remove('hide');
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestion])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {


  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffleQuestions.length > currentQuestion + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }

}

function setStatusClass(element, correct) {
  clearStatusClass(element)

  if (correct) {
  element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }

}

function clearStatusClass(element) {
  if (element.classList == 'correct') {
  score++
  scored.innerText = score;
  }
  element.classList.remove('correct');
  element.classList.remove('wrong');
  console.log(score)

}


const questions = [{
    question: 'Butter Bean was a?',
    answers: [{
        text: 'Boxer',
        correct: true
      },
      {
        text: 'Belly Dancer',
        correct: false
      },
      {
        text: 'Hot beverage',
        correct: false
      },
      {
        text: 'Band in the 80"s',
        correct: false
      }
    ]
  },
  {
    question: 'You can"t judge a book by its?',
    answers: [{
        text: 'Cover',
        correct: true
      },
      {
        text: 'Words',
        correct: false
      },
      {
        text: 'Print Size',
        correct: false
      },
      {
        text: 'Author',
        correct: false
      }
    ]
  },
  {
    question: 'The Answer My Friend?',
    answers: [{
        text: 'Is Blowing In The Wind',
        correct: true
      },
      {
        text: 'Is On The Back Of Your Hand',
        correct: false
      },
      {
        text: 'Is 2',
        correct: false
      },
      {
        text: 'Will Be Waiting At The End',
        correct: false
      }
    ]
  }
]
