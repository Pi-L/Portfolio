/* eslint-disable import/prefer-default-export */
import { sections } from '../navbar/nav';

const rgpdLinks = document.querySelectorAll('a[href="#rgpd"]');
const rgpd = document.querySelector('#rgpd');
const rgpdCloser = rgpd.querySelector('.closeButton');

export function rgpdEvents() {
  rgpdLinks.forEach((link) =>
    link.addEventListener('click', () => document.body.classList.toggle('bodyNoScroll')),
  );
  rgpdCloser.addEventListener('click', () => {
    document.body.classList.remove('bodyNoScroll');
    rgpdCloser.href = `#${sections.maxIntersectionId}`;
  });
}
