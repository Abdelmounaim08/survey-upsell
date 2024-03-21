/*
  Warnings:

  - Added the required column `reponse` to the `QuestionReponse` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuestionReponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "dataClientId" INTEGER NOT NULL,
    "reponse" TEXT NOT NULL,
    CONSTRAINT "QuestionReponse_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("question_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionReponse_dataClientId_fkey" FOREIGN KEY ("dataClientId") REFERENCES "DataClient" ("dataClientId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuestionReponse" ("dataClientId", "id", "question_id") SELECT "dataClientId", "id", "question_id" FROM "QuestionReponse";
DROP TABLE "QuestionReponse";
ALTER TABLE "new_QuestionReponse" RENAME TO "QuestionReponse";
CREATE UNIQUE INDEX "QuestionReponse_question_id_key" ON "QuestionReponse"("question_id");
CREATE UNIQUE INDEX "QuestionReponse_dataClientId_key" ON "QuestionReponse"("dataClientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
