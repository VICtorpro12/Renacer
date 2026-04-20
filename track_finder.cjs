const https = require('https');

function search(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const result = JSON.parse(data);
      if (result.results && result.results.length > 0) {
        const track = result.results[0];
        // now find on songlink
        const songlinkUrl = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(track.trackViewUrl)}`;
        https.get(songlinkUrl, (res2) => {
            let data2 = '';
            res2.on('data', chunk => data2 += chunk);
            res2.on('end', () => {
                const songlink = JSON.parse(data2);
                if (songlink.linksByPlatform && songlink.linksByPlatform.spotify) {
                    console.log(query, 'Spotify URL:', songlink.linksByPlatform.spotify.url);
                } else {
                    console.log(query, 'No spotify link found');
                }
            });
        })
      } else {
        console.log(query, 'Not found on iTunes');
      }
    });
  });
}

search(process.argv[2]);
