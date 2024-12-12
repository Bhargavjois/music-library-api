## Enhanced Music Library Management API

This is a backend application developed for the Voosh backend developer assignment. The project provides an API service to manage entities like users, artists, albums, tracks, and favorites. This API also uses authentication and authorization system to handle access to certain end points to restricted users.

**Clone the project:**
```
git clone https://github.com/imvbhargav/music-library-api
```

**Dependencies:**
| Package       | Version   | Use                          |
|---------------|-----------|------------------------------|
| nodejs        | v23.0.0   | JS Runtime Environment       |
| bcryptjs      | v2.4.3    | To hash the password         |
| cors          | v2.8.5    | To handle CORS               |
| dotenv        | v16.4.7   | To handle secrets            |
| express       | v4.21.2   | To handle routing            |
| jsonwebtoken  | v9.0.2    | To handle auth with tokens   |
| mongodb       | v6.12.0   | Database                     |
| mongoose      | v8.8.4    | Object Data Modeling         |
| uuid          | v11.0.3   | To create unique IDs         |


**Project Structure:**
```
├── config
|   ├── .env
|   ├── connectDB.js
|
├── controllers
|   ├── AdminController.js
|   ├── AlbumController.js
|   ├── ArtistController.js
|   ├── FavoriteController.js
|   ├── TrackController.js
|
├── middlewares
|   ├── AuthMiddleware.js
|
├── models
|   ├── Album.js
|   ├── Artist.js
|   ├── Favorite.js
|   ├── Track.js
|   ├── User.js
|
├── routes
|   ├── AdminRoutes.js
|   ├── AlbumRoutes.js
|   ├── ArtistRoutes.js
|   ├── FavoriteRoutes.js
|   ├── TrackRoutes.js
|   ├── UserRoutes.js
|      
├── utils
|   ├── ErrorHandler.js
|   ├── RecordUtils.js
|   ├── ResponseHandler.js
|   ├── UserUtils.js
|
├── server.js
├── package.json
```


**Install the required dependencies:**
```
cd music-library-api
npm install
```
**Setup environment variables:**
 ```env
  MONGODB_USERNAME='username'
  MONGODB_PASSWORD='password'
  MONGODB_URI='mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@your_mongodb_connection_string'
  PORT=3000
  API_VERSION='v1'
  JWT_SECRET='quicksimplesecret'
 ```
**Run the project:**
```
npm start
```
Additionally you can install nodemon to monitor for changes and restart the server with changes:
```
npm install nodemon --save-dev
```
_package.json:_
```
...
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
...
```

then to run the project in dev mode use:
```
npm run dev
```

#### **Features**

- **User**: Authentication and user-related functionalities.
  - `user_id, email, password, role`
  - **Admin** - All CRUD Rights.
  - **Editor** - Add, Update or Delete, artists, albums and tracks.
  - **Viewer** - Read-Only rights on artist, track, and full CRUD on favorites.

- **Artist**: CRUD operations for artists with filters for Grammy wins and visibility.
  - `artist_id, name, grammy, hidden`
- **Album**: Albums associated with multiple artists.
  - `album_id, name, artist_id, artist_name, year, hidden`
- **Track**: Tracks linked to albums and artists.
  - `track_id, name, artist_id, artist_name, album_id, album_name, duration, hidden`
- **Favorites**: Users can mark artists, albums, or tracks as favorites.
  - `favorite_id, user_id, category, item_id, name`

---
#### API Endpoints:
##### **Authentication:**
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | /api/v1/login  | User login                |
| POST   | /api/v1/signup | User registration         |
| GET    | /api/v1/logout | User logout               |

##### **Users**
| Method  | Endpoint                              | Description           |
|---------|---------------------------------------|-----------------------|
| GET     | /api/v1/users                         | Get Users             |
| POST    | /api/v1/users/add-user                | User addition         |
| DELETE  | /api/v1/logout/users/:id              | Delete User           |
| PUT     | /api/v1/logout/users/update-password  | Update user password  |

##### **Artists**
| Method | Endpoint                       | Description                       |
|--------|--------------------------------|-----------------------------------|
| GET    | /api/v1/artists                | Retrieve all artists              |
| GET    | /api/v1/artists/:id            | Retrieve all artists              |
| POST   | /api/v1/artists/add-artist     | Create a new artist               |
| PUT    | /api/v1/artists/:id            | Update an artist's information    |
| DELETE | /api/v1/artists/:id            | Delete an artist                  |

##### **Albums**
| Method | Endpoint                   | Description                       |
|--------|----------------------------|-----------------------------------|
| GET    | /api/v1/albums             | Retrieve all albums               |
| GET    | /api/v1/albums/:id         | Retrieve album by id              |
| POST   | /api/v1/albums/add-album   | Create a new album                |
| PUT    | /api/v1/albums/:id         | Update an album's information     |
| DELETE | /api/v1/albums/:id         | Delete an album                   |

##### **Tracks**
| Method | Endpoint                   | Description                       |
|--------|----------------------------|-----------------------------------|
| GET    | /api/v1/tracks             | Retrieve all tracks               |
| GET    | /api/v1/tracks/:id         | Retrieve a track                  |
| POST   | /api/v1/tracks/add-track   | Create a new track                |
| PUT    | /api/v1/tracks/:id         | Update a track's information      |
| DELETE | /api/v1/tracks/:id         | Delete a track                    |

##### **Favorites**
| Method | Endpoint                               | Description                                     |
|--------|----------------------------------------|-------------------------------------------------|
| GET    | /api/v1/favorites/:category            | Retrieve all user favorites  based on category  |
| POST   | /api/v1/favorites/add-favorite         | Add an item (artist, album, track) to favorites |
| DELETE | /api/v1/favorites/remove-favorite/:id  | Remove an item from favorites                   |

---
#### Connect with me:
- **Email - `imvbhargav@gmail.com`**
- **GitHub - [imvbhargav](https://github.com/imvbhargav) | [bhargavjois](https://github.com/bhargavjois)**