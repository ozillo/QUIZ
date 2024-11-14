

document.querySelector('#app').innerHTML =` <div class="container">

<!-- each question in this "faq"  comprises a details element
  in said details element:
    a summary element provides the actual question
    a div contains then four possible answers

  in the JS script, upon choosing an answer, the correct answer is applied a class which visually remarks its rightful nature
-->

<div class="question">
  <details>
    <summary>
      <h2>Que Pais adoran la pasta?</h2>
    </summary>
    <div class="answers">
      <div class="answer">
        Francia
      </div>
      <div class="answer">
        Alemania
      </div>
      <div class="answer">
        España
      </div>
      <div class="answer correct-answer">
        Italia
      </div>
    </div>
  </details>
</div><!-- close question div -->

<div class="question">
  <details>
    <summary>
      <h2>Which CSS property creates this background?</h2>
    </summary>
    <div class="answers">
      <div class="answer">
        mask
      </div>
      <div class="answer correct-answer">
        clip-path
      </div>
      <div class="answer">
        border
      </div>
      <div class="answer">
        background
      </div>
    </div>
  </details>
</div><!-- close question div -->

<div class="question">
  <details>
    <summary>
      <h2>Which color is <span class="highlight">not</span> used in this page?</h2>
    </summary>
    <div class="answers">
      <div class="answer">
        #422980
      </div>
      <div class="answer">
        #EB761F
      </div>
      <div class="answer correct-answer">
        #252525
      </div>
      <div class="answer">
        #00D539
      </div>
    </div>
  </details>
</div><!-- close question div -->

<div class="question">
  <details>
    <summary>
      <h2>Which font is used in this page?</h2>
    </summary>
    <div class="answers">
      <div class="answer correct-answer">
        Source Sans Pro
      </div>
      <div class="answer">
        Open Sans
      </div>
      <div class="answer">
        Lato
      </div>
      <div class="answer">
        Montserrat
      </div>
    </div>
  </details>
</div><!-- close question div -->

<div class="question">
  <details>
    <summary>
      <h2>Which layout system arranges the elements of this page?</h2>
    </summary>
    <div class="answers">
      <div class="answer">
        Grid
      </div>
      <div class="answer">
        Flexbox
      </div>
      <div class="answer">
        Neither
      </div>
      <div class="answer correct-answer">
        Both
      </div>
    </div>
  </details>
</div><!-- close question div -->

<h1 class="result"></h1>

</div><!-- close the wrapping .container div --> `


// target all answers in the HTML document
const answers = document.querySelectorAll(".container .question .answers .answer");

// target the h1 header in which to include the results of the quiz
const headerResult = document.querySelector(".result");

// listen for a click event on each answer, at which point reveal the correct answer for the connected question
answers.forEach(answer => answer.addEventListener("click", revealAnswer));

// initialize two variables to keep track of 1) the number of answers given and 1) the number of correct answers
let counterAnswers = 0;
let counterCorrectAnswers = 0;

// declare a function to reveal the correct answer, count the number of correct answers and show a result once all questions are answered
function revealAnswer(e) {
    // consider the parent element of the clicked answer
    let parentElement = e.target.parentElement;
    // target, inside of the parent element, the correct answer
    let correctAnswer = parentElement.querySelector(".correct-answer");

    // if the correct element is not already revealed
    if(!correctAnswer.classList.contains("reveal-correct-answer")) {
        // add a class to the correct answer, visually informing the user of the right choice
        correctAnswer.classList.add("reveal-correct-answer");
        // if the chosen answer was the correct one, increment the correct answer's counter
        if(e.target == correctAnswer) {
            counterCorrectAnswers++;
        } 
        // else change the background color of the chosen answer
        else {
            e.target.classList.add("reveal-chosen-answer");
        }
    }

    // consider all answers of the chosen question and remove the event listener from all them, to avoid firing the function twice on the same question
    let answers = parentElement.querySelectorAll(".answer");
    answers.forEach(answer => {
        answer.removeEventListener("click", revealAnswer);
        answer.style.cursor = "default";
    });

    // increment the counter keeping track of the number of questions answered
    counterAnswers++;

    // once all questions are answered, call a function to display the result
    if(counterAnswers == 5) {
        displayResult(counterCorrectAnswers);
    }

}

// declare a function which takes as argument the number of correct answers and displays a message tailored to said number
function displayResult(number) {
    // initialize a string which includes a comment, tailored to how many correct answers were given
    let comment = '';
        switch(number) {
            case 5:
                comment = "Venecia 😎";
                break;
            case 4:
            case 3:
                comment = "Venecia 😉";
                break;
            case 2:
            case 1:
                comment = "Venecia 😏";
                break;
                break;
            case 0:
                comment = "Venecia 😶";
                break;
        }
        // include in the main header the result and the comment
        headerResult.textContent = `${number} Correct Answers ${comment}`;
}