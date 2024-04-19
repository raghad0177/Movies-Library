# Project Name - Movie

**Author Name**: Raghad Abdullah

## WRRC
### Lab 11
![wrrc](/movieData/page1.png)
### Lab 12
![wrrc](/movieData/lab12.png)
## Lab 13
![wrrc](/movieData/lab13.png)
## Code Overview

### Server Setup:
- Express.js is used for server creation and initialization.
- Port number is retrieved from the environment variable `PORT`.

### Data Handling:
- Movie data is loaded from a JSON file located at "./movieData/data.json".

### Route Handling:
- Routes are defined for various endpoints:
  - `/`: Handled by `homeHandler`, provides information about a single movie.
  - `/favorite`: Handled by `favoriteHandler`, sends a simple message.
  - `/trending`: Handled by `trendingHandler`, retrieves trending movie data.
  - `/search`: Handled by `searchHandler`, searches movies based on the provided title.
  - `/popularId`: Handled by `popularIdHandler`, retrieves popular movie IDs.
  - `/TV`: Handled by `TVHandler`, retrieves TV show changes data.
  - `/addMovie`: Handled by `addMovieHandler`, adds a new movie to the database.
  - `/getMovies`: Handled by `getMoviesHandler`, retrieves all movies from the database.

### Custom Error Handling Middleware:
- Two error handling middleware functions are defined:
  - One for server errors (status 500).
  - Another for "page not found" errors (status 404).

## Modifications

1. **Environment Variables:**
   - Ensure that `PORT`, `USER`, `PASS`, and `API_KEY` are properly set in your environment or in a `.env` file for security purposes.

2. **Error Handling:**
   - Improve error handling by providing more descriptive error messages or logging.

3. **Code Optimization:**
   - Consider optimizing code by reducing redundancy and improving readability.

4. **Security:**
   - Implement security best practices such as input validation and sanitization, especially for routes like `/search` where user input is directly used in the API request.

5. **Documentation:**
   - Add comments/documentation to enhance code readability and maintainability.

6. **Database Integration:**
   - Connect the application to a PostgreSQL database using the `pg` library.
   - Implement functions to interact with the database, such as adding and retrieving movies.

