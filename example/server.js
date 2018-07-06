const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const compression = require('compression');
const indexFileContent = fs.readFileSync(path.join(__dirname + '/../public/index.html'));
app.use(compression());
app.use(express.static('./public', {etag: false})); // etag: false, removes etag from response of static asset.
app.disable('x-powered-by'); // remove x-powered-by header.
app.disable('etag'); // Needed for removing etag from REST API response.
app.get('*', (req, res) => {
	res.sendFile(indexFileContent);
});
app.listen(port, () => console.log("Listening on port ", port, " !"));
