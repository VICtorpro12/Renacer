const https = require('https');

function search(query) {
  const postData = `q=${encodeURIComponent(query)}`;
  const options = {
    hostname: 'lite.duckduckgo.com',
    port: 443,
    path: '/lite/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const regex = /https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/g;
      const matches = data.match(regex);
      if (matches && matches.length > 0) {
        console.log(query, 'Found:', matches[0]);
      } else {
        console.log(query, 'No matches');
      }
    });
  });

  req.on('error', (e) => {
    console.error(query, e);
  });

  req.write(postData);
  req.end();
}

search('site:open.spotify.com/track theta waves');
search('site:open.spotify.com/track gamma waves');
search('site:open.spotify.com/track alpha waves');
search('site:open.spotify.com/track deep sleep hypnosis');
