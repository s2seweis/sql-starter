# React App with PostgreSQL Server

This is a simple React application with a server component that connects to a PostgreSQL database, designed to be hosted on Heroku.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [pgAdmin](https://www.pgadmin.org/) (optional, for PostgreSQL management)

### Installation

1. **Clone this repository:**

    ```bash
    git clone https://github.com/your-username/your-react-app.git
    cd your-react-app
    ```

2. **Install dependencies for both the React app and the server:**

    ```bash
    # Install dependencies for the React app
    npm install

    # Navigate to the server directory
    cd server

    # Install dependencies for the server
    npm install
    ```

### Configuration

1. **Database Configuration (server/.env):**

    Create a `.env` file in the `server` directory and configure your PostgreSQL database connection details:

    ```dotenv
    DATABASE_URL=your_postgresql_database_url
    ```

2. **React App Environment Variable (client/.env):**

    Create a `.env` file in the `client` directory and add the following line:

    ```dotenv
    REACT_APP_API_URL=https://your-heroku-app-name.herokuapp.com/api
    ```

    Replace `your-heroku-app-name` with the actual name of your Heroku app.

### Running Locally

1. **Start the Server:**

    ```bash
    cd server
    npm start
    ```

    This will start the Node.js/Express server on http://localhost:5000.

2. **Start the React App:**

    Open a new terminal window:

    ```bash
    cd client
    npm start
    ```

    This will start the React development server on http://localhost:3000.

3. **Access the App:**

    Open your web browser and navigate to http://localhost:3000 to see the React app in action.

### Using pgAdmin

If you are using pgAdmin for managing your PostgreSQL database:

- Open pgAdmin and connect to your PostgreSQL server.
- Navigate to your database and execute SQL queries or manage your data interactively.

## Deployment to Heroku

Follow these steps to deploy your app to Heroku:

1. **Create a Heroku App:**

    ```bash
    heroku create your-heroku-app-name
    ```

2. **Add a PostgreSQL Add-On:**

    ```bash
    heroku addons:create heroku-postgresql:hobby-dev --app your-heroku-app-name
    ```

3. **Set Config Vars on Heroku:**

    ```bash
    NPM_CONFIG_LEGACY_PEER_DEPS: true
    PROJECT_PATH: true
    ```

3. **Buildpacks:**

    ```bash
    https://github.com/timanovsky/subdir-heroku-buildpack.git
    heroku/nodejs
    ```

4. **Deploy to Heroku:**

    ```bash
    git push heroku master
    ```

5. **Open the App in the Browser:**

    ```bash
    heroku open --app your-heroku-app-name
    ```

## Heroku CLI Commands
    
    ```bash
    heroku logs --tail -a app-name
    like:
    heroku logs --tail -a express-for-postgre
    
    heroku apps
    heroku help
    ```

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Suggestions and improvements are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Comments / Terminal Commands

Feel free to add comments or execute terminal commands in this section based on your specific needs.
