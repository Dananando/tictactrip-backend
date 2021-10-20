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

First connect to postgres
```bash
sudo -i -u postgres
```

Type :
```bash
psql
```

Create a user
```bash
CREATE ROLE tictactrip WITH LOGIN PASSWORD 'password';
```

Create your database
```bash
CREATE DATABASE tictactrip OWNER userName;
```

Create tables and import relevant data
```bash
psql -U tictactrip -f ./data/createTable.sql
psql -U tictactrip -f ./data/importData.sql
```

If you want to start over with the tables, type:
```bash
psql -U tictactrip -f ./data/deleteData.sql
```