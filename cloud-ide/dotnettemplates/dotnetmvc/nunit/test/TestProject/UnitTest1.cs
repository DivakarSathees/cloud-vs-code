using dotnetapp.Controllers;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Reflection;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class MovieControllerTests
    {
        private ApplicationDbContext _context;

        [SetUp]
        public void Setup()
        {
            // Set up the test database context
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _context = new ApplicationDbContext(options);
            _context.Database.EnsureCreated();

        }

        [TearDown]
        public void TearDown()
        {
            // Clean up the test database context
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task AddMovie_Post_Method_ValidData_CreatesMovieAndRedirects()
        {
            // Arrange
            var movie = new Movie
            {
                MovieID = 200,
                Title = "Inception",
                Director = "Christopher Nolan",
                Genre = "Demo Genre",
                Rating = 4
            };

            string assemblyName = "dotnetapp"; // Replace with actual assembly name if different
            Assembly assembly = Assembly.Load(assemblyName);
            string controllerName = "dotnetapp.Controllers.MovieController";

            Type controllerType = assembly.GetType(controllerName);
            Assert.IsNotNull(controllerType, "Controller type not found in assembly.");

            // Create an instance of MovieController
            var controllerInstance = Activator.CreateInstance(controllerType, _context);
            Assert.IsNotNull(controllerInstance, "Failed to create MovieController instance.");

            // Get the AddMovie method
            MethodInfo addMovieMethod = controllerType.GetMethod("AddMovie", new[] { typeof(Movie) });
            Assert.IsNotNull(addMovieMethod, "Method 'AddMovie' not found in MovieController.");

            // Invoke the AddMovie method dynamically
            var taskResult = (Task<IActionResult>)addMovieMethod.Invoke(controllerInstance, new object[] { movie });
            var result = await taskResult as RedirectToActionResult;

            // Assert: Ensure redirection to AvailableMovies
            Assert.IsNotNull(result);
            Assert.AreEqual("AvailableMovies", result.ActionName);

            // Verify the movie was added to the database
            var addedMovie = await _context.Movies.FirstOrDefaultAsync(m => m.MovieID == 200);
            Assert.IsNotNull(addedMovie);
            Assert.AreEqual("Demo Genre", addedMovie.Genre);
            Assert.AreEqual(4, addedMovie.Rating);
        }


    // This test checks if MovieRatingException throws the message "The rating must be between 1 and 5." or not
    // Test if AddMovie action throws MovieRatingException with correct message when rating is out of valid range
   [Test]
public async Task AddMovie_Post_Method_ThrowsException_With_Message()
{
    // Arrange
    var movie = new Movie
    {
        MovieID = 200,
        Title = "Inception",
        Director = "Christopher Nolan",
        Genre = "Demo for Inception",
        Rating = 6  // Invalid rating to trigger exception
    };

    string assemblyName = "dotnetapp"; // Adjust if needed
    Assembly assembly = Assembly.Load(assemblyName);
    string controllerName = "dotnetapp.Controllers.MovieController";

    Type controllerType = assembly.GetType(controllerName);
    Assert.IsNotNull(controllerType, "Controller type not found in assembly.");

    // Create an instance of MovieController
    var controllerInstance = Activator.CreateInstance(controllerType, _context);
    Assert.IsNotNull(controllerInstance, "Failed to create MovieController instance.");

    // Get the **POST** AddMovie method (one that takes a Movie parameter)
    MethodInfo addMovieMethod = controllerType.GetMethod("AddMovie", new[] { typeof(Movie) });
    Assert.IsNotNull(addMovieMethod, "POST method 'AddMovie(Movie)' not found in MovieController.");

    // Act & Assert: Expect an exception when invoking the method
    var exception = Assert.ThrowsAsync<MovieRatingException>(async () =>
    {
        var taskResult = (Task<IActionResult>)addMovieMethod.Invoke(controllerInstance, new object[] { movie });
        await taskResult; // Await the async task
    });
     // Act & Assert
    try
    {
        // Invoke the method asynchronously
        var taskResult = (Task<IActionResult>)addMovieMethod.Invoke(controllerInstance, new object[] { movie });
        await taskResult;  // Await execution to catch async exceptions

        Assert.Fail("Expected exception was not thrown.");
    }
    catch (MovieRatingException ex) // Directly catching exception
    {
        // Assert exception message
        Assert.AreEqual("Movie rating must be between 1 and 5", ex.Message);
    }
    catch (Exception ex)
    {
        Assert.Fail($"Unexpected exception type thrown: {ex.GetType().Name} - {ex.Message}");
    }
}


[Test]
public async Task AvailableMovies_ReturnsView_WithMovies()
{
    // Arrange
    string assemblyName = "dotnetapp"; // Adjust if needed
    Assembly assembly = Assembly.Load(assemblyName);
    string controllerName = "dotnetapp.Controllers.MovieController";

    Type controllerType = assembly.GetType(controllerName);
    Assert.IsNotNull(controllerType, "Controller type not found in assembly.");

    // Create an instance of MovieController
    var controllerInstance = Activator.CreateInstance(controllerType, _context);
    Assert.IsNotNull(controllerInstance, "Failed to create MovieController instance.");

    // Get the AvailableMovies method
    MethodInfo availableMoviesMethod = controllerType.GetMethod("AvailableMovies");
    Assert.IsNotNull(availableMoviesMethod, "GET method 'AvailableMovies' not found in MovieController.");

    // Add sample movies to the database
    var movieList = new List<Movie>
    {
        new Movie { Title = "Movie 1", Director = "Director 1", Genre = "Action", Rating = 4 }
    };
    _context.Movies.AddRange(movieList);
    await _context.SaveChangesAsync();

    // Act
    var taskResult = (Task<IActionResult>)availableMoviesMethod.Invoke(controllerInstance, null);
    var result = await taskResult;

    // Assert
    Assert.IsNotNull(result);
    var viewResult = result as ViewResult;
    Assert.IsNotNull(viewResult, "Expected a ViewResult.");

    // Check if model contains movies
    var model = viewResult.Model as List<Movie>;
    Assert.IsNotNull(model, "Expected model to be of type List<Movie>.");
    Assert.IsTrue(model.Count > 0, "Expected at least one movie in the returned list.");
}



        // This test checks the existence of the Movie class
        [Test]
        public void MovieClassExists()
        {
            // Arrange
            var movie = new Movie();

            // Assert
            Assert.IsNotNull(movie);
        }

        //This test check the exists of ApplicationDbContext class has DbSet of Movies
        [Test]
        public void ApplicationDbContextContainsDbSetMovieProperty()
        {

            var propertyInfo = _context.GetType().GetProperty("Movies");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Movie>), propertyInfo.PropertyType);
                   
        }
    //     // This test checks the MovieID of Movie property is int
       [Test]
        public void Movie_Properties_MovieID_ReturnExpectedDataTypes()
        {
            Movie classEntity = new Movie();
            Assert.That(classEntity.MovieID, Is.TypeOf<int>());
        }

      // This test checks the Title of Movie property is string
        [Test]
        public void Movie_Properties_Title_ReturnExpectedDataTypes()
        {
            // Arrange
            Movie classEntity = new Movie { Title = "Demo Title" };

            // Assert
            Assert.That(classEntity.Title, Is.TypeOf<string>());
        }

      // This test checks the Director of Movie property is string
        [Test]
        public void Movie_Properties_Director_ReturnExpectedDataTypes()
        {
            // Arrange
            Movie classEntity = new Movie { Director = "Demo Director" };

            // Assert
            Assert.That(classEntity.Director, Is.TypeOf<string>());
        }

        [Test]
        public void Movie_Properties_Rating_ReturnExpectedDataTypes()
        {
            // Arrange
            Movie classEntity = new Movie { Rating = 4 };

            // Assert
            Assert.That(classEntity.Rating, Is.TypeOf<double>());
        }

        [Test]
        public void Movie_Properties_Genre_ReturnExpectedDataTypes()
        {
            // Arrange
            Movie classEntity = new Movie { Genre = "Demo Genre" };

            // Assert
            Assert.That(classEntity.Genre, Is.TypeOf<string>());
        }

       // This test checks the expected value of MovieID
        [Test]
        public void Movie_Properties_MovieID_ReturnExpectedValues()
        {
            // Arrange
            int expectedMovieID = 100;

            Movie classEntity = new Movie
            {
                MovieID = expectedMovieID
            };
            Assert.AreEqual(expectedMovieID, classEntity.MovieID);
        }

        // This test checks the expected value of Title
        [Test]
        public void Movie_Properties_Title_ReturnExpectedValues()
        {
            string expectedTitle= "Demo Title";

            Movie classEntity = new Movie
            {
                Title = expectedTitle
            };
            Assert.AreEqual(expectedTitle, classEntity.Title);
        }

         // This test checks the expected value of Director
        [Test]
        public void Movie_Properties_Director_ReturnExpectedValues()
        {
            string expectedDirector = "Demo Director";

            Movie classEntity = new Movie
            {
                Director = expectedDirector
            };
            Assert.AreEqual(expectedDirector, classEntity.Director);
        }

        [Test]
