require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression');
const seo = require('./server/seo');
const axios = require("axios");

const port = process.env.PORT;

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

const renderFeed = async (req, res, next) => {
	const userAgent = req.headers['user-agent'];
	const crawlerView = req.query.crawlerView;

	if (!isBot(userAgent, crawlerView)) {
		return next();
	}

	let urlQuery = '';

	if (req.params.hashtag) {
		urlQuery += "?hashtag=" + req.params.hashtag;
	}

	const url = `https://honest.cash/api/feeds${urlQuery}`;
	const response = await axios.get(url);
	const feeds = response.data;
	const seoData = seo.metaDefault;

	if (!feeds) {
		res.status(404).render("Not found");

		return;
	}

	res.render('feedBody.ejs', {
		layout: 'crawlerFeedLayout',
		SEO: seoData,
		feeds
	});
}

/**
 * Server rendering for feed
 */
app.get("/", renderFeed);
app.get("/top", renderFeed);
app.get("/new", renderFeed);
app.get("/hashtag/:hashtag", renderFeed);

/**
 * Server rendering for profiles
 */
app.get("/profile/:username", async (req, res, next) => {
	const userAgent = req.headers['user-agent'];
	const crawlerView = req.query.crawlerView;

	if (!isBot(userAgent, crawlerView)) {
		return next();
	}

	let profileRes;
	let feedRes;
	let profile;
	let feeds;

	try {
		profileRes = await axios.get(`https://honest.cash/api/user/${req.params.username}`);

		profile = profileRes.data;

		if (!profile) {
			res.status(404).render("Not found");
	
			return;
		}

		feedRes = await axios.get(`https://honest.cash/api/feeds?userId=${profile.id}`);
		feeds = feedRes.data;
	} catch (err) {
		console.error(err);

		return res.status(500).send("Internal Server Error");
	}

	const seoData = seo.getForProfile(profile);

	res.render('profileBody.ejs', {
		layout: 'crawlerProfileLayout',
		SEO: seoData,
		profile,
		feeds
	});
});

/**
 * Server rendering for posts
 */
app.get("/:username/:alias", async (req, res, next) => {
	const userAgent = req.headers['user-agent'];
	const crawlerView = req.query.crawlerView;

	if (!isBot(userAgent, crawlerView)) {
		return next();
  }

  const postBaseUrl = "https://honest.cash/api/post";
  const url = `${postBaseUrl}/${req.params.alias}`;
  
	const post = (await axios.get(url)).data;
  const responses = (await axios.get(`${postBaseUrl}/${post.id}/responses`)).data;
  const upvotes = (await axios.get(`${postBaseUrl}/${post.id}/upvotes`)).data;

	const seoData = seo.getForPost(post);

	if (!post) {
		res.status(404).render("Not found");

		return;
	}

	res.render('postBody.ejs', {
		layout: 'crawlerLayout',
		SEO: seoData,
    post,
    responses,
    upvotes
	});
});

// Editor paths
for (let editorPath of [ "/write", "/edit/:postId", "/write/response/:parentPostId" ]) {
	app.get(editorPath, (_, res) => res.sendfile("editor.html", { root: __dirname + "/public" }));
}

// all other paths
app.get("/*", (_, res) => res.sendfile("app.html", { root: __dirname + "/public" }));

var server = require('http').Server(app);

server.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Honest.Cash app listening at http://%s:%s', host, port);
});
