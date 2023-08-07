import EditWineForm from "@/components/EditWineForm";
import dotenv from 'dotenv';

dotenv.config();

const getWineById = async(id) => {
    try{
        const res = await fetch(`${process.env.NODE_ENV === 'development' ? `http://localhost:3000` : 'https://bringthewines.vercel.app'}/api/wines`, { 
            cache: "no-store", 
        });
        if (!res.ok) {
            throw new Error("Failed to fetch Wine");
        }
        const responseJson = await res.json();
        console.log("Response:", responseJson); // Log the response
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditWine({ params }){
    const { id } = params;
    const wine = await getWineById(id);
    const { name, price, description, status, type, ctscore, vintage } = wine;
    console.log("id: ", id)
    return <EditWineForm id = {id} name={name} price={price} description={description} status={status} type={type} vintage={vintage} ctscore={ctscore}/>
}