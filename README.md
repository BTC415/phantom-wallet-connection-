# Token-Transfer-frontend(Next.js + Jotai + Tailwind CSS)

This is a frontend project for solana token transfer contract(Rust).

## Getting Started

- First, set your rust program id in `src/components/TokenTransfer.tsx`

    ```bash
    const PROGRAM_ID = "G73rpG7HAaPzJtEH3pzpkrY21t8rdMKkUv6Hry3GTcqs";
    ```

- Second, set your rust program idl in `src/idl/token_transfer.json`
    ```bash
    {
        "version": "0.1.0",
        "name": "token2022_transfer",
        "instructions": [
            {
                "name": "initialize",
                "accounts": [],
                ...
            }
    }
    ```


- Then, run the development server:

    ```bash
    npm run dev
    ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Auther
- [BTC0in23](https://t.me/BTC0in23)
