
using Microsoft.EntityFrameworkCore;
using System;

namespace dotnetapp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSet properties representing the Movies and MovieReviews tables in the database

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for Movies
            modelBuilder.Entity<Movie>().HasData(
                new Movie { MovieID = 1, Title = "Inception", Director = "Christopher Nolan", Genre = "Science Fiction", Rating = 5 },
                new Movie { MovieID = 2, Title = "The Matrix", Director = "The Wachowskis", Genre = "Action", Rating = 5 },
                new Movie { MovieID = 3, Title = "The Shawshank Redemption", Director = "Frank Darabont", Genre = "Drama", Rating = 3 },
                new Movie { MovieID = 4, Title = "The Godfather", Director = "Francis Ford Coppola", Genre = "Crime", Rating = 5 },
                new Movie { MovieID = 5, Title = "The Dark Knight", Director = "Christopher Nolan", Genre = "Action", Rating = 4 }
            );


            base.OnModelCreating(modelBuilder);
        }
    }
}
