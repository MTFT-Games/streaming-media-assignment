const fs = require('fs');
const path = require('path');

function loadMedia(request, response, filename, contentType) {
  const file = path.resolve(__dirname, filename);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => stream.pipe(response));
    stream.on('error', (streamErr) => response.end(streamErr));

    return stream;
  });
}

function getParty(request, response) {
  loadMedia(request, response, '../client/party.mp4', 'video/mp4');
}

function getBling(request, response) {
  loadMedia(request, response, '../client/bling.mp3', 'audio/mpeg');
}

function getBird(request, response) {
  loadMedia(request, response, '../client/bird.mp4', 'video/mp4');
}

module.exports = { getParty, getBling, getBird };
