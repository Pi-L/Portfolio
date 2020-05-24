/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { options } from '../common/scripts/utilities';
import phpForm from './contact.php';
// import { sections } from '../navbar/nav';

const EMAILFORMAT = new RegExp(/^\S+@\S+\.\S+$/);

const contactSection = document.querySelector('#contact');
const contactForm = document.querySelector('.contactForm');
const formName = contactForm.querySelector('#cf__name');
const formNameLabel = contactForm.querySelector('#cf__name + label');
const formEmail = contactForm.querySelector('#cf__email');
const formEmailLabel = contactForm.querySelector('#cf__email + label');
const formMessage = contactForm.querySelector('#cf__message');
const formMessageLabel = contactForm.querySelector('#cf__message + label');
const formInputs = [formName, formEmail, formMessage, contactForm.querySelector('#cf__submit')];

// loader
const loaderContainer = document.querySelector('.infoValidation');
const circleLoader = loaderContainer.querySelector('.circle-loader');
const checkmark = loaderContainer.querySelector('.checkmark');

// recaptacha v3
const errorMessage = contactSection.querySelector('.error');
const contactObserver = new IntersectionObserver((entries) => observeContact(entries), options);
let recapV3Launched = false;

function observeContact([entry]) {
  if (!recapV3Launched && entry.intersectionRatio > 0) {
    try {
      grecaptcha.ready(function() {
        grecaptcha.execute('6LdgsMsUAAAAAHaNOwBSrxxIh1myBRnjX5iyAl96', { action: 'formVisible' });
        recapV3Launched = true;
        errorMessage.textContent = '';
      });
    } catch (err) {
      errorMessage.textContent = 'Verifiez votre connection et recharger la page';
    }
  }
}

function reCaprchaBasicInteraction() {
  if (recapV3Launched) {
    grecaptcha.execute('6LdgsMsUAAAAAHaNOwBSrxxIh1myBRnjX5iyAl96', { action: 'inputs' });
  }
}

function validateInput(aName, aNameLabel, anEmail, anEmailLabel, aMessage, aMessageLabel) {
  aNameLabel.textContent = 'Votre nom';
  anEmailLabel.textContent = 'Votre eMail';
  aMessageLabel.textContent = 'Votre message';

  let valid = true;

  aNameLabel.classList.remove('alert');
  anEmailLabel.classList.remove('alert');
  aMessageLabel.classList.remove('alert');

  if (aName.value.length < 3) {
    aNameLabel.classList.add('alert');
    aNameLabel.textContent = 'Nom : min 3 lettres';
    valid = false;
  }

  if (!EMAILFORMAT.test(anEmail.value)) {
    anEmailLabel.classList.add('alert');
    anEmailLabel.textContent = 'Mail : format invalide';
    valid = false;
  }

  if (aMessage.value.length < 5) {
    aMessageLabel.classList.add('alert');
    aMessageLabel.textContent = 'Message : min 5 lettres';
    valid = false;
  }

  return valid;
}

function resetLoaderClasses() {
  loaderContainer.className = 'infoValidation';
  circleLoader.className = 'circle-loader';
  checkmark.className = 'checkmark draw';
}

// todo : how do i catch errors from grecaptcha.execute

function submitForm(e) {
  e.preventDefault();

  if (
    validateInput(
      formName,
      formNameLabel,
      formEmail,
      formEmailLabel,
      formMessage,
      formMessageLabel,
    ) &&
    recapV3Launched &&
    grecaptcha !== 'undefined' &&
    navigator.onLine
  ) {
    loaderContainer.classList.add('shown');
    setTimeout(resetLoaderClasses, 20000);

    grecaptcha
      .execute('6LdgsMsUAAAAAHaNOwBSrxxIh1myBRnjX5iyAl96', { action: 'sendMessage' })
      .then(function(token) {
        fetch(phpForm, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `name=${encodeURIComponent(formName.value)}&email=${encodeURIComponent(
            formEmail.value,
          )}&message=${encodeURIComponent(formMessage.value)}&valiCap=${token}`,
        })
          .then((res) => res.text())
          .then((isASuccess) => {
            circleLoader.classList.add('load-complete');
            if ([isASuccess]) {
              checkmark.classList.add('shown');
              errorMessage.textContent = '';
              formName.value = '';
              formEmail.value = '';
              formMessage.value = '';
            } else {
              circleLoader.classList.add('alert');
              errorMessage.textContent = 'Message bloqué par Google reCaptcha';
            }

            setTimeout(resetLoaderClasses, 1500);
          })
          .catch((err) => {
            circleLoader.classList.add('alert');
            setTimeout(resetLoaderClasses, 1500);
            errorMessage.textContent = 'Erreur du serveur. Veuillez re-essayer plus tard.';
          });
      });

    /*   catch (err) {
              circleLoader.classList.add('alert');
              setTimeout(resetLoaderClasses, 1500);
              console.error('error in grecaptcha : ', err);
          }; */
  } else if (!navigator.onLine) {
    errorMessage.textContent = 'Verifiez votre connection et recharger la page';
  }
}

export function contactFormEvents() {
  contactObserver.observe(contactSection);
  contactForm.addEventListener('submit', submitForm);
  formInputs.forEach((input) => input.addEventListener('focus', reCaprchaBasicInteraction));
}
