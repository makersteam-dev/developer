//4-11-22

/* 
FORM MEMORY UPDATE
data-memory=true

Gerenal bug fixes

Enabled FormlyQuiz (Quiz Mode)
data-quiz=true

Enables FormlyLogic
*/

let x = 0;
let curStep = 0;
const steps = $('[data-form="step"]');
const progressbarClone = $('[data-form="progress-indicator"]').clone();
let progressbar: any[] | JQuery<HTMLElement>;
let fill = false;
let inputFilled = true;
let radioFilled = true;
let checkboxFilled = true;
let emailFilled = true;
const answer = '';
let selections: any[] = [];
let selection = [];
let empReqInput: any[] = [];
const reinitIX = $('[data-reinit]').data('reinit');
let textareaLength = 0;
let textInputLength = 0;
let emailInputLength = 0;
let checkboxInputLength = 0;
let filledInput: any[] = [];
const savedFilledInput = JSON.parse(localStorage.getItem('filledInput'));
const memory = $('[data-memory]').data('memory');
const quiz = $('[data-quiz]').data('quiz');

$(progressbarClone).removeClass('current');
$('[data-form="progress"]').children().remove();
$('[data-text="total-steps"]').text($('[data-form="step"]:not([data-card="true"])').length);
$('[data-form="submit-btn"]').hide();
$(steps[x]).data('card') ? (curStep = curStep + 0) : (curStep = curStep + 1);
$('[data-text="current-step"]').text(curStep);
steps.hide();

if (savedFilledInput && memory) {
  savedFilledInput.forEach(
    (x: {
      inputName: any;
      value:
        | string
        | number
        | string[]
        | ((this: HTMLElement, index: number, value: string) => string);
    }) => {
      if ($(`input[name="${x.inputName}"][value="${x.value}"]`).attr('type') === 'radio') {
        $(`input[name="${x.inputName}"][value="${x.value}"]`).click();
        $(`input[name="${x.inputName}"][value="${x.value}"]`)
          .siblings('.w-radio-input')
          .addClass('w--redirected-checked');
      } else if (x.value === 'on') {
        $(`input[name="${x.inputName}"]`).click();
        $(`input[name="${x.inputName}"]`)
          .siblings('.w-checkbox-input')
          .addClass('w--redirected-checked');
      } else {
        $(`input[name="${x.inputName}"]`).val(x.value);
      }
    }
  );
}

if (quiz) {
  steps.each(function () {
    $(this).children().attr('data-radio-skip', true);
    $(this).children().attr('data-radio-delay', 250);
  });
}

function disableBtn() {
  fill = false;
  //next button style
  $('[data-form="next-btn"]').css({
    color: '#B8BBC3',
    'border-top-style': 'solid',
    'border-top-width': '1px',
    'border-top-color': '#b8bbc3',
    'border-right-style': 'solid',
    'border-right-width': '1px',
    'border-right-color': '#b8bbc3',
    'border-bottom-style': 'solid',
    'border-bottom-width': '1px',
    'border-bottom-color': '#b8bbc3',
    'border-left-style': 'solid',
    'border-left-width': '1px',
    'border-left-color': '#b8bbc3',
    'background-color': 'hsla(213.30275229357798, 0.00%, 100.00%, 1.00)',
    'pointer-events': 'none',
  });
  //submit btn style
  $('[data-form="submit-btn"]').css({
    color: '#B8BBC3',
    'border-top-style': 'solid',
    'border-top-width': '1px',
    'border-top-color': '#b8bbc3',
    'border-right-style': 'solid',
    'border-right-width': '1px',
    'border-right-color': '#b8bbc3',
    'border-bottom-style': 'solid',
    'border-bottom-width': '1px',
    'border-bottom-color': '#b8bbc3',
    'border-left-style': 'solid',
    'border-left-width': '1px',
    'border-left-color': '#b8bbc3',
    'background-color': 'hsla(213.30275229357798, 0.00%, 100.00%, 1.00)',
    'pointer-events': 'none',
  });
}

