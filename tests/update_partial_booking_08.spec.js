const {test, expect} = require('@playwright/test');
const {faker} = require('@faker-js/faker');
const {DateTime} = require('luxon');
const {stringFormat} = require('../utils/common');
var createBookingPayload = require("../testdata/create_booking_dynamic_payload.json");
const tokenRequest = require("../testdata/token_request_payload.json");
const putRequest = require("../testdata/update_booking_payload.json");
const patchRequest = require("../testdata/update_partial_booking_payload.json");

test('Update partial Booking details using PATCH request', async ({request}) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({day:6}).toFormat("yyyy-MM-dd");
    const additionalNeeds = faker.string.alpha(10,20);
    
    console.log(" *** Create Booking ***");
    var dynamicPayload = stringFormat(JSON.stringify(createBookingPayload), firstName, lastName, totalPrice, checkInDate, checkOutDate, additionalNeeds);
    const dynamicRequestBody = JSON.parse(dynamicPayload);
    const response = await request.post('/booking', {
        data: dynamicRequestBody
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);


    const responseBody = await response.json();
    console.log(responseBody);

    const fname = responseBody.booking.firstname;
    const lname = responseBody.booking.lastname;
    const bId = responseBody.bookingid;

    expect(responseBody.booking).toHaveProperty("firstname", dynamicRequestBody.firstname);
    expect(responseBody.booking).toHaveProperty("lastname", dynamicRequestBody.lastname);

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin",dynamicRequestBody.bookingdates.checkin);
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout",dynamicRequestBody.bookingdates.checkout);

    expect(responseBody.booking).toHaveProperty("additionalneeds", dynamicRequestBody.additionalneeds);

    console.log(" *** GET Booking by ID *** ");
    // GET API call
    const getBookingDetails = await request.get(`/booking` , {
        params:{
            "firstname":fname,
            "lastname":lname
        }
    });
    const bookingDetails = await getBookingDetails.json();
    console.log(bookingDetails);

    expect(getBookingDetails.ok()).toBeTruthy();
    expect(getBookingDetails.status()).toBe(200);

    expect(bookingDetails[0]).toHaveProperty("bookingid", bId);
    
    console.log(" *** Generate Token ***");
    const tokenAPIResponse = await request.post("/auth", {
        data: tokenRequest,
      });
      expect(tokenAPIResponse.ok()).toBeTruthy();
      expect(tokenAPIResponse.status()).toBe(200);
    
      console.log(await tokenAPIResponse.json());
      const tokenResponseBody = await tokenAPIResponse.json();
      const tokenNo = tokenResponseBody.token;

      console.log(" *** Update partial Booking Details ***");

      const patchAPIResponse = await request.patch(`/booking/${bId}`, {
        headers: {
          "Content-Type": "application/json",
          "Cookie": `token=${tokenNo}`,
        },
        data: patchRequest,
      });
    
      expect(patchAPIResponse.ok()).toBeTruthy();
      expect(patchAPIResponse.status()).toBe(200);

      const updatedResponse = await patchAPIResponse.json();
      console.log(updatedResponse);
      expect(updatedResponse).toHaveProperty("firstname",patchRequest.firstname);
      expect(updatedResponse).toHaveProperty("lastname",patchRequest.lastname);
      expect(updatedResponse).toHaveProperty("additionalneeds",patchRequest.additionalneeds);
      
})