/*
  Warnings:

  - You are about to drop the column `authorId` on the `Url` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - Added the required column `authorEmail` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_authorId_fkey";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