function enableBtn() {
  fill = true;
  //next button style
  $('[data-form="next-btn"]').css({
    color: '#FFFFFF',
    'border-top-style': 'solid',
    'border-top-width': '1px',
    'border-top-color': '#1A7BF4',
    'border-right-style': 'solid',
    'border-right-width': '1px',
    'border-right-color': '#1A7BF4',
    'border-bottom-style': 'solid',
    'border-bottom-width': '1px',
    'border-bottom-color': '#1A7BF4',
    'border-left-style': 'solid',
    'border-left-width': '1px',
    'border-left-color': '#1A7BF4',
    'background-color': '#1A7BF4',
    'pointer-events': 'auto',
  });
  //submit btn style
  $('[data-form="submit-btn"]').css({
    color: '#FFFFFF',
    'border-top-style': 'solid',
    'border-top-width': '1px',
    'border-top-color': '#1A7BF4',
    'border-right-style': 'solid',
    'border-right-width': '1px',
    'border-right-color': '#1A7BF4',
    'border-bottom-style': 'solid',
    'border-bottom-width': '1px',
    'border-bottom-color': '#1A7BF4',
    'border-left-style': 'solid',
    'border-left-width': '1px',
    'border-left-color': '#1A7BF4',
    'background-color': '#1A7BF4',
    'pointer-events': 'auto',
  });
}

function saveFilledInput() {
  $('form[data-form="multistep"] :input')
    .not('[type="submit"]')
    .each(function () {
      if ($(this).attr('type') === 'checkbox' || $(this).attr('type') === 'radio') {
        if ($(this).prop('checked')) {
          if (filledInput.some((e) => e.inputName === $(this).attr('name'))) {
            filledInput = filledInput.filter((e) => e.inputName !== $(this).attr('name'));

            filledInput.push({
              inputName: $(this).attr('name'),
              value: $(this).val(),
            });
          } else {
            filledInput.push({
              inputName: $(this).attr('name'),
              value: $(this).val(),
            });
          }
        }
      } else {
        if (filledInput.some((e) => e.inputName === $(this).attr('name'))) {
          filledInput = filledInput.filter((e) => e.inputName !== $(this).attr('name'));

          filledInput.push({
            inputName: $(this).attr('name'),
            value: $(this).val(),
          });
        } else {
          filledInput.push({
            inputName: $(this).attr('name'),
            value: $(this).val(),
          });
        }
      }
    });

  localStorage.removeItem('filledInput');
  localStorage.setItem('filledInput', JSON.stringify(filledInput));
  // console.log(savedFilledInput);
}

function updateStep() {
  empReqInput = [];
  textareaLength = $('textarea:visible').length;
  textInputLength = $(steps[x]).find('input[type="text"]:visible').length;
  emailInputLength = $(steps[x]).find('input[type="email"]:visible').length;
  checkboxInputLength = $(steps[x]).find('input[type="checkbox"]:visible').length;

  $('[data-form="custom-progress-indicator"]').removeClass('current');
  $($('[data-form="custom-progress-indicator"]')[x]).addClass('current');

  //conditional logic
  selection = selections.filter((y) => y.step === x - 1);
  $('[data-answer]').hide();

  //hide unhide steps
  steps.hide();
  if (reinitIX === true) {
    Window.Webflow.destroy();
  }

  $(progressbar[x]).addClass('current');
  if (reinitIX === true) {
    window.Webflow && Window.Webflow.require('ix2').init();
    document.dispatchEvent(new Event('readystatechange'));
    $(steps[x]).show();
  } else {
    $(steps[x]).fadeIn('slow');
  }

  if (selection.length > 0) {
    $(steps[x]).find(`[data-answer="${selection[0].selected}"]`).show();
  } else {
    $(steps[x]).find(`[data-answer="${answer}"]`).show();
    // console.log($(steps[x]).find(`[data-answer="${answer}"]`).find(':input'));
  }

  //hide unhide button
  if (x === 0) {
    $('[data-form="back-btn"]').hide();
  } else if (
    x === steps.length - 1 ||
    $(steps[x]).find('[data-form="submit"]:visible').length > 0
  ) {
    $('[data-form="next-btn"]').hide();
    $('[data-form="submit-btn"]').show();
    $('[data-form="back-btn"]').show();
  } else {
    $('[data-form="next-btn"]').show();
    $('[data-form="back-btn"]').show();
    $('[data-form="submit-btn"]').hide();
  }

  //focus first input in every step
  $($(steps[x]).find('input[autofocus]')[0]).focus();
  $($(steps[x]).find('textarea[autofocus]')[0]).focus();

  //conditional logic
  selections = selections.filter((y) => y.step !== x);
  $(steps[x]).find(':input').trigger('input');
  validation();
}

