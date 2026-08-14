CREATE TABLE "SecureNote" (
  "id" TEXT NOT NULL,
  "ownerId" TEXT NOT NULL,
  "encryptedPayload" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SecureNote_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SecureNote_ownerId_createdAt_idx" ON "SecureNote"("ownerId", "createdAt");

ALTER TABLE "SecureNote" ADD CONSTRAINT "SecureNote_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

