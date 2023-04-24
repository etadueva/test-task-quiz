import '../css/style.css';
import '../index.html';


document.addEventListener("DOMContentLoaded", function () {

  // RESET PLACEHOLDER INPUT ON CLICK START
  let form_input = document.querySelectorAll('.input_frm');
  if (form_input) {
      for (let i = 0; i < form_input.length; i++) {
          form_input[i].addEventListener('click', function () {
              let thisElement = this;

              let savePlaceholder = this.getAttribute('placeholder');

              this.setAttribute('placeholder', ' ');
              document.addEventListener('mouseup', function () {
                  thisElement.setAttribute('placeholder', savePlaceholder);
              });
          });
      }
  }
  // REST PLACEHOLDER INPUT ON CLICK THE END


  //QUIZ START
  let quiz_form = document.querySelector('.quiz__form');
  if (quiz_form) {
      let PrevBtn = quiz_form.querySelector('.quiz__button--prev');
      let nextBtn = quiz_form.querySelector('.quiz__button--next');
      let quizAll = quiz_form.querySelectorAll('.quiz__block');
      let currentQ = quiz_form.querySelector('.quiz__counter-current');
      let progressQ = quiz_form.querySelector('.progress');
      let progress = 0;
      let count = 0;
      let progressPercent = 100 / (quizAll.length - 1);

      initProgress();
      removeBtn();

      quiz_form.querySelector('.quiz__counter-all').textContent = `${quizAll.length}`;

      nextBtn.addEventListener('click', function () {
          currentQ.textContent++;
          count++
          progress += Number(progressPercent.toFixed(3));
          initQuiz();
          initProgress();
          removeBtn();
      })


      PrevBtn.addEventListener('click', function () {
          count--
          currentQ.textContent--;
          progress -= Number(progressPercent.toFixed(3));
          initQuiz();
          initProgress();
          removeBtn();
          nextBtn.removeAttribute('disabled');
      })

      function initQuiz() {
          quizAll.forEach((element, i) => {
              element.classList.remove('active');
              if (i === count) {
                  element.classList.add('active');
              };
          })
      }

      function initProgress() {
          progressQ.style.width = `${progress}%`;
      }

      function removeBtn() {
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
          }
      }
  }
  // QUIZ THE END

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
});