const { test, expect } = require("@playwright/test");

const createBookingPayload = require('../testdata/create_booking_payload.json');

test("Create Booking", async({request})=>{

    const response = await request.post('/booking',{
        data: createBookingPayload
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody.booking).toHaveProperty("firstname", "Shakthi");
    expect(responseBody.booking).toHaveProperty("lastname", "Reddy");

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2025-04-10");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2025-04-15");

    expect(responseBody.booking).toHaveProperty("additionalneeds", "super bowls");




})