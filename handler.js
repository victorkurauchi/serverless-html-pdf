'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

module.exports.convert = (event, context, callback) => {
  const outputPDF = path.resolve('/tmp/output.pdf');
  // const params = JSON.parse(event.body);
  // console.log('event', event)
  // const params = event.body;
  // console.log('params', params)
  // const html = unescape(params.html);
  // const html = event.html;
  // const phantomjs = path.resolve('bin/phantomjs-linux');
  const phantomjs = path.resolve('bin/phantomjs-mac');
  const config = path.resolve('lib/config.js');

  // console.log('html', typeof html);
  // console.log(html);
  let html = fs.readFileSync('./tests/index-sem-loadingcss.html', 'utf8')
  // console.log(html)
  
  console.log(html.length + " characters, " + bytesToSize(Buffer.byteLength(html, 'utf8')));

  if (fs.existsSync(outputPDF)) {
    fs.unlinkSync(outputPDF);
  }

  fs.closeSync(fs.openSync(outputPDF, 'w'));

  const childArgs = [
    config,
    html,
    outputPDF
  ];

  const child = spawn(phantomjs, childArgs);

  child.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  child.stderr.on('data', function (data) {
    console.log('exists output error', fs.existsSync(outputPDF));
    console.log('stderr: ' + data.toString());
    callback(data.toString(), {
      statusCode: 500,
      body: data.toString()
    });
  });

  child.on('exit', function (code) {
    console.log('output dir', outputPDF);
    console.log('exists output', fs.existsSync(outputPDF));
    console.log('child process exited with code ' + code.toString());
    const output = fs.readFileSync(outputPDF);
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials' : true
      },
      body: output.toString('base64')
    });
  });
}
