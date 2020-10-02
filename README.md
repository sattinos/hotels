# Hotels
Hotels is a web application for booking from hotels. The application has admin pages in addition to list of pages for the end user. <br>

## Application Structure

The application contains 3 projects:<br>
    <b>server</b> : this is the application backend. It is built with [Nest.js](https://nestjs.com/) framework.<br>
    <b>web-client</b>: this is the admin pages. It is an SPA built with [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) and [Parcel2](https://v2.parceljs.org) bundler.<br>
    <b>client-pages</b>: The main application pages that are used by the user. The client pages are built with [Next.js](https://nextjs.org/) framework.<br>
<br>

## Preriquisites
- [Nodejs](https://nodejs.org/en/download/) v12.x
- [PostgreSql](https://www.postgresql.org/download/) 10.x or higher

## Installation
- Setup the DB only once by running the script from PgAdmin at path:
<b>server\src\database\setup.sql</b><br>
- cd into each folder (<b>client-pages</b>, <b>server</b> and <b>web-client</b>) and run:<br>

        npm install
    
## Run the server

    cd server
    npm start

if you want to run server in the watch mode:

    npm run start:dev

Each time you run the server, it checks for data in DB. If no data is present, it will seed the DB from seedings scripts in the path: <b>server\src\database\seed.sql</b><br><br>
If you are new to [Nest.js](https://nestjs.com/) framework, refer to its documentation to see how the code is organized and unit tests are run.<br><br>

Open the browser and use the address: http://127.0.0.1:3000/admin/

The default credentials are: 
username: pat
password: 123

## Run the Admin Pages
These pages are used to manage the system data entities.<br>
You can modify these pages by running the project in ParcelServer mode.<br>

There are 3 types of running modes:<br>
- <b>ParcelServer</b> mode: This means the parcel bundler is up and you are working on the design/logic of admin pages and not ready to build. Notice that this mode skips sessions of the server. The project works in [HMR](https://v2.parceljs.org/features/hmr/) mode and ready to restart on code changes.<br>
- <b>Localhost</b> mode: This means the parcel generated a development build and you want to deploy to localhost server for testing.<br>
- <b>Production</b> mode: This means the parcel generated an optimized build and you want to deploy to production server.<br>

To run in <b>ParcelServer</b> mode

    cd client-pages
    npm start

To build for <b>Localhost</b>

    cd client-pages
    npm run build-then-deploy:dev

To build for <b>Production</b>

    cd client-pages
    npm run build-then-deploy:prod
The build is already minimized and uglified.

### Localization
The localization file is located at path: web-client\src\assets\localization\localization.csv<br>
It is a CSV and can be opened in <b>Google Sheet</b>.<br>
Once the CSV file is ready you need to download it into the same path again.

        npm run bake-localization

To add a new language:<br>
1. Use <b>Google Sheet</b> to add a new language column in the CSV file.<br>
2. Fill the new column translations.<br>
3. Download the file to the same path<br>
4. Bake the localization CSV file.<br>

Modify the code (only one time steps):<br>
1. Fill in a new language name in <b>languageKeys</b> array in the file:<br><b>web-client\src\controller\lib\localization\localizer.ts</b><br>
2. Add a new language key to the CSVParser class at path:<br><b>web-client\src\controller\lib\tools\csvParser.ts</b><br>

## Run the Client Pages
In this project, react works on the server side to render the pages so that the pages are SEO friendly. Make sure the server project is up and running before you run the client pages.
After that, you can run the client pages using the command:

    npm run dev

### Localization
The pages can be localized using the same approache mentioned above.<br>
- localization file path: <b>client-pages\static\localization\localization.csv</b><br>
- localizer path: <b>client-pages\controller\lib\localization\localizer.ts</b><br>
- csvParser path: <b>client-pages\controller\lib\localization\csvParser.ts</b><br>

<br>
<br>

## Why <b>[Parcel2](https://v2.parceljs.org)</b> bundler:
Parcel2 allows for fast bundling with almost zero configuration.

#### Why not using [Webpack](https://webpack.js.org/):<br>
The project was originally done using Webpack, but it breaks and generates errors for future updates. It has lot of configurations that you have to set and maintain. This consumes time and effort and distracts away from the real project code.<br>

#### Why not using [Fusebox](https://fuse-box.org/):<br>
Although it is the fastest bundler, it takes time to learn and doesn't offer zero-configuration feature. It also has known issues in bundling css files.
