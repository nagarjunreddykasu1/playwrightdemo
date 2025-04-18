const { test, expect } = require("@playwright/test");

const {faker} = require("@faker-js/faker");
const { DateTime } = require("luxon");

test("Create Booking", async({request})=>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);
    const additionalNeeds = faker.string.alpha(10, 20)
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({days: 5}).toFormat("yyyy-MM-dd");

    const response = await request.post('/booking',{
        data:{
                "firstname": firstName,
                "lastname": lastName,
                "totalprice": totalPrice,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": checkInDate,
                    "checkout": checkOutDate
                },
                "additionalneeds": additionalNeeds
            },
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