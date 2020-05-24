/* eslint-disable import/prefer-default-export */
import { options } from '../common/scripts/utilities';

const socialLinks = document.querySelectorAll('.hero .social a');
const heroSection = document.querySelector('.hero');
const backToTopButton = document.querySelector('.backToTop');

const EMCT = document.querySelector('.email');

const changeEmct = (function () {
  let executed = false;
  return function () {
    if (!executed && !document.hidden) {
      const VALUEP0 = '&#109;&#97;&#105;&#108;&#116;&#111;&#58;';
      const VALUEP1 = '&#112;&#105;&#101;&#114;&#114;&#101;.&#1';
      const VALUEP2 = '21';
      const VALUEP3 = ';&#118;&#101;&#115;&#64;&#108;&';
      const VALUEP4 = '#101;&#103;&#101;&#97;&#121';
      const VALUEP5 = ';.&#105;&#110;&#102;&#111;';

      EMCT.outerHTML = `<a class="email" target="_blank" rel="noreferrer" href="${VALUEP0}${VALUEP1}${VALUEP2}${VALUEP3}${VALUEP4}${VALUEP5}" hidden>${VALUEP1}${VALUEP2}${VALUEP3}${VALUEP4}${VALUEP5}</a>`;

      executed = true;
    }
  }
})()

export function heroEvents() {
  socialLinks.forEach((myLink) => {
    myLink.addEventListener('focus', (e) => e.target.parentNode.classList.toggle('focused'));
    myLink.addEventListener('blur', (e) => e.target.parentNode.classList.toggle('focused'));
    myLink.addEventListener('click', () => document.activeElement.blur());
  });

  const heroObserver = new IntersectionObserver((entries) => showGoToTopButton(entries), options);

  heroObserver.observe(heroSection);
}

function showGoToTopButton(entries) {
  const [heroObsEntry] = entries;

  if (heroObsEntry.intersectionRatio <= 0) {
    backToTopButton.classList.add('shown');
  } else {
    backToTopButton.classList.remove('shown');
    if (heroObsEntry.intersectionRatio > .5) changeEmct();
  }
}
