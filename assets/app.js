// # app.js

const mediaSmallPhone = 384;
const mediaPhone = 768;

const body = document.body;
const appBody = document.querySelector('#app');
const menuButton = document.querySelector('#menu-button');
const appNavigationWrapper = document.querySelector('#app-navigation-wrapper');
const appNavigation = document.querySelector('#app-navigation');
const backdrop = document.querySelector('#backdrop');
const themeSelection = document.querySelector('#theme-selection');
const openConfigDB = indexedDB.open("config");

const app = {
  themes: [
    {
      name: 'Warm Light',
      description: 'A light theme with warm tones for a cozy and inviting design.',
      value: `color-scheme: light;

    /* palette */
    --primary: hsl(34 40% 92%);
    --primary-100: hsl(34 36% 96%);
    --primary-200: hsl(34 32% 90%);
    --primary-300: hsl(34 28% 84%);
    --primary-shadow: hsl(34, 30%, 70%, 32%);
    --primary-opaque: hsl(34 40% 64% / 0.8);

    --secondary: hsl(22 80% 50%);
    --secondary-100: hsl(22 76% 58%);
    --secondary-200: hsl(22 72% 64%);
    --secondary-300: hsl(22 60% 54%);
    --secondary-shadow: hsl(22 40% 50% / 72%);

    --hovered: hsl(34 36% 96%);
    --pressed: hsl(34 32% 90%);

    --tonal: hsl(34 28% 88%);
    --tonal-hovered: hsl(34, 24%, 82%);
    --tonal-pressed: hsl(34, 22%, 76%);
    --tonal-ripple: hsl(22, 76%, 58%);
    --tonal-shadow: hsl(22, 50%, 60%, 80%);
    --tonal-outline: hsl(22 100% 54%);

    --elevated: hsl(34 36% 98%);
    --elevated-hovered: hsl(34 30% 94%);
    --elevated-pressed: hsl(34 28% 90%);
    --elevated-shadow-front: hsl(34, 40%, 80%, 80%);
    --elevated-shadow-back: hsl(34, 20%, 70%, 30%);

    --accent: hsl(22, 80%, 55%);

    --background: hsl(40 30% 98%);
    --surface: hsl(34 36% 96%);
    --overlay-shadow: transparent;
    --on-surface: hsl(40 20% 92%);

    --text: hsl(22 100% 14%);
    --text-primary: hsl(34, 40%, 20%);
    --text-tonal: hsl(22 100% 24%);
    --button-text: hsl(22 100% 24%);

    --filled: hsl(22 80% 50%);
    --filled-color: hsl(40 36% 96%);
    --filled-hovered: hsl(22 76% 58%);
    --filled-pressed: hsl(22 72% 64%);
    --filled-ripple: hsl(22 36% 94% / 1);
    --filled-shadow: hsl(22 16% 84% / 1);

    --ripple: hsl(22 34% 40% / 1);
    --button-hover: hsl(22 28% 88% / 1);

    --disabled: hsl(34 10% 88% / 0.6);
    --disabled-text: hsl(34 20% 40% / 0.4);
    --disabled-outline: hsl(34 10% 60% / 0.25);
      `
    },
    {
      name: 'Warm Dark',
      description: 'A dark theme with warm tones for a soothing design; welcome to the dark side.',
      value: `
  color-scheme: dark;

  /* palette */
  --primary: hsl(18 24% 20% / 1);
  --primary-100: hsl(16 18% 18%);
  --primary-200: hsl(16 18% 22%);
  --primary-300: hsl(16 18% 28%);
  --primary-shadow: hsl(16, 20%, 30%, 32%);
  --primary-opaque: hsl(22 26% 64% / 0.8);

  --secondary: hsl(32 72% 75% / 1);
  --secondary-100: hsl(32 66% 68% / 1);
  --secondary-200: hsl(32 62% 62% / 1);
  --secondary-300: hsl(32 44% 76% / 1);
  --secondary-shadow: hsl(32 34% 70% / 72%);

  --hovered: hsl(16 18% 18%);
  --pressed: hsl(16 18% 22%);

  --tonal: hsl(16 18% 26%);
  --tonal-hovered: hsl(16, 18%, 32%);
  --tonal-pressed: hsl(16, 20%, 38%);
  --tonal-ripple: hsl(16, 76%, 68%);
  --tonal-shadow: hsl(16, 50%, 30%, 80%);
  --tonal-outline: hsl(22 100% 74%);

  --elevated: hsl(16 16% 16%);
  --elevated-hovered: hsl(16 10% 20%);
  --elevated-pressed: hsl(16 12% 24%);
  --elevated-shadow-front: hsl(16, 40%, 14%, 80%);
  --elevated-shadow-back: hsl(16, 20%, 20%, 30%);

  --accent: hsl(16, 80%, 70%);

  --background: hsl(22 12% 7%);
  --surface: hsl(16 10% 10%);
  --overlay-shadow: transparent;
  --on-surface: hsl(24 12% 11%);

  --text: hsl(22 100% 92%);
  --text-primary: hsl(16, 10%, 85%);
  --text-tonal: hsl(22 100% 84%);
  --button-text: hsl(22 100% 84%);

  --filled: hsl(32 72% 75% / 1);
  --filled-color: hsl(22 44% 14%);
  --filled-hovered: hsl(32 66% 68% / 1);
  --filled-pressed: hsl(32 62% 62% / 1);
  --filled-ripple: hsl(32 36% 14% / 1);
  --filled-shadow: hsl(32 16% 24% / 1);

  --ripple: hsl(32 34% 66% / 1);
  --button-hover: hsl(32 18% 16% / 1);

  --disabled: hsl(16 8% 16% / 0.6);
  --disabled-text: hsl(22 20% 60% / 0.4);
  --disabled-outline: hsl(22 10% 40% / 0.25);
  `
    }
  ],
  iconAxeConfig: ':opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
};

