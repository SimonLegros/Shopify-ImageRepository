# Shopify-ImageRepository

Web-based Image Repository implemented in the context of my internship application at Shopify for 2021.

Made with **React**, **Express**, **Sequelize** and **SQLite3**, for a light and zero-configuration database.

## Features :rocket:

- User Log In & Register with Token authentication
- Front-end Private Route based on token
- Upload images
- Apply privacy to your images (pulic/private) : currently, you can only set privacy when uploading the image

### Todos
- Privacy change after uploading
- Delete images

------

## Requirements :loudspeaker:

This project uses **Docker** and **Docker-Compose**. Make sure to install both before trying to install this application. For more information about these tools or on how to install them, please visit their website at https://www.docker.com/ and https://docs.docker.com/compose/install/.

Although the application is built and run on docker containers, the tests are made locally, using the local Node version. I personaly used **Node v12.19** and I recommend using the same one (or the latest version) on your side to ensure best results while testing. If you don't have this specific version on your local machine, I recommend using **NVM** (Node Version Manager) to install more versions and to choose your default version.

### Notes

This application has been developed and tested on Linux only, precisely on a Debian distribution. Therefore, it may not work as fine on Windows or other Unix system. The main reason for this, is because it using Docker, which works perfectly on Debian and, unfortunately, not as well on Windows. :sweat:

This application is not meant for production use. It has only been made for the Shopify Challenge and is meant for development only purpose. For this application to be ready for production, you will have to change a couple settings in the docker files, docker-composes files and in the server code. I also recommend to use another Database for better performance, as MySQL or MongoDB. 

------

## Usage :gear:

### To Clone & Install the application

```bash
git clone https://github.com/SimonLegros/Shopify-ImageRepository
cd Shopify-ImageRepository
npm run install
```

### To Run the application

```bash
# This is build and run both Client and API containers in background
npm run start

# This will run both containers in debug mode (with logs)
npm run dev
```

There you go! Now you can navigate to http://localhost:3000 and there you have your application! Have fun!

The default credentials to log in are **admin** / **admin** (username / password). But feel free to create a new user!

### To Run Tests

```bash
# Build the API container and run the tests
npm test
```

**Note :** There is currently solely tests for the API endpoints. There is no tests on the client side.