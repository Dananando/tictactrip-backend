> It’s not a bug – it’s an undocumented feature
> - Napoleon

# What is this repository about

That repository aims at solving this [challenge](https://docs.google.com/document/d/1DW2fKidrl5qV1ZvpmysqEMpoqbYjaRQhOJneYnfhzNs/edit).

# How to use this repository

## Clone it

```bash
git clone git@github.com:Dananando/tictactrip-backend.git
```

## Install the relevant dependancies

You will need dotenv, pg, express, jsonwebtoken.

```bash
npm install
```

## Set up the database

1. First connect to postgres

```bash
sudo -i -u postgres
```

2. Then you must type :

```bash
psql
```

3. Create a user

```bash
CREATE ROLE tictactrip WITH LOGIN PASSWORD 'password';
```

4. Create your database

```bash
CREATE DATABASE tictactrip OWNER userName;
```

5. Please note that in your .env, your PG_URL would look like this:

```
PG_URL=postgresql://tictactrip:tictactrip@localhost:5432/tictactrip
```

1. a. Create tables
```bash
psql -U tictactrip -f ./data/createTable.sql
```

6. b. If you want to start over with the tables and delete them, type:
```bash
psql -U tictactrip -f ./data/deleteTables.sql
```

## Set up of the .env file

Do not forget to set up the .env file :
- Input a PORT number
- Input a PG_URL (e.g. PG_URL=postgresql://tictactrip:tictactrip@localhost:5432/tictactrip)
- Input a JWT_SIGN_SECRET (e.g. you can use ```require('crypto').randomBytes(64).toString('hex');``` in order to generate one randomly)

## Insert some fake data to play

Use this command to run the server in development mode 
```bash
npm run dev
```

Insert some fake data thanks to the files in the [rest-client-tests folder](./rest-client-tests)