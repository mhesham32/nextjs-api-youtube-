const theStarksData = require("./_utils/theStarksData");

export default (req, res) => {
  res.json({ data: theStarksData });
};
