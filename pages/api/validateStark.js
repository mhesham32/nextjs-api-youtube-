const theStarksData = require("./_utils/theStarksData");

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send(new Error("Use POST method!"));
  } else {
    const { character } = req.query;
    if (character && theStarksData.includes(character)) {
      res.statusCode = 200;
      res.json({ data: theStarksData });
    } else {
      res
        .status(400)
        .send(new Error("your character isn't stark or not valid"));
    }
  }
};
