const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Create a new page
  const page = await browser.newPage();
  
  // Set viewport size for desktop view
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Wait for the content to load
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Take screenshot of the homepage in light mode
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '01_homepage_light.png'),
      fullPage: true 
    });
    
    console.log('Captured homepage in light mode');
    
    // Click on the dark mode toggle
    await page.evaluate(() => {
      const darkModeToggle = document.querySelector('button[aria-label="Toggle theme"]') || 
                            document.querySelector('.toggle-switch') ||
                            document.querySelector('button:has(.h-\\[1\\.2rem\\])');
      if (darkModeToggle) darkModeToggle.click();
    });
    
    // Wait for dark mode to apply
    await page.waitForTimeout(1000);
    
    // Take screenshot of the homepage in dark mode
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '02_homepage_dark.png'),
      fullPage: true 
    });
    
    console.log('Captured homepage in dark mode');
    
    // Click on chapter 1
    await page.evaluate(() => {
      const chapterButtons = Array.from(document.querySelectorAll('button'));
      const chapter1Button = chapterButtons.find(button => 
        button.textContent.includes('01') && 
        button.textContent.includes('Overview of Child Care Regulations')
      );
      if (chapter1Button) chapter1Button.click();
    });
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Take screenshot of chapter 1 with regulation checklist
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '03_chapter1_regulations.png'),
      fullPage: true 
    });
    
    console.log('Captured chapter 1 with regulation checklist');
    
    // Click on chapter 2
    await page.evaluate(() => {
      const chapterButtons = Array.from(document.querySelectorAll('button'));
      const chapter2Button = chapterButtons.find(button => 
        button.textContent.includes('02') && 
        button.textContent.includes('Obtaining a License')
      );
      if (chapter2Button) chapter2Button.click();
    });
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Take screenshot of chapter 2 with license timeline
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '04_chapter2_license.png'),
      fullPage: true 
    });
    
    console.log('Captured chapter 2 with license timeline');
    
    // Click on chapter 3
    await page.evaluate(() => {
      const chapterButtons = Array.from(document.querySelectorAll('button'));
      const chapter3Button = chapterButtons.find(button => 
        button.textContent.includes('03') && 
        button.textContent.includes('National Accreditation')
      );
      if (chapter3Button) chapter3Button.click();
    });
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Take screenshot of chapter 3 with accreditation comparison
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '05_chapter3_accreditation.png'),
      fullPage: true 
    });
    
    console.log('Captured chapter 3 with accreditation comparison');
    
    // Switch back to light mode
    await page.evaluate(() => {
      const darkModeToggle = document.querySelector('button[aria-label="Toggle theme"]') || 
                            document.querySelector('.toggle-switch') ||
                            document.querySelector('button:has(.h-\\[1\\.2rem\\])');
      if (darkModeToggle) darkModeToggle.click();
    });
    
    // Wait for light mode to apply
    await page.waitForTimeout(1000);
    
    // Take screenshot of mobile view
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', '06_mobile_view.png'),
      fullPage: true 
    });
    
    console.log('Captured mobile view');
    
    console.log('All screenshots captured successfully!');
    
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
