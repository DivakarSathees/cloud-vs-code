**Problem Statement: Grocery Inventory Management System**

  

**Objective:**

Develop a console-based C# application using ADO.NET to perform CRUD operations on the Groceries table in a SQL Server database.

The application should enable users to **add new grocery items, display items below a stock level, update grocery details, and delete items with zero stock.** Implement the application exclusively using a **disconnected** **architecture** with SqlDataAdapter, DataSet, and DataTable.

  

**Folder Structure:**


  

### **Table:**


  

### **Classes and Properties**

**Grocery Class (Models/Grocery.cs):**

The Grocery class represents a grocery item with the following public properties:

*   **GroceryID** (int): Unique identifier for each grocery item. Auto-incremented in the database.
*   **GroceryName** (string): Name of the grocery item.
*   **Stock** (int): Current stock level of the item.
*   **PricePerUnit** (decimal): Price per unit of the grocery item.
*   **Brand** (string): Brand of the grocery item.

**Access Modifier:** public

  

**Database Details:**

*   Database Name: **appdb**
*   Table Name: **Groceries**
*   Ensure that the database connection is properly established using the **ConnectionStringProvider** class in the file **Program.cs.**
*   Use the below connection string to connect the MsSql Server
*   public static string **ConnectionString** { get; } = \\"User ID=sa;password=examlyMssql@123; server=localhost**;**Database=appdb;trusted\_connection=false;Persist Security Info=False;Encrypt=False\\";

  

**To Work with SQLServer:**

(Open a New Terminal) type the below commands

**sqlcmd -U sa** 

password: **examlyMssql@123**

1> create database appdb

2>go

  

1>use appdb

2>go

  

1> create table TableName(columnName datatype,...)

2> go

1> insert into TableName values(\\" \\",\\" \\",....)

2> go

  

**Methods:**

Define the following methods inside the **Program** class, located in the **Program.cs** file.

  

Methods:

All methods are defined in Program.cs:

### **1\.** AddGrocery(Grocery grocery)

**Purpose:**

Inserts a new grocery item into the **Groceries** table.

**Parameters:**

*   **grocery**: An object of the **Grocery** class containing details of the grocery item to be added.

**Access Modifier:** public

**Declaration Modifier:** static

**Return Type:** void

**Console Messages:**

*   **On success:**
*   Grocery added successfully.

  

### **2\.** DisplayGroceriesBelowStock(int stockThreshold)

**Purpose:**

Fetches and displays groceries with stock below the specified threshold.

**Access Modifier:** public

**Declaration Modifier:** static

**Return Type:** void

**Console Messages:**

*   **If records are found:**
*   GroceryID: {row\[\\"GroceryID\\"\]}, Name: {row\[\\"GroceryName\\"\]}, Stock: {row\[\\"Stock\\"\]}, PricePerUnit: {row\[\\"PricePerUnit\\"\]}, Brand: {row\[\\"Brand\\"\]}
*   **If no records are found:**
*   No groceries found below the stock threshold.

  

### **3\.** UpdateGroceryDetails(string groceryName, Grocery updatedGrocery)

**Purpose:**

Updates the details of an existing grocery item in the Groceries table.

**Parameters:**

*   **groceryName**: Name of the grocery item to update.
*   **updatedGrocery**: An object of the **Grocery** class with updated details.

**Access Modifier:** public

**Declaration Modifier:** static

**Return Type:** void

**Console Messages:**

*   **On success:**
*   Grocery details updated successfully.
*   **If no record is found:**
*   No matching grocery found for the given name.

  

### **4\.** DeleteGroceriesWithZeroStock()

**Purpose:**

Deletes groceries from the **Groceries** table where the stock is zero.

**Parameters:**

*   **priceThreshold**: Maximum price allowed.

**Access Modifier:** public

**Declaration Modifier:** static

**Return Type:** void

**Console Messages:**

*   **On success:**
*   Groceries with zero stock have been deleted.
*   **If no record is found:**
*   No groceries found with zero stock.

  

**Main Menu:**

The main menu serves as the user interface for interacting with the system. It provides the following options:

  

Grocery Inventory Management Menu

**1\. Add Grocery:** Prompts for the grocery details. After gathering the details, it calls the AddGrocery(Grocery grocery) method to add the new grocery item.

**2\. Display Groceries Below Stock Level:** Displays groceries with stock below the specified threshold by calling the DisplayGroceriesBelowStock(int stockThreshold) method.

**3\. Update Grocery Details:** Prompts for the grocery name to identify the item to update. After gathering the input, it calls the UpdateGroceryDetails(string groceryName, Grocery updatedGrocery) method to modify the relevant grocery details if the item exists.

**4\. Delete Groceries with zero stock:** It calls the DeleteGroceriesWithZeroStock() method to remove all grocery items if the stock is zero.

**5\. Exit:** Exits the application with the message \\"Exiting the application...\\"

### Invalid choice - Displays \\"Invalid choice.\\"

  

**Commands to Run the Project:**

*   **cd dotnetapp -** Select the dotnet project folder
*   **dotnet restore -** This command will restore all the required packages to run the application.
*   **dotnet run -** To run the application
*   **dotnet build -** To build and check for errors
*   **dotnet clean -** If the same error persists clean the project and build again
*   **dotnet add package package\_name --version 6.0 -** Any package if required you can install by the above command. The package that you are installing should support the .Net 6.0 version.

**Note:**

**1\. Do not change the class names**. 

2\. **Do not change the skeleton** (Structure of the project given).

  

**Refer to the Sample Output:**

  

**Add:**


**Display:**


**Update:**


**Delete:**


**Exit:**


**Invalid Choice:**
