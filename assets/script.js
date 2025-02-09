// # script.js

const navigationTabs = document.querySelectorAll('#navigation-tabs input[is=c-tab]');
navigationTabs.forEach((tab) => {
  tab.addEventListener('change', () => {
    if (tab.checked) {
      if (window.innerWidth <= mediaPhone) {
    toggleMenu();
  }
    }
    })
})