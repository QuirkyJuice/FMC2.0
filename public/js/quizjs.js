const question = document.querySelector('#question');

let currentQuestion = {}
let answers = true
let questionCounter = 0 

startQuiz = () => {
questionCounter = 0
availableQuestions = {... quizQuestions}
getNewQuestion()
}

getNewQuestion = () => {
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
    currentQuestion = availableQuestions[questionCounter]
    question.innerText = currentQuestion.question
    
    // input.forEach(choice => {
        
    // })
}

input.forEach(input => {
    input.
})

const quizQuestions =[ {
    questionNumber: 1,    
    question: 'What grades are you looking for? Select all that apply.',
    inputType: 'checkbox', 
    input: ['prek', 'k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
},
{
    questionNumber: 2,
    question: 'Do you need an accredited curriculum?', 
    inputType: 'radio',
    input: ['Yes', 'No']
},
 {
    questionNumber: 3,
    question: 'How much are you willing to spend on a curriculum? <br><br> All amounts are in USD. 0-200 $, 201-400 $$, 401-800 $$$, 800+ $$$$)', 
    inputType: 'radio',
    input: ['$', '$$', '$$$', '$$$$']
},
 {
    questionNumber: 4,
    question: 'Which worldview are you looking for?',
    inputType: 'radio',
    input: ['Christian', 'Secular', 'Doesn\t matter']
},
{
    questionNumber: 5,
    question: 'Do you need a curriculum that\'s disability friendly?',
    inputType: 'radio',
    input: ['Yes', 'No']
},
 {
    questionNumber: 6,
    question: 'What kind of time do you want to put in as the teacher?',
    inputType: 'radio',
    input: ['low', 'mid', 'high', 'Doesn\'t matter']
},
{
    questionNumber: 7,
    question: 'Do you need a particular learning style for your child/children? Check all that apply.',
    inputType: 'checkbox',
    input: ['Audio', 'Visual', 'Kinetic', 'All']
},
{
    questionNumber: 8,
    question: 'What type of curriculum are you looking for?',
    inputType: 'radio',
    input: ['All-in-one', 'Unit-based', 'Project-based', 'Just one subject']
},
{
    questionNumber: 9,
    question: 'What subject(s) are you looking for? Check all that apply.',
    inputType: 'checkbox',
    input: ['LanguageArts', 'Math', 'Science', 'History', 'Geography', 'Handwriting', 'Art', 'Bible', 'Spanish', 'French', 'Coding']
}
];



//  const nextButton = document.getElementById('next');
 
//  function addnum() {return qnumber++; }

//  nextButton.addEventListener('click', addnum() ); 
 
//  function lessnum(qnumber){ return qnumber--; }