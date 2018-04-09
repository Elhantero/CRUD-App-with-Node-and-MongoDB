const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents
};

    /*
    ** Show all events
    */
    function showEvents(req, res){
        //return a view with data
        res.render('pages/events', {  events: events  });
    };

    
    /*
    ** Show a single event
    */
    function showSingle(req, res){
        //get a single event
        const event = {
                name: 'Basketball',
                slug: 'basketball',
                description: 'Throwing into a basket'};
        
                res.render('pages/single', {  event: event  });
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
