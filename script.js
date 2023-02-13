const quizForm = document.querySelector('#quiz-form');

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
})

const questionEl = document.querySelector('#question');

const aAnswerEl = document.querySelector('#a_answer');
const bAnswerEl = document.querySelector('#b_answer');
const cAnswerEl = document.querySelector('#c_answer');
const dAnswerEl = document.querySelector('#d_answer');

const optionsElements = document.querySelectorAll('.answer input');

const submitBtn = document.querySelector('#submitBtn');
const nextBtn   = document.querySelector('#nextBtn');

const quizData = [
  {
    question: 'Who is the actual Brazil President ?',
    a: 'Jair Bolsonaro',
    b: 'Michel Temer',
    c: 'Lula',
    d: 'Dilma Rousseff',
    correct: 'c'
  },
  {
    question: 'When was JavaScript created ?',
    a: '1995',
    b: '1967',
    c: '1990',
    d: '2001',
    correct: 'a'
  },
  {
    question: 'When was Minecraft created ?',
    a: '2009',
    b: '2004',
    c: '2011',
    d: '2006',
    correct: 'a'
  },
  {
    question: 'Who is the Creator of this Quizz ?',
    a: 'Lucas Henriques',
    b: 'Gabriel Teles',
    c: 'Matheus Martins',
    d: 'Michael Jackson',
    correct: 'b'
  },
  {
    question: 'Which language has the more native speakers ?',
    a: 'Portuguese',
    b: 'Chinese',
    c: 'English',
    d: 'Spanish',
    correct: 'b'
  },
  {
    question: 'What Is HTML ?',
    a: 'A programming language',
    b: 'How I meet your mother',
    c: 'Hype Torange Milk Limited',
    d: 'Hypertext Markup Language',
    correct: 'd'
  }
]

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
  const { question, a, b, c, d } = quizData[currentQuiz];

  questionEl.textContent = question;

  aAnswerEl.textContent = a;
  bAnswerEl.textContent = b;
  cAnswerEl.textContent = c;
  dAnswerEl.textContent = d;

  submitBtn.classList.add('active-button');
  nextBtn.classList.remove('active-button');
}

const showResult = () => {
  const quizSection = document.querySelector('.quiz-section');

  const resultElement = createResultElement();

  quizSection.innerHTML = '';
  quizSection.appendChild(resultElement);
}

const nextQuiz = () => { 
  currentQuiz++;

  if (currentQuiz === quizData.length) {
    showResult();
    return;
  }

  quizForm.classList.remove('wrong-answer');
  quizForm.classList.remove('correct-answer');

  uncheckOptions();

  loadQuiz();
}

const uncheckOptions = () => {
  optionsElements.forEach((option) => {
    option.checked = false;
  })
}

const checkUserAnswer = (userAnswer) => {
  const { correct } = quizData[currentQuiz];

  if (userAnswer === correct) {
    score++;
    quizForm.classList.add('correct-answer');
    return;
  } else {
    quizForm.classList.add('wrong-answer');
    return;
  }
}

const getSelectedAnswer = () => {
  for (const option of optionsElements) {
    const isChecked = option.checked;

    if (isChecked) {
      return option;
    }
  }
}

const handleSubmit = () => {
  const selectedAnswer = getSelectedAnswer();

  if (!selectedAnswer) {
    return;
  }

  checkUserAnswer(selectedAnswer.value);

  submitBtn.classList.remove('active-button');
  nextBtn.classList.add('active-button');
}

const createResultElement = () => {
  const resultContainer = document.createElement('div');
  const resultText      = document.createElement('h2');

  resultContainer.classList.add('result-container');
  resultText.classList.add('result-text');

  resultText.textContent = `You answered correctly at ${score}/${quizData.length} questions.`

  resultContainer.appendChild(resultText);

  return resultContainer;
}

submitBtn.addEventListener('click', handleSubmit);
nextBtn.addEventListener('click', nextQuiz);

loadQuiz();
