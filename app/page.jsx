import dynamic from 'next/dynamic';
import Script from 'next/script';
import UserInfo from '@/components/UserInfo';
// import connectMongoDB from "@/libs/mongodb";

// Dynamically import the WineList for client-side rendering
const WineList = dynamic(() => import('@/components/WineList.client'), {
  ssr: false // This will load the component only on client-side
});

export default function Home() {
  return (
    <>
    <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
      <WineList />
      <div className = "pt-3">
      <UserInfo />
      </div>
    </>
  );
}

// Confirm that MongoDB is connected
// connectMongoDB();