const lastTheme = localStorage.getItem('lastTheme');

if (lastTheme) {
  document.documentElement.setAttribute('data-theme', lastTheme);
} else {
  const prefersDarkmode = window.matchMedia('prefers-color-scheme: dark').matches;

  document.documentElement.setAttribute('data-theme', (prefersDarkmode ? 'Warm Dark' : 'Warm Light'));
}

const themeStyle = document.createElement('style');

app.themes.forEach((theme) => {
  themeStyle.innerHTML += `[data-theme="${theme.name}"] { ${theme.value} }\n`;

  document.body.appendChild(themeStyle);
});

themeSelection.innerHTML = '';

app.themes.forEach((theme) => {
  let themeButton = document.createElement('c-button');
  themeButton.innerHTML = theme.name;

  themeSelection.appendChild(themeButton);

  themeButton.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', theme.name);
    localStorage.setItem('lastTheme', theme.name);
  });
})

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    const requestFullscreen =
      document.documentElement.requestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.msRequestFullscreen;

    if (requestFullscreen) requestFullscreen.call(document.documentElement);
  } else {
    const exitFullscreen =
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;

    if (exitFullscreen) exitFullscreen.call(document);
  }
}

function getUsedIcons() {
  const icons = document.querySelectorAll('.icon');
  let iconList;
  if (icons) {
    iconList = new Set();
    icons.forEach((item) => {
      if (!iconList.has(item.innerHTML.trim())) {
        iconList.add(item.innerHTML.trim());
      }
    });
  }

  return iconList;
}

const iconStyle = document.createElement('link');
document.body.appendChild(iconStyle);

function injectIcon() {
  const iconList = getUsedIcons();

  let e = Object.prototype.toString.call(iconList) === '[object Set]' ? '' : '&icon_names=';

  const iconNames = Array.from(iconList).sort().join(',');
  const queryString = `&icon_names=${iconNames}`;
  iconStyle.setAttribute('rel', 'stylesheet');

  if (iconStyle.getAttribute('href') !== `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded${app.iconAxeConfig}${queryString}`) {
    iconStyle.setAttribute('href', `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded${app.iconAxeConfig}${queryString}`)
  }
}

