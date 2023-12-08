# React + Postgre SQL Application

Welcome to [React + Postgre SQL Application] – Its a starter project for getting used to Postgre SQL.
To a latter pont of time the Client(react), Server(express) & the Postgre Database will be dockerized.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Client](#client)
  - [Technologies](#technologies)
  - [Usage](#usage)
- [Server](#server)
  - [Technologies](#technologies-1)
  - [Database](#database)
  - [Usage](#usage-1)
- [Contributing](#contributing)
- [License](#license)

## Special Features
- Use for the client styled components
-  

## Getting Started

## How to connect Postgre with your Express Server?
1. For adding a new table to migrations: npm run migrate create add (cars) table
2. For add Table to Postgres Database: DATABASE_URL=postgres://SWT@localhost:5432/cars npm run migrate up/ Other ways #? 
3. Very interisting!!! = cars/schemas/public/tables/cars & right click ERD for Table (Practise/ Entity-Relationship Diagram)

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/) - for running the client and server
- [PostgreSQL](https://www.postgresql.org/) - for the database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project

## Comments: 
- Add Most importnant commands from the console to Best Practise Project
- PG Module used to set up a connection to Postgres and runs some SQL/ very popular in the node community 