import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Nextjs API routes</title>
      </Head>
      <h1>check the git branches for examples</h1>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        h1 {
          font-size: 48px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
