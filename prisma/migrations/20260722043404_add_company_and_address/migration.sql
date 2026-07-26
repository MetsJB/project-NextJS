-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "catchPhrase" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");
