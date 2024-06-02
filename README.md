# **ServerSide WebShop**


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## 📰 Description

The backend of an e-commerce website for database services.

## 🔎 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## 💾 Installation <a id="installation"></a>

Clone the repository code [from here](https://github.com/ThisTish/ServerSideWebShop) to the directory of your choosing. You will need node, npm, and PostgreSQL installed.

## 🖱️ Usage <a id="usage"></a>


### Setup

1. Install dependencies using `npm install`.
2. Create a `.env` file in the root directory with the following variables:

		DB_NAME=your_database_name
		DB_USER=your_postgresql_username
		DB_PASSWORD=your_postgresql_password

3. Run ```npm run seed``` to create and seed the development database.


4. Start the server and sync Sequelize models with code ```npm start```.

### About


This API provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on three tables in the database: Categories, Tags, and Products. Testing this through Insomnia or another API testing tool is possible and testing files are provided. More information in [Tests](#tests)

### Walkthrough

-[Video walkthrough for testing the API routing](https://drive.google.com/file/d/1bJdVwwWSl0zqIImnS4T5B_W5ntAk2XsF/view)


## 📢 Acknowledgments <a id="acknowledgments"></a>


This project was made possible thanks to the following libraries and tools:

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [pg](https://www.npmjs.com/package/pg): Non-blocking PostgreSQL client for Node.js.
- [Sequelize](https://www.npmjs.com/package/sequelize): A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.
- [nodemon](https://www.npmjs.com/package/nodemon): Automatically restarts the Node.js application when file changes are detected.
- [@types/dotenv](https://www.npmjs.com/package/@types/dotenv): TypeScript type definitions for the `dotenv` library.

## 🌐 Contributing <a id="contributing"></a>


Please consider contributing by opening an issue.

## 🧪 Tests <a id="tests"></a>

You are able to test all route endpoints using any API testing tool.
There are testing files provided for [Insomnia](https://insomnia.rest/products/insomnia) and [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)(VS Code extension) in the tests directory.

## ✋ Questions <a id="questions"></a>


If you have any questions, feel free to contact me at:

- *GitHub: [ThisTish](https://github.com/ThisTish)*
- *Contact: tish.sirface@gmail.com*

## 🪪 License <a id="license"></a>

MIT License

        Copyright 2024 Tish Parry

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
