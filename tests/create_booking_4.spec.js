const { test, expect } = require("@playwright/test");
const createBookingPayload = require('../testdata/create_booking_dynamic_payload.json');
const {faker} = require("@faker-js/faker");
const { DateTime } = require("luxon");
const {stringFormat} = require("../utils/common");

test("Create Booking", async({request})=>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);
    const additionalNeeds = faker.string.alpha(10, 20)
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({days: 5}).toFormat("yyyy-MM-dd");

    var dynamicPayload = stringFormat(JSON.stringify(createBookingPayload), firstName, lastName, totalPrice, checkInDate, checkOutDate, additionalNeeds)
    const dynamicRequestBody = JSON.parse(dynamicPayload);
    
    const response = await request.post('/booking',{
        data: dynamicRequestBody
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.booking).toHaveProperty("firstname", firstName);
    expect(responseBody.booking).toHaveProperty("lastname", lastName);
    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", checkInDate);
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", checkOutDate);
    expect(responseBody.booking).toHaveProperty("additionalneeds", additionalNeeds);

})