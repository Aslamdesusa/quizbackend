// var admin = require("firebase-admin");
var firebase = require("firebase")
var Joi = require('joi');

console.log('i am here.....');

const routes =[						
    {
        method:'GET',
        path:'/cool',
        handler: function(request, reply){
        	console.log('hello');
        	reply('hellio papa');
        }
    },
    {
    	method: 'POST',
    	path: '/signup',
    	config: {
    		// include this route in swagger documentation
    		tags: ['api'],
    		description: 'user signup with his bit details',
    		notes: 'in this route user can signup in this app with his bit details',
    		validate: {
    			payload: {
    				firstname : Joi.string().required(),
            		lastname : Joi.string().required(),
            		email : Joi.string().required(),
            		birthday : Joi.string().required(),
            		gender : Joi.string().required(),
            		phone : Joi.string().required()
    			}
    		} 
    	},
    	handler: function(request, reply){
    		var ref = firebase.database().ref('users')
    		var newUser = ({
				"firstname": request.payload.firstname,
				"lastname": request.payload.lastname,
				"email": request.payload.email,
				"birthday": request.payload.birthday,
				"gender": request.payload.gender,
				"phone": request.payload.phone,
			});
			ref.push(newUser)
			if (newUser.length === 0) {
				reply({
					statusCode: 401,
					message: 'Operation not successfully Completed there is something messing'
				});
			}else{
				reply({
					statusCode: 200,
					message: "Operation successfully Completed",
					data: newUser
				});
			}
    	}
    }
]
export default routes; 