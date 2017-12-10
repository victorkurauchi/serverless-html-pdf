const page = require('webpage').create();
const system = require('system');

page.paperSize = {
  format: 'A4',
  orientation: 'portrait'
  // margin: {
  //   top: '1cm',
  //   bottom: '1cm'
  // },
  // footer: {
  //   height: '1cm',
  //   contents: phantom.callback(function (pageNum, numPages) {
  //     return pageNum + '/' + numPages
  //   })
  // }
};

console.log('Loading a web page');
// This will fix some things that Ill talk about in a second
// page.settings.dpi = '96';
console.log('Start settings')
page.settings.webSecurityEnabled = false;
page.settings.localToRemoteUrlAccessEnabled = true;
page.settings.loadImages = true;
page.content = system.args[1];
page.viewportSize = {
  width: 600,
  height: 800
};

var output = system.args[2];

console.log('Content');
console.log(page.content);

window.setTimeout(function () {
  console.log('Timeout 6 secs, lets go')
  page.render(output, { format: 'pdf' });
  phantom.exit(0);
}, 6000);


