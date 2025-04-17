import { PrismaClient } from "@prisma/client";
import microgreensData from "./sample-seed-data";

const main = async () => {
  const prisma = new PrismaClient();

  //delete all data in authentication based tables
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  //delete all data in product table
  await prisma.product.deleteMany();

  //create new data list in users table
  await prisma.user.createMany({
    data: microgreensData.users,
  });

  //create new data list in product table
  await prisma.product.createMany({
    data: microgreensData.products.microgreens,
  });

  console.log("Database seeded successfully");
};

main();

//To run this file: npx tsx ./db/seed
