var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	mime = {
		".js" : "text/javascript",
		".css" : "text/css",
		".html" : "text/html",
		".json" : "application/json"
	},
	routes = {
		"/" : function(req, res) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(fs.readFileSync('index.html', 'utf-8'));
		}
	},
	server = http.createServer(function(req,res){

		var _path = path.join(__dirname,req.url);
		if (path.extname(_path) !== "") {
			fs.exists(_path, function(exists) {
				if (exists) {
					fs.readFile(_path, function(err, data) {
						if (!err) {
							res.writeHead(200, {"Content-Type" : mime[path.extname(_path)]});
							res.end(data);
						}
					});
				} else {
					// Render 404.html
					res.writeHead(404, {"Content-Typye" : "text/html"});
					res.end("Error 404: Page/File not found!");
				}
			});

			return;

		}
		try {
			routes[req.url](req,res);
		}
		catch(e) {
			// Do Nothing
		}
		// Render 404 page
		res.writeHead(404, {"Content-Type" : "text/html"});
		res.end("Error 404: Page/File not found!");

	});

server.listen(3000);

console.log("Server listening to port 3000");