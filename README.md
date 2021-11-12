# Graphical Password Authentication System
A three-level authentication system that utilizes multiple forms of authentication.
1. ​The first level is the conventional username and password authentication.
2. The second level is a random pattern of red, green, and blue that the user specifies.
3. The third level is a 4x4 grid where the user is presented with 4 images that can be dragged and dropped anywhere on the grid.

When the user is logging in, they are once again presented with the same 4 images, placed in random locations within the grid. The user has to drag and drop the images to the same locations they chose during the registration stage.


User information is hashed using the “crypto” Node.js module. I have tested the project on a computer that does not have Node.js installed and there were no errors. However, should the project not run on your computer, kindly install Node.js version 10 or later and try rerunning the project since the missing module might then be the problem.

The bundle.js file located in /dist/js is bundled using Webpack module bundler. The unbundled source code is located in /src/js.

The CSS code is compiled using node-sass npm package. The source code is located in /src/sass.

The project uses the localStorage property of the window object to store user information.

A ‘reset all users’ button was added to the header of the UI which removes the information saved by the project in the local storage of the browser.

# Preview

![](/previews/levelone.png)
![](/previews/leveltwo.png)
![](/previews/levelthree.png)

# Installation Setup

1. You have to install Nodejs LTS version on your local system.
2. In the root directory you have to Run "npm install" command for installing all the dependencies.
3. Finally run the project by running this command in your terminal "npm start". Now you redirects to browser on this port http://localhost:8080/.
4. Now, Test the application.
