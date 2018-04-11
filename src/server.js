import Hapi from 'hapi';
import firebase from 'firebase';
var db = require('firebase')
import Inert from 'inert';
import Vision from 'vision';
import routes from './routes'

const server = new Hapi.Server();

// Create a server with a host and port
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000
});



server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});


firebase.initializeApp({
  serviceAccount: "../quiz-bf47b-firebase-adminsdk-6qw33-86da42e539.json",
  databaseURL: "https://quiz-bf47b.firebaseio.com/"
});
console.log('firebase database connection successful...');

server.route({

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {
        reply( 'Hello World!' );
    }

});

server.route(routes)

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});