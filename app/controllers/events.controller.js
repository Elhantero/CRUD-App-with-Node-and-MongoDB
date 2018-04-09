const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate
};

    /*
    ** Show all events
    */
    function showEvents(req, res){
        //get all events
        Event.find({},(err, events) =>{
            if (err) {
                res.status(404);
                res.send('Events not found!');
            }

            //return a view with data
            res.render('pages/events', {  events: events  });
        });
    };

    
    /*
    ** Show a single event
    */
    function showSingle(req, res){
        //get a single event
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            if (err) {
                res.status(404);
                res.send('Event not found');
            }

        res.render('pages/single', {  
                event: event,
                success: req.flash('success')
            });    
        });         
    };

    
    /*
    ** Seed our database
    */
    function seedEvents(req, res){
        //create some events
        const events = [
            {   
                name: 'Basketball',
                description: 'Throwing into a basket'       
            },
            {   
                name: 'Swimming',
                description: 'Michael Fhelps the best'       
            },
            {   
                name: 'Footbal',
                description: 'Ronaldo the king'       
            },
            {   
                name: 'Ping pong',
                description: 'hernya'       
            }
        ];

        //use the Event model to insert/save
        Event.remove({}, () => {
            for(event of events){
                var newEvent = new Event(event);
                newEvent.save();
            }
        });

        //seeded!
        res.send('Database seeded');
    };

    /*
    ** Show the create form
    */ 
    function showCreate(req, res){
        res.render('pages/create', {
            errors: req.flash('errors')
        });
    };

    /*
    ** Process the create form
    */ 
    function processCreate(req, res){
        //validate information
        req.checkBody('name', 'Name is required.').notEmpty();       
        req.checkBody('description', 'Description is required.').notEmpty();
        
        //if there are errors, redirect and save errors to flash
        const errors = req.validationErrors();
        if ( errors ) {
            req.flash('errors', errors.map(err => err.msg));
            return res.redirect('/events/create');
        } 

        //create a new event
        const event = new Event({
            name: req.body.name,
            description: req.body.description
        });

        //save the event
        event.save((err) => {
            if (err) {
                throw err;
            }   
            //set a successful flash
            req.flash('success', 'Successfuly created event!');

            //redirect to the newly created event
            res.redirect(`/events/${event.slug}`);
        });
    };
