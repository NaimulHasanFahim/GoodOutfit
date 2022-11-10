<h1 align="center">
GoodOutfit
<p>An E-commerce website for Web Project. This project is separated into two sections: user and admin. In the user section, users can view products in several categories and filter them by color and size. The user can also sort the products from newest to oldest or by price. Users can view product details, add to cart, place order, and track orders on the E-commerce website. To place an order, each user must first register and log in with their credentials. When a user place an order a bank’s payment gateway will appear prompting the user to enter information and a secret key in order to complete the transaction. When all of the requirements are met, the bank will produce a transaction id, and the funds will be transferred from the user’s bank account to the E-commerce bank account. Ecommerce frontend interact with two other api [LeatherWallet](https://github.com/NaimulHasanFahim/LeatherWallet) and a [Supplier backend API](https://github.com/NaimulHasanFahim/Suppliers). Whole workflow can be understand from this [pdf](https://github.com/NaimulHasanFahim/Goodwear/issues/2#issue-1443971165).</p>
</h1>
<p align="center">
MongoDB, Expressjs, React, Redux, Nodejs
</p>


> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs. The idea is to use Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/NaimulHasanFahim/webproject.git
```

## project structure
```terminal
client/
   package.json
server/
   package.json
   .env (Need to create your own .env for run this project see below for instructions)
...
```

# Usage (Run fullstack app on your machine.)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

Note that you need client and server runs concurrently in different terminal session, in order to make them talk to each other. This project is totally modular so you can run the client or server side code after extracting the downloaded folder.

## Client-side usage(PORT: 3001)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally

```

## Server-side usage(PORT: 5000)

### Prepare your secret
```
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


# Screenshots of this project

User visit public and Home page
![User visit public and Home page](https://user-images.githubusercontent.com/40023605/187589352-7e290dfe-f5a4-49ab-abf5-8698b22f2189.png)

User can sign in or sign up
![User can sign in or sign up](https://user-images.githubusercontent.com/40023605/187589358-93b1112e-bb3d-4d3f-bbde-16a6d4bd15b6.png)

After signing in user can go to account route and make request to token-protected API endpoint
![After signing in user can go to account route](https://user-images.githubusercontent.com/40023605/187589353-8c575245-e9fa-4d3b-9842-2d7d842057ec.png)

Admin Panel Landing Page
![Admin can control all the actions from here](https://user-images.githubusercontent.com/40023605/187589360-c25ee499-95e8-4fae-88be-6aa3d600f3b4.png)



## BUGs or comments
[Create new Issues](https://github.com/NaimulHasanFahim/webproject/issues) (preferred)

Email Me: mohammadfahimshah@gmail.com

## Author
[Naimul Hasan](https://www.linkedin.com/in/naimul-hasan-fahim-1541481b2/)


### License
[MIT](https://github.com/amazingandyyy/mern/blob/master/LICENSE)