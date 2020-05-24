/* eslint-disable import/prefer-default-export */
import * as util from '../common/scripts/utilities';

// burger menu
const burgerButton = document.querySelector('.burgerButton');
const navMenu = document.querySelector('.navbar .menu');
const closingBg = document.querySelector('.navbar .closingBg');

// underlining nav link on scroll
const navLinks = document.querySelectorAll('.navbar .menu a');
const contentSections = document.querySelectorAll('section');

export const sections = { maxIntersectionId: '' };
contentSections.forEach((section) => {
  sections[section.id] = 0;
});

function underlineLink(entries) {
  entries.forEach((entry) => {
    sections[entry.target.id] = entry.intersectionRatio;
  });

  let maxValue = 0.2;
  Object.entries(sections).forEach(([key, value]) => {
    if (value > maxValue) {
      sections.maxIntersectionId = key;
      maxValue = value;
    }
  });

  navLinks.forEach((myLink) => {
    if (myLink.href.split('#')[1] === sections.maxIntersectionId) myLink.classList.add('isInView');
    else myLink.classList.remove('isInView');
  });
}

const sectionsObserver = new IntersectionObserver((entries) => underlineLink(entries), util.options);

export function navEvents() {
  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('openBurger');
    navMenu.classList.toggle('shown');
    closingBg.classList.toggle('shown');
  });

  closingBg.addEventListener('click', () => {
    burgerButton.classList.remove('openBurger');
    navMenu.classList.remove('shown');
    closingBg.classList.remove('shown');
  });

  util.themeSwitcher.addEventListener('click', () => {
    util.themeSwitch();

    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';

    try {
      localStorage.setItem('pil_theme', currentTheme);
    } catch (error) {
      console.log('error :', error);
    }
  });

  contentSections.forEach((section) => sectionsObserver.observe(section));
}
