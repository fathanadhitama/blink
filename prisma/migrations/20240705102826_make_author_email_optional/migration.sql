-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_authorEmail_fkey";

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "authorEmail" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
