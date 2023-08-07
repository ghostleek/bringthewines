function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://bringthewines-git-main-ghostleek.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
}

export default function handler(req, res) {
    // Set CORS headers
    setCORSHeaders(res);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
}

export async function PUT(request, { params }) {
    setCORSHeaders(request); // Set CORS headers for the PUT method

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

export async function GET(request, { params }) {
    setCORSHeaders(request); // Set CORS headers for the GET method

    const { id } = params;
    await connectMongoDB();
    const wine = await Wine.findOne({ _id: id});
    return NextResponse.json({ wine }, {status: 200});
}