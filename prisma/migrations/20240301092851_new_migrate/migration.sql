-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT
);

-- CreateTable
CREATE TABLE "Survey" (
    "survey_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "question_type" TEXT NOT NULL,
    "survey_id" INTEGER NOT NULL,
    CONSTRAINT "Question_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey" ("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Response" (
    "response_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "survey_id" INTEGER NOT NULL,
    CONSTRAINT "Response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("question_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Response_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey" ("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DataClient" (
    "dataClientId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "id_order" INTEGER NOT NULL,
    "survey_id" INTEGER NOT NULL,
    "user_response" TEXT NOT NULL,
    CONSTRAINT "DataClient_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey" ("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionReponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "dataClientId" INTEGER NOT NULL,
    CONSTRAINT "QuestionReponse_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("question_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionReponse_dataClientId_fkey" FOREIGN KEY ("dataClientId") REFERENCES "DataClient" ("dataClientId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_survey_id_key" ON "Question"("survey_id");

-- CreateIndex
CREATE UNIQUE INDEX "Response_question_id_key" ON "Response"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "Response_survey_id_key" ON "Response"("survey_id");

-- CreateIndex
CREATE UNIQUE INDEX "DataClient_survey_id_key" ON "DataClient"("survey_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionReponse_question_id_key" ON "QuestionReponse"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionReponse_dataClientId_key" ON "QuestionReponse"("dataClientId");
