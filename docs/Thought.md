# Thought Documentation

## About
The thought contains the following information and is used to store the content of the thought (a social media post) and the reactions it receives.
* thoughtText (string)
* username (string)
* reactions (array)

## Get all thoughts
* route: /api/thought/
* method: GET

## Get thought by id
* route: /api/thought/:thoughtId
* method: GET

## Create new thought
* route: /api/thought/
* method: POST
* body: {thoughtText, username, userId}

## Update thought
* route: /api/thought/:thoughtId
* method: PUT
* body: {thoughtText}

## Delete thought
* route: /api/thought/:thoughtId
* method: DELETE
* body: {userId}