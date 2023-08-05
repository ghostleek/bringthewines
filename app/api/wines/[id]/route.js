import connectMongoDB from "@/libs/mongodb";
import Wine from "@/models/wine";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const { id } = params;
    const { newName: name, newType: type, newStatus: status, newPrice: price, newDescription: description } = await request.json();
    await connectMongoDB();
    await Wine.findByIdAndUpdate(id, { name, type, status, price, description });
    return NextResponse.json({ message: "Wine Updated"}, { status:200});
}

export async function GET(request,{ params }){
    const { id } = params;
    await connectMongoDB();
    const wine = await Wine.findOne({_id: id});
    return NextResponse.json({ wine }, {status: 200})
}