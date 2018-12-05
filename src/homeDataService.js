var mongoose = require('mongoose');

var homeSchema = new mongoose.Schema({
    streetName: {type: String},
    streetNumber: {type: Number}
});


var Home = mongoose.model('Home', homeSchema);

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/homes');

exports.create = function(requestBody, response) {

    var model = new Home({
        id: "10",
        streetName: "Generala Stefanika",
        streetNumber: 9
    });

    var home = toHome(requestBody, model);
    var id = requestBody.id;
    home.save(function(error) {
        if (!error) {
            home.save();
        } else {
            console.log('aaaa');
            model.findOne({id: id}), function(error, data) {
                if (error) {
                    console.log(error);
                    if (response != null) {
                        response.writeHead(500, {'Content-Type' : 'text/plain'});
                        response.end('Internal server error');
                    }
                    return;
                } else {
                    var home = toHome(requestBody, model);
                    if (!data) {
                        console.log('The home does not exist. It will be created.');
                        home.save(function(error) {
                            if (!error) {
                                home.save();
                            } else {
                                console.log(error);
                            }
                        });
                        if (response != null) {
                            response.writeHead(201, {'Content-Type' : 'text/plain'});
                            response.end('Created');
                        }
                        return;
                    } else {
                        console.log('Updatine home with id: ' + id);
                        data.id = home.id;
                        data.streetName = home.streetName;
                        data.streetNumber = home.streetNumber;
                        data.save(function(error) {
                            if (!error) {
                                data.save();
                                response.end('Updated');
                                console.log('Successfuly updated home with id: ' + id);
                            } else {
                                console.log(error);
                            }
                        })
                    }
                }
            }
        }
    })
};

function toHome(body) {
    return new Home({
        id: body.id,
        streetName: body.streetName,
        streetNumber: body.streetNumber
    });
};
