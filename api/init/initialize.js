<<<<<<< Upstream, based on origin/master
/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
module.exports = {
	initExpress: function () {
		var express = require("express");
		var passport = require("passport");
		var xsenv = require("@sap/xsenv");
		var xssec = require("@sap/xssec");
		var xsHDBConn = require("@sap/hdbext");
		var logging = require("@sap/logging");
		var appContext = logging.createAppContext();

		//Initialize Express App for XS UAA and HDBEXT Middleware
		// passport use (path, callback)
		var app = express();
		passport.use("JWT", new xssec.JWTStrategy(
			xsenv.getServices({
				uaa: { tag: "xsuaa" }
			}).uaa
		));
		
		app.use(passport.initialize()); // initializes passport
		var hanaOptions = xsenv.getServices({
			hana: { tag: "hana" }
		});
		//console.info("**********************************");
		//console.info(JSON.stringify(hanaOptions));
		//console.info("**********************************");
		// using passport, authenticate with the JWT
		// using xsHDBconnection, init its middleware using the retrieved hana object
		app.use(
			passport.authenticate("JWT", { session: false }),
			xsHDBConn.middleware(hanaOptions.hana)
		);
		return app;
	},

	initXSJS: function (app) {
		var xsjs = require("@sap/xsjs");
		var xsenv = require("@sap/xsenv");
		var options = {
			//	anonymous : true, // remove to authenticate calls
			redirectUrl: "/index.xsjs",
			context: {
				base: global.__base,
				env: process.env,
				answer: 42
			}
		};

		//configure HANA
		try {
			options = Object.assign(options, xsenv.getServices({
				hana: {
					tag: "hana"
				}
			}));
			options = Object.assign(options, xsenv.getServices({
				secureStore: {
					tag: "hana"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// configure UAA
		try {
			options = Object.assign(options, xsenv.getServices({
				uaa: {
					tag: "xsuaa"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// start server
		var xsjsApp = xsjs(options);
		app.use(xsjsApp);
	}
=======
/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
module.exports = {
	initExpress: function () {
		var express = require("express");
		var passport = require("passport");
		var xsenv = require("@sap/xsenv");
		var xssec = require("@sap/xssec");
		var xsHDBConn = require("@sap/hdbext");
		var logging = require("@sap/logging");
		var appContext = logging.createAppContext();

		//Initialize Express App for XS UAA and HDBEXT Middleware
		// passport use (path, callback)
		var app = express();
		passport.use("JWT", new xssec.JWTStrategy(
			xsenv.getServices({
				uaa: { tag: "xsuaa" }
			}).uaa
		));
		
		app.use(passport.initialize()); // initializes passport
		var hanaOptions = xsenv.getServices({
			hana: { tag: "hana" }
		});
		//console.info("**********************************");
		//console.info(JSON.stringify(hanaOptions));
		//console.info("**********************************");
		// using passport, authenticate with the JWT
		// using xsHDBconnection, init its middleware using the retrieved hana object
		app.use(
			passport.authenticate("JWT", { session: false }),
			xsHDBConn.middleware(hanaOptions.hana)
		);
		return app;
	},

	initXSJS: function (app) {
		var xsjs = require("@sap/xsjs");
		var xsenv = require("@sap/xsenv");
		var options = {
			//	anonymous : true, // remove to authenticate calls
			redirectUrl: "/index.xsjs",
			context: {
				base: global.__base,
				env: process.env,
				answer: 42
			}
		};

		//configure HANA
		try {
			options = Object.assign(options, xsenv.getServices({
				hana: {
					tag: "hana"
				}
			}));
			options = Object.assign(options, xsenv.getServices({
				secureStore: {
					tag: "hana"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// configure UAA
		try {
			options = Object.assign(options, xsenv.getServices({
				uaa: {
					tag: "xsuaa"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// start server
		var xsjsApp = xsjs(options);
		app.use(xsjsApp);
	}
>>>>>>> 2328fa6 ui and api modules. includes devices endpoint
};