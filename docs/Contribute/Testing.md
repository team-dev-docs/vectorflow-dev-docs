---
title: "Testing"
sidebar_position: 1
---

````markdown

When submitting a PR, please add units tests to cover the functionality you have added. Please re-run existing tests to ensure there are no regressive bugs. Run from the src directory. To run an individual test use:

```
python -m unittest module.tests.test_file.TestClass.test_method
```

To run all the tests in the file use: 
```
python -m unittest module.tests.test_file
```

For end-to-end testing, it is recommend to build and run using the docker-compose, but take down the container you are altering and run it locally on your development machine. This will avoid the need to constantly rebuild the images and re-run the containers. Make sure to change the environment variables in your development machine terminal to the correct values (i.e. `localhost` instead of `rabbitmq` or `postgres`) so that the docker containers can communicate with your development machine. Once it works locally you can perform a final test with everything in docker-compose.

````

<Parser />