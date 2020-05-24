/* eslint-disable import/prefer-default-export */
export const options = {
  root: null,
  rootMargin: '0px',
  threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
};

// theme switcher
export const themeSwitcher = document.querySelector('.themeSwitch');
const themeSwitcherHandle = themeSwitcher.querySelector('.toggle-handle');
const themeSwitcherStar = themeSwitcher.querySelectorAll('.star');
const themeSwitcherCrater = themeSwitcher.querySelectorAll('.crater');
const themeSwitcherMiniCloud = themeSwitcher.querySelector('.mini-cloud');

export function themeSwitch() {
  themeSwitcher.classList.toggle('toggle-container-day');
  themeSwitcherHandle.classList.toggle('toggle-handle-day');
  themeSwitcherStar.forEach((star) => star.classList.toggle('star-day'));
  themeSwitcherCrater.forEach((crater) => crater.classList.toggle('crater-day'));
  themeSwitcherMiniCloud.classList.toggle('cloud-day');

  document.body.classList.toggle('dark');
}

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}
