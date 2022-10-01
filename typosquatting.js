const typosquotter = require('typosquotter');
const options = {}

console.log(
  typosquotter('youtube.com', options)
);

// repetition: [
//   'yyoutube.com',
//   'yooutube.com',
//   'youutube.com',
//   'youttube.com',
//   'youtuube.com',
//   'youtubbe.com',
//   'youtubee.com'
// ],
// subdomain: [
//   'y.outube.com',
//   'yo.utube.com',
//   'you.tube.com',
//   'yout.ube.com',
//   'youtu.be.com',
//   'youtub.e.com'
// ],
// switching: [
//   'oyutube.com',
//   'yuotube.com',
//   'yotuube.com',
//   'youutbe.com',
//   'youtbue.com',
//   'youtueb.com'
// ],
// tld: [
//   'youtube.ac',
//   'youtube.ad',
//   'youtube.ae',
//   ...
