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
        cd /home/coder/project/workspace/TestProject || exit;
        dotnet clean;    
        dotnet build && dotnet test -l "console;verbosity=normal";
        rm -rf /home/coder/project/workspace/TestProject;
        rm -rf /home/coder/project/workspace/dotnetapp/dotnetapp.sln;
    fi
fi