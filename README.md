# Item finder

## Description

webapi in wich the user will have to option to sell or buy a product, one of the main features of this aplication is that you will have the option to put a question in the product of your preference and the own of the product can answer that question so other users who have the same question as you can read it and dont bother to ask again.

## User Stories

- **SignUp:** as an anon i can sign up to the platform to buy or sell my own products
- **Login:**  as a user i can login to the platform and start looking for products
- **editProfile:** as a user i can edit my profile with aditional and usefull data
- **Logout:** as a user i can logout from the platform
- **Add products:** the user can create his own product
- **view of a product:** the user is able to see a full description of a product
- **editProduct:** the user can edit his product whenever it suit them
- **deleteProduct:** a owner can delete his product
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
avatar: String,
fullname: String
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

# Client / Frontend

## Routes
| Path | Component | Permissions | Behavior |
| - | - | - | - |
| `/` | HomePage > MainHeader, WhatIs, ChallengeDetail, HowTo | public | Home page with 4 sections: Main header, What is Mulli, Current CHallenges, How to |
| `/not-found` | NotFoundPage | public | Not found page |
| `/signup` | SignupPage | public | Sign up page |
| `/login` | LoginPage | public | Log in page |
| `/user/<:userId>/challenges` | UserPage > UserProfile, ChallengesResume, ChallengesList | user only | Shows the details of a user and all user's challenges |
| `/user/<:userId>/portfolio` | UserPage > UserProfile, ChallengesResume, ArtsList | user only | Shows the details of a user and all user's arts |
| `/user/notifications` | NotificationsPage > NotificationCard | user only | List of notifications |
| `/user/notifications/:notificationId` | NotificationDetailPage | user only | Notification detail |
| `/user/edit` | ProfilePage | user only | Profile form for update |
| `/challenges` | ChallengeListPage > ChallengeCard, ChallengeFilter, ChallengeSearcher, StatusToggle | public | Shows all challenges in a list |
| `/challenges/:challengeId` | ChallengeDetailPage > ChallengeDetail, Timer, UploadArt , [ArtsList > ArtCard], UserVotes, Top3 | user only | Shows the details of a Challenge |
| `/challenges/manager` | ChallengesManagerPage > ChallengesSimpleList | admin only | Shows all challenges in lists based on their status |
| `/challenges/add` | AddChallengePage | admin only | Form for add a new Challenge |
| `/challenges/:challengeId/edit` | EditChallengePage | admin only | Form filled for edit a Challenge |


<br>## API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| - | - | - | - | - | - |
| GET | /user/:id | id | 200 | 404 | get other user data|
| PUT | /user/edit | {userUpdate} | | | edit user data |
| PUT | /user/password/edit | {newPassword} | | | edit password |
| GET | /auth/me | | 201 | 404 | get my user from session |
| POST | /auth/signup | {name, email, password} | 201 | 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | /auth/login | {username, password} | 200 | 401 | Checks if fields not empty (422), if user exists (404), and if password challenges (404), then stores user in session |

