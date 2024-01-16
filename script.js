const questions = [
    {
        question: "What does 'JS' stand for in JavaScript?",
        answers: [
            {text: "Java Source", correct: false},
            {text: "JavaScript", correct: true},
            {text: "Java Scripting", correct: false},
            {text: "Java Syntax", correct: false},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            {text: "var", correct: true},
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: "variable", correct: false},
        ]
    },
    {
        question: "What is the purpose of 'console.log()' in JavaScript?",
        answers: [
            {text: "To display a message in the console", correct: true},
            {text: "To create a log file", correct: false},
            {text: "To log user actions", correct: false},
            {text: "To print messages on the webpage", correct: false},
        ]
    },
    {
        question: "What is the result of the expression: 10 % 3 in JavaScript?",
        answers: [
            {text: "3", correct: false},
            {text: "1", correct: true},
            {text: "0.1", correct: false},
            {text: "10", correct: false},
        ]
    },
    {
        question: "What is an example of a falsy value in JavaScript?",
        answers: [
            {text: "0", correct: false},
            {text: "'' (empty string)", correct: false},
            {text: "null", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element in JavaScript?",
        answers: [
            {text: "onMouseOver", correct: false},
            {text: "onClick", correct: true},
            {text: "onChange", correct: false},
            {text: "onSubmit", correct: false},
        ]
    },
    {
        question: "What is the purpose of the 'let' keyword in JavaScript?",
        answers: [
            {text: "To declare a constant variable", correct: false},
            {text: "To declare a block-scoped variable", correct: true},
            {text: "To declare a global variable", correct: false},
            {text: "To declare a function", correct: false},
        ]
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        answers: [
            {text: "pop()", correct: true},
            {text: "shift()", correct: false},
            {text: "splice()", correct: false},
            {text: "remove()", correct: false},
        ]
    },
    {
        question: "What is the purpose of the 'JSON.parse()' method in JavaScript?",
        answers: [
            {text: "To stringify a JSON object", correct: false},
            {text: "To convert a JSON string into a JavaScript object", correct: true},
            {text: "To parse HTML", correct: false},
            {text: "To create a JSON object", correct: false},
        ]
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [
            {text: "==", correct: false},
            {text: "===", correct: true},
            {text: "!=", correct: false},
            {text: "!==", correct: false},
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const startPage = document.querySelector(".start-page");
const startButton = document.querySelector(".start-btn");
const quizApp = document.querySelector(".quiz-app");
const timer = document.getElementById("timer");
const timerElement = document.getElementById("timer-value");


let currentQuestionIndex = 0;
let score = 0;
let timerValue = 150;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(function () {
      document.getElementById("timer-value").innerText = `${timerValue}s`;
      if (timerValue === 0) {
        clearInterval(timerInterval);
        showScore();
      } else {
        timerValue--;
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    timerValue = 200;
    startTimer(); // Set the initial timer value in seconds
  }


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    timerValue = 200; // Set the initial timer value to 150 seconds
    startTimer(); // Start the timer when playing again 
}

function start() {
    startPage.style.display = "none";
    quizApp.style.display = "block";
    showQuestion();
    timerValue = 200; // Set the initial timer value to 150 seconds
    startTimer(); // Start the timer when playing again
}

startButton.addEventListener("click", start);

function playAgain() {
    startPage.style.display = "block";
    quizApp.style.display = "none";
    start();
    showQuestion();
}

// Display Questions
function showQuestion(){
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    // Displaying answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        // Adding click functionality to answer buttons
        button.addEventListener("click", selectAnswer);
    });
}

function resetQuestion(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if(isCorrect){
        selectedButton.classList.add("correct-answer");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect-answer");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct-answer");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showSubmitButton(){
    if (currentQuestionIndex === questions.length){
        nextButton.innerHTML = "Submit";
        nextButton.style.display = "block";
    }
    
}

function showScore(){
    resetQuestion();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
}


// Adding functionalty to the next button
function moveToNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
        clearInterval(timerInterval);
    }
    
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        moveToNextQuestion();
    }
    else{
        startQuiz();
    }
});

startQuiz();