function renderMD(source) {
  console.log(`Source:\n${source}`);
  const mappedMD = {
    italic: /\*(.*?)\*/g,
    bold: /\*\*(?!\*.*\*\*)(.*?)\*\*/g
  }

  function replaceDelimiters(source, target, by) {
    return target.test(source) ? source.replace(target, by) : source;
  }

  source = replaceDelimiters(source, mappedMD.bold, `<b>$1</b>`);
  source = replaceDelimiters(source, mappedMD.italic, `<i>$1</i>`);

  console.log(`Output:\n${source}`);
  return source;
}

function getTime(time, timeConfig = {}) {
  const now = Date.now();
  const differenceInMs = now - time;
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  const date = new Date(time);
  const nowDate = new Date(now);
  const isToday = date.toDateString() === nowDate.toDateString();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const isPM = date.getHours() >= 12;
  const hour12 = isPM ? (date.getHours() - 12 || 12) : (date.getHours() || 12);
  const hourFormatted = timeConfig.timeFormat === '24-hour' ? hours : String(hour12).padStart(2, '0');
  const timeString = `${hourFormatted}:${minutes} ${isPM ? 'PM' : 'AM'}`;

  if (isToday) {
    return timeString;
  } else if (differenceInDays === 1) {
    return "yesterday";
  } else if (differenceInDays === 2) {
    return "2 days ago";
  } else {
    let formattedDate = timeConfig.dateFormat || 'yyyy/mm/dd';
    formattedDate = formattedDate.replace('yyyy', year).replace('yy', String(year).slice(-2)).replace('mm', month).replace('dd', day);
    return formattedDate;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('#menu-button .icon');
  if (Math.random() <= 0.01) {
    hamburgerMenu.innerText = '🍔';
    hamburgerMenu.style.paddingBottom = '8px';
  }
})



function displayBackdrop(display) {
  if (display) {
    if (backdrop.classList.contains('close') || !backdrop.classList.contains('show')) {
      backdrop.classList.add('show');
      backdrop.classList.remove('close');
    }
  } else {
    backdrop.classList.remove('show');
    backdrop.classList.add('close');
  }
}


function toggleMenu() {
  const close = 'close-app-navigation';
  const open = 'open-app-navigation';

  if (window.innerWidth >= mediaPhone) {
    if (appBody.classList.contains(close)) {
      appBody.classList.remove(close);
      appBody.classList.add(open);
      appNavigationWrapper.removeAttribute('inert', '');

      displayBackdrop(false);
    } else {
      appBody.classList.add(close);
      appBody.classList.remove(open);
      appNavigationWrapper.setAttribute('inert', '');

      displayBackdrop(false);
    }
  } else {
    if (appBody.classList.contains(open)) {
      appBody.classList.remove(open);
      appBody.classList.add(close)
      appNavigationWrapper.setAttribute('inert', '');

      displayBackdrop(false);
    } else {
      appBody.classList.remove(close);
      appBody.classList.add(open);
      appNavigationWrapper.removeAttribute('inert', '');

      displayBackdrop(true);
    }
  }
}

menuButton.addEventListener('click', () => {
  toggleMenu();
}, { passive: true });

backdrop.addEventListener('click', () => {
  if (appBody.classList.contains('open-app-navigation')) {
    appBody.classList.remove('open-app-navigation');
    appBody.classList.add('close-app-navigation')
    appNavigationWrapper.setAttribute('inert', '');

    displayBackdrop(false);
  }
}, { passive: true });

document.addEventListener('resize', () => {
  const close = 'close-app-navigation';
  const open = 'open-app-navigation';

  if (window.innerWidth <= mediaPhone) {
    if (appBody.classList.contains(close)) {
      appBody.classList.remove(close);
      appBody.classList.add(open);
      appNavigationWrapper.removeAttribute('inert', '');
    } else {
      appBody.classList.add(close);
      appBody.classList.remove(open);
      appNavigationWrapper.setAttribute('inert', '');
    }
  }
}, { passive: true })

injectIcon();
setInterval(() => {
  injectIcon();
}, 1000);
