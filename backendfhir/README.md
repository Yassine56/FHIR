## SETUP

# Setup PostgreSQL user & database using psql

Open psql shell:

#### MacOs

```
psql postgres
```

#### Ubuntu

```
sudo -u postgres psql
```

In psql shell, execute following commands:

```
CREATE DATABASE test;
CREATE USER yassine WITH ENCRYPTED PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE test TO yassine;
\q
```

then on your terminal, navigate to your backend directory and :

```
npm run watch
```

or

```
npm run server
```

To run the server

then try to hit the route

```
localhost:4000/setup
```

This will create the necessary table
