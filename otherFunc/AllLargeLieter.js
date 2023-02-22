//All words with a capital letter

function largeFirstLiters(Userword) {
  return Userword.split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" "); //  /\s+/
}

export { largeFirstLiters };
