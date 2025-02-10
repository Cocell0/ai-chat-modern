// # script.js

const navigationTab = document.querySelector('#navigation-tab');
const navigationTabs = document.querySelectorAll('#navigation-tab input[is=c-tab]');
navigationTabs.forEach((tab) => {
  tab.addEventListener('change', () => {
    if (tab.checked) {
      if (window.innerWidth <= mediaPhone) {
        toggleMenu();
      }
    }
  })
})

const chatNames = ["General Chat", "Off-Topic", "Support", "Gaming", "Music Lounge", "Art Corner", "Tech Talk", "Announcements"]
const chatChannels = ["general", "off-topic", "support", "gaming", "music", "art", "tech", "announcements"]

chatChannels.forEach((channel) => {
  const strings = {
    for: `MAIN-TAB-${channel}`,
  }
  const label = document.createElement('label');
  const tab = document.createElement('input');
  const name = document.createElement('span');
  
  label.appendChild(tab);
  label.setAttribute('for', strings.for);
  
  tab.setAttribute('is', 'c-tab');
  tab.id = strings.for;
  tab.setAttribute('value', 'MAIN-FRAME-fules')
  
  name.innerText = channel;
  label.appendChild(name)
  
  navigationTab.appendChild(label);
})