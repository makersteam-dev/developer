document.addEventListener('DOMContentLoaded', () => {
  $('form#wf-form-plg-multi-step input[name=industry]').first().trigger('click');
});

const companyInput = document.querySelector<HTMLInputElement>('[name=company-name]') as HTMLElement;
const companyTextsSelector = document.querySelectorAll('[mt-element=company-name]');

// on change of company input function
companyInput.addEventListener('input', function () {
  const company_name = $('[name=company-name]').val() as string;
  if (company_name.length < 1) {
    $('.company-lottie-name > text > tspan').text('Your Company');
    $('.company-lottie-name').css('font-weight', '400').css('fill', 'rgb(227,233,238)');
  } else {
    $('.company-lottie-name > text > tspan').text(company_name);
    $('.company-lottie-name').css('font-weight', '600').css('fill', 'black');

    $('.competitorName > text > tspan').text(company_name);
    sessionStorage.setItem('companyName', company_name);

    for (let i = 0; i < companyTextsSelector.length; i++) {
      companyTextsSelector[i].textContent = company_name;
    }
  }
});

// Industry click fiter the product step items
$('input[type=radio][name=industry]').on('click', function () {
  const industryVal = $(this).val();
  const industryValFull = $(this).siblings().text();
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
  const radioName = $(this).next('.w-form-label').text().trim();
  $(this).val(radioName);
  // format name to a valid id
  // replace all spaces & non-alphanumeric characters with dashes
  // make it lowercase
  const id = radioName.replace(/\W+/g, '-').toLowerCase();
  // change the id attribute of the radio
  $(this).attr('id', id);
});

// obserber to change lottie images and all the functions
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    if (intersecting) {
      $('[data-form=back-btn]').hide();
      // Open opertunities modal
      $('[mt-element=open-modal]').on('click', function () {
        $('[mt-element=unlock-form]').css('display', 'flex');
      });

      // opertuinites product dynamic name depends on choosen product
      const opertuinitesProduct = $('form#wf-form-plg-multi-step input[name=product]:checked')
        .next('.w-form-label')
        .text();
      $('[mt-el=productName]').text(opertuinitesProduct);
      // console.log(opertuinitesProduct);

      setTimeout(function () {
        const imageTarget_1 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-1-image]')
          .attr('src') as string;
        $('.segment1-img > image').attr('href', imageTarget_1);

        const imageTarget_2 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-2-image]')
          .attr('src') as string;
        $('.segment2-img > image').attr('href', imageTarget_2);

        const imageTarget_3 = $('[mt-element=last-step-images]')
          .find('[mt-element=segment-3-image]')
          .attr('src') as string;
        $('.segment3-img > image').attr('href', imageTarget_3);

        const segment1 = $('[mt-element=segment_1]').text();
        const segment2 = $('[mt-element=segment_2]').text();
        const segment3 = $('[mt-element=segment_3]').text();

        $('.segment1 > text > tspan').text(segment1);
        $('.segment2 > text > tspan').text(segment2);
        $('.segment3 > text > tspan').text(segment3);

        $('.segment1_2 > text > tspan').text(segment1);
        $('.segment2_2 > text > tspan').text(segment2);
        $('.segment3_2 > text > tspan').text(segment3);

        const competitor1 = $('[mt-el="competitor1"]').text();
        const competitor2 = $('[mt-el="competitor2"]').text();
        const competitor3 = $('[mt-el="competitor3"]').text();

        $('#competitor1 > text > tspan').text(competitor1);
        $('#competitor2> text > tspan').text(competitor2);
        $('#competitor3 > text > tspan').text(competitor3);
        // console.log('yesh');
      }, 2000);

      setTimeout(function () {
        $('[mt-element=hidden-next]').trigger('click');
        // console.log('clicked');
      }, 12000);
    }
  });
});
observer.observe(document.querySelector('.last-lottie') as HTMLElement);

// audience next step closes opens
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

$('[mt-el=topAudinces]').on('click', function () {
  $('[mt-element=deep-dive-back]').click();
  $('[mt-e=closeSidebar]').click();
});
