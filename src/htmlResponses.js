const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

function getIndex(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
}

function getPage2(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page2);
  response.end();
}

function getPage3(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page3);
  response.end();
}

module.exports = { getIndex, getPage2, getPage3 };
