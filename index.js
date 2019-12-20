const glob = require('glob');
const imagesToPdf = require('images-to-pdf');

//IMPORT CRAWLER METHODS
const lac = require('./functions/lac/');

const imagesReady = {
  aus: false,
  deu: false,
  esp: false,
  gbr: false,
  irl: false,
  ita: false,
  lac: false,
  mex: false,
  nor: false,
  sgp: false,
  swe: false
}

function checkImages(data){

  let promise = new Promise((resolve, reject)=>{
    let ready = [];
    let escapeCounter = 0;
    let interval = setInterval(() => {

      for (const key in data) {
        if (data[key] === true) {
          ready.push(key);
        }
      }

      if(ready.length !== 0){
        resolve(ready);
        clearInterval(interval);
      } 

      if(escapeCounter === 60){
        reject('No images found');
        clearInterval(interval);
      }

      escapeCounter++;

    }, 1000);
  });

  return promise;

}

function setImageReady(market){
  imagesReady[market] = true;
}

//LAC
lac(
  {
    url: 'https://www.royalcaribbean.com/lac/es/cruises/',
    desktopImagePath: 'img/lac/desktop/',
    mobileImagePath: 'img/lac/mobile/',
    page: 'cruise-search',
    market: 'lac',
    selector: '.itinerary-card-component',
  },
  setImageReady
);

//LAC BOOKING + EXIT-POPUP
// lac(
//   {
//     url: 'https://www.royalcaribbean.com/lac/es/booking/stateroom?sailDate=2020-01-06&shipCode=EN&packageCode=EN04W066&destinationCode=CARIB&accessCabin=false&selectedCurrencyCode=USD',
//     desktopImagePath: 'img/lac/desktop/',
//     mobileImagePath: 'img/lac/mobile/',
//     page: 'booking',
//     country: 'arg',
//     selector: '.card.card--main',
//     click: {
//       button: '[data-open="modal"]'
//     }
//   }
// );

//LAC BOOKING + KSF
// lac(
//   {
//     url: 'https://www.royalcaribbean.com/lac/es/booking/occupancy?accessCabin=false&connectedRooms=false&destinationCode=CARIB&packageCode=EN04W066&sailDate=2020-01-06&selectedCurrencyCode=USD&shipCode=EN',
//     desktopImagePath: 'img/lac/desktop/',
//     mobileImagePath: 'img/lac/mobile/',
//     page: 'booking-ksf-',
//     country: 'arg',
//     selector: '.card.card--main',
//   }
// );

/**
 * MEXICO SECTION
 **/

/**
 * NORWAY SECTION
 **/

/**
 * SINGAPORE SECTION
 **/

/**
 * SWEDEN SECTION
 **/

//CHECKS TO SEE IF IMAGES ARE READY AND RETURN THE IMAGE PATHS 
// function checkImagesReady(subPath){

//   function getDirectories(path, callback){
//     glob(path + '**/**/*', callback);
//   }
  
//   //GET THE DIRECTORIES
//   getDirectories('img/' + subPath, (err, res)=>{
//     if(err){
//       console.log('Error', err);
//     }else{
//       imagePaths = [...res];
//       const finalPaths = sortImagePaths(imagePaths);
//       try{
//         createImagesPDF(finalPaths);
//       }catch(err){
//         console.error(err);
//       }
//     }
//   });

//   //SORT THE IMAGE PATHS
//   function sortImagePaths(imagePaths){

//     let paths = [];

//     imagePaths.forEach((path, i)=> {
//       if(path.indexOf('.jpg') !== -1){
//         paths.push(path);
//       }
//     });

//     return paths;
//   }

//   //CREATE THE PDF
//   async function createImagesPDF(imagePaths, market){
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0');
//     let yyyy = today.getFullYear();

//     today = mm + '-' + dd + '-' + yyyy;

//     console.log(today);
//     console.log(imagePaths);

//     await imagesToPdf(imagePaths, 'img/'+market+'/report/'+market+'-'+today+'.pdf');
//   }

// }

//CHECK IMAGES ON INTERVAL
// var timer = setInterval(() => {
//   for (const key in imagesReady) {
//     if (imagesReady[key] === true) {
//       checkImagesReady(key);
//       clearInterval(timer);
//     }
//   }
// }, 5000);

async function captainBotSparrow(){
  try{
    let markets = await checkImages(imagesReady);
    console.log(markets);
  }catch(err){
    console.error(err);
  }
}

captainBotSparrow();
