# Chattier App

## Brief Description
For a start, here are a list of useful links.
1. [Front end as deployed on Netlify](https://main--euphonious-cannoli-496c7f.netlify.app)
2. [Back end which is deployed on Railway.app](https://chat-app-back-end-production.up.railway.app)
3. [A video demonstration on how the app works on the front end](https://drive.google.com/file/d/1QC1sDezkolYe-ZP2r00G34jbyk__3NwF/view?usp=sharing)
4. [A link to the github repo for the back end](https://github.com/VinceXIV/chat-app--back-end)

That being said, this is a web app where user can get to interact with each other through text messages. Several users have already been set up so you can log in with their credentials and experience the app immedeately. If you're patient, please feel free to read along. Here are the usernames and passwords
| **Username** | **Password** |
|:------------:|:------------:|
|  vincent     | vincent      |
|  rajab       |   rajab      |
|  andrew      |  andrew      |
|   zablon     |  zablon      |
|    mercy     | mercy        |

## App Features

### Sign up
To sign up, you will be required to enter your full name, user name, password, bio (short description of self). Some of these information are required before the form is submitted in the first place. For instance, you have to have a password and username. You can sign up without a profile picture though. When you sign up, you will be directed to the home page where you will be able to interact with other users

### Sign in
You can sign in with your username and password. Once you sign in, your details will be saved in a cookie, so whenever you change browsers you can come back and won't need to sign in any more with your username and password. You will be taken directly to the home page. Directly inputting the url for login or signup page will get you directed to the home page if you are already signed in (thus saving you the energy to type the username and password again. You're welcome 😊)

### Chat with Other Users (Yaay!)
You can look up any users using their usernames in the search section and chat with them. They'll get your message instantly. You'll get theirs instantly too. You can also view some of your favorite contacts right above the search section that provides some of the contacts you have chatted with.

One more thing...

You can also chat with yourself. Yes. Just look up yourself in the favorites section or the search section and click on it. Doing that will get yourself on both the sending and receiving sides of the text message. You can use this for note taking, listing your todos, or whatever. The choice is yours really.

### Log out
Life is not all about chatting. You'll find this button useful sometimes. If you're tired of chatting, just click on it. It is on the top right side of the page. Be sure to return once in a while though.

## Setup Requirments
You don't need to set up anything. Just click on the link provided and you're good to go. Here's the link again. In case you want to run it in your local environment and see how it would look like with the changes you make to it, you need to ensure that you have the following;
- have installed postgresql in your machine and have it working correctly
- installed ruby and rails
- node

Once are confortable that your set up can run ReactJs and Rails programs, you can proceed

Run the following commands to set up the front end
1.  `git clone https://github.com/VinceXIV/chat-app--front-end`
2.  `cd chat-app--front-end`
3.  `npm install`
4.  `npm start`

To set up the back end, run the following commands
1.  `git clone https://github.com/VinceXIV/chat-app--back-end`
2.  `cd chat-app--back-end`
3.  `bundle install`
4.  `rails db:create db:migrate db:seed`
4.  `rails s`

## Support and Contact Details
email: makokhavomondi@gmail.com

## License
Copyright (c) 2022 Vincent Makokha

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files , to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR