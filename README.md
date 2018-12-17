# redux-sagas-typescript-by-example

Set of step by step guided samples to help you get started with [redux sagas](https://github.com/redux-saga/redux-saga) + typescript.

Each of the examples implemented, contains a guide step step readme.md file that will let you code each of the examples by your own.

# Demos:
___

## 00 Boilerplate:


### Inital repo boiler plate sample, includes:

+ React boiler plate.
+ Redux boiler plate.
+ A simple reducer that hold a list of numbers.
+ A simple pair of container / component elements that links with the number reducer and display the list of numbers.
+ Full typescript setup.

## 01 Hello Saga

In this sample we are going to install redux-saga library, add all the setup code needed and create a simple service. We are going to setup redux saga, create actions and create a saga.


### Summary Steps
 + Install the library.
 + Create a service.
 + Setup the saga.
 + Define actions.
 + Create sagas and setup root sagas and middlewares.
 + Create the UI.

## 02 Take latest

In this sample we are going to start exploring redux saga helper effects, in this case we will learn how to discard pending 
async request and take the latest one that was fired by using
the *takeLatest* effect.

## Summary steps
 + Install the dependencies.
 + Replace  takeEvery with takeLatest yield.
 + Run and test the project. 

## 03 Throttle

In this sample we are going to continue exploring redux saga helper effects. This time we will make use of *Throttle* allowing
us to discard pending consecutive request for given period of 
time.

### Summary steps
 + Install the dependencies.
 + Replace takeLatest with throttle yield.
 + Run and test the project.
 
## 04 Race

In this sample we are going to continue exploring redux saga helper effects. The race effect will let us do things like: 
make a request to two services in paralell and process the respone on the first service to answer, or let the user cancel
and on going request (race between async promise in progress vs
user hitting cancel button).

### Summary steps
 + Install the dependencies.
 + Add a cancel button.
 + Add a _race_ to the main saga.
 + Run and test the project 

## 05 All

_All_ saga effect is similar to _promise.all_ it let us wait for
several async requests to be completed.

### Summary steps
 + Install the dependencies.
 + Add a new service.
 + Wait for two services to be completed.
 + Run and test the project 

## 06 All

_All_ saga effect is similar to _promise.all_ it let us wait for
several async requests to be completed.

### Summary steps
 + Install the dependencies.
 + Add a new service.
 + Wait for two services to be completed.
 + Run and test the project 

## 07 Channels

Saga's channels are a powerful mechanism for real time communication, in this sample we are going to establish a 
connection with a fake currency websocket service,
periodically get updates from it and display data.


### Summary steps
 - Install socket.io dependencies.
 - Establish channel.
 - Update reducers.
 - Create UI.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend


 








