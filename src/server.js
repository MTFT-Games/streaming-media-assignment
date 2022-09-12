const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/party.mp4': mediaHandler.getParty,
  '/page2': htmlHandler.getPage2,
  '/bling.mp3': mediaHandler.getBling,
  '/page3': htmlHandler.getPage3,
  '/bird.mp4': mediaHandler.getBird,
};

function onRequest(request, response) {
  console.log(request.url);

  if (urlStruct[request.url]) {
    urlStruct[request.url](request, response);
  } else {
    urlStruct['/'](request, response);
  }
}

http.createServer(onRequest).listen(port, () => console.log(`Listening on ${port}`));
