import connectMongoDB from "@/libs/mongodb";
import Wine from "@/models/wine";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://bringthewines-git-main-ghostleek.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Delegate to the appropriate method based on the request method
    switch (req.method) {
        case 'POST':
            return await POST(req, res);
        case 'GET':
            return await GET(req, res);
        case 'DELETE':
            return await DELETE(req, res);
        default:
            res.status(405).end();  // Method Not Allowed
            return;
    }
}

async function POST(req, res) {
    const { name, type, status, price, description, vintage, ctscore } = await req.json();
    await connectMongoDB();
    await Wine.create({ name, type, status, price, description, vintage, ctscore });
    res.status(201).json({ message:"Wine Created" });
}

async function GET(req, res) {
    await connectMongoDB();
    const wines = await Wine.find();
    res.status(200).json({ wines });
}

async function DELETE(req, res) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const wine = await Wine.findById(id);
    if (!wine) {
        return res.status(404).json({ message:"Wine not found" });
    }

    const wineDetails = {
        name: wine.name,
        type: wine.type,
        status: wine.status,
        price: wine.price,
        description: wine.description,
        ctscore: wine.ctscore,
        vintage: wine.vintage
    };

    await Wine.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted wine with ID: ${id} and details: ${JSON.stringify(wineDetails)}.` });
}