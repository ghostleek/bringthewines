import connectMongoDB from "@/libs/mongodb";
import WinesList from "@/components/WinesList";

export default function Home(){
  return <WinesList />;
}

// confirm that MongoDB is connected
connectMongoDB();
