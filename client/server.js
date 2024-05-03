const express = require("express");
const path = require("path");

const app = express();
const port = 443; // HTTPS port

// Configure Express app to serve React app in production
app.use(express.static(path.join(__dirname, "build")));

// All other routes serve the React app's index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build/index.html"));
});

require("greenlock-express")
	.init({
		packageRoot: __dirname,
		configDir: "./greenlock.d",

		// contact for security and critical bug notices
		maintainerEmail: "dylan@casper.network",

		// whether or not to run at cloudscale
		cluster: false
	})
	// Serves on 80 and 443
	// Get's SSL certificates magically!
	.serve(app);
