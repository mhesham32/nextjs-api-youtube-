const theStarksData = require("./_utils/theStarksData");

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send(new Error("Use POST method!"));
  } else {
    let { character } = JSON.parse(req.body);
    const starksLowercase = theStarksData.map((e) => e.toLocaleLowerCase());
    // add the family name if provided first name only
    character = character.toLocaleLowerCase();
    const isJon = character === "jon snow" || character === "jon";
    if (!character.includes("stark") && !isJon) {
      character = character + " stark";
    } else if (isJon) {
      // Validate jon as Stark
      if (!character.includes("snow")) {
        character = character + " snow";
      }
    }

    if (character && starksLowercase.includes(character)) {
      res.status(200).send(theStarksData);
    } else {
      res
        .status(400)
        .send(new Error("your character isn't stark or not valid"));
    }
  }
};
