# Item finder

## Description

webapi in wich the user will have to option to sell or buy a product, one of the main features of this aplication is that you will have the option to put a question in the product of your preference and the own of the product can answer that question so other users who have the same question as you can read it and dont bother to ask again.

## User Stories

- **SignUp:** as an anon i can sign up to the platform to buy or sell my own products
- **Loing:**  as a user i can login to the platform and start looking for products
- **editProfile:** as a user i can edit my profile with aditional and usefull data
- **Logout:** as a user i can logout from the platform
- **Add products:** the user can create his own product
- **editProduct:** the user can edit his product whenever it suit them
- **buyorsell:** the user can buy or sell multiple products
- **product category:** the user can search the product by categorie
- **question:** the users will have the oportunity to ask questions to one product
- **rating:** the user can rate the owner of a product after the purchase

## Backlog

- add items to a whishlist
- add subcategories
- location of the user and the product
- chatbox
- user categories (bronce, silver, gold)
- add paid methods
- product auctions
- add comments to the rating telling the level of satisfaction after purchase the product
- show if the product is new or used.

## Models

User model

```
avatar: String
name: String
lastname: String
username: String, unique & required 
password: String, required 
email: String, unique & required 
phone: String
accountNumber: String
direction: String
rating: : Number, min: 1, max: 5
```

Product model

```
title : String. required
description: String
price: Number, required
owner: ObjectId<User> 
image: String
category: String, (electronic, vehicle, computer, fashion, miscellaneous)
```

Comment model

```
owner: ObjectId<User>
body: String
product: ObjectId<Product>
answer: String
```


