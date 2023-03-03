class otherFunction {
  // validation of the contact number and name
  dataValidation(fullName, number) {
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/gi;

    const regularExpretionName = new RegExp("^[a-z]+ [a-z]+$", "gi");

    if (!regularExpretionName.test(fullName)) {
      return { success: "Name not valid" };
    }

    if (!regularExpretionNumber.test(number.trim())) {
      return { success: "Number not valid" };
    }
  }
  // capitalizes all first letters of words
  allFirstLettersCapitalized(Userword) {
    return Userword.split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  }
}

export default new otherFunction();
