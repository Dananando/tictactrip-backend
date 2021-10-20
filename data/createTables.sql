-- Creation of the tables necessary in the DB
BEGIN;

CREATE TABLE "text" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL UNIQUE,
    "registration_date" TIMESTAMPTZ DEFAULT NOW()

);

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "registration_date" TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;