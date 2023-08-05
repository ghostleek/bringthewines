import connectMongoDB from "@/libs/mongodb";
import Wine from "@/models/wine";
import { NextResponse } from "next/server";

// create routes
export async function POST(request){
    const { name, type, status, price, description } = await request.json();
    await connectMongoDB();
    await Wine.create({ name, type, status, price, description });
    return NextResponse.json({ message:"Wine Created" }, { status: 201 });
}

