const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();
const bcrypt = require("bcrypt")

async function SignupConsumer(data) {
  try {
    const signupSubmission = await prisma.customer.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        password: data.password,
      },
    });
    console.log("new user added ", signupSubmission);
    return signupSubmission;
  } catch (error) {
    console.log("Error while signup", error);
    throw new Error("Error while signup");  // Corrected Error constructor
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}


async function loginConsumer(data) {
  try {
    const user = await prisma.customer.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      return null;
    }

    // const isPasswordValid = await bcrypt.compare(data.password, user.password);
    let isPasswordValid = false;
    if (data.password === user.password) {
      isPasswordValid = true;
    }
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error during login");
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

async function SignupFarmer(data) {
  try {
    data.address = `${data.address} pincode : ${data.pincode}`
    const user = await prisma.farmer.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        password: data.password,
      },
    })
    console.log("new farmer added succesfully ", user);
  } catch (error) {
    console.log("Error while added new farmer ", error);
    throw new Error("Error while adding farmer");

  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

async function loginFarmer(data) {
  try {
    const user = await prisma.farmer.findUnique({
      where: { email: data.email },
    });

    let isPasswordValid = false;
    if (data.password === user.password) {
      isPasswordValid = true;
    }
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error during login");
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

module.exports = {
  SignupConsumer,
  loginConsumer,
  SignupFarmer,
  loginFarmer
};
