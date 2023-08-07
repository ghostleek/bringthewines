import EditWineForm from "@/components/EditWineForm";
import dotenv from 'dotenv';

dotenv.config();

const getWineById = async(id) => {
    try{
        const res = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bringthewines.vercel.app'}/api/wines/${id}`, {
            cache: "no-store", 
        });
        if (!res.ok) {
            throw new Error("Failed to fetch Wine");
        }
        console.log("Response:", res); // Log the response
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditWine({ params }){
    const { id } = params;
    const wine = await getWineById(id);
    console.log('Wine:', wine); // check wine data strcutrue
    console.log("id: ", id)
    const { name, price, description, status, type, ctscore, vintage } = wine;
    return <EditWineForm 
    id={wine.id} 
    name={wine.name}
    type={wine.type}
    description={wine.description}
    price={wine.price}
    status={wine.status}
    vintage={wine.vintage}
    ctscore={wine.ctscore}
    />
}

