DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NULL,
  CompanyName TEXT NOT NULL,
  ContactName TEXT NOT NULL
);

INSERT INTO Customers (CompanyName, ContactName) VALUES ('Alfreds Futterkiste', 'Maria Anders');
INSERT INTO Customers (CompanyName, ContactName) VALUES ('Around the Horn', 'Thomas Hardy');
INSERT INTO Customers (CompanyName, ContactName) VALUES ('Bs Beverages', 'Victoria Ashworth');

DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NULL,
  title TEXT NOT NULL,
  content TEXT,
  completed INTEGER  DEFAULT 0
);
DROP TABLE IF EXISTS Session;
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

