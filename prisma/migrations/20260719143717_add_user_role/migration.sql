-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "passwordHash" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "passwordHash", "phone", "username", "website") SELECT "email", "id", "name", "passwordHash", "phone", "username", "website" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
