# Anywhere Fitness

This is the repo for the back end of Anywhere Fitness, a Lambda School Build Week project that enables fitness instructors to organize classes, and allows fitness enthusiasts to browse, view, and enroll in those classes.

API URL: https://infinite-anchorage-25635.herokuapp.com/

## Endpoints

### Auth

- POST /users/register  
  --> `{ email: 'joe@email.com', password: '1234pass', name: 'Joe Smith', instructor: false }`  
  <-- `{ email: 'joe@email.com', name: 'Joe Smith', instructor: false, user_id: 5 }`
- POST /users/login  
  --> `{ email: 'joe@email.com', password: '1234pass' }`  
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
    "class_time": "2021-07-31T08:00:00",
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
    "class_time": "2021-07-31T08:00:00",
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

## Installing Locally
- Clone the repo and cd into the directory
- `npm install`
- You will also need postgresql running localling
- create a .env file, using .env.default as a template, updated with the correct urls for your local postgres

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
