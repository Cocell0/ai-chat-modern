const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();
const { execSync } = require('child_process');

let appLocation = process.env.APP_LOCATION;

// Check if running on GitHub
if (process.env.GITHUB_REF) {
  if (process.env.GITHUB_REF === 'refs/heads/development' || (process.env.GITHUB_EVENT_NAME === 'release' && process.env.GITHUB_EVENT_RELEASE_PRERELEASE === 'true')) {
    appLocation = process.env.APP_LOCATION_DEVELOPMENT;
  }
} else {
  // Else if running locally, check current git branch
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    if (branch === 'development') {
      appLocation = process.env.APP_LOCATION_DEVELOPMENT;
    }
  } catch (error) {
    console.error('Error detecting Git branch:', error);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, slowMo: 60, defaultViewport: null, args: ['--disable-notifications', '--disable-infobars', '--start-maximized', '--disable-popup-blocking'] });
  const page = await browser.newPage();

  await page.goto(appLocation);
  await page.bringToFront();

  page.on('dialog', dialog => dialog.accept());
  await page.waitForSelector('#mainOutputTemplateEditorCtn', { visible: true });

  await page.evaluate(() => {
    document.documentElement.style.userSelect = 'none';
    document.querySelector('#aiHelperCtn').hidden = true;
  });

  await new Promise(resolve => setTimeout(resolve, 200));

  await page.click('#mainOutputTemplateEditorCtn');

  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');

  await page.keyboard.sendCharacter('Setting contents...')

  await new Promise(resolve => setTimeout(resolve, 200));

  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');

  await page.keyboard.sendCharacter(fs.readFileSync('filo-index.html', 'utf8'));


  await page.evaluate(() => {
    app.saveGenerator();
  });

  await new Promise(resolve => setTimeout(resolve, 200));

  await page.waitForFunction(
    'window.menuBar && window.menuBar.saveState === "saved"'
  );

  await browser.close();
})();
