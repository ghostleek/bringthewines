import connectMongoDB from "@/libs/mongodb";
import WinesList from "@/components/WinesList";

export default function Home(){
  return (
    <>
  <WinesList />
  <WinesList />
  <WinesList />
  </>
  );
}

connectMongoDB();
