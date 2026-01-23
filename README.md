SOLUTION

I have added the remaining fields to the vehicle model and implemented all endpoints asked for as well
endpoints for listing all cars by minimum price and maximum price. I also created a test suite to carry
out unit testing, covering both happy paths and edge cases. All tests pass and testing on localhost also
works fully.

I split the design out into endpoints and handlers so that I could carry out unit testing. The express app
and handlers are all contained within the api folder. I split the server startup into a separate server.ts
file as I didn't want to start up an actual server while carrying out unit tests while still allowing it to
function as it would in a production environment.

Playing around with mocking was no easy feat as I have only a small amount of experience with it and I very
nearly gave up and just wrote some integration tests instead but I'm glad a perservered as it was a really good
learning excercise to challenge me.

Thank you for your time!

Bailey

---

This repository is for a technical task in Typescript provided by Motorpoint.

Clone this repository and complete the following tasks.

- Add the remaining fields to the vehicle model
- Implement an endpoint for listing all cars
- Implement an endpoint for listing cars by make
- Implement an endpoint for listing cars by model
- Add any other endpoints you think are useful / relevant

Consider the following as well.

- Error handling
- Unit tests

Upload the completed solution to your own GitHub and provide the link to it (ensure it is publically available).
The solution must compile and run without any errors.
