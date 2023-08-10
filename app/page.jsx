import connectMongoDB from "@/libs/mongodb";
import dynamic from 'next/dynamic';

// Dynamically import the WineList for client-side rendering
const WineList = dynamic(() => import('@/components/WineList.client'), {
  ssr: false  // This will load the component only on client-side
});

export default function Home() {
  return <WineList />;
}

// Confirm that MongoDB is connected
connectMongoDB();