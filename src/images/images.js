// import * as Interface from 'piarch-a-interfaces';
const churchImage = require('./map/church.png');
const monumentImage = require('./map/monument.png');
const museumImage = require('./map/museum.png');
const palaceImage = require('./map/palace.png');
const shopImage = require('./map/shop.png');
const bicycleImage = require('./icons/bicycle.png');
const hikerImage = require('./icons/hiker.png');
const trekkingImage = require('./icons/trekking.png');

export default {
  // TODO uncommenting this breaks the app
  // [Interface.Marker.Church]: churchImage,
  Church: churchImage,
  Monument: monumentImage,
  Museum: museumImage,
  Palace: palaceImage,
  Shop: shopImage,
  Bicycle: bicycleImage,
  Hiker: hikerImage,
  TrekkingImage: trekkingImage,
};
