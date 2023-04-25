import '../css/style.css';
import '../index.html';


document.addEventListener("DOMContentLoaded", () => {
  let quiz_form = document.querySelector('.quiz__form');
  if (quiz_form) {
    let PrevBtn = quiz_form.querySelector('.quiz__button--prev');
    let nextBtn = quiz_form.querySelector('.quiz__button--next');
    let quizAll = quiz_form.querySelectorAll('.quiz__block');
    let currentQ = quiz_form.querySelector('.quiz__counter-current');
    let progressQ = quiz_form.querySelector('.quiz__progress');
    let progress = 0;
    let count = 0;
    let progressPercent = 100 / (quizAll.length - 1);


    const initProgress = () => progressQ.style.width = `${progress}%`;

    const removeBtn = () => {
      if (count === 0) {
        PrevBtn.style.display = 'none'
      } else if (count !== 0) {
        PrevBtn.style.display = 'flex'
      }
      if (count === quizAll.length - 1) {
        nextBtn.style.display = 'none';
        PrevBtn.style.display = 'none'
      } else if (count !== quizAll.length) {
        nextBtn.style.display = 'flex';
        let quizActive = quiz_form.querySelector('.quiz__block.active');
        let labelsActive = quizActive.querySelectorAll('.quiz__answer--checked');
        if (labelsActive.length > 0) {
          nextBtn.removeAttribute('disabled');
        } else {
          nextBtn.setAttribute('disabled', true)
        }
        let select = quizActive.querySelector('.quiz__item--select');
        if (select && select.value !== '') {
          nextBtn.removeAttribute('disabled');
        }
      }
    }

    initProgress();
    removeBtn();

    quiz_form.querySelector('.quiz__counter-all').textContent = `${quizAll.length}`;

    nextBtn.addEventListener('click', () => {
      currentQ.textContent++;
      count++
      progress += Number(progressPercent.toFixed(3));
      initQuiz();
      initProgress();
      removeBtn();
    })

    PrevBtn.addEventListener('click', () => {
      count--
      currentQ.textContent--;
      progress -= Number(progressPercent.toFixed(3));
      initQuiz();
      initProgress();
      removeBtn();
      nextBtn.removeAttribute('disabled');
    })

    const initQuiz = () => {
      quizAll.forEach((element, i) => {
        element.classList.remove('active');
        if (i === count) {
          element.classList.add('active');
        };
      })
    }
  }

  const inputs = document.querySelectorAll('.quiz__item');
  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      let nextBtn = document.querySelector('.quiz__button--next');
      const labelsRadio = document.querySelectorAll('.quiz__answer');
      labelsRadio.forEach((label) => {
        const input = label.querySelector('.quiz__item');
        if(input.checked) {
          label.classList.add('quiz__answer--checked');
          nextBtn.removeAttribute('disabled');
        } else {
          label.classList.remove('quiz__answer--checked');
        }
      });
    });
  })

  quiz_form.addEventListener("submit", (event) => {
    event.preventDefault(); // Отменяем стандартное поведение браузера
  
    const formData = new FormData(quiz_form); // Получаем данные формы
  
    const xhr = new XMLHttpRequest(); // Создаем объект XMLHttpRequest
    xhr.open("GET", "https://echo.htmlacademy.ru", true); // Конфигурируем его
  
    xhr.onload = function() { // По завершению запроса
      if (this.status === 200) { // Если все ок
        let quiz_form = document.querySelector('.quiz__form');
        quiz_form.style.display = 'none';
        const message = document.querySelector('.quiz__message');
        message.classList.remove('quiz__message-none') // Выводим ответ сервера
      }
    };
  
    xhr.send(formData); // Отправляем данные формы на сервер
  });
});