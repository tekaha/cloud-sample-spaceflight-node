/**
 * Custom logic for booking-service defined in ./booking-service.cds
 * Check to restrict number of passengers traveling on a space craft to 5
 */
const maxpassengers = 5
module.exports = function({ teched_flight_trip_Bookings }) {

    this.before('CREATE', teched_flight_trip_Bookings, (cds) => {

        cds.run(() => {
            if (cds.data.NumberOfPassengers > maxpassengers)
                cds.error(409, 'Number of Spacecraft passengers exceeds the maximum of ${maxpassengers}')

            SELECT.from('teched_flight_trip_Bookings')
                .where({ DateOfTravel: cds.data.DateOfTravel, and: { Itinerary_ID: cds.data.Itinerary_ID } })

        }).then(([bookings]) => {
            let totalPassengers = 0
            for (let booking of bookings) {
                totalPassengers = totalPassengers + booking.NumberOfPassengers
                if (totalPassengers + cds.data.NumberOfPassengers >= maxpassengers)
                    cds.error(409, "Spacecraft tickets sold out for your Date/Destination, sorry!")
            }
        })
        
    })
}