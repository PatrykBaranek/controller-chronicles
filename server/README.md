
# controller-chronicles-api

## Description

Application built using NestJS framework, serves as a comprehensive aggregator and storage solution for podcasts and game reviews.This innovative platform is designed to cater to enthusiasts who appreciate both auditory storytelling and the dynamic world of gaming.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Additional configuration .env file

### MongoDb Atlas config

```bash
  MONGO_URI - connection string for MongoDB Atlas access
```

### RawgApi config

Application main resource of games is free Api served by [`rawg.io`](https://rawg.io/)

```bash
  RAWG_API_KEY
```

### Spotify Web Api config

To get spotify podcasts you'll need to add this configuration to your env files. More information about configuration go to [Spotify Web Api Docs](https://developer.spotify.com/documentation/web-api)

```bash
  SPOTIFY_CLIENT_ID - this is the unique identifier for your application assigned by Spotify when you register your application on the Spotify Developer Dashboard

  SPOTIFY_CLIENT_SECRET - A secret key provided by Spotify, paired with your Client ID

  SPOTIFY_CLIENT_STATE - A unique string that is sent with each request to Spotify and returned back, ensuring that the response corresponds to your application's request

  SPOTIFY_REDIRECT_URI - The URI to which Spotify will redirect after a successful login/authentication

  SPOTIFY_CLIENT_REDIRECT_URI_AUTH_SUCCESS - Redirect URI used specifically when authentication is successfully
```

### Youtube Api config

```bash
  YOUTUBE_API_KEY
```

### JWT Tokens Secrets config

Application is token based approuch to authenticate user and here you can set up this secrets for each token

```bash
  JWT_ACCESS_SECRET - access token secret to authenticate some guarded endpoints

  JWT_REFRESH_SECRET - refresh token secret to refresh access token when expires

  JWT_RESET_SECRET - reset token secret for authenticate user for reset password
```

### Email config

```bash
  MAIL_HOST - This is the hostname or IP address of your email service provider's server example (GMAIL smtp.gmail.com)

  MAIL_PORT - The port number used for the email server connection example (GMAIL 587)

  MAIL_USER - The username or email address used for authentication with the mail server

  MAIL_PASS - The password associated with your mail server account
```


### Server additional config

```bash
  NODE_ENV - Specifies the environment in which your Node.js application is running ('development' | 'production')

  FRONTEND_URL - The URL where your frontend application is accessible

  BACKEND_URL - The URL where your backend server is accessible

  BACKEND_PORT - The port number on which your backend server listens
```

## Project structure

The project is organized into several modules, each serving a distinct purpose within the application.
Based on NestJS best practices from [Official Docs](https://docs.nestjs.com/modules)

### Directory Structure

```
src/
    ├── app/
    │   ├── filters/
    │   │   └── [various filters]
    │   └── interceptors/
    │       └── [various interceptors]
    ├── auth/
    │   ├── controllers/
    │   ├── dto/
    │   ├── guards/
    │   ├── services/
    │   └── strategies/
    ├── collections/
    │   ├── controllers/
    │   ├── database/
    │   ├── dto/
    │   ├── models/
    │   └── services/
    ├── email/
    │   ├── templates/
    │   ├── email.module.ts
    │   └── email.service.ts
    ├── games/
    │   ├── controllers/
    │   ├── database/
    │   ├── dto/
    │   ├── models/
    │   └── services/
    ├── games-update/
    │   └── services/
    ├── how-long-to-beat/
    │   ├── dto/
    │   ├── models/
    │   └── services/
    ├── puppeteer/
    │   └── services/
    ├── rawg/
    │   ├── helpers/
    │   ├── rawg-api/
    │   ├── rawg-developers/
    │   ├── rawg-genres/
    │   ├── rawg-tags/
    │   ├── types/
    │   └── rawg.module.ts
    ├── reviews-sites/
    │   ├── controllers/
    │   ├── dto/
    │   ├── models/
    │   ├── services/
    │   └── util/
    ├── spotify/
    │   ├── constants/
    │   ├── dto/
    │   ├── guards/
    │   ├── spotify-auth/
    │   │   ├── controllers/
    │   │   └── services/
    │   ├── spotify-episodes/
    │   │   ├── controllers/
    │   │   └── services/
    │   ├── spotify-podcasts/
    │   │   ├── controllers/
    │   │   └── services/
    │   ├── spotify-soundtracks/
    │   │   ├── controllers/
    │   │   └── services/
    │   └── spotify.module.ts
    ├── steam/
    │   ├── controllers/
    │   ├── database/
    │   ├── dto/
    │   ├── models/
    │   ├── services/
    │   │   ├── steam-bestsellers/
    │   │   ├── steam-players-in-game/
    │   │   └── steam-reviews/
    │   └── util/
    ├── users/
    │   ├── controllers/
    │   ├── database/
    │   ├── dto/
    │   ├── models/
    │   └── services/
    ├── youtube/
    │   ├── controllers/
    │   ├── dto/
    │   │   └── decorators/
    │   ├── models/
    │   ├── services/
    │   └── util/
    └── main.ts

```

### Module description

  - App Module (app/):
    - Core module that initializes and configures the application.
    - Includes global settings and foundational services.

  - Auth Module (auth/):
    - Implements authentication strategies.
    - Ensures secure access to resources.

  - Collections Module (collections/):
    - Manages and aggregates users games collections.

  - Email Module (email/):
    - Handles all email sending functionalities.
    - Configured for notifications, alerts, or user communication.

  - Games Module (games/):
    - Central module for handling game-related information.
    - Could include features like listing, categorizing, and detailing games.

  - Games Update Module (games-update/):
    - Responsible for keeping the game data up-to-date.
    - May interact with external APIs or databases for fresh data.

  - How Long to Beat Module (how-long-to-beat/):
    - Integrates with the 'How Long to Beat' service.
    - Provides data on game durations and playtimes.

  - Puppeteer Module (puppeteer/):
    - Utilizes Puppeteer for tasks that require browser automation or web scraping.

  - RAWG Module (rawg/):
    - Interfaces with the RAWG API for additional game data.

  - Reviews Sites Module (reviews-sites/):
    - Aggregates and manages data from various game review websites.

  - Spotify Module (spotify/):
    - Manages the integration with Spotify for accessing podcast data.

  - Steam Module (steam/):
    - Handles the integration with puppeteer for Steam Data.

  - Users Module (users/):
    - Manages user accounts, profiles, and interactions within the app.

  - YouTube Module (youtube/):
    - Integrates with YouTube Api, for video trailers and reviews.

## Dependencies Documentation

- **`@nestjs-modules/mailer`**: Module for NestJS to send emails, integrates with Nodemailer. [More Info](https://www.npmjs.com/package/@nestjs-modules/mailer)

- **`@nestjs/axios`**: Provides Axios integration for NestJS, allowing HTTP requests to external services. [More Info](https://www.npmjs.com/package/@nestjs/axios)

- **`@nestjs/cache-manager`**: Caching module for NestJS, useful for improving performance. [More Info](https://www.npmjs.com/package/@nestjs/cache-manager)

- **`@nestjs/common`**: Commonly used NestJS utilities and decorators. [More Info](https://www.npmjs.com/package/@nestjs/common)

- **`@nestjs/config`**: Configuration module to manage environment variables and configuration settings. [More Info](https://www.npmjs.com/package/@nestjs/config)

- **`@nestjs/core`**: Core NestJS framework functionality. [More Info](https://www.npmjs.com/package/@nestjs/core)

- **`@nestjs/devtools-integration`**: Integration tools for NestJS development. [More Info](https://www.npmjs.com/package/@nestjs/devtools-integration)

- **`@nestjs/event-emitter`**: Event emitter module for NestJS, for handling application-wide events. [More Info](https://www.npmjs.com/package/@nestjs/event-emitter)

- **`@nestjs/jwt`**: JSON Web Tokens (JWT) module for authentication in NestJS applications. [More Info](https://www.npmjs.com/package/@nestjs/jwt)

- **`@nestjs/mongoose`**: Module to integrate Mongoose, a MongoDB object modeling tool, with NestJS. [More Info](https://www.npmjs.com/package/@nestjs/mongoose)

- **`@nestjs/passport`**: Passport module for NestJS, commonly used for authentication. [More Info](https://www.npmjs.com/package/@nestjs/passport)

- **`@nestjs/platform-express`**: Express platform adapter for NestJS. [More Info](https://www.npmjs.com/package/@nestjs/platform-express)

- **`@nestjs/schedule`**: Scheduling module for NestJS to handle cron jobs and task scheduling. [More Info](https://www.npmjs.com/package/@nestjs/schedule)

- **`@nestjs/swagger`**: Swagger module for API documentation in NestJS applications. [More Info](https://www.npmjs.com/package/@nestjs/swagger)

- **`axios`**: HTTP client for making requests to external services. [More Info](https://www.npmjs.com/package/axios)

- **`bcrypt`**: Library for hashing and comparing passwords securely. [More Info](https://www.npmjs.com/package/bcrypt)

- **`cache-manager`**: General-purpose caching library. [More Info](https://www.npmjs.com/package/cache-manager)

- **`class-transformer`**: Utility library to transform plain objects to classes and vice versa. [More Info](https://www.npmjs.com/package/class-transformer)

- **`class-validator`**: Validation library to validate input data. [More Info](https://www.npmjs.com/package/class-validator)

- **`cookie-parser`**: Middleware to parse cookies attached to the client request object. [More Info](https://www.npmjs.com/package/cookie-parser)

- **`date-fns`**: Modern JavaScript date utility library. [More Info](https://www.npmjs.com/package/date-fns)

- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`. [More Info](https://www.npmjs.com/package/dotenv)

- **`ejs`**: A templating engine used to generate HTML markup with plain JavaScript. [More Info](https://www.npmjs.com/package/ejs)

- **`fuse.js`**: A lightweight fuzzy-search library. [More Info](https://www.npmjs.com/package/fuse.js)

- **`googleapis`**: The official Node.js client library for accessing Google APIs. [More Info](https://www.npmjs.com/package/googleapis)

- **`howlongtobeat`**: A service to query the HowLongToBeat website. [More Info](https://www.npmjs.com/package/howlongtobeat)

- **`mongodb-client-encryption`**: Provides support for MongoDB client-side field level encryption. [More Info](https://www.npmjs.com/package/mongodb-client-encryption)

- **`mongoose`**: A MongoDB object modeling tool. [More Info](https://www.npmjs.com/package/mongoose)

- **`nestjs-typeorm-paginate`**: Adds pagination support to applications using TypeORM with NestJS. [More Info](https://www.npmjs.com/package/nestjs-typeorm-paginate)

- **`nodemailer`**: A module for Node.js to send emails. [More Info](https://www.npmjs.com/package/nodemailer)

- **`passport`**: Middleware for authenticating users in Node.js applications. [More Info](https://www.npmjs.com/package/passport)

- **`passport-jwt`**: A Passport strategy for authenticating with a JSON Web Token (JWT). [More Info](https://www.npmjs.com/package/passport-jwt)

- **`passport-local`**: Passport strategy for authenticating with a username and password. [More Info](https://www.npmjs.com/package/passport-local)

- **`puppeteer`**: A Node library to control headless Chrome or Chromium. [More Info](https://www.npmjs.com/package/puppeteer)

- **`reflect-metadata`**: A polyfill for the Metadata Reflection API. [More Info](https://www.npmjs.com/package/reflect-metadata)

- **`rxjs`**: Library for composing asynchronous and event-based programs. [More Info](https://www.npmjs.com/package/rxjs)

- **`spotify-web-api-node`**: A Node.js wrapper for Spotify's Web API. [More Info](https://www.npmjs.com/package/spotify-web-api-node)

# Controllers Chronicles Api
The Controllers Chronicles API description

## Version: 1.0


### /api/spotify/auth/login

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/auth/getMe

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/podcasts

#### GET
##### Summary:

Get all game podcasts

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50 | Yes | number |
| offset | query | The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Return all game podcasts |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/spotify/podcasts/{id}

#### GET
##### Summary:

Get podcast by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Return podcast details by ID |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/spotify/podcasts/user/list

#### GET
##### Summary:

Get user podcasts

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50 | Yes | number |
| offset | query | The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Return user podcasts |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/spotify/podcasts/add/{id}

#### POST
##### Summary:

Add podcast to user library

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Podcast added to user library |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/spotify/podcasts/remove/{id}

#### DELETE
##### Summary:

Remove podcast from user library

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Podcast removed from user library |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/spotify/episodes/{id}

#### GET
##### Summary:

Get episode by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Episode id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/episodes/game/{gameId}

#### GET
##### Summary:

Get episodes by game title

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/soundtracks/{gameId}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/soundtracks/{gameId}/playlists

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/spotify/soundtracks/{id}

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /api/games

#### GET
##### Summary:

Get games

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| page | query | The page number to fetch | Yes | number |
| page_size | query | The number of results per page | Yes | number |
| search | query | Search term | No | string |
| search_exact | query | Search exact term | No | boolean |
| genres | query | Filter by genres | No | string |
| platforms | query | Filter by platforms | No | string |
| stores | query | Filter by stores | No | string |
| publishers | query | Filter by publishers | No | string |
| metacritic | query | Filter by Metacritic score | No | string |
| tags | query | Filter by tags | No | string |
| dates | query | Filter by release dates | No | string |
| ordering | query | Order results by specific field | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns a list of games |

### /api/games/{id}

#### GET
##### Summary:

Get game by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns game details by id |

### /api/games/{id}/embargo-date

#### POST
##### Summary:

Update game reviews embargo date

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| date | query |  | Yes | dateTime |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Manualy set game review embargo date |

### /api/games/{id}/stores

#### GET
##### Summary:

Get game stores by game ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The ID of the game | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns game stores by game ID |

### /api/games/{id}/update

#### POST
##### Summary:

Force update game by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns game details by id |

### /api/reviews-sites/{gameId}

#### GET
##### Summary:

Get reviews from all sites by game ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| default |  |

### /api/auth/signup

#### POST
##### Summary:

Create user

##### Description:

Registers a new user in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | The user has been successfully created. |

### /api/auth/login

#### POST
##### Summary:

Log in

##### Description:

Authenticates a user and provides tokens.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Logged in successfully |

### /api/auth/refresh

#### GET
##### Summary:

Refresh token

##### Description:

Refreshes access tokens using a refresh token.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Refresh token | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Token refreshed successfully |

### /api/auth/logout

#### GET
##### Summary:

Log out

##### Description:

Logs out the user by invalidating the access token.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Access token | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Logged out successfully |

### /api/auth/request-reset-password

#### POST
##### Summary:

Request password reset

##### Description:

Requests a password reset for a user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| email | query | User email for password reset | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Password reset requested |
| 404 | User not found |

### /api/auth/reset-password

#### POST
##### Summary:

Reset password

##### Description:

Resets the password for a user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | query | Password reset token | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/users

#### POST
##### Summary:

Create a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

#### GET
##### Summary:

Get all users

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/users/profile

#### GET
##### Summary:

Get user profile

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Bearer <access_token> | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/users/{id}

#### GET
##### Summary:

Get user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### PATCH
##### Summary:

Update user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### DELETE
##### Summary:

Delete user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |
| Authorization | header | Bearer <access_token> | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /api/collections

#### GET
##### Summary:

Get all collections of a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Summary:

Create a new collection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /api/collections/{id}

#### DELETE
##### Summary:

Delete a collection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /api/collections/add-game

#### POST
##### Summary:

Add a game to a collection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /api/collections/{collectionId}/game/{gameId}

#### DELETE
##### Summary:

Delete a game from a collection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| collectionId | path |  | Yes | string |
| gameId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /api/steam/bestsellers

#### GET
##### Summary:

Get steam bestsellers

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Steam bestsellers |

### /api/steam/{gameId}/reviews

#### GET
##### Summary:

Get steam reviews by game ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | Game ID | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Steam reviews |

### /api/steam/{gameId}/players-count

#### GET
##### Summary:

Get steam players count by game ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | Game ID | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Steam players count |

### /api/youtube

#### GET
##### Summary:

Get game video reviews or trailers by game ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | query | Game ID | Yes | number |
| videoType | query | Video type | Yes | string |
| gameId | query | Game ID | Yes | number |
| videoType | query | Video type | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### DELETE
##### Summary:

Delete game video review or trailers by video ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| videoId | query |  | Yes | string |
| videoType | query |  | Yes | string |
| gameId | query |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /api/youtube/videos/date-range

#### GET
##### Summary:

Get game video review or trailers by date range

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fromDate | query | From date | Yes | string (YYYY-MM-DD) |
| toDate | query | To date | Yes | string (YYYY-MM-DD) |
| gamesCount | query | Number of games | Yes | number |
| videoType | query | Video type | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |


# Schemas Documentation

## Collection Module

### `collections/models/collection.model.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Game } from 'src/games/models/game.schema';

export type CollectionDocument = Collection & Document;

@Schema({ collection: 'collections' })
export class Collection {
  @Prop()
  userId: string;

  @Prop({ required: false, default: 'My Collection' })
  name: string;

  @Prop([Game])
  games: Game[];

  @Prop({ min: 0, max: 5, default: 0 })
  priority: number;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
```

**Description:** 
Defines the schema for collections, including user ID, name, games, priority, and creation date.

---

## Games Module

### `games/models/game.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';
import { ReviewsSites } from 'src/reviews-sites/models/reviews-sites.schema';
import { SteamPlayersInGame } from 'src/steam/models/steam-players-in-game.schema';
import { SteamReviews } from 'src/steam/models/steam-reviews.schema';
import { YoutubeVideo } from 'src/youtube/models/youtube-video.schema';

export class RawgGame {
  @Prop()
  slug: string;

  @Prop()
  name: string;

  @Prop()
  name_original: string;

  @Prop()
  description_raw: string;

  @Prop()
  metacritic: number;

  @Prop({ type: Array })
  metacritic_platforms?: any[] | null;

  @Prop()
  released: string;

  @Prop()
  updated: string;

  @Prop()
  background_image: string;

  @Prop()
  background_image_additional: string;

  @Prop()
  website: string;

  @Prop()
  screenshots_count: number;

  @Prop()
  movies_count: number;

  @Prop()
  creators_count: number;

  @Prop()
  achievements_count: number;

  @Prop()
  parent_achievements_count: number;

  @Prop()
  reddit_url: string;

  @Prop()
  reddit_name: string;

  @Prop()
  reddit_description: string;

  @Prop()
  reddit_logo: string;

  @Prop()
  suggestions_count: number;

  @Prop({ type: Array })
  alternative_names?: null[] | null;

  @Prop()
  metacritic_url: string;

  @Prop()
  parents_count: number;

  @Prop()
  additions_count: number;

  @Prop()
  game_series_count: number;

  @Prop({ type: Array })
  platforms?: any[] | null;

  @Prop({ type: Array })
  stores?: any[] | null;

  @Prop({ type: Array })
  developers?: any[] | null;

  @Prop({ type: Array })
  genres?: any[] | null;

  @Prop({ type: Array })
  tags?: any[] | null;

  @Prop({ type: Array })
  publishers?: any[] | null;
}

@Schema({ collection: 'games', timestamps: true })
export class Game {
  @Prop()
  _id: number;

  @Prop({ type: RawgGame })
  rawgGame: RawgGame;

  @Prop({
    type: HowLongToBeat,
  })
  howLongToBeat?: HowLongToBeat;

  @Prop({
    type: SteamReviews,
  })
  steam_reviews?: SteamReviews;

  @Prop({
    type: SteamPlayersInGame,
  })
  steam_players_in_game?: SteamPlayersInGame;

  @Prop({
    type: Array<YoutubeVideo>
  })
  video_reviews?: YoutubeVideo[];

  @Prop({
    type: Array<YoutubeVideo>
  })
  game_trailers?: YoutubeVideo[];

  @Prop({
    type: Date,
  })
  review_embargo_date?: Date;

  @Prop({
    type: Array<ReviewsSites>
  })
  reviews_sites?: ReviewsSites[];

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);

```

**Description:** 
Outlines the structure for storing game information, integrating data from various sources like "How Long to Beat", review sites, Steam, and YouTube.

---

## Users Module

### `users/models/user.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'users' })
export class User {
  _id: string;

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
  })
  @Prop({ required: true, unique: true })
  password: string;

  @ApiProperty({
    description: 'Refresh token',
    type: String,
  })
  @Prop()
  refresh_token: string;

  @ApiProperty({
    description: 'Reset token',
    type: String,
  })
  @Prop()
  reset_token?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
```

**Description:** 
Defines the user schema with fields for email, password, refresh token, and reset token.

---

## YouTube Module

### `youtube/models/youtube-video.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoCreate: false, timestamps: true })
export class YoutubeVideo {
  @Prop({ required: true })
  game_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  link: string;
}

export type YoutubeVideoDocument = YoutubeVideo & Document;
export const YoutubeVideoSchema = SchemaFactory.createForClass(YoutubeVideo);
```

**Description:** 
Specifies the schema for YouTube video data, including fields for game ID, title, thumbnail, author, and link.

---
