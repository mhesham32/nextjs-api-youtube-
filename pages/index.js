import React, { useState } from "react";
import Head from "next/head";

const Loader = () => (
  <React.Fragment>
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <style jsx>{`
      .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }
      .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #0070f3;
        margin: -4px 0 0 -4px;
      }
      .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
      }
      .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
      }
      .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
      }
      .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
      }
      .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
      }
      .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
      }
      .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
      }
      .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
      }
      .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
      }
      .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
      }
      .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
      }
      .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
      }
      .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
      }
      .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
      }
      .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
      }
      .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
      }
      @keyframes lds-roller {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </React.Fragment>
);

export default function Home() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("api/takeShot", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log({ data });
          setTitle(data.title);
          setImageUrl("data:image/jpeg;base64," + JSON.parse(data.image));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Head>
        <title>Nextjs API routes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">Web Shot</h1>
      <h3>Take screen shots of web pages</h3>

      <h3 className="web-title">{title}</h3>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={url} />
          <button>Take Shot</button>
        </form>
        <div className="image">
          {loading ? <Loader /> : <img src={imageUrl} />}
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
          height: 600px;
          max-height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
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
