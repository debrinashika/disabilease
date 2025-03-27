-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "task_name" VARCHAR(255) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "task_duration" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "task_category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "rec_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "rec_name" VARCHAR(255) NOT NULL,
    "rec_duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("rec_id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_category_id_fkey" FOREIGN KEY ("task_category_id") REFERENCES "TaskCategory"("task_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
