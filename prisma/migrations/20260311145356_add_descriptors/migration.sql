-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coffee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "originCountry" TEXT,
    "originRegion" TEXT,
    "description" TEXT,
    "altitudeMeters" INTEGER,
    "roastLevel" TEXT,
    "washingMethod" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CoffeeDescriptor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoffeeToCoffeeDescriptor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CoffeeToCoffeeDescriptor_A_fkey" FOREIGN KEY ("A") REFERENCES "Coffee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CoffeeToCoffeeDescriptor_B_fkey" FOREIGN KEY ("B") REFERENCES "CoffeeDescriptor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeDescriptor_name_key" ON "CoffeeDescriptor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToCoffeeDescriptor_AB_unique" ON "_CoffeeToCoffeeDescriptor"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToCoffeeDescriptor_B_index" ON "_CoffeeToCoffeeDescriptor"("B");
