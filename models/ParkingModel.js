var sql = require('./BaseModel');

var Task = function (task) {
    this.task = task.task;
};

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
 return (
    [
     date.getFullYear(),
     padTo2Digits(date.getMonth() + 1),
     padTo2Digits(date.getDate()),
    ].join('-') +
     ' ' +
    [
     padTo2Digits(date.getHours()),
     padTo2Digits(date.getMinutes()),
     padTo2Digits(date.getSeconds()),
    ].join(':')
 );
}

Task.getTicketByCode = function getTicketByCode(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT t1.ticket_id AS ticket_Code FROM parking_tickets t1 WHERE t1.vehicles_id = (SELECT t2.vehicles_id FROM vehicles t2 WHERE t2.license_plate = '" + data.license_plate + "')";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(res[0].ticket_Code);
            }
        });
    });
}

Task.getParkingByCode = function getParkingByCode(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT tbl.parking_id AS parkingBy_Code FROM parking_lots tbl WHERE tbl.parking_id = (SELECT t1.parking_id FROM parking_tickets t1 WHERE t1.vehicles_id = (SELECT t2.vehicles_id FROM vehicles t2 WHERE t2.license_plate = '" + data.license_plate + "'))";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(res[0].parkingBy_Code);
            }
        });
    });
}

Task.getPlateByCode = function getPlateByCode(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT t1.license_plate AS check_plate FROM vehicles t1 WHERE t1.license_plate = '" + data.license_plate + "' ";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(((Object.keys(res).length === 0)? null: res[0].check_plate));

                
            }
        });
    });
}

Task.getStatusBy = function getStatusBy(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT t1.license_plate AS check_plate FROM vehicles t1 WHERE t1.license_plate = '" + data.license_plate + "' ";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(res[0].check_plate);
            }
        });
    });
}

Task.insertParking = function insertParking(data, last_code, spot_number) {
    return new Promise(function (resolve, reject) {
        var str = "INSERT INTO parking_lots (parking_id, spot_number, status, floor, type_id)"
            + " VALUES ('" + last_code + "', "
            + " '" + spot_number + "', "
            + " 'free', "
            + " '" + data.floor + "', "
            + " '" + data.type_id + "') ";

        console.log("insertParking>>", str);
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });
    });
}

Task.insertParkingTicket = function insertParkingTicket(data, last_vehicle, last_ticket, parking_Code) {
    return new Promise(function (resolve, reject) {
        var str = "INSERT INTO vehicles (vehicles_id, license_plate, make, model, color, type_id)"
            + " VALUES ('" + last_vehicle + "', "
            + " '" + data.license_plate + "', "
            + " '" + data.make + "', "
            + " '" + data.model + "', "
            + " '" + data.color + "', "
            + " '" + data.type_id + "') ";

        var str2 = "INSERT INTO parking_tickets (ticket_id, start_time, vehicles_id, parking_id)"
            + " VALUES ('" + last_ticket + "', "
            + " '" + formatDate(new Date()) + "', "
            + " '" + last_vehicle + "', "
            + " '" + parking_Code + "') ";
        
        var str3 = "UPDATE parking_lots "
            + " SET status = 'unavailable'"
            + " WHERE parking_id = '" + parking_Code + "'";

        console.log("insertParking>>vehicles", str);
        console.log("insertParking>>parking_tickets", str2);
        console.log("updateParking>>parking_lots", str3);
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });

        sql.query(str2, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });

        sql.query(str3, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });
    });
}

Task.UpdateParkingTicket = function UpdateParkingTicket(data, ticket_Code, parkingBy_Code, paid) {
    return new Promise(function (resolve, reject) {
        var str = "UPDATE parking_tickets"
            + " SET paid = '" + paid + "',"
            + " end_time = '" + formatDate(new Date()) + "'"
            + " WHERE ticket_id = '" + ticket_Code + "'";
        
        var str1 = "UPDATE parking_lots "
            + " SET status = 'free'"
            + " WHERE parking_id = '" + parkingBy_Code + "'";

        console.log("updateParking>>parking_tickets", str);
        console.log("updateParking>>parking_lots", str1);
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });

        sql.query(str1, function (err, res) {
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    server_result: true
                };
                resolve(require);
            }
            else {
                const require = {
                    data: res,
                    error: [],
                    query_result: true,
                    server_result: true
                };
                resolve(require);
            }
        });
    });
}

Task.getParkingCode = function getParkingCode(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT t1.parking_id AS parking_Code FROM parking_lots t1 WHERE t1.`status` = 'free' AND t1.type_id = '" + data.type_id + "' ORDER BY t1.spot_number ASC LIMIT 1";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(((Object.keys(res).length === 0)? null: res[0].parking_Code));
            }
        });
    });
}

Task.getPriceByCode = function getPriceByCode(data) {
    return new Promise(function (resolve, reject) {
        var str = "SELECT (TIMESTAMPDIFF(HOUR, t1.start_time, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'))) * (SELECT (t2.price/24) AS price FROM vehicles_types t2 WHERE t2.type_id = (SELECT tbl1.type_id FROM vehicles tbl1 WHERE tbl1.license_plate = '" + data.license_plate + "')) AS paid "
        + " FROM parking_tickets t1 "
        + " WHERE t1.vehicles_id = (SELECT t1.vehicles_id FROM vehicles t1 WHERE t1.license_plate = '" + data.license_plate + "') ";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {                
                resolve(res[0].paid);
            }
        });
    });
}

Task.getLastCode = function getLastCode() {
    return new Promise(function (resolve, reject) {
        var str = "SELECT IFNULL(CONCAT('P',LPAD( SUBSTRING(MAX(t1.parking_id), 2, 5)+1,4,'0')), 'P0001') AS last_code  FROM `parking_lots` t1";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {
                resolve(res[0].last_code);
            }
        });
    });
}

Task.getLastFloor = function getLastFloor() {
    return new Promise(function (resolve, reject) {
        var str = "SELECT IFNULL(CONCAT(RPAD(MAX(t1.`floor`)+1,1,'0'),'f'), '1f') AS last_floor  FROM `parking_lots` t1";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {
                resolve(res[0].last_floor);
            }
        });
    });
}

Task.getLastVehicle = function getLastVehicle() {
    return new Promise(function (resolve, reject) {
        var str = "SELECT IFNULL(CONCAT('V',LPAD( SUBSTRING(max(t1.vehicles_id), 2, 5)+1,4,'0')), 'V0001') AS last_vehicle  FROM `vehicles` t1";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {
                resolve(res[0].last_vehicle);
            }
        });
    });
}

Task.getLastTicket = function getLastTicket() {
    return new Promise(function (resolve, reject) {
        var str = "SELECT IFNULL(CONCAT('TI',LPAD( SUBSTRING(max(t1.ticket_id), 3, 5)+1,4,'0')), 'TI0001') AS last_ticket  FROM `parking_tickets` t1";
        sql.query(str, function (err, res) {
            if (err) {
                console.log("error: ", err);
                resolve(err);
            }
            else {
                resolve(res[0].last_ticket);
            }
        });
    });
}

module.exports = Task;