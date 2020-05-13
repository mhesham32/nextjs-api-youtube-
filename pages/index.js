import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <Head>
        <title>Nextjs API routes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">Web Shot</h1>
      <h3>Take screen shots of web pages</h3>

      <h3 className="web-title">Unsplash</h3>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={url} />
          <button>Take Shot</button>
        </form>
        <div className="image">
          <img src="https://images.unsplash.com/photo-1589260097587-942004ad2b3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        </div>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        h3 {
          text-align: center;
        }

        .app {
          display: flex;
          max-height: 600px;
          marign: 50px;
          align-items: center;
          justify-content: space-between;

        }

        form {
          flex: 1;
          display:flex;
        }

        input {
          padding: 15px 10px;
          min-width: 250px;
        }

        button {
          display:inline-block;
         padding: 5px 10px;
         border-radius:0.2em;
          border:1px dashed #eee;
         text-decoration:none;
         color:#FFFFFF;
         background-color:#0070f3;
         cursor: pointer;
        }

        button:active {
           box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        }

        .image {
          border: solid 5px #0070f3;
          border-radius: 5px;
          overflow: hidden;
          flex: 2;
          max-height: 600px;
          display: flex;
          justify-content: center;
          padding: 5px;
        }

        img {
          max-height: 600px;
          max-width: 100%;
        }

        .web-title {
          margin: 5px;
        }
      
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
