# User Documentation

## About
The user contains the following user information and is used to keep track of an individual's friends and thoughts.
* username (string)
* email (string)
* thoughts (array)
* friends (array)

## Get all users
* route: /api/user
* method: GET

## Get a user by id
* route: /api/user/:userId
* method: GET

## Creating a user
* route: /api/user
* method: POST
* body: {username, email}

## Delete a user
* route: /api/user/:userId
* method: DELETE

## Update a user
* route: /api/user/:userId
* method: PUT
* body: {username, email}

## Add a friend
* route: /api/user/:userId/friends/:friendId
* method: POST

## Delete a friend
* route: /api/user/:userId/friends/:friendId
* method: DELETE