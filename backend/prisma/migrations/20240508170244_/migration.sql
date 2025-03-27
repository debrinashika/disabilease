/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
CREATE SEQUENCE answer_answer_id_seq;
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
ALTER COLUMN "answer_id" SET DEFAULT nextval('answer_answer_id_seq'),
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id");
ALTER SEQUENCE answer_answer_id_seq OWNED BY "Answer"."answer_id";
