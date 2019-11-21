# Item finder

## Description

Webapi marketplace. The user has the option to sell or buy a product. The value proposal in comparison with other local apis is that the user has the option to write a question in the desired product and the product’s owner can answer that question. The questions and responses will be visible for other users and will add information to the products

## User Stories

- **SignUp:** as an anon i can sign up to the platform to buy or sell my own products
- **Login:**  as a user i can login to the platform and start looking for products
- **Logout:** as a user i can logout from the platform
- **Add products:** the user can create his own product
- **view of a product:** the user is able to see a full description of a product
- **editProduct:** the user can edit his product whenever it suit them
- **deleteProduct:** as a product's owner i can delete my products
- **buyorsell:** As a user I can buy or sell multiple products after I upload its information to the app.
- **question:** the users will have the oportunity to ask questions to one product

## Backlog

- the user can rate the owner of a product after the purchase
- the user can rate the owner of a product after the purchase
- filter and search the products by category
- add items to a whishlist
- add subcategories
- location of the user and the product
- chatbox
- user categories (bronce, silver, gold)
- add paid methods
- product auctions
- add comments to the purchase rating to explain the satisfaction level

## Models

User model

```
avatar: String,
fullname: String
username: String, unique & required 
password: String, required 
email: String, unique & required 
phone: String
accountNumber: String
direction: String
rating: : Number, min: 1, max: 5
buys: ObjectId<Product> 
```

Product model

```
title : String. required
description: String
price: Number, required
buyed: Boolean
owner: ObjectId<User> 
image: String
category: String, (electronic, vehicle, computer, fashion, miscellaneous)
comments: ObjectId<comment>
```

Comment model

```
owner: ObjectId<User>
body: String
product: ObjectId<Product>
answer: String
```

# Client / Frontend

## Routes
| Path | Component | Permissions | Behavior |
| - | - | - | - |
| `/` | HomePage | public |  |
| `/signup` | SignupPage | public | Sign up page |
| `/login` | LoginPage | public | Log in page |
| `/my-profile` | myProfilePage > UserProfile, profileData, buyed and selling list of product | | |
| `/product/:id` | detailsOfAProduct | user only | Shows the details of a product, buy option, add comment/question option |
| `/add-product` | add a product page | user only | |
| `/product/:id/edit | editProductInformation | user only |  |



<br>## API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| - | - | - | - | - | - |
| GET | /user/:id | id | 200 | 404 | get other user data|
| PUT | /user/edit | {userUpdate} | | | edit user data |
| GET | /auth/me | | 201 | 404 | get my user from session |
| POST | /auth/signup | {name, email, password, phone, fullName, avatar} | 201 | 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | /auth/login | {usernameOrEmail, password} | 200 | 401 | if user exists (404), then stores user in session |
| POST | /logout |  | 200 | 404 | destroy session|
| GET | /comment/ |  | 200 | 404 | get all comments|
| GET | /comment/:productId | id | 200 | 404 | get comments of a product|
| POST | /comment/add/:productid | id | 200 | 404 | add comments to a product|
| PATCH | /comment/:commentId | id | 200 | 404 | answer question made into a product|
| DELETE | /comment/:commentId | id | 200 | 404 | delete comment/question|
| GET | /product/ |  | 200 | 404 | get all products|
| GET | /product/:id | id | 200 | 404 | get detail of a product|
| POST | /product/ | | 200 | 404 | create a product|
| PUT | /product/:id | id | 200 | 404 | edit product info|
| DELETE| /product/:id | id | 200 | 404 | delete a product|

