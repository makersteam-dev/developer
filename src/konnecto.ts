
let firstButton = document.querySelector('mt-e=firsButton');
firstButton.onclick = function() {
  $(':radio[value=cryptocurrency]').trigger('click');
}​;
/*Company name on lottie on everywhere else */
$('[name=company-name]').on('input', function () {
  let company_name = $('[name=company-name]').val();
  $('.company-lottie-name > text > tspan').text(company_name);
  $('.competitorName > text > tspan').text(company_name);
  sessionStorage.setItem('companyName', company_name);

  $('[mt-element=company-name]').text(company_name);
});

/*Industry click fiter the product step items */
$('input[type=radio][name=industry]').on('click', function () {
  let industryVal = $(this).val();
  let industryValFull = $(this).siblings().text();
  sessionStorage.setItem('industryName', industryVal);
  $('[mt-element=dynamic_label]').text(industryValFull);
  $('.industrie-col-item').hide();
  $(this)
    .closest('.form-step-item')
    .siblings('.form-step-item')
    .find('#' + industryVal)
    .closest('.industrie-col-item')
    .show();
  $(this)
    .closest('.form-step-item')
    .siblings('.form-step-item')
    .find('#' + industryVal)
    .closest('.industrie-col-item')
    .find('input[type=radio][name=product]')
    .first()
    .click();
});

// give specific id and value for each dynamic radio
$('input[type=radio][name=product]').each(function () {
  // get label name
  let radioName = $(this).next('.w-form-label').text().trim();
  $(this).val(radioName);
  // format name to a valid id
  // replace all spaces & non-alphanumeric characters with dashes
  // make it lowercase
  let id = radioName.replace(/\W+/g, '-').toLowerCase();
  // change the id attribute of the radio
  $(this).attr('id', id);
});

/*obserber to change lottie images and all the functions */
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    let intersecting = entry.isIntersecting;
    if (intersecting) {
      $('[data-form=back-btn]').hide();
      /*Open opertunities modal*/
      $('[mt-element=open-modal]').on('click', function () {
        $('[mt-element=unlock-form]').css('display', 'flex');
      });
      let segment1 = $('[mt-element=last-step-images]').find('[mt-element=segment_1]').text();
      let segment2 = $('[mt-element=last-step-images]').find('[mt-element=segment_2]').text();
      let segment3 = $('[mt-element=last-step-images]').find('[mt-element=segment_3]').text();

      $('.segment2 > text > tspan').text(segment1);
      $('.segment1 > text > tspan').text(segment2);
      $('.segment3 > text > tspan').text(segment3);

      setTimeout(function () {
        let imageTarget_1 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-2-image]')
          .attr('src');
        $('.segment1-img > image').attr('href', imageTarget_1);

        let imageTarget_2 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-1-image]')
          .attr('src');
        $('.segment2-img > image').attr('href', imageTarget_2);

        let imageTarget_3 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-3-image]')
          .attr('src');
        $('.segment3-img > image').attr('href', imageTarget_3);
        console.log('yesh');
      }, 2000);

      setTimeout(function () {
        $('[mt-element=hidden-next]').trigger('click');
        console.log('clicked');
      }, 12000);
    }
  });
});
observer.observe(document.querySelector('.last-lottie'));

/*audience next step closes opens*/
$('[mt-element=audience-item]').on('click', function () {
  $(this).closest('[mt-element=see-segments]').addClass('hide');
});
$('[mt-element=audience-item]').on('click', function () {
  $(this)
    .closest('[mt-element=see-segments]')
    .siblings('[mt-element=deepdive-item]')
    .addClass('show');
});

$('[mt-element=deep-dive-back]').on('click', function () {
  $(this).closest('[mt-element=deepdive-item]').removeClass('show');
});
$('[mt-element=deep-dive-back]').on('click', function () {
  $(this)
    .closest('[mt-element=deepdive-item]')
    .siblings('[mt-element=see-segments]')
    .removeClass('hide');
});

$('[mt-element=all-opertuinties]').on('click', function (evt) {
  $('[mt-element=opertunities-tab]').triggerHandler('click');
  evt.preventDefault();
});

$('[mt-e=closeSidebar]').on('click', function () {
  $('[mt-e=segmentSidebar]').removeClass('is--open');
});

$('[mt-e=sidebarTrigger]').on('click', function () {
  $('[mt-e=segmentSidebar]').addClass('is--open');
});
