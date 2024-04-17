# Project Name - Movie

**Author Name**: Raghad Abdullah

## WRRC
![wrrc](/movieData/page1.png)

## Overview
Server Setup:

Express.js is imported and initialized as app.
The server is set to listen on port 3000.
Data Handling:

Movie data is imported from a JSON file located at "./movieData/data.json".
Route Handling:

Two routes are defined:
/ This route is handled by the homeHandler function, which sends information about a single movie as a response.
/favorite: This route is handled by the favoriteHandler function, which sends a simple message ("Welcome to Favorite Page") as a response.
Custom Error Handling Middleware:

Two error handling middleware functions are defined:
The first one handles server errors (status 500). It logs the error stack and sends a JSON response with a status code of 500 and a message indicating that something went wrong.
The second one handles "page not found" errors (status 404). It sends a JSON response with a status code of 404 and a message indicating that the requested page was not found.
## Getting Started
Install Git:
If you haven't already, download and install Git from the official website: Git - Downloads.

Initialize Git Repository:
Open your project directory in your terminal or command prompt, then run the following command to initialize a Git repository:

csharp
Copy code
git init
Add Files to Staging Area:
Use the following command to add files to the staging area. Replace <file> with the file name or use . to add all files:

csharp
Copy code
git add <file>
Commit Changes:
Once you've added files to the staging area, commit them using the following command:

sql
Copy code
git commit -m "Initial commit"
Replace "Initial commit" with a meaningful message describing the changes in this commit.

Connect to Remote Repository (Optional):
If you want to store your code on a remote repository (like GitHub, GitLab, or Bitbucket), you need to connect your local repository to it. Follow the instructions provided by the platform to create a new repository and then link your local repository to it using the following commands:

css
Copy code
git remote add origin <remote repository URL>
git branch -M main
git push -u origin main
Replace <remote repository URL> with the URL of your remote repository.

Start Coding:
With Git set up, you can now start coding your project. After making changes to your files, you can add and commit them to track your progress.

Push Changes:
Whenever you're ready to save your changes to the remote repository, use the following command:

css
Copy code
git push origin main
This command pushes your committed changes from your local main branch to the main branch on the remote repository.

## Project Features
Displaying information about a single movie.
Handling requests to a "favorite" page.
Implementing basic error handling for server errors and "page not found" errors.