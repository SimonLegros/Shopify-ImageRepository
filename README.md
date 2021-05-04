# Shopify-ImageRepository
Image Repository app implemented in context of my internship application at Shopify for 2021.

### Features

- User Log In & Register with Token authentication
- Front-end Private Route based on token
- Upload images
- Change image visibility (private/public)

This project uses Docker and Docker Compose. Make sure to install both before trying to install this application. More information can be found on their website at https://www.docker.com/ and https://docs.docker.com/compose/install/ .

**Note** : This application has been developed and tested on Linux only, precisely on a Debian distribution. Therefore, it may not work as fine on Windows or other Unix system. The main reason for this, is because it using Docker, which works perfectly on Debian.

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

# To run with debug
npm run dev
```

## To Run Tests

```bash
npm run test
```

