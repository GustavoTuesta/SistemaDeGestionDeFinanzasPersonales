/*
  Warnings:

  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `name` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingreso" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingreso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingreso" ADD CONSTRAINT "ingreso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingreso" ADD CONSTRAINT "ingreso_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