public async Task DeleteMovie_Post_Method_ValidMovieID_RemovesMovieFromDatabase()
{
    // Arrange
    var movie = new Movie 
    { 
        MovieID = 100, 
        Title = "Test Movie", 
        Director = "Test Director", 
        Genre = "Demo for deleting",
        Rating = 3
    };

    // Add movie to the database
    _context.Movies.Add(movie);
    await _context.SaveChangesAsync();

    // Load assembly dynamically
    string assemblyName = "dotnetapp";  // Adjust if needed
    Assembly assembly = Assembly.Load(assemblyName);
    string controllerName = "dotnetapp.Controllers.MovieController";

    Type controllerType = assembly.GetType(controllerName);
    Assert.IsNotNull(controllerType, "Controller type not found in assembly.");

    // Create an instance of MovieController with _context
    object controllerInstance = Activator.CreateInstance(controllerType, _context);
    Assert.IsNotNull(controllerInstance, "Failed to create MovieController instance.");

    // Get the DeleteMovie method (which takes a movie ID as a parameter)
    MethodInfo deleteMovieMethod = controllerType.GetMethod("DeleteMovie", new[] { typeof(int) });
    Assert.IsNotNull(deleteMovieMethod, "Method 'DeleteMovie(int)' not found in MovieController.");

    // Act
    var taskResult = (Task<IActionResult>)deleteMovieMethod.Invoke(controllerInstance, new object[] { movie.MovieID });
    var actionResult = await taskResult as RedirectToActionResult;

    // Assert
    Assert.IsNotNull(actionResult);
    Assert.AreEqual("AvailableMovies", actionResult.ActionName); // Ensure redirection to AvailableMovies

    // Check if the movie was deleted from the database
    var deletedMovie = await _context.Movies.FindAsync(movie.MovieID);
    Assert.IsNull(deletedMovie);
}

     }
 }