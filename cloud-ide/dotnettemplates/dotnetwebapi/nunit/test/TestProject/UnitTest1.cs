using NUnit.Framework;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class AccountTransactionControllerTests
    {
        private DbContextOptions<ApplicationDbContext> _dbContextOptions;
        private ApplicationDbContext _context;
        private HttpClient _httpClient;

        [SetUp]
        public void Setup()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:8080"); // Base URL of your API
            _dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestAccountDB")
                .Options;

            _context = new ApplicationDbContext(_dbContextOptions);
        }

        private async Task<int> CreateTestAccountAndGetId(decimal creditLimit = 1000)
        {
            var newAccount = new Account
            {
                AccountHolder = "Test User",
                AccountType = "Personal",
                CreditLimit = creditLimit
            };

            var json = JsonConvert.SerializeObject(newAccount);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/Account", content);
            response.EnsureSuccessStatusCode();

            var created = JsonConvert.DeserializeObject<Account>(await response.Content.ReadAsStringAsync());
            return created.AccountId;
        }

        [Test, Order(1)]
        public async Task CreateAccount_ReturnsCreatedAccount()
        {
            var newAccount = new Account
            {
                AccountHolder = "John Smith",
                AccountType = "Business",
                CreditLimit = 5000
            };

            var json = JsonConvert.SerializeObject(newAccount);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/Account", content);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();
            var createdAccount = JsonConvert.DeserializeObject<Account>(responseContent);

            Assert.IsNotNull(createdAccount);
            Assert.AreEqual(newAccount.AccountHolder, createdAccount.AccountHolder);
            Assert.AreEqual(newAccount.AccountType, createdAccount.AccountType);
            Assert.AreEqual(newAccount.CreditLimit, createdAccount.CreditLimit);
        }

        [Test, Order(2)]
        public async Task GetAccountById_ReturnsAccount()
        {
            int accountId = await CreateTestAccountAndGetId();

            var response = await _httpClient.GetAsync($"api/Account/{accountId}");

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var account = JsonConvert.DeserializeObject<Account>(await response.Content.ReadAsStringAsync());
            Assert.IsNotNull(account);
            Assert.AreEqual(accountId, account.AccountId);
        }

        [Test, Order(3)]
        public async Task UpdateAccount_ReturnsUpdatedAccount()
        {
            int accountId = await CreateTestAccountAndGetId();

            var updatedAccount = new Account
            {
                AccountHolder = "Updated Name",
                AccountType = "Business",
                CreditLimit = 8000
            };

            var json = JsonConvert.SerializeObject(updatedAccount);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"api/Account/{accountId}", content);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var updated = JsonConvert.DeserializeObject<Account>(await response.Content.ReadAsStringAsync());
            Assert.AreEqual("Updated Name", updated.AccountHolder);
            Assert.AreEqual("Business", updated.AccountType);
            Assert.AreEqual(8000, updated.CreditLimit);
        }

        [Test, Order(4)]
        public async Task CreateTransaction_ReturnsCreatedTransaction()
        {
            int accountId = await CreateTestAccountAndGetId();

            var transaction = new Transaction
            {
                Amount = 250,
                Date = new DateTime(2025, 11, 2),
                AccountId = accountId
            };

            var json = JsonConvert.SerializeObject(transaction);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/Transaction", content);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            var created = JsonConvert.DeserializeObject<Transaction>(await response.Content.ReadAsStringAsync());
            Assert.IsNotNull(created);
            Assert.AreEqual(transaction.Amount, created.Amount);
            Assert.AreEqual(accountId, created.AccountId);
        }

        // [Test, Order(5)]
        // public async Task CreateTransaction_WithInsufficientFunds_ReturnsBadRequest()
        // {
        //     int accountId = await CreateTestAccountAndGetId(creditLimit: 100); // Very low limit

        //     var transaction = new Transaction
        //     {
        //         Amount = 500, // Exceeds credit limit
        //         Date = new DateTime(2025, 11, 2),
        //         AccountId = accountId
        //     };

        //     var json = JsonConvert.SerializeObject(transaction);
        //     var content = new StringContent(json, Encoding.UTF8, "application/json");

        //     var response = await _httpClient.PostAsync("api/Transaction", content);

        //     Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);

        //     var message = await response.Content.ReadAsStringAsync();
        //     Assert.IsTrue(message.Contains("Insufficient funds"), "Expected insufficient funds message.");
        // }

        [Test, Order(5)]
        public async Task CreateTransaction_WithInsufficientFunds_ThrowsInsufficientFundsException()
        {
            // Arrange
            int accountId = await CreateTestAccountAndGetId();

            var transaction = new Transaction
            {
                Date = new DateTime(2025, 11, 2),
                Amount = 999999, // Exceeds credit limit
                AccountId = accountId
            };

            var json = JsonConvert.SerializeObject(transaction);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _httpClient.PostAsync("api/Transaction", content);

            // Assert
            Assert.AreEqual(HttpStatusCode.InternalServerError, response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();
            Assert.IsTrue(responseContent.Contains("Insufficient funds"),
                "Expected 'InsufficientFundsException' message not found.");
        }


        [Test, Order(6)]
        public async Task GetAllTransactions_ReturnsList()
        {
            int accountId = await CreateTestAccountAndGetId();

            var transaction = new Transaction
            {
                Amount = 150,
                Date = new DateTime(2025, 11, 2),
                AccountId = accountId
            };

            var json = JsonConvert.SerializeObject(transaction);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            await _httpClient.PostAsync("api/Transaction", content);

            var response = await _httpClient.GetAsync("api/Transaction");

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var transactions = JsonConvert.DeserializeObject<Transaction[]>(await response.Content.ReadAsStringAsync());
            Assert.IsNotNull(transactions);
            Assert.IsTrue(transactions.Length > 0);
        }

        [Test, Order(7)]
        public async Task GetTransactionsByAmount_ReturnsCorrectResults()
        {
            int accountId = await CreateTestAccountAndGetId();

            var transaction = new Transaction
            {
                Amount = 333,
                Date = new DateTime(2025, 11, 2),
                AccountId = accountId
            };

            var json = JsonConvert.SerializeObject(transaction);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            await _httpClient.PostAsync("api/Transaction", content);

            var response = await _httpClient.GetAsync("api/Transaction/filter-by-amount/333");

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var transactions = JsonConvert.DeserializeObject<Transaction[]>(await response.Content.ReadAsStringAsync());
            Assert.IsNotNull(transactions);
            Assert.IsTrue(transactions.All(t => t.Amount == 333));
        }

        [Test, Order(8)]
        public void AccountModel_HasAllProperties()
        {
            var account = new Account
            {
                AccountId = 1,
                AccountHolder = "Alice",
                AccountType = "Personal",
                CreditLimit = 1500
            };

            Assert.AreEqual(1, account.AccountId);
            Assert.AreEqual("Alice", account.AccountHolder);
            Assert.AreEqual("Personal", account.AccountType);
            Assert.AreEqual(1500, account.CreditLimit);
        }

        [Test, Order(9)]
        public void TransactionModel_HasAllProperties()
        {
            var transaction = new Transaction
            {
                TransactionId = 1,
                Date = new DateTime(2025, 11, 2),
                Amount = 200,
                AccountId = 1
            };

            Assert.AreEqual(1, transaction.TransactionId);
            Assert.AreEqual(200, transaction.Amount);
            Assert.AreEqual(1, transaction.AccountId);
            Assert.IsInstanceOf<DateTime>(transaction.Date);
        }

        [Test, Order(10)]
        public void DbContext_HasDbSetProperties_ForAccountsAndTransactions()
        {
            Assert.IsNotNull(_context.Accounts, "Accounts DbSet is not initialized.");
            Assert.IsNotNull(_context.Transactions, "Transactions DbSet is not initialized.");
        }

        [Test, Order(11)]
        public void TransactionAccount_Relationship_IsConfigured()
        {
            var model = _context.Model;
            var accountEntity = model.FindEntityType(typeof(Account));
            var transactionEntity = model.FindEntityType(typeof(Transaction));

            var foreignKey = transactionEntity
                .GetForeignKeys()
                .FirstOrDefault(fk => fk.PrincipalEntityType == accountEntity);

            Assert.IsNotNull(foreignKey, "Foreign key relationship between Transaction and Account is not configured.");
            Assert.AreEqual("AccountId", foreignKey.Properties.First().Name, "Foreign key property name is incorrect.");
            // Assert.AreEqual(DeleteBehavior.ClientSetNull, foreignKey.DeleteBehavior, "Delete behavior is not set as expected.");
        }


        [TearDown]
        public void Cleanup()
        {
            _context.Database.EnsureDeleted();
            _httpClient.Dispose();
        }
    }
}
