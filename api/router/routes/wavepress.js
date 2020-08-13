<<<<<<< Upstream, based on origin/master
/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";
var express = require("express");
var bodyParser = require("body-parser");

function handleErrorResponse(err, res, response) {
	response.errors = [ err.message.toString() ];
	res.type("application/json")
		.status(500)
		.send(response);
}

function handleCorrectResponse(res, response) {
	res.type("application/json")
		.status(200)
		.send(response);
}

module.exports = function() {
	var router = express.Router();
	router.use(bodyParser.json());
	
	router.get("/", function(req, res) { res.send("Hello wavepress!"); });
	
	router.get("/devices", function(req, res) {
		var response = { data: [], errors: [] };
		var query = " SELECT \"ID\", \"DE_UUID\", \"TEMP_F\", \"REC_DT\" FROM \"wavepress.db.models::CV_DEVICES\" ORDER BY \"ID\" DESC; ";
		var client = req.db;
		
		client.prepare(query, 
			function(err, statement) {
				if(err) {
					handleErrorResponse(err, res, response);
					return;
				}
				statement.exec([],
					function(err, results){
						if(err) {
							handleErrorResponse(err, res, response);
							return;
						}
						else {
							response.data = results;
							handleCorrectResponse(res, response);
						}
					});
			});
	});
	
	// using post to insert/update
	router.post("/device", function(req, res) {
		var response = { data : [], errors: []};
		var client = req.db;
		var hdbext = require("@sap/hdbext");
		
		hdbext.loadProcedure(client, null, "wavepress.db.procs::SP_DEVICE_UPSERT", function(err, sp) {
			if(err) {
				handleErrorResponse(err, res, response);
				return;
			}
			var device = [];
			device.push(req.body);
			sp({IN_DEVICE: device }, function(err, parameters, result) {
				if(err){
					handleErrorResponse(err, res, response);
					return;
				}
				response.data = parameters.OUT_ID;
				handleCorrectResponse(res, response);
			});
		});
	});
	
	router.delete("/device/:id*?", function(req,res) {
		var response = { data : [], errors: []};
		var client = req.db;
		var hdbext = require("@sap/hdbext");
		hdbext.loadProcedure(client, null, "wavepress.db.procs::SP_DEVICE_DELETE", function(err, sp) {
			if(err) {
				handleErrorResponse(err, res, response);
				return;
			}
			var deviceId = req.params.id || null;
			sp({ IN_DEVICE_ID: deviceId }, function(err, parameters, result) {
				if(err){
					handleErrorResponse(err, res, response);
					return;
				}
				response.data = parameters.IS_DELETED === 1 ? "deletion successful" : "error while deleting " + (deviceId.toString() || "");
				handleCorrectResponse(res, response);
			});
		});
	});
	
	return router;
=======
/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";
var express = require("express");
function handleErrorResponse(err, res, response) {
	var errors = [ err.toString() ];
	res.type("application/json")
		.status(500)
		.send(response);
}

module.exports = function() {
	var router = express.Router();
	router.get("/", function(req, res) { res.send("Hello wavepress!"); });
	
	router.get("/devices", function(req, res) {
		var response = { data: [], errors: [] };
		var query = " SELECT \"ID\", \"DE_UUID\", \"TEMP_F\", \"REC_DT\" FROM \"wavepress.db.models::CV_DEVICES\"; ";
		var client = req.db;
		
		client.prepare(query, 
			function(err, statement) {
				if(err) {
					handleErrorResponse(err, res, response);
					return;
				}
				statement.exec([],
					function(err, results){
						if(err) {
							handleErrorResponse(err, res, response);
							return;
						}
						else {
							response.data = results;
							res.type("application/json").status(200).send(response);
						}
					});
			});
	});
	return router;
>>>>>>> 2328fa6 ui and api modules. includes devices endpoint
};