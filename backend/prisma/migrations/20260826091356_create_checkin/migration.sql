-- CreateTable
CREATE TABLE "CheckIn" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localDate" TEXT NOT NULL,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CheckIn_habitId_idx" ON "CheckIn"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_habitId_localDate_key" ON "CheckIn"("habitId", "localDate");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
