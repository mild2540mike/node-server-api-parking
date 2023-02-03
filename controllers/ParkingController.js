const e = require('express');
var Parking = require('../models/ParkingModel');

var Task = function (task) {
    this.task = task.task;
};

Task.getTicketDetailByCode = async function getTicketDetailByCode(data, result) {
    var ticket_datail = await Parking.getTicketDetailByCode(data);
    result(ticket_datail);
}

Task.insertParking = async function insertParking(data, result) {
    for (var i = 0; i <= data.spot_number.length - 1; i++) {
        console.log("Qty: " + data.spot_number[i]);
        var spot_number = data.spot_number[i];
        var last_code = await Parking.getLastCode();
        var response = await Parking.insertParking(data, last_code, spot_number);
    }
    response.spot_number = spot_number;
    result(response);  
}

Task.insertParkingTicket = async function insertParkingTicket(data, result) {
    var last_vehicle = await Parking.getLastVehicle();
    var last_ticket = await Parking.getLastTicket();
    var parking_Code = await Parking.getParkingCode(data);
    var check_plate = await Parking.getPlateByCode(data);

    if (parking_Code !== null) {
        if (data.license_plate !== check_plate) {
            var response = await Parking.insertParkingTicket(data, last_vehicle, last_ticket, parking_Code);
            result(response); 
        } else {
            const require = {
                data: "duplicate license plate",
                error: [],
                query_result: false,
                server_result: true
            }
            result(require);
        }
    } else {
        const require = {
            data: "Not available because parking full",
            error: [],
            query_result: false,
            server_result: true
        };
        result(require);
    }
}

Task.UpdateParkingTicket = async function UpdateParkingTicket(data, result) {
    var ticket_Code = await Parking.getTicketByCode(data);
    var parkingBy_Code = await Parking.getParkingByCode(data);
    var paid = await Parking.getPriceByCode(data);
    var response = await Parking.UpdateParkingTicket(data, ticket_Code, parkingBy_Code, paid);
    result(response);  
}

module.exports = Task;