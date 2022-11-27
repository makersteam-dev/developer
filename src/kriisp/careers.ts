window.Webflow ||= [];

window.Webflow.push(() => {
  const applyButton = document.querySelectorAll('[mt-el=apply-button]');
  const backToButton = document.querySelectorAll('[mt-el=back-to-job-info]');
  const jobInfoDiv = document.querySelectorAll('[mt-el=job-info-wrap]');
  const multiStepDiv = document.querySelectorAll('[mt-el=multi-step-wrap]');

  $(applyButton).on('click', function () {
    $(jobInfoDiv).css('display', 'none');
    $(multiStepDiv).css('display', 'block');
  });
  $(backToButton).on('click', function () {
    $(jobInfoDiv).css('display', 'block');
    $(multiStepDiv).css('display', 'none');
  });
});
