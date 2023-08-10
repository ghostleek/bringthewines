import EditWineForm from "@/components/EditWineForm";
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://bringthewines.vercel.app';

    const getWineById = async(id) => {
        const endpoint = `${BASE_URL}/api/wines/${id}`;
    
        try {
            const res = await fetch(endpoint, { cache: "no-store" });
            
            if (!res.ok) {
                const errorData = await res.json(); // Might provide additional error details
                throw new Error(`Failed to fetch Wine: ${errorData.message || res.status}`);
            }
    
            return await res.json();
        } catch (error) {
            // write clearer error messages
            console.error('Error fetching wine:', error.message);
            throw error; 
        }
    };
    
    export default async function EditWine({ params }) {
        const { id } = params;
        
        try {
            const wineData = await getWineById(id);
            console.log('Wine:', wineData);
            console.log("id: ", id);
    
            const { name, price, description, status, type, ctscore, vintage } = wineData;
    
            return (
                <EditWineForm 
                    id={id} 
                    name={name} 
                    price={price} 
                    description={description} 
                    status={status} 
                    type={type} 
                    vintage={vintage} 
                    ctscore={ctscore} 
                />
            );
        } catch (error) {
            // Display error on front-end + backend console log
            console.error('Error in EditWine function:', error.message);
            return <div>Error loading wine data.</div>;
        }
    }