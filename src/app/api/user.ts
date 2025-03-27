"use server"

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()

    if (users) {
      return users
    }
  } catch (err) {
    console.log(err);
    return { error: "Failed to fetch users" };
  }
}

export const createUsers = async (body) => {
  try {
    if (!body.name) {
      return { error: "Name is required", status: 400 };
    }

    const newUser = await prisma.user.create({
      data: {...body},
    });

    if (newUser) {
      return newUser;
    }
  } catch (err) {
    console.log(err);
    return { error: "Failed to create user", status: 500 };
  }
}

export const updateUser = async (id: bigint, body) => {
  try {
    if (!id || !body) {
      return { error: "Name is required", status: 400 };
    }

    const updatedUser = await prisma.user.update({
      where: { id: BigInt(id) }, // Convert string ID to bigint
      data: { ...body },
    });

    if (updatedUser) {
      return updatedUser
    }
  } catch (err) {
    console.log(err);
    return { error: "Failed to create user", status: 500 };
  }
}

export const deleteUser = async (id: bigint) => {
  try {
    if (!id) {
      return { error: "Name is required", status: 400 };
    }

    const res = await prisma.user.delete({
      where: { id },
    });

    if (res) {
      return res
    }
  } catch (err) {
    console.log(err);
    return { error: "Failed to create user", status: 500 };
  }
}