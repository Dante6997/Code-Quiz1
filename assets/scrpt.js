let secondsRemaining = 50;
const homePage = document.getElementById("home-page")
let timerCount = document.getElementById("timer");
let finalScore = document.getElementById("final-score");
const option1Btn = document.getElementById("option1");
const option2Btn = document.getElementById("option2");
const option3Btn = document.getElementById("option3");
const option4Btn = document.getElementById("option4");
const allQuestions = document.getElementById("all-questions");
let showQuestion = document.getElementById("question");
let questionCount = 0;
const showAnswer = document.getElementById("show-answer");
const finalPage = document.getElementById("final-page");
let userInitials = document.getElementById("initials");
const highScoresPage = document.getElementById("high-scores-page");
let highScoresList = document.getElementById("high-scores-list");
let scoreList = [];
const startBtn = document.getElementById("start");
const optionsBtn = document.querySelectorAll("button.optionBtn")
const submitScoreBtn = document.getElementById("submit-score");
const restartBtn = document.getElementById("restart");
const clearScoresBtn = document.getElementById("clear-scores");
const viewHighScoresBtn = document.getElementById("view-high-scores");


const questions = [
    {
       
        question: "Which company developed JavaScript?",
        options: ["1. Amazon", "2. Mozilla", "3. Windows", "4. Netscape"],
        correctOption: "3"
    },
    {
        
        question: "Who Invented the World Wide Web(WWW)?",
        options: ["1. Jeff Bezos", "2. Sir Tim Berner Lee", "3. Mark Zukerberg", "4. John Cena"],
        correctOption: "1"
    },
    {
       
        question: "All of the following are types of Pop up Boxes in JavaScript except _____. ",
        options: ["1. Console.log()", "2. Prompt", "3. Alert", "4. Confirm"],
        correctOption: "0"
    },
    {
    
        question: "What is the use of the blur function?",
        options: ["1. it is used for debugging", "2. it is used for printing text on screen", "3. it is used to remove the focus from the specified object.", "4. None of the above"],
        correctOption: "2"
    },
    {
      
        question: "What is the meaning of CSS",
        options: ["1. Cocunut Shell Stand", "2. Count Suit Season", "3. Cascade Sounding Stocks", "4. Cascading Style Sheet"],
        correctOption: "3"
    }
];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsRemaining--;
        timerCount.textContent = `Time:${secondsRemaining}s`;

        if (secondsRemaining === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            allQuestions.style.display = "none";
            finalPage.style.display = "block";
            finalScore.textContent = secondsRemaining;
        }
    }, 1000);
}

function startQuiz() {
    homePage.style.display = "none";
    allQuestions.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        showQuestion.textContent = questions[id].question;
        option1Btn.textContent = questions[id].options[0];
        option2Btn.textContent = questions[id].options[1];
        option3Btn.textContent = questions[id].options[2];
        option4Btn.textContent = questions[id].options[3];
    }
}

function checkAnswer(e) {
    e.preventDefault();
   
    showAnswer.style.display = "block";
    let p = document.createElement("p");
    showAnswer.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctOption === e.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctOption !== e.target.value) {
        secondsRemaining = secondsRemaining - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    
    setQuestion(questionCount);
}

function addScore(e) {
    e.preventDefault();

    finalPage.style.display = "none";
    highScoresPage.style.display = "block";

    let init = userInitials.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsRemaining });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    highScoresList.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        highScoresList.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    highScoresList.innerHTML="";
}

startBtn.addEventListener("click", startQuiz);

optionsBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScoreBtn.addEventListener("click", addScore);

restartBtn.addEventListener("click", function () {
    highScoresPage.style.display = "none";
    homePage.style.display = "block";
    secondsRemaining = 50;
    timerCount.textContent = `Time:${secondsRemaining}s`;
});

clearScoresBtn.addEventListener("click", clearScores);

viewHighScoresBtn.addEventListener("click", function () {
    if (highScoresPage.style.display === "none") {
        highScoresPage.style.display = "block";
    } else if (highScoresPage.style.display === "block") {
        highScoresPage.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});