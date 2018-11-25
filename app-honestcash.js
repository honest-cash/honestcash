const express = require('express');
const app = express();
const port = 3010;
const cors = require('cors');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression');
const seo = require('./server/seo');

const axios = require("axios");

const isBot = (userAgent, push) => {
	userAgent = userAgent ? userAgent.toLowerCase() : "unknown user-agent";

	if (userAgent.indexOf("facebook") > -1 ||
		userAgent.indexOf("twitter") > -1 ||
		userAgent.indexOf("reddit") > -1 ||
		userAgent.indexOf("google") > -1 ||
		userAgent.indexOf("bing") > -1 ||
		userAgent.indexOf("bot") > -1 ||
		userAgent.indexOf("spider") > -1 ||
		userAgent.indexOf("quora") > -1 ||
		push == "true") {

		return true;
	}

	return false;
};

app.get('/*', function(req, res, next) {
	if (!req.headers.host) {
		 next();   
	} else {
	  	if (req.headers.host.match(/^www/) !== null ) {
    		res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
		} else {
    		next();     
		}
	}
});

app.use(compression({ filter: function(req,res) { return true; }} ));
app.use(cors({}));
app.use((req, res, next) => {
    res._uglifyMangle = true;
	
    next();
});


app.set('layout', 'bin');
//app.locals.pretty = false;
app.set('json spaces', 4);
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(expressLayouts);

/**
require('./config/passport')(passport);
app.use(session({ secret: 'ilovevicigo' }));
app.use(passport.initialize());
app.use(passport.session());
*/

app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(flash());
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/templates", express.static(__dirname + "/public/templates"));
app.use("/lib", express.static(__dirname + "/public/lib"));
app.use('/libs/', express.static(__dirname + '/node_modules'));
app.use('/libs', express.static(__dirname + '/node_modules'));
app.use("/", express.static(__dirname + "/public/"));

app.get("/91", (_, res) => res.redirect(301, '/dagur/lets-talk-spec-3-remove-the-transaction-undersize-limit-91'));

/**
 * Server rendering for SEO purposes
 */
app.get("/:username/:alias", async (req, res, next) => {
	const userAgent = req.headers['user-agent'];
	const crawlerView = req.query.crawlerView;

	if (!isBot(userAgent, crawlerView)) {
		return next();
	}

	const url = `https://honest.cash/api/post/${req.params.alias}`;
	const response = await axios.get(url);
	const post = response.data;
	const seoData = seo.getForPost(post);

	if (!post) {
		res.status(404).render("Not found");

		return;
	}

	res.render('postBody.ejs', {
		layout: 'crawlerLayout',
		SEO: seoData,
		post
	});
});

app.get("/*", (req, res, next) => {
	res.sendfile("app.html", { root: __dirname + "/public" });
});

var server = require('http').Server(app);

server.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Honest.Cash app listening at http://%s:%s', host, port);
});
