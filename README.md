# Bring the Wines
Find and buy red and white wines from a local (Singaporean) seller
<br>
Build with Next.js, tailwindcss, react, with MongoDB as database, deployed on Vercel

## Getting Started

First, run 
```
npm i
```

Get the .env variables from Kahhow<br>
Keep .env at the root of the development folder, else you will start seeing errors like these:
<img width="354" alt="image" src="https://github.com/ghostleek/bringthewines/assets/44336310/d6d89981-def4-41bc-99c3-659580e37441">


Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

After setting up, if you are using a new MongoDB database, you can run the following command to seed some basic data:

```
node seed.js
```


## References
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
