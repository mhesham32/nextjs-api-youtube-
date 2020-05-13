import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [starksData, setStarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [isStark, setIsStark] = useState("");

  async function getTheStarks() {
    if (starksData.length > 0) return;
    setLoading(true);
    const res = await fetch("api/theStarks");
    const data = await res.json();
    setLoading(false);
    setStarksData(data);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const validateStark = (e) => {
    e.preventDefault();
    fetch("api/validateStark", {
      method: "POST",
      body: JSON.stringify({ character: value }),
    })
      .then((res) => {
        if (res.ok) {
          setIsStark("Yes");
        } else {
          setIsStark("No");
        }
      })
      .catch(() => {
        setIsStark("No");
      });
  };

  return (
    <div className="container">
      <Head>
        <title>Nextjs API routes</title>
      </Head>
      <h1>The Starks API {loading && <span>Loading...</span>}</h1>
      <div className="wrapper">
        <ul>
          <button onClick={getTheStarks} disabled={starksData.length > 0}>
            get the Starks
          </button>
          {starksData.map((char, i) => (
            <li key={i}>{char}</li>
          ))}
        </ul>
        <form>
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={validateStark}>check</button>
        </form>

        <h3>
          is Stark:{" "}
          <span className={isStark === "Yes" ? "yes" : "no"}>{isStark}</span>
        </h3>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
        }

        .wrapper {
          display: flex;
          justify-content: space-around;
        }

        button {
          margin: 10px 0;
        }

        span {
          color: #bada55;
          font-size: 48px;
        }

        .yes {
          color: #4bb543;
        }

        .no {
          color: #d9534f;
        }

        h1 {
          font-size: 48px;
          font-weight: 700;
          text-align: center;
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
