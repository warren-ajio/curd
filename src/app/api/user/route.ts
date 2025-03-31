"use server"

import {PrismaClient} from "@prisma/client"
import {NextResponse} from "next/server";

const prisma = new PrismaClient()

export async function GET() {
  try {
    const res = await prisma.user.findMany({
      orderBy: {id: "asc"},
    });

    const formattedRes = res.map((e) => {
      return {
        ...e,
        id: e.id.toString(),
      }
    })

    return NextResponse.json(formattedRes, {status: 200});
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({error: "Failed to fetch users"}, {status: 500});
  }
}

export const POST = async (body: Request) => {
  try {
    const {name} = await body.json();

    const res = await prisma.user.create({
      data: {
        name
      },
    });

    if (res) {
      return NextResponse.json({status: 200});
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}

export const PUT = async (body: Request) => {
  try {
    const parsedBody = await body.json()
    const res = await prisma.user.update({
      where: {id: BigInt(parsedBody.id)}, // Convert string ID to bigint
      data: {...parsedBody},
    });

    if (res) {
      return NextResponse.json({status: 200});
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}

export const DELETE = async (body: Request) => {
  try {
    const {id} = await body.json()

    const res = await prisma.user.delete({
      where: {id},
    });

    if (res) {
      return NextResponse.json({status: 200});
    }
  } catch (err) {
    console.log(err);
    return {error: "Failed to create user", status: 500};
  }
}