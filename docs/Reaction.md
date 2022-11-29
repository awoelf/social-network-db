# Reaction Documentation

## About
The reaction contains the following information and is used to store a string that a user creates in response to another user's thought.
* reactionId (ObjectId)
* reactionBody (String)
* username (string)

## Create a reaction
* path: /api/thought/:thoughtId/reaction
* method: POST
* body: {reactionBody, username}

## Delete a reaction
* path: /api/thought/:thoughtId/reaction
* method: DELETE
* body: {reactionId}