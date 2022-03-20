//formats the street names into what is usable for the api
const cleanStreet = (street) => {
  street = street.toUpperCase();
  removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
  for (term of removeTerms) {
    if (street.includes(term)) {
      street = street.substring(0, street.indexOf(term) - 1);
    }
  }

  const streetArray = street.split(" ");
  for (let index = 0; index < streetArray.length; index++) {
    streetArray[index] =
      " " +
      streetArray[index].replaceAll(".", "").replaceAll(",", "").trim() +
      " "; //Remove all white space from front and back of each word
    if (streetArray[index] === " PKWY ") streetArray[index] = "PARKWAY";
    if (streetArray[index] === " AV " || streetArray[index] === " AVE ")
      streetArray[index] = "AVENUE";
    if (streetArray[index] === " ST " || streetArray[index] === " STR ")
      streetArray[index] = "STREET";
    if (streetArray[index] === " BLV " || streetArray[index] === " BLVD ")
      streetArray[index] = "BOULEVARD";
    if (streetArray[index] === "RD") streetArray[index] = "ROAD";
    if (streetArray[index] === " PL ") streetArray[index] = "PLACE";
    if (streetArray[index] === " PLZ ") streetArray[index] = "PLAZA";
    if (streetArray[index] === " N " || streetArray[index] === " NO ")
      streetArray[index] = "NORTH";
    if (streetArray[index] === " S " || streetArray[index] === " SO ")
      streetArray[index] = "SOUTH";
    if (streetArray[index] === " E ") streetArray[index] = "EAST";
    if (streetArray[index] === " W ") streetArray[index] = "WEST";
    if (streetArray[index] === " 1ST " || streetArray[index] === " FIRST ")
      streetArray[index] = "1";
    if (streetArray[index] === " 2ND " || streetArray[index] === " SECOND ")
      streetArray[index] = "2";
    if (streetArray[index] === " 3RD " || streetArray[index] === " THIRD ")
      streetArray[index] = "3";
    if (streetArray[index] === " 4TH " || streetArray[index] === " FOURTH ")
      streetArray[index] = "4";
    if (streetArray[index] === " 5TH " || streetArray[index] === " FIFTH ")
      streetArray[index] = "5";
    if (streetArray[index] === " 6TH " || streetArray[index] === " SIXTH ")
      streetArray[index] = "6";
    if (streetArray[index] === " 7TH " || streetArray[index] === " SEVENTH ")
      streetArray[index] = "7";
    if (streetArray[index] === " 8TH " || streetArray[index] === " EIGHTH ")
      streetArray[index] = "8";
    if (streetArray[index] === " 9TH " || streetArray[index] === " NINTH ")
      streetArray[index] = "9";
    if (streetArray[index] === " 10TH " || streetArray[index] === " TENTH ")
      streetArray[index] = "10";
    if (streetArray[index] === " 11TH " || streetArray[index] === " ELEVENTH ")
      streetArray[index] = "11";
    if (streetArray[index].includes("TH") && /\d/.test(streetArray[index]))
      streetArray[index] = streetArray[index].replaceAll("TH", "").trim();
    if (streetArray[index].includes("RD") && /\d/.test(streetArray[index]))
      streetArray[index] = streetArray[index].replaceAll("RD", "").trim();
    if (streetArray[index].includes("ND") && /\d/.test(streetArray[index]))
      streetArray[index] = streetArray[index].replaceAll("ND", "").trim();
  }
  for (let index = 0; index < streetArray.length; index++) {
    streetArray[index] = streetArray[index].trim();
  }
  street = streetArray.join(" ").replaceAll(" ", "%20").trim();
  return street;
};