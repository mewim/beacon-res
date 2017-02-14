var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Serve static assets from the /public folder
app.use(express.static('public'));

app.use('/api', require('./api/index.js'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


