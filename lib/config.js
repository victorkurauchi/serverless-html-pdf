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

// This will fix some things that Ill talk about in a second
page.settings.dpi = '96';
page.content = system.args[1];
page.viewportSize = { width: 600, height: 600 };

var output = system.args[2];

window.setTimeout(function () {
  page.render(output, { format: 'pdf', quality: '100' });
  phantom.exit(0);
}, 200);