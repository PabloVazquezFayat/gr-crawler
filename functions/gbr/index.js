const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

export default async ()=> {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
  
    const waitBeforeClosing = timeout => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };
  
    // Instructs the blank page to navigate a URL
    //await page.setViewport({ width: , height: 1080 });
    await page.emulate(iPhonex);
    await page.goto('https://www.royalcaribbean.com/gbr/en/cruises/?country=GBR', {"waitUntil" : "networkidle2"});
  
    //GET COOKIE BUTTON
    let cookieBtn = await page.waitForSelector('.optanon-alert-box-button.optanon-button-allow');
  
    //CLICK THE COOKIE BUTTON IF IT EXISTS
    try{
      if(cookieBtn){
        await waitBeforeClosing(3000);
        cookieBtn.click();
      }
    }catch(err){
      console.error(err);
    }
  
    //WAIT FOR ALL ITINERARIES TO LOAD + 3 SECONDS
    await page.waitForSelector('.itinerary-card-component');
    await waitBeforeClosing(3000);
  
    // Takes a screenshot of an area within the page
    await page.screenshot({
      path: 'img/gbr/cruises-gbr.jpg',
      type: 'jpeg',
    });
  
    await browser.close();
  }