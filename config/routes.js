var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router){
    // Render homepage from home.handlebars file
    router.get("/", function(req, res){
        res.render("home");
    });
    // Render saved articles page from saved.handlebars file
    router.get("/saved", function(req, res){
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res){
        headlinesController.fetch(function(error, docs){
            if(!docs || docs.insertedCount === 0){
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                })
            } else {
                res.json ({
                    message: "Added " + docs.insertedCount + " new articles!"
                })
            }
        })
    })
    router.get("/api/headlines", function (req, res){
        var query = {};
        if (req.query.saved){
            query = req.query
        }
        headlinesController.get(query, function(data){
            res.json(data)
        })
    })
    router.delete("/api/headlines/:id", function(req, res){
        var query = {}
        query._id = req.params._id;
        headlinesController.delete(query, function(error, data){
            res.json(data)
        })
    })
    router.patch("/api/headlines", function(req, res){
        headlinesController.update(req.body, function(error, data){
            res.json(data)
        })
    })
    router.get("/api/notes/:headline_id?", function (req, res){
        var query = {}
        if (req.params.headline_id){
            query._id = req.params.headline_id;
        }
        notesController.get(query, function(error, data){
            res.json(data)
        })
    })
    router.delete("/api/notes/:id", function(req, res){
        var query = {}
        query._id = req.params.id
        notesController.delete(query, function (error, data){
            res.json(data)
        })
    })
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data)
        })
    })
}