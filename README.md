How to configure

- git clone URL
- import database folders database/parking_db.sql
- configure database folders models/BaseModel.js
- npm install && npm install -g nodemon && nodemon server.js


****************************************************
Property
- Auto ADD Parking lots
- Auto Check nearest Parking lots and Parking lots booking follow car size
- Get parking pass have in detail Parking lots, startdate, license plate, make, model, color, cost per day, vehicle type, Parking lots numer, floor
- Auto Calculate price and checkout Parking lots booking and update status parking lots

ADD Parking lots
POST: http://localhost:8080/parking/insertParking

JSON:
{
    "spot_number": ["D01", "D02","D03","D04","D05"],
    "floor": "4f",
    "type_id": "T0002"
}



GetTicketDetail
POST: http://localhost:8080/parking/getTicketDetailByCode

JSON:
{
    "license_plate": "7 วก 5871"
}


Check in and Get In ticket
POST: http://localhost:8080/parking/insertParkingTicket

JSON: 
{
    "license_plate": "9 ภภ 7586",
    "make": "Toyota",
    "model":"Hirux Revo",
    "color": "red",
    "type_id": "T0002"
}


Check out
POST: http://localhost:8080/parking/UpdateParkingTicket

JSON: 
{
    "license_plate": "7 วก 5871"
}