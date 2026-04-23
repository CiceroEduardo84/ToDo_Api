# ToDo - RESTfull API

## Technologies

- `Node.js`
- `Typescript`
- `Javascript`
- `Express`
- `JSON Web Token (JWT)`
- `Bcrypt`
- `Vitest`
- `Zod`
- `PostgreSql`
- `Docker`

## Environment Variables

```ini
DATABASE_URL=""

# Port the project
PORT=""

# Informations for create token
SECRET_TOKEN=""
EXPIRESIN_TOKEN=""

# Key token for armazenation
KEY_TOKEN=""

# environment aplication
ENVIRONMENT = ""
```

## Installation

```bash
# clone project
$ git clone https://github.com/CiceroEduardo84/ToDo_Api.git

# install dependencies
$ npm install

# run migrations
$ npx prisma migrate dev

# run api
$ npm run dev
```

## Routes

| Functionality | Method   | Endpoint              | Description                               |
| ------------- | -------- | -----------------     | ----------------------------------------- |
| Session       | `POST`   | /session/signin       | Start the user session                    |
|               | `POST`   | /session/signup       | Create the user                           |
|               | `POST`   | /session/logout       | Close the user session                    |
| Users         | `GET`    | /users/               | Return user informations(admin)           |
| Teams         | `GET`    | /teams/               | Return teams(admin)                       |
|               | `POST`   | /teams/               | Create a new team(admin)                  |
|               | `PUT`    | /teams/:teamId        | Update an existing team(admin)            |
|               | `DELETE` | /teams/:teamId        | Remove an existing team(admin)            |
| Teams Members | `GET`    | /teams/:teamId/members| Return teams members                      |
|               | `POST`   | /teams/:teamId/members| Include user in the team(admin)           |
|               | `DELETE` | /teams/:teamId/members| Remove user the team(admin)               |
| Tasks         | `GET`    | /tasks/               | Return tasks the user( or all for admin)  |
|               | `POST`   | /tasks/               | Add a new task(admin)                     |
|               | `PUT`    | /tasks/:taskId        | Update an existing task                   |
|               | `DELETE` | /tasks/:taskId        | Remove an existing task(admin)            |

**\*Tasks Pagination parameters**

- `status:` Status options `"pending"` , `"in_progress"` , `"completed"`, `"all"`.
- `priority:` Priority options `"high"` , `"medium"` , `"low"`, `"all"`.
- Query example: `"/tasks?status=all&priority=all"`.

## Tests

```bash
# run test
$ npm run test
```

## Links

- [Deploy](https://todo-api-4ioh.onrender.com)
