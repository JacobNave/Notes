const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('data.txt', (err, file) => {
      if(err){
        console.log(err);
      } else {
        console.log(file.toString());
        var noteArr = file.toString().split(',');
        const notes = noteArr.map(noteText => {
          return JSON.parse(noteText);
        });

        console.log('response');
        res.json({notes: notes});
        res.end();
      }
    });
  }
});

server.listen(3001);

console.log('Listening on port 3001...');
