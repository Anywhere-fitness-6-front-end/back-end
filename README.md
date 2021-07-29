# Anywhere Fitness

API URL: https://infinite-anchorage-25635.herokuapp.com/

## Endpoints

### Auth

- POST /users/register  
  --> `{ username: 'joe', password: '1234pass' }`  
  <-- `{ username: "joe", user_id: 5 }`
- POST /users/login  
  --> `{ username: 'joe', password: '1234pass' }`  
  <-- `{ message: "welcome, joe", token: "eyJhbGciOiJ..." }`

All of the other routes will require the token received from login to return any data. Include the token as the http header, "Authorization." Certian data may be restricted by individual user as well. (For instance, GET /classes/2 might return different data depending on if the token belongs to the class instructor, a class attendee, or another user.)

### Classes

| method | path                       | receives       | returns                                                      |
| ------ | -------------------------- | -------------- | ------------------------------------------------------------ |
| GET    | /classes                   |                | a list of all the classes                                    |
| GET    | /classes/{class_id}        |                | information about the specified class                        |
| POST   | /classes                   | a class object | the newly created class                                      |
| PUT    | /classes/{class_id}        | a class object | the newly updated class                                      |
| DELETE | /classes/{class_id}        |                | the deleted class                                            |
| GET    | /enroll/{class_id}         |                | a class object & for instructors one with attending members. |
| POST   | /enroll/{class_id}         |                | successful message object                                    |
| DELETE | /enroll/{class_id}         |                | successful message object                                    |

To submit a new class, the following is required:

```js
  {
    "class_name": "Yoga with Lily",
    "class_time": "2021-07-31T01:00:00.000Z",
    "duration": 90,
    "activity_name": "yoga",
    "intensity": "moderate",
    "address": "123 Yoga Lane, Sun Town, CA",
    "max_size": 12,
  }
```

When requesting information about a class, you'll receive the following:

```js
{
    "class_id": 4,
    "class_name": "Yoga with Lily",
    "class_time": "2021-07-31T01:00:00.000Z",
    "duration": 90,
    "instructor_id": 1,
    "activity_name": "yoga",
    "intensity": "moderate",
    "address": "123 Yoga Lane, Sun Town, CA",
    "max_size": 12,
    "available_slots": 12,
    "created_at": "2021-07-27T20:35:11.049Z",
    "updated_at": "2021-07-27T20:35:11.049Z",
    "instructor_name": "Max \"The Ripper\" Beefstack",
    "attending": [] // Worth nothing this is only available for instructors.
}
```

For managing a user's enrollment in a class, you can use the /enroll/{class_id} endpoint. GET returns an object with `"enrolled": true || false` if the user is registered, POST registers the user for the class, and DELETE de-registers. No need for any request body here - the class_id is in the url and the user_id is in the token.

Currently GET returns the full list of attendees for a class if requested by a user that is also an instructor. That will updated soon so only the class's actual instructor can get that list - any other instructor would just get true or false.

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
