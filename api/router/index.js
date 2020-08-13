<<<<<<< Upstream, based on origin/master
"use strict";

module.exports = function(app) {
	// [express] app.use mounts the middleware functions (path, functions)
	var wavePressSvc = require("./routes/wavepress")();
	app.use("/wpsvc", wavePressSvc);
	app.use("/wpsvc/device", wavePressSvc);
	app.use("/wpsvc/devices", wavePressSvc);
=======
"use strict";

module.exports = function(app) {
	// [express] app.use mounts the middleware functions (path, functions)
	var wavePressSvc = require("./routes/wavepress")();
	app.use("/wpsvc", wavePressSvc);
>>>>>>> 2328fa6 ui and api modules. includes devices endpoint
};