/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { options } from '../common/scripts/utilities';

const portfolioSection = document.querySelector('.portfolio');
const portfolioImages = document.querySelectorAll('.portfolio img');

function chgSrc(image) {
  image.src = image.dataset.src;
}

function loadFolioImages(entries) {
  const [folioEntry] = entries;

  if (folioEntry.intersectionRatio > 0) {
    portfolioImages.forEach(chgSrc);
    folioObserver.disconnect();
  }
}

const folioObserver = new IntersectionObserver((entries) => loadFolioImages(entries), options);

export function portfolioEvents() {
  folioObserver.observe(portfolioSection);
}
