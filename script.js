
/**
 * PWL Guest Wi-Fi Landing Page
 *
 * GitHub Pages -> Google Apps Script -> Google Sheets
 *
 * Google Sheets: PWL | Lead Database
 * Worksheet: Leads
 */

// ==========================================
// 1. GOOGLE APPS SCRIPT CONNECTION
// ==========================================

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzx7snwRREKeiUz7XNbRPHZaZmTWx8y6-ryvRk47UbBUmiaM7Jjs79fjJ154_qhwe1f3g/exec';


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const toggle = document.querySelector('.mobile-menu-toggle');
const menu = document.querySelector('#mobile-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen =
      toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute(
      'aria-expanded',
      String(!isOpen)
    );

    menu.hidden = isOpen;
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;

      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// ==========================================
// 3. FORM ELEMENTS
// ==========================================

const leadForm = document.querySelector('#pwl-lead-form');
const leadSubmit = document.querySelector('#lead-submit');
const formStatus = document.querySelector('#form-status');


// ==========================================
// 4. FORM CONNECTION AND VALIDATION
// ==========================================

if (leadForm && leadSubmit && formStatus) {

  // Validate Apps Script URL
  const validEndpoint =
    /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/
      .test(GOOGLE_APPS_SCRIPT_URL);

  if (validEndpoint) {

    // Connect HTML form to Google Apps Script
    leadForm.action = GOOGLE_APPS_SCRIPT_URL;
    leadForm.method = 'POST';
    leadForm.target = '_blank';

    // Enable submit button
    leadSubmit.disabled = false;

    // Initial message
    formStatus.textContent =
      'Complete the form to submit your request.';

    // Validate before sending
    leadForm.addEventListener('submit', function(event) {

      // HTML validates only required fields
      if (!leadForm.checkValidity()) {
        event.preventDefault();
        leadForm.reportValidity();

        formStatus.textContent =
          'Please complete all required fields.';

        return;
      }

      // Confirmation will open in a new tab
      formStatus.textContent =
        'Your request is being submitted. ' +
        'Please check the confirmation page ' +
        'that opens in a new tab.';

    });

  } else {

    leadSubmit.disabled = true;

    formStatus.textContent =
      'The form is temporarily unavailable. ' +
      'Please try again later.';

    console.error(
      'PWL: Invalid Google Apps Script URL.'
    );
  }

} else {
  console.error(
    'PWL: Form elements were not found.'
  );
}


// ==========================================
// 5. FORM FIELD MAPPING
// ==========================================

/*
 * Fields submitted to Google Apps Script:
 *
 * name                 -> Name
 * email                -> Email
 * business_type        -> Business Type
 * guest_wifi_goal      -> Guest Wi-Fi Goal
 * number_of_locations  -> Number of Locations
 * comments             -> Comments (OPTIONAL)
 * consent              -> Required checkbox
 * website_check        -> Honeypot spam protection
 *
 * No additional JavaScript mapping is needed:
 * the browser submits form fields using
 * their HTML "name" attributes.
 */


// ==========================================
// 6. SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function(event) {

    const targetId = this.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

  });

});
