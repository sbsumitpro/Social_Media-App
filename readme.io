
# Social Media App
This is a holistic project on Node Js where I have tried to clone the Facebook web app. With the minimalistic UI, I have mostly focused on implementing the functionality.


## Tech Stack

**Client:** Javascript, EJS

**Server:** Node, Express, MongoDB

**Node Modules:** Nodemailer, Socket.io, multer, passport


## Features

- Sign-up using Name, Email and selecting a password
- Sign-up/Sign-in using google authentication
- Add post, delete post(after successful authentication)
- Add comment, delete comment on every post
- There is a toogle Like button and like count for each and every post and like
- There is quick link to profile page on the right side of the Navbar, where the user can update their name and email id and also upload a profile picture
- There is list of all the friends on the right side bar, user can click on their name and navigate to their page
- There is Live chat option also enabled, but some configuration need to be changed Like, need to change the port.
- Reset password link will be sent over the email




## Demo

![App Screenshot](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm10Z205OXZwNGFweGwzY2dmdmZnYm4wODdpZjJzbWlqOXJtNWZ2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b0ZQ91PslcWywvgO2Z/giphy.gif)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`
`HOSTNAME`
`PORT`



## Installation

Install the project with either downloading the zip file or git pull and npm.

```bash
  npm install  
```
- Create a .env file

- Add the MONGO_URL inside the .env file 
```bash
  npm start  
```

    
## Lessons Learned

In this project the hard part was to design the database schema. 

We have created six schema collections for this particular project. Few of them are following

    1.  posts
Fields: content, user, comments, likes

    2.  friendships
Fields: from_user, to_user

    3. reset_password
Fields: user, access_token, isValid



## Author

- [Sumit Biswas](https://github.com/sbsumitpro)

