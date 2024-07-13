# Book-Management

server => storing certain book data
=> user register
=> subscriber

This is a book record management API server / Bakend for the library system or management of records and manuals or books

Fine system
user: 06/01/2023 - 06/06/2023
07/06/2023 => 50
09/06/2023 => 50\*3=150/-

3 months(basic)
6 months(standard)
12 months(premium)

if the sunscription type is standard && if the subsription day is 06/03/2023
=> then subscription valid till 06/06/2023

within subscription date if we miss renewal >> 50/- day
subscription day is also been missed >> and also missed the renewal >> 100+50/- day

> > book1
> > basic
> > 06/03/2023-> subscription date
> > 07/03/2023 -> borrowed a book from library
> > book1 renewal date is on 21/03/2023
> > 23/03/2023 -> we need to pay a fine of 50\*2=100/-

> > book2
> > basic
> > 06/03/2023-> subscription date
> > 07/03/2023 -> borrowed a book from library
> > book2 renewal date is on 21/03/2023
> > 23/06/2023 -> we need to pay a fine of 100+(no of day \*50)

missed by renewal day >> 50/-
missed by subscription date >> 100/-
missed by renewal and subscription date >> 150/-

# routs and endpoints

## /users

POst: Create a new user
GET: get all the user info

## /uisers/{id}

GET: get a user by id
PUT: update user by their id
DELETE: we delete user by their id(if he/she still have an issued book) & (is there any fine to be paid)

## /users/subscription-details/{id}

GET: get user subscription details
=> date of subscription
=>valid till
=> is ther enay fine

## /books

GET: ti get all the books
POST: create /add new book

## /books/{id}

GET: get a book by id
PUT: update a book by id

## /books/issued

GET: get all the issued books

## /books/issued/withFine

GET: get all the books issued with thier fine

## npm init

## npm i nodemon --save dev

## npm run dev


...each
{
      "id": "4",
      "name": "John",
      "surname": "Doe",
      "email": "user@gmail.com",
      "subscriptionType": "Premium",
      "subscriptionDate": "01/01/2022"
    }


...data
{
  "data": {
    "name": "vedant",
    "surname": "dalal"
}
}


