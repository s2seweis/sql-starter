# Accessing PostgreSQl From API's with React

# Settings:
```
Install following applications on your computer:
```
1. https://postgresapp.com/
2.  pgAdmin4
```
Connects to the PostgreSQL server running on localhost using the specified username (SWT) and database name (socialnetwork).
```
3. Migration on Mac: DATABASE_URL=postgres://SWT@localhost:5432/socialnetwork npm run migrate up

# Clients for testing the connection:
1. Postman or
2. REST Client

# Start the Server:
```
- npm run (shows the scripts)
- npm run start - (starts the server)
```

# Good to know:
```
What is a connection pool? 
- In the context of PostgreSQL and Express, a pool refers to a connection pool used for managing database connections efficiently.
- When your Express application needs to interact with a PostgreSQL database, it has to establish a connection. Creating a new database connection every time your application receives a request can be resource-intensive and slow down your application, especially if it receives a high volume of requests. Connection pooling helps solve this problem.
- A connection pool is a cache of database connections that are reused, rather than being opened and closed for every new request. When a connection is needed, it is taken from the pool. After the connection has been used, it is returned to the pool instead of being closed. This allows the connections to be reused, reducing the overhead of establishing a new connection every time a request is made to the database.
```
