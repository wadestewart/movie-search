# GA code-challenge

### Wade's IMDb App
> This application was built using a Node.js back-end and HTML, CSS, and Javascript front-end.

- Dependencies required:
1. Express
2. Body-Parser
3. File System
4. Path

## Process

- After debugging the server.js file, I set out to work on building the front-end.
- The HTML consists of a form for the user to input a movie they would like to search, and two empty divs to handle the search results and the favorite list. I used buttons to handle accessing movie details, adding a movie to the favorite list and displaying the favorite list.
- The CSS is basic and clean. Keeping the styles nondescript highlights the displayed data.
- The Javascript was written in vanilla and is where I spent most of my time. The API call requires user input to be captured amd added to the request. A function to handle the response data, iterate over the data using a forEach method, and then populate the empty divs with movie data and movie details. Button elements were created with event listeners to give the user an option to see more details or 'favorite' a movie. If a user 'favorited' a movie, it was saved to the back-end and available (via a button) to be displayed if prompted.
