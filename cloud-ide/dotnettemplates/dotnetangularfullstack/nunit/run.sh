#!/bin/bash
if [ ! -d "/home/coder/project/workspace/dotnetapp" ]
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
        cd /home/coder/project/workspace/dotnetapp || exit;
        dotnet clean;
        dotnet build && dotnet test -l "console;verbosity=normal";
    else
        echo "CreateAccount_ReturnsCreatedAccount FAILED";
		echo "GetAccountById_ReturnsAccount FAILED";
		echo "UpdateAccount_ReturnsUpdatedAccount FAILED";
		echo "CreateTransaction_ReturnsCreatedTransaction FAILED";
		echo "CreateTransaction_WithInsufficientFunds_ThrowsInsufficientFundsException FAILED";
		echo "GetAllTransactions_ReturnsList FAILED";
		echo "GetTransactionsByAmount_ReturnsCorrectResults FAILED";
		echo "AccountModel_HasAllProperties FAILED";
		echo "TransactionModel_HasAllProperties FAILED";
		echo "DbContext_HasDbSetProperties_ForAccountsAndTransactions FAILED";
		echo "TransactionAccount_Relationship_IsConfigured FAILED";
    fi
else   
	echo "CreateAccount_ReturnsCreatedAccount FAILED";
	echo "GetAccountById_ReturnsAccount FAILED";
	echo "UpdateAccount_ReturnsUpdatedAccount FAILED";
	echo "CreateTransaction_ReturnsCreatedTransaction FAILED";
	echo "CreateTransaction_WithInsufficientFunds_ThrowsInsufficientFundsException FAILED";
	echo "GetAllTransactions_ReturnsList FAILED";
	echo "GetTransactionsByAmount_ReturnsCorrectResults FAILED";
	echo "AccountModel_HasAllProperties FAILED";
	echo "TransactionModel_HasAllProperties FAILED";
	echo "DbContext_HasDbSetProperties_ForAccountsAndTransactions FAILED";
	echo "TransactionAccount_Relationship_IsConfigured FAILED";
fi