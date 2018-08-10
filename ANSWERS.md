<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

- Middleware are functions that manipulate the req before passing on the req to route handlers for final processing.

- Sessions is a method of storing information about a user across multiple request, such as wether the user has logged in or not.

2.  What does bcrypt do in order to prevent attacks?

- bcrypt hashes passwords, so that the server doesn't have to store the plain-text user passwords in the database. 

3.  What are the three parts of the JSON Web Token?