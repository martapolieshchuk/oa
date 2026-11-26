
/**
 * PWL Guest Wi-Fi Landing Page
 * JavaScript for GitHub Pages
 *
 * Form integration:
 * GitHub Pages -> Google Apps Script -> Google Sheets
 */

// ==========================================
// 1. MOBILE NAVIGATION
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

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );
    });
  });
}


// ==========================================
// 2. GOOGLE APPS SCRIPT CONNECTION
// ==========================================

// Updated Google Apps Script Web App URL

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzrSsoqsT3E64pz5EkMtUbi2Dlb3FtE8ScwNK5UU2o6lNZmzD5GJJNAovK9nNUARHgTRA/exec';


// ==========================================
// 3. FORM ELEMENTS
// ==========================================

const leadForm = document.querySelector('#pwl-lead-form');

const leadSubmit = document.querySelector('#lead-submit');

const formStatus = document.querySelector('#form-status');


// ==========================================
// 4. FORM INITIALIZATION
// ==========================================

if (leadForm && leadSubmit && formStatus) {

  // Check Google Apps Script URL format
  const validEndpoint =
    /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/
      .test(GOOGLE_APPS_SCRIPT_URL);

  if (validEndpoint) {

    // Connect form to Google Apps Script
    leadForm.action = GOOGLE_APPS_SCRIPT_URL;

    // Use POST request
    leadForm.method = 'POST';

    // Open Apps Script confirmation in new tab
    leadForm.target = '_blank';

    // Enable submit button
    leadSubmit.disabled = false;

    // Initial status message
    formStatus.textContent =
      'Complete the form to submit your request.';

    // Handle form submission
    leadForm.addEventListener('submit', function(event) {

      // Check required HTML fields
      if (!leadForm.checkValidity()) {
        event.preventDefault();

        leadForm.reportValidity();

        formStatus.textContent =
          'Please complete all required fields.';

        return;
      }

      // Show submission status
      formStatus.textContent =
        'Your request is being submitted. ' +
        'Please check the confirmation page ' +
        'that opens in a new tab.';

    });

  } else {

    // Invalid or missing Apps Script URL
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
    'PWL: One or more form elements were not found.'
  );
}


// ==========================================
// 5. FORM FIELD VALIDATION
// ==========================================

// Comments are optional.
// Required fields are controlled by HTML:
// - Name
// - Email
// - Business Type
// - Guest Wi-Fi Goal
// - Number of Locations
// - Consent checkbox

// All submitted field names match Code.gs:
// name
// email
// business_type
// guest_wifi_goal
// number_of_locations
// comments
// consent
// website_check


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
