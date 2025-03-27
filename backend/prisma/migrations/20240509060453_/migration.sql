-- CreateTable
CREATE TABLE "TaskCategory" (
    "task_category_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "task_category_name" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("task_category_id")
);

-- AddForeignKey
ALTER TABLE "TaskCategory" ADD CONSTRAINT "TaskCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
