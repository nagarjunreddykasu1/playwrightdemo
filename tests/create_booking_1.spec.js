const { test, expect } = require("@playwright/test");

test("Create Booking", async({request})=>{

    const response = await request.post('/booking',{
        data:{
                "firstname": "Manish",
                "lastname": "Kumar",
                "totalprice": 1000,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-04-10",
                    "checkout": "2025-04-15"
                },
                "additionalneeds": "super bowls"
            },
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody.booking).toHaveProperty("firstname", "Manish");
    expect(responseBody.booking).toHaveProperty("lastname", "Kumar");

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2025-04-10");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2025-04-15");

    expect(responseBody.booking).toHaveProperty("additionalneeds", "super bowls");




})