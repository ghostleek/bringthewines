import Head from 'next/head';
import connectMongoDB from "@/libs/mongodb";
import dynamic from 'next/dynamic';

// Dynamically import the WineList for client-side rendering
const WineList = dynamic(() => import('@/components/WineList.client'), {
  ssr: false // This will load the component only on client-side
});

export default function Home() {
  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR-GA-MEASUREMENT-ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR-GA-MEASUREMENT-ID');
            `,
          }}
        />
      </Head>
      <WineList />
    </>
  );
}

// Confirm that MongoDB is connected
connectMongoDB();