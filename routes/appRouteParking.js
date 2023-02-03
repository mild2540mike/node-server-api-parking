var ParkingController = require('../controllers/ParkingController');

module.exports = function (app) {

    app.post('/parking/getTicketDetailByCode', function (req, res) {
        console.log('/parking/getTicketDetailByCode', req.body)
        ParkingController.getTicketDetailByCode(req.body, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })

    app.post('/parking/insertParking', function (req, res) {
        console.log('/parking/insertParking', req.body)
        ParkingController.insertParking(req.body, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })

    app.post('/parking/insertParkingTicket', function (req, res) {
        console.log('/parking/insertParkingTicket', req.body)
        ParkingController.insertParkingTicket(req.body, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })

    app.post('/parking/UpdateParkingTicket', function (req, res) {
        console.log('/parking/UpdateParkingTicket', req.body)
        ParkingController.UpdateParkingTicket(req.body, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })

}