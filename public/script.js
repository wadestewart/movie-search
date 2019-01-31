// Target the empty div('movies') on the DOM
const movies = document.getElementById('movies')
const favoriteList = document.getElementById('favorite-list')
const favoriteListButton = document.getElementById('favorites-button')

// Function to handle user input for API call to get requested movie data
function getMovieData() {
    // Target the user input value for API search
    let input = document.getElementById('user_input').value
    // Ensure that with each search the div('movies) will be cleared of previous search data
    movies.innerHTML = ''
    
    // API call with user inputted data
    fetch(`http://www.omdbapi.com/?s=${input}&apikey=6c31b064`)
        .then(function(response) {
            if(response.ok) {
                response.json()
                    .then(function(data) {
                        // Iterate over the response data for individual movie title
                        data.Search.forEach(function(movie) {
                            // Create elements to display results
                            const movieNode = document.createElement('h5')
                            const detailButton = document.createElement('button')
                            const detailedResult = document.createElement('p')
                            const favoriteButton = document.createElement('button')

                            // Add classes to elements for styling
                            movieNode.classList.add('movie')
                            detailButton.classList.add('deets')
                            detailedResult.classList.add('result')
                            favoriteButton.classList.add('favorite')

                            // Display created elements to empty div('movies)
                            movies.appendChild(movieNode).innerHTML += movie.Title + '<br />'
                            movieNode.appendChild(detailButton).innerHTML = 'Deets'
                            movieNode.appendChild(favoriteButton).innerHTML = 'Add Movie to Favorites'

                            // Event listener on button to display details when prompted
                            detailButton.addEventListener('click', getMovieDetails)

                            // Function to display movie details
                            function getMovieDetails() {
                                // Ensure if button is pressed multiple times, the result will reload
                                detailedResult.innerHTML = ''
                                // console.log(movie)

                                // Iterate over individual movie to display details
                                Object.keys(movie).forEach(function (key, value) {
                                    let item = key + ': ' + movie[key]
                                    // console.log(item)
                                    // console.log(key + ': ' + item)

                                    // Add movie individual details to corresponding node
                                    movieNode.appendChild(detailedResult).innerHTML += item + '<br />'
                                })
                            }

                            // Event listener to add selected movie to favorites when clicked
                            favoriteButton.addEventListener('click', handleFavoriteEvent)

                            // Function to handle the click event above 
                            function handleFavoriteEvent() {
                                // console.log(movie.Title)
                                // console.log(movie.imdbID)
                                // console.log('Clicked')

                                // The 'POST' request to persist selected movie data to server
                                fetch('https://ga-code-challenge-wade.herokuapp.com/favorites',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        "name": movie.Title,
                                        "oid": movie.imdbID
                                    })
                                })
                                    .then(function(res) {
                                        console.log(res)
                                    })
                                    .catch(function(res) {
                                        console.log(res)
                                    })
                            }
                        })
                    })
            }
        })
}

// Event listener on 'Favorites' button to display movies user has selected as favorite
favoriteListButton.addEventListener('click', handleFavoriteListEvent)

// Function to display list of favorites
function handleFavoriteListEvent() {
    // console.log('Clicked')

    // Ensures the favorites will be reloaded when 'Favorites' button is clicked
    favoriteList.innerHTML = ''

    // API call to 'GET' favorites from server
    fetch('https://ga-code-challenge-wade.herokuapp.com/favorites')
        .then(function(response) {
            if(response.ok) {
                response.json()
                    .then(function(data) {
                        // console.log(data)

                        // Iterate over the individual favorites for display
                        data.forEach(function(favorite) {
                            // Creating an element on the DOM to display user's favorites
                            const favoriteNode = document.createElement('p')
                            // console.log(favorite.name)

                            // Adding class to created element for styling
                            favoriteNode.classList.add('favorite-movie')

                            // Adding data served to DOM through created node
                            favoriteList.appendChild(favoriteNode).innerHTML += '<b>Favorite: </b>' + favorite.name + '<br />'
                        })
                    })
            }
        })
}
