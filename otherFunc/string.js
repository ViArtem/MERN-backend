//Returns an array with the user's first and last name
function splitFullName(fullname) {
  try {
    let fulln = fullname.split(" ").filter((w) => w != "");

    if (fulln.length < 2) {
      return ["Data", "undefined"];
    } else return fulln;
  } catch (error) {
    console.log(error);
  }
}

//console.log(splitFullName('ffslogds dsfds'));
export { splitFullName };
