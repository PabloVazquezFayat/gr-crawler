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

async function lacNav (data){
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  //CAPTURES SCREENSHOT
  async function capture(counter){
    await page.screenshot({
      path:  data.desktopImagePath+counter+'-'+data.market+'.jpg',
      type: 'jpeg',
      fullPage: true
    });
  }

  // Instructs the blank page to navigate a URL
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(data.url, {"waitUntil" : "networkidle0"});

  //REMOVE COOKIE BANNER
  await page.evaluate((sel)=>{
    document.getElementById(sel).remove();
  }, 'optanon-popup-bg');

  //CAPTURE
  await page.waitFor(5000);
  await capture(0);

  //GET BUTTON
  let btn = await page.waitForSelector(data.click.button);
  //CLICK THE BUTTON IF IT EXISTS
  try{
    if(btn){
      btn.click();
    }
  }catch(err){
    console.error(err);
  }

  //CAPTURE
  await page.waitForNavigation()
  await page.waitFor(5000);
  await capture(1);

  //CLICK ON FIRST ITINERARY
  //CLICK ON ITINERARY
  let itinerary = await page.waitForSelector(data.click.itinerary);
  try{
    if(itinerary){
      itinerary.click();
    }
  }catch(err){
    console.error(err);
  }

  //CAPTURE
  await page.waitFor(5000);
  await capture(2);

  //GO TO BOOKINGS
  //CLICK ON FARE
  let fare = await page.waitForSelector(data.click.fare);
  try{
    if(fare){
      fare.click();
    }
  }catch(err){
    console.error(err);
  }

  //CAPTURE
  await page.waitForNavigation()
  await page.waitFor(5000);
  await capture(3);

  //CHECK EXIT-POPUP
  //CLICK ON SHIELD
  let shield = await page.waitForSelector(data.click.shield);
  try{
    if(shield){
      shield.click();
    }
  }catch(err){
    console.error(err);
  }

  //CAPTURE
  await page.waitFor(5000);
  await capture(4);
  await page.waitFor(5000);

  //CLICK ON CONTINUE ON EXIT POPUP
  let continueBtn = await page.waitForSelector(data.click.continue);
  try{
    if(continueBtn){
      continueBtn.click();
    }
  }catch(err){
    console.error(err);
  }

  //GO TO OCCUPANCY
  //CLICK ON STATEROOM
  let stateroom = await page.waitForSelector(data.click.stateroom);
  try{
    if(stateroom){
      stateroom.click(5);
    }
  }catch(err){
    console.error(err);
  }

  //CAPTURE
  await page.waitFor(5000);
  await capture(5);

  //GO TO SELECT ROOM
  //CLICK ON STATEROOM
  // code goes here...

  //CAPTURE
  await page.waitFor(5000);
  await capture(6);

  //CLOSE BROWSER
  await browser.close();
}

module.exports = lacNav;

/* //////////////////////////////////////////
* HOME PAGE ROUTINE
*/
//got to home page
//screenshot

//click on hero banner > go to cruise search 
//take a screenshot
//click on first itinerary > wait 3 seconds
//take screenshot of people-watching

//go back to home page
//check if offer-tiles are on page
// IF TRUE
  //click on offers-tiles link > go to link
  //take screenshot
  //go back to home page
  //repeat for every offer-tile
//ElSE
 //MOVE ON

//go back to home page
//click on mosaic-tile > go to link
//take screenshot
//go back to home page
//repeat for eveyr mosaic-tile

//go back to home page
//click on terms-&-conditions > go to link
//take screenshot

//end of routine
/////////////////////////////////////////////


/* //////////////////////////////////////////
* DEALS PAGE ROUTINE
*/
//go to deals page
//take screenshot

//check if offer-tiles are on page
// IF TRUE
  //click on offers-tiles link > go to link
  //take screenshot
  //go back to deals page
  //repeat for every offer-tile
//ElSE
 //MOVE ON

//go back to deals page
//click on promotional-tile > go to link
//take screenshot
//go back to deals page
//repeat for eveyr promotional-tile

//got back to deals page
//click on terms-&-conditions > go to link
//take screenshot

//end of routine
/////////////////////////////////////////////


/* //////////////////////////////////////////
* BOOKINGS PAGE ROUTINE
*/
//go to bookings page (make sure URL is to a promo booking)
//click on rccl shield icon > open exit-popup
//take screenshot

//click on cancel > close exit-popup
//wait 3 seconds

//click continue > go to occupancy page
//take screenshot 

//click continue > go to select room type
//take screenshot

//wait 3 seconds
//check if promo-code is on page
// IF TRUE
  //click on apply code btn
  //wait 3 seconds
  //click on continue btn
//ElSE
 //MOVE ON

//click interior room select btn > go to select option
//take screenshot

//click we pick your room > go to summary page
//take screenshot

//end of routine
/////////////////////////////////////////////


