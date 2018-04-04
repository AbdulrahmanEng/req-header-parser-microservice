const express = require('express');
const logger = require('morgan');
const useragent = require('useragent');
const app = express();

app.use(logger('dev'));

app.get('/', (request, response)=>{
  const agent = (useragent.parse(request.headers['user-agent']));
  response.json({
    ipaddress: (request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress).split(',')[0],
    language: request.headers['accept-language'].split(',')[0],
    software: agent.os.toString()
  });
});

const listener = app.listen(process.env.PORT, ()=> console.log(`Listening on port ${listener.address().port}`));