function validateEmail(email: string | number | string[] | undefined) {
  const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailReg.test(email)) {
    emailFilled = false;
  } else {
    emailFilled = true;
  }
}

function validation(
  _input: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement> | undefined
) {
  inputFilled = true;
  radioFilled = true;
  checkboxFilled = true;

  if ($(steps[x]).data('card')) {
    enableBtn();
  }

  if ($(steps[x]).find('input[required]:visible').length > 0) {
    disableBtn();
  } else {
    enableBtn();
  }

  const checkCount = $(steps[x]).data('checkbox') ? $(steps[x]).data('checkbox') : 0;

  if (!$('[data-logic-extra]').data('logic-extra')) {
    if ($(steps[x]).find(':input').is('[type="checkbox"]')) {
      if (checkCount === '*' || checkCount > $(steps[x]).find(':input[type="checkbox"]').length) {
        $(steps[x])
          .find(':input[type="checkbox"]')
          .each(function () {
            if ($(this).is(':checked')) {
              if ($(steps[x]).find(':input[required]').length < 1) {
                checkboxFilled = true;
              }
            } else {
              checkboxFilled = false;
            }
          });
      } else {
        if ($(steps[x]).find(':input[type="checkbox"]:checked').length >= checkCount) {
          checkboxFilled = true;
        } else {
          checkboxFilled = false;
        }
      }
    }

    if ($(steps[x]).find(':input[required]').is('[type="radio"]')) {
      if ($(steps[x]).find(':input[type="radio"]').is(':checked')) {
        radioFilled = true;
      } else {
        radioFilled = false;
      }
    }

    $(steps[x])
      .find(':input[type="text"][required]')
      .each(function (i) {
        if ($(this).val() !== '') {
          empReqInput = empReqInput.filter((y) => y.input !== i);
        } else {
          if (!empReqInput.find((y) => y.input === i)) {
            empReqInput.push({ input: i });
          }
        }

        if (empReqInput.length === 0) {
          inputFilled = true;
        } else {
          inputFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="email"][required]')
      .each(function () {
        if ($(this).val() !== '') {
          validateEmail($(this).val());
        } else {
          emailFilled = false;
        }
      });
  } else {
    // console.log('logic extra');
    if ($(steps[x]).find('[data-answer]:visible').find(':input').is('[type="checkbox"]')) {
      if (checkCount === '*' || checkCount > $(steps[x]).find(':input[type="checkbox"]').length) {
        $(steps[x])
          .find(':input[type="checkbox"]')
          .each(function () {
            if ($(this).is(':checked')) {
              if ($(steps[x]).find(':input[required]').length < 1) {
                const answer = $(this).parents('[data-go-to]').attr('data-go-to');
                selections = selections.filter((y) => y.step !== x);
                selections.push({ step: x, selected: answer });
                checkboxFilled = true;
              }
            } else {
              checkboxFilled = false;
            }
          });
      } else {
        if (
          $(steps[x]).find('[data-answer]:visible').find(':input[type="checkbox"]:checked')
            .length >= checkCount
        ) {
          if ($(steps[x]).find(':input[required]').length < 1) {
            const answer = $(steps[x])
              .find('[data-answer]:visible')
              .find(':input[type="checkbox"]:checked')
              .parents('[data-go-to]')
              .attr('data-go-to');
            selections = selections.filter((y) => y.step !== x);
            selections.push({ step: x, selected: answer });
            checkboxFilled = true;
          }
        } else {
          checkboxFilled = false;
        }
      }
    }

    if ($(steps[x]).find('[data-answer]:visible').find(':input[required]').is('[type="radio"]')) {
      if ($(steps[x]).find(':input[type="radio"]').is(':checked')) {
        radioFilled = true;
      } else {
        radioFilled = false;
      }
    }

    $(steps[x])
      .find('[data-answer]:visible')
      .find(':input[type="text"][required]')
      .each(function (i) {
        if ($(this).val() !== '') {
          const answer = $(this).attr('data-go-to');
          selections = selections.filter((y) => y.step !== x);
          selections.push({ step: x, selected: answer });
          empReqInput = empReqInput.filter((y) => y.input !== i);
        } else {
          if (!empReqInput.find((y) => y.input === i)) {
            empReqInput.push({ input: i });
          }
        }

        if (empReqInput.length === 0) {
          inputFilled = true;
        } else {
          inputFilled = false;
        }
        // console.log(empReqInput);
      });

    $(steps[x])
      .find('[data-answer]:visible')
      .find(':input[type="email"][required]')
      .each(function (m) {
        if ($(this).val() !== '') {
          const answer = $(this).attr('data-go-to');
          selections = selections.filter((y) => y.step !== x);
          selections.push({ step: x, selected: answer });

          validateEmail($(this).val());
        } else {
          emailFilled = false;
        }
      });
  }
  //console.log('input',inputFilled,'checkbox',checkboxFilled,'radio',radioFilled,'email',emailFilled)
  if (inputFilled && checkboxFilled && radioFilled && emailFilled) {
    enableBtn();
  } else {
    disableBtn();
  }
}

function nextStep() {
  x++;
  if (x <= steps.length - 1) {
    // console.log(x, steps.length - 1);
    updateStep();
    if (memory) {
      saveFilledInput();
    }

    $('[data-text="current-step"]').text(
      $(steps[x]).data('card') ? (curStep = curStep + 0) : (curStep = curStep + 1)
    );
  }
}

function backStep() {
  if (x > 0) {
    $(progressbar[x]).removeClass('current');
    x--;
    updateStep();
  }
  $('[data-text="current-step"]').text((curStep = curStep - 1));
}

$('body').on('keypress', function (e) {
  if (e.keyCode === 13 && fill) {
    if ($('[data-enter]').data('enter')) {
      $('[data-form="next-btn"]')[0].click();
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }
});

$('body').keydown(function (event) {
  if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
    if (x >= steps.length - 1) {
      $('form').submit();
    } else {
      event.preventDefault();
    }
  }
});

$('[data-form="next-btn"]').on('click', function () {
  nextStep();
  $(steps[x]).find(':input').trigger('input');
});
$('[data-form="back-btn"]').on('click', function () {
  backStep();
});

$(steps)
  .find(':input')
  .on('input', function (input) {
    validation(input);
  });

$(steps)
  .find(':radio')
  .on('click', function () {
    if ($(steps[x]).find(':input').is(':checked')) {
      //conditional logic
      const answer = $(steps[x]).find("input[type='radio']:checked").attr('data-go-to');
      selections.push({ step: x, selected: answer });

      if ($(steps[x]).find('[data-radio-skip]').data('radio-skip') === true) {
        // console.log('skip');
        if (
          textareaLength === 0 &&
          textInputLength === 0 &&
          emailInputLength === 0 &&
          checkboxInputLength === 0
        ) {
          setTimeout(function () {
            nextStep();
          }, $(steps[x]).find('[data-radio-delay]').data('radio-delay'));
        }
      }
    }
  });

$('[data-form="submit-btn"]').on('click', function (e) {
  e.preventDefault();

  if ($('[data-logic-extra]').data('logic-extra')) {
    $(this).prop('novalidate', true);
    $(steps).find(':input').prop('required', false);
  }

  localStorage.removeItem('filledInput');
  $(this).parents('form').submit();
});

steps.each(function () {
  $('[data-form="progress"]').append(progressbarClone.clone());
});
progressbar = $('[data-form="progress"]').children();

updateStep();

//if(!$('[data-nav-btn]').data('nav-btn')){$('[data-nav-btn]').remove()}
//if(!$('[data-nav-progress]').data('nav-progress')){$('[data-nav-progress]').remove()}
//if(!$('[data-step-counter]').data('step-counter')){$('[data-step-counter]').remove()}
//if(!$('[data-next-btn]').data('step-counter')){$('[data-next-btn]').remove()}
//if(!$('[data-submit-btn]').data('step-counter')){$('[data-submit-btn]').remove()}
