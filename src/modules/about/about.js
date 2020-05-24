/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { options } from '../common/scripts/utilities';

const aboutSection = document.querySelector('.about');
const aboutImages = document.querySelectorAll('.about img');

function chgSrc(image) {
  image.src = image.dataset.src;
}

function loadAboutImages(entries) {
  const [aboutEntry] = entries;

  if (aboutEntry.intersectionRatio > 0) {
    aboutImages.forEach(chgSrc);
    aboutObserver.disconnect();
  }
}

const aboutObserver = new IntersectionObserver((entries) => loadAboutImages(entries), options);

export function aboutEvents() {
  aboutObserver.observe(aboutSection);
}
