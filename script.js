
const toggle = document.querySelector('.mobile-menu-toggle');
const menu = document.querySelector('#mobile-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Google Apps Script integration
// Do not put private HubSpot tokens in this public file.

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzs9omgQk8B916U2zol-r-w9p_9zE3yJpjnPPdGe-4Tp7Vtl861peT1PXujKcC4OYHD5A/exec';

const leadForm = document.querySelector('#pwl-lead-form');
const leadSubmit = document.querySelector('#lead-submit');
const formStatus = document.querySelector('#form-status');

if (leadForm && leadSubmit && formStatus) {
  const validEndpoint =
    /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/
      .test(GOOGLE_APPS_SCRIPT_URL);

  if (validEndpoint) {
    leadForm.action = GOOGLE_APPS_SCRIPT_URL;
    leadSubmit.disabled = false;

    formStatus.textContent =
      'After submitting, a confirmation page will open in a new tab.';

    leadForm.addEventListener('submit', () => {
      formStatus.textContent =
        'A new tab will show whether your submission was saved. Please check that confirmation.';
    });
  }
}
