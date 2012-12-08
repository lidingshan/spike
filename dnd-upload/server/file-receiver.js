var formidable = require('formidable');
var httpServer = require('http');
var util = require('util');
var fs = require('fs');
var path = require('path');

httpServer.createServer(function(req, resp) {
	if(req.url == "/upload" && req.method.toString() == 'POST') {
		var form = new formidable.IncomingForm();
		var uploaded_file;
		
		form.uploadDir = "c:\\temp\\";

		form.on('file', function(field, file) {
			uploaded_file = file.name;
			console.log('Received file:' + file.name);
			console.log(path.dirname(file.path));
			
			fs.rename(file.path, path.dirname(file.path) + '\\' + file.name, function(err){
				if (err) {
					console.error('rename failed' + err);
				}			
			});
		});
		
		
		form.on('end', function() {
			resp.writeHead(200, 
				{'content-type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'});
				
			resp.write("Uploaded file: " + uploaded_file);
			resp.write("\n");
			resp.end("Done");
		});	
		
		form.parse(req); 
		return;
	}
	else {
		resp.writeHead(200, 
			{'content-type': 'text/plain',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'X-Requested-With'});
		resp.end('Welcome to NodeJS');	
	}
	
}).listen(3000)

