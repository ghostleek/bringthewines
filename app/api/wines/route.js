import connectMongoDB from "@/libs/mongodb";
import Wine from "@/models/wine";
import { NextResponse } from "next/server";

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://bringthewines-git-main-ghostleek.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
}
// create routes for POST
// confirmed POST works via postman
export async function POST(request){
    const { name, type, status, price, description, vintage, ctscore } = await request.json();
    await connectMongoDB();
    await Wine.create({ name, type, status, price, description, vintage, ctscore });
    return NextResponse.json({ message:"Wine Created" }, { status: 201 });
}


// create routes for GET
// confirmed GET works via postman
export async function GET(request){
    await connectMongoDB();
    const wines = await Wine.find();
    return NextResponse.json({ wines });
}

// create routes for DELETE
// confirmed DELETE works via postman
export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
        // Find the wine first before deletion
        const wine = await Wine.findById(id);
        if (!wine) {
            // Wine not found, return a 404 status
            return NextResponse.json({ message:"Wine not found" }, { status: 404 });
        }
    
        // Store wine details
        const wineDetails = {
            name: wine.name,
            type: wine.type,
            status: wine.status,
            price: wine.price,
            description: wine.description,
            ctscore: wine.ctscore,
            vintage: wine.vintage
        };
    
        // Delete the wine
        await Wine.findByIdAndDelete(id);
    
        // Return the details of the deleted wine
        return NextResponse.json({ message: `Deleted wine with ID: ${id} and details: ${JSON.stringify(wineDetails)}.` }, { status: 200 });    
}
