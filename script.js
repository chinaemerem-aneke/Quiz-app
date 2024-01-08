const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ]
    }, 

    {
        question: "In which year did Christopher Columbus first reach the Americas?",
        answers: [
            {text: "1492", correct: true},
            {text: "1500", correct: false},
            {text: "1607", correct: false},
            {text: "1778", correct: false},
        ]
    }, 

    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
        ]
    }, 
    
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text: "Charles Dickens", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Jane Austen", correct: false},
            {text: "Mark Twain", correct: false},
        ]
    }, 
    
    {
        question: "What is the largest mammal in the world?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Hippopotamus", correct: false},
        ]
    },
    
    {
        question: "What is the capital of Japan?",
        answers: [
            {text: "Bangtok", correct: false},
            {text: "Seoul", correct: false},
            {text: "Tokyo", correct: true},
            {text: "Beijing", correct: false},
        ]
    },
        
    
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            {text: "Ag", correct: false},
            {text: "Fe", correct: false},
            {text: "Cu", correct: false},
            {text: "Au", correct: true},
        ]
    },  
    
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Pablo Picasso", correct: false},
            {text: "Vincent van Gogh", correct: false},
            {text: "Leonardo da Vinci", correct: true},
            {text: "Michelangelo", correct: false},
        ]
    }, 
    
    {
        question: " Which element is essential for human bones and teeth?",
        answers: [
            {text: "Iron", correct: false},
            {text: "Calcium", correct: true},
            {text: "Sodium", correct: false},
            {text: "Potassium", correct: false},
        ]
    }, 

    {
     question: "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: " Southern Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
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

