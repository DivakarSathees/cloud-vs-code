#!/bin/bash  
if [ ! -d "/home/coder/project/workspace/dotnetapp/" ]
then
    cp -r /home/coder/project/workspace/nunit/dotnetapp /home/coder/project/workspace/;
fi
if [ -d "/home/coder/project/workspace/dotnetapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/dotnetapp/" ]
    then
        cp -r /home/coder/project/workspace/nunit/test/TestProject /home/coder/project/workspace/;
        cp -r /home/coder/project/workspace/nunit/test/dotnetapp.sln /home/coder/project/workspace/dotnetapp/;
        cp /home/coder/project/workspace/puppeteer/package.json /home/coder/project/workspace/;
        cd /home/coder/project/workspace || exit;
        npm install;
        rm -rf /home/coder/project/workspace/node_modules/;
        rm -rf /home/coder/project/workspace/package.json;
        rm -rf /home/coder/project/workspace/package-lock.json;
        cd /home/coder/project/workspace/dotnetapp || exit;
     dotnet clean;    
     dotnet build && dotnet test -l "console;verbosity=normal";
    else
        echo "AddMovie_Post_Method_ValidData_CreatesMovieAndRedirects FAILED";
        echo "AddMovie_Post_Method_ThrowsException_With_Message FAILED";
        echo "MovieClassExists FAILED";
        echo "ApplicationDbContextContainsDbSetMovieProperty FAILED";
        echo "Movie_Properties_MovieID_ReturnExpectedDataTypes FAILED";
        echo "Movie_Properties_Title_ReturnExpectedDataTypes FAILED";
        echo "Movie_Properties_Director_ReturnExpectedDataTypes FAILED";
        echo "Movie_Properties_Rating_ReturnExpectedDataTypes FAILED";
        echo "Movie_Properties_Genre_ReturnExpectedDataTypes FAILED";
        echo "Movie_Properties_MovieID_ReturnExpectedValues FAILED";
        echo "Movie_Properties_Title_ReturnExpectedValues FAILED";
        echo "Movie_Properties_Director_ReturnExpectedValues FAILED";
        echo "DeleteMovie_Post_Method_ValidMovieID_RemovesMovieFromDatabase FAILED";
    fi
else   
    echo "AddMovie_Post_Method_ValidData_CreatesMovieAndRedirects FAILED";
    echo "AddMovie_Post_Method_ThrowsException_With_Message FAILED";
    echo "MovieClassExists FAILED";
    echo "ApplicationDbContextContainsDbSetMovieProperty FAILED";
    echo "Movie_Properties_MovieID_ReturnExpectedDataTypes FAILED";
    echo "Movie_Properties_Title_ReturnExpectedDataTypes FAILED";
    echo "Movie_Properties_Director_ReturnExpectedDataTypes FAILED";
    echo "Movie_Properties_Rating_ReturnExpectedDataTypes FAILED";
    echo "Movie_Properties_Genre_ReturnExpectedDataTypes FAILED";
    echo "Movie_Properties_MovieID_ReturnExpectedValues FAILED";
    echo "Movie_Properties_Title_ReturnExpectedValues FAILED";
    echo "Movie_Properties_Director_ReturnExpectedValues FAILED";
    echo "DeleteMovie_Post_Method_ValidMovieID_RemovesMovieFromDatabase FAILED";
fi
