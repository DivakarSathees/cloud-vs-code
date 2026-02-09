namespace dotnetapp.Controllers
{
    public class MovieController : Controller
    {
        // GET: Movie/AvailableMovies
        public async Task<IActionResult> AvailableMovies()
        {
            // Define an asynchronous action method for available movies
            return null;
        }


        // GET: Movie/AddMovie
        public IActionResult AddMovie()
        {
            // Returns the view for the Add Movie form.
            return null;  
        }

        // POST: Movie/AddMovie
        public async Task<IActionResult> AddMovie(Movie movie)
        {
            // Validates if the movie object is null, returning a BadRequest error if invalid.
            // Performs Model Validation:
            // If the model state is invalid, it returns the view with validation errors.
            // If the rating is out of range (1-5), it throws a custom exception (MovieRatingException) with an error message - "Movie rating must be between 1 and 5"
            // Adds the valid movie to the database context and saves changes.
            // Redirects to AvailableMovies after successful addition.
            // Handles MovieRatingException to display a specific error message.
            return null;  
        }

        // POST: Movie/DeleteMovie/5
        public async Task<IActionResult> DeleteMovie(int id)
        {
            // Find the movie by ID
            // Remove the movie from the database context
            // Save the changes to the database
            // Redirect to the AvailableMovies action
            return null;  
        }
    }
}