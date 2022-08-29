<h1 align="center">
E-Commerce Website For Web Project
</h1>
<p align="center">
MongoDB, Expressjs, React, Redux, Nodejs
</p>

<p align="center">
   <a href="https://travis-ci.com/amazingandyyy/mern">
      <img src="https://travis-ci.com/amazingandyyy/mern.svg?branch=master" />
   </a>
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/NaimulHasanFahim/webproject.git
$ npm i
```

## project structure
```terminal
client/
   package.json
server/
   package.json
   .env (need to create your own .env for run this project see below for instructions)
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3001)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally

```

## Server-side usage(PORT: 5000)

### Prepare your secret

(You need to add .env File to run the Server side API code)
.env File Structure
PORT = 5000
CONNECTION_URL = Your Url
PASS_SECRET = Your Secret
JWT_SECRET = Your secret
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```


# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.27.2 | bcrypt-nodejs: ^0.0.3
babel-preset-stage-1: ^6.1.18|body-parser: ^1.15.2
sass: ^1.54.5 | cors: ^2.8.5
react: ^18.2.0 | dotenv: ^16.0.1
react-dom: ^18.2.0 | express: ^4.18.1
react-redux: ^8.0.2 | jwt-simple: ^0.5.1
react-router-dom: ^6.3.0 | mongoose: ^6.3.5
redux: ^4.4.0 | jsonwebtoken : ^8.5.1
redux-thunk: ^2.1.0 | crypto-js : ^4.1.1
redux-persist : ^6.0.0| nodemon : ^2.0.16
styled-components : ^5.3.5 |


## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments
[Create new Issues](https://github.com/NaimulHasanFahim/webproject/issues) (preferred)

Email Me: mohammadfahimshah@gmail.com (welcome, say hi)

## Author
[Naimul Hasan](https://www.linkedin.com/in/naimul-hasan-fahim-1541481b2/)


### License
[MIT](https://github.com/amazingandyyy/mern/blob/master/LICENSE)