-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('VEGETABLES', 'FRUITS', 'GRAINS', 'DAIRY', 'MEAT', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INESECROW', 'FARMERPAYMENTSUCCESS', 'REFUNDAPPLIED', 'REFUNDSUCCESS');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('NOTAPPLIED', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profileImage" BYTEA,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customerId" UUID NOT NULL,
    "farmerId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "bidStatus" "BidStatus" DEFAULT 'PENDING',
    "requiredQuantity" INTEGER NOT NULL,
    "offerPrice" INTEGER NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profileImage" BYTEA,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "farmerId" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profileImage" BYTEA,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("farmerId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customProductName" VARCHAR NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "currentQuantity" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" BYTEA,
    "farmerId" UUID NOT NULL,
    "category" "Category" NOT NULL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "productId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "farmerId" UUID NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Satbara" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "satbaraImage" BYTEA NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verifiedAt" TIMESTAMP(6),
    "verificationStatus" "VerificationStatus" DEFAULT 'NOTAPPLIED',
    "expiryDate" TIMESTAMP(6) NOT NULL,
    "farmerId" UUID NOT NULL,
    "adminId" UUID,

    CONSTRAINT "Satbara_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "quantity" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" DEFAULT 'INESECROW',
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "customerId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "farmerId" UUID NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("farmerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("farmerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("farmerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Satbara" ADD CONSTRAINT "Satbara_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Satbara" ADD CONSTRAINT "Satbara_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("farmerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("farmerId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE NO ACTION;

