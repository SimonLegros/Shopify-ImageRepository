# Shopify-ImageRepository

Web-based Image Repository implemented in the context of my internship application at Shopify for 2021.

This project is made with **React**, **Express**, **Sequelize** and **SQLite3**, for a light and zero-setup database.

------

### Features

- User Log In & Register with Token authentication
- Front-end Private Route based on token
- Upload images
- Apply privacy to your images (pulic/private) : currently, you can only set privacy when uploading the image

This project uses Docker and Docker Compose. Make sure to install both before trying to install this application. More information can be found on their website at https://www.docker.com/ and https://docs.docker.com/compose/install/ .

------

#### Notes

This application has been developed and tested on Linux only, precisely on a Debian distribution. Therefore, it may not work as fine on Windows or other Unix system. The main reason for this, is because it using Docker, which works perfectly on Debian.

This application is not meant for production use. It has only been made for the Shopify Challenge and is meant for development only purpose. For this application to be ready for production, you will have to change a couple settings in the docker files, docker-composes files and in the server code. I also recommend to use another Database for better performance, as MySQL or MongoDB. 

------

## To Clone & Install the application

```bash
git clone https://github.com/SimonLegros/Shopify-ImageRepository
cd Shopify-ImageRepository
npm run install
```

## To Run the application

```bash
# This is build and run both Client and API containers in background
npm run start

# This will run both containers in debug mode (with logs)
npm run dev
```

## To Run Tests

```bash
npm test
```

