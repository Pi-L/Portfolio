import { themeSwitch, storageAvailable } from './modules/common/scripts/utilities';
import { navEvents } from './modules/navbar/nav';
import { heroEvents } from './modules/hero/hero';
import { aboutEvents } from './modules/about/about';
import { portfolioEvents } from './modules/portfolio/portfolio';
import { contactFormEvents } from './modules/contact/contact';
import { rgpdEvents } from './modules/rgpd/rgpd';

import './main.scss';
import './.htaccess';

if (storageAvailable('localStorage')) {
  const currentTheme = localStorage.getItem('pil_theme');
  const prefColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (currentTheme === 'dark' || (prefColorScheme.matches && currentTheme !== 'light')) themeSwitch();
}
// window.requestAnimationFrame(themeSwitch);
navEvents();
heroEvents();
aboutEvents();
portfolioEvents();
contactFormEvents();
rgpdEvents();

setTimeout(() => document.body.classList.add('transition'), 10);
