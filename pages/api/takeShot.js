const puppeteer = require("puppeteer");

export default async function (req, res) {
  if (req.method === "POST") {
    const { url } = JSON.parse(req.body);
    const browser = await puppeteer.launch({
      defaultViewport: {
        isLandscape: true,
        width: 1280,
        height: 720,
      },
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const base64Image = await page.screenshot({
      encoding: "base64",
      type: "jpeg",
      omitBackground: true,
    });
    const pageTitle = await page.title();
    browser.close();
    res.json({ image: JSON.stringify(base64Image), title: pageTitle });
  } else {
    res.status(405).send(new Error("Wrong Method use POST"));
  }
}
