/*
  Warnings:

  - A unique constraint covering the columns `[user_id,priority]` on the table `TaskCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskCategory_user_id_priority_key" ON "TaskCategory"("user_id", "priority");
