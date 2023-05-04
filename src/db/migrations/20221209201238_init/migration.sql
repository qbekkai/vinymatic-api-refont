-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT 'e6799613-1690-4553-8f91-b2c9f63cc7bb'::uuid,
    "userName" VARCHAR(15) NOT NULL,
    "fullName" JSON,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT '2022-12-09 11:12:03.286+00'::timestamp with time zone,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT '2022-12-09 11:12:03.286+00'::timestamp with time zone,
    "deletedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT '2022-12-09 11:12:03.286+00'::timestamp with time zone,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
