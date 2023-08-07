import connectMongoDB from "@/libs/mongodb";
import Wine from "@/models/wine";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    try {
        const { id } = params;
        const { 
            newName: name, 
            newType: type, 
            newStatus: status, 
            newPrice: price, 
            newDescription: description, 
            newCtscore: ctscore, 
            newVintage: vintage 
        } = await request.json();

        await connectMongoDB();
        await Wine.findByIdAndUpdate(id, { name, type, status, price, description, ctscore, vintage });

        return NextResponse.json({ message: "Wine Updated"}, { status:200});
    } catch (error) {
        console.error("Error updating wine:", error);
        return NextResponse.json({ message: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

export async function GET(request, { params }){
    const { id } = params;
    await connectMongoDB();
    const wine = await Wine.findOne({ _id: id});
    return NextResponse.json({ wine }, {status: 200})
}
