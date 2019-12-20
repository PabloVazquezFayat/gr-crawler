const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

async function lac (data, callback){
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  //GET LAC DESKTOP SCREENSHOTS
  async function lacDesktop(){
    // Instructs the blank page to navigate a URL
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(data.url, {"waitUntil" : "networkidle0"});
    await page.waitForSelector(data.selector);

    if(data.click){
      //GET BUTTON
      let btn = await page.waitForSelector(data.click.button);

      //CLICK THE BUTTON IF IT EXISTS
      try{
        if(btn){
          await page.waitFor(3000)
          btn.click();
        }
      }catch(err){
        console.error(err);
      }

      //WAIT FOR ALL ITINERARIES TO LOAD + 3 SECONDS
      await page.waitForSelector(data.selector);
      await page.waitFor(3000);
    }

    // Takes a screenshot of an area within the page
    await page.waitFor(10000);
    await page.screenshot({
      path:  data.desktopImagePath+data.page+'-'+data.market+'.jpg',
      type: 'jpeg',
      fullPage: true
    });
  }

  //GET LAC MOBILE SCREENSHOT
  async function lacMobile(){
    // Instructs the blank page to navigate a URL
    await page.emulate(iPhonex);
    await page.goto(data.url, {"waitUntil" : "networkidle0"});
    await page.waitForSelector(data.selector);

    if(data.click){
      //GET BUTTON
      let btn = await page.waitForSelector(data.click.button);

      //CLICK THE BUTTON IF IT EXISTS
      try{
        if(btn){
          await waitBeforeClosing(3000);
          btn.click();
        }
      }catch(err){
        console.error(err);
      }

      //WAIT FOR ALL ITINERARIES TO LOAD + 3 SECONDS
      await page.waitForSelector(data.selector);
      await waitBeforeClosing(3000);
    }
    
    // Takes a screenshot of an area within the page
    await page.waitFor(10000);
    await page.screenshot({
      path: data.mobileImagePath+data.page+'-'+data.market+'.jpg',
      type: 'jpeg',
      fullPage: true
    });
  }

  //INVOKE 
  await lacDesktop();
  await lacMobile();

  //CLOSE BROWSER
  await browser.close();

  //RUN CALLBACK
  callback(data.market);
}

async function lacNav (data, callback){
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  // Instructs the blank page to navigate a URL
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(data.url, {"waitUntil" : "networkidle0"});
  await page.waitForSelector(data.selector);

  //GET BUTTON
  let btn = await page.waitForSelector(data.click.button);

  //CLICK THE BUTTON IF IT EXISTS
  try{
    if(btn){
      await page.waitFor(3000)
      btn.click();
    }
  }catch(err){
    console.error(err);
  }

  //WAIT FOR ALL ITINERARIES TO LOAD + 3 SECONDS
  await page.waitForSelector(data.selector);
  await page.waitFor(3000);

}

lacNav({
    url: 'https://www.royalcaribbean.com/lac/es/',
    desktopImagePath: 'img/lac/desktop/',
    mobileImagePath: 'img/lac/mobile/',
    page: 'cruise-search',
    market: 'lac',
    selector: '.itinerary-card-component',
  },
  setImageReady
);

//got to home page
//screenshot

//click on hero banner > got to cruise search 
//take a screen shot

//go back to home page
//click on offer tile link > got to link
//take screenshot

//go back to home page

