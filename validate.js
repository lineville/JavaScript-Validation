/**
Liam Neville
CMPU 375 Assignment 2
*/

// Sets the result to valid
function validate(result) {
  document.getElementById(result).innerHTML = "verified";
  document.getElementById(result).style.color = "green";
}

// Sets the result to error
function error(result) {
  document.getElementById(result).innerHTML = "error";
  document.getElementById(result).style.color = "red";
}

// Validates number if it is in the range [1 ... 100]
function validateNumber() {
  var num = document.getElementById('number').value;
  if (!isNaN(num) && (num % 1 === 0) && (num > 0 && num <= 100)) {
    validate('number-result');
  }
  else {
    error('number-result');
  }
}

// working but still need to implement check for no
// non-letters except for hyphen in last name
function validateFullname() {
  var str = document.getElementById('fullname').value;
  var pieces = str.split(" ");

  // checks if the first is a valid prefix or last word is valid suffix
  function validPrefixOrSuffix(words) {
    var prefixes = ["Prof.", "Mr.", "Dr."]; // declare valid prefixes
    var suffixes = ["Jr.", "Sr.", "Ph.D"]; // declare valid suffixes
    var ans = false;
    if ((prefixes.indexOf(words[0]) > -1) ||
      (suffixes.indexOf(words[words.length - 1]) > -1)) {
      ans = true;
    }
    return ans;
  }

  // checks if all the strings in words is capitalized
  function allCaps(words) {
    var ans = true;
    for (var i = 0; i < words.length; i++) {
      if (words[i].charAt(0) == words[i].charAt(0).toLowerCase()) {
        ans = false
      }
    }
    return ans;
  }

  // check that there are 2 or three names
  if (pieces.length < 2 || pieces.length > 3) {
    error('fullname-result');
  }
  // if there is only a first and last name
  if (pieces.length == 2) {
    // check for allCaps, check that first name is only letters
    // and last name is only letters or hyphen
    if (allCaps(pieces)) {
      validate('fullname-result');
    }
    else {
      error('fullname-result');
    }
  }
  // if there are three words in the name
  if (pieces.length == 3) {
    // check for allCaps, and valid suffix and prefix
    if (allCaps(pieces) && validPrefixOrSuffix(pieces)) {
      validate('fullname-result');
    }
    else {
      error('fullname-result');
    }
  }
}

// validates email inputs
// working
function validateEmail() {
  var input = document.getElementById('email').value; //get the input
  var tld = ["com", "org", "net", "int", "edu", "gov", "mil"]; //valid tlds

  // Before splitting make sure there is an @ and a .
  if ((input.indexOf("@") == -1) || (input.indexOf(".") == -1)) {
    error('email-result');
  }


  var username = input.split(/[@]/)[0]; // get username
  var extension = input.split(/[@]/)[1].split(/[.]/)[1]; //get extension
  var pattern = new RegExp(/[^-@.\w\d\s:]/); // test of only valid chars

  // check that username is at most 20 chars,
  // it does not match anything in pattern and valid TLD.
  if (username.length <= 20 &&
    (tld.indexOf(extension) > -1) &&
    !pattern.test(username)) {
      validate('email-result');
  }
  else {
      error('email-result');
  }
}

//works except for repeated substrings
function validatePassword() {
  var input = document.getElementById('password').value;
  var pattern = new RegExp(/[^\w\d\s:]/); //regex for punctuation

  // checks if string contains a capital letter
  function containsCap(str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(i).toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  // checks if string contains a lower case letter
  function containsLow(str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(i).toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  // checks if string contains punctuation and a number
  function containsNumberAndPunctuation(str) {
    var numtest = new RegExp(/[0-9]/);
    return (pattern.test(str) && numtest.test(str));
  }

  // checks if string contains any spaces
  function spaces(str) {
    var spacetest = new RegExp(/[ ]/);
    return spacetest.test(str);
  }

  function containsRepeatedSubstring(str) {
    return 0;
  }

  if (containsCap(input) && containsLow(input) &&
    containsNumberAndPunctuation(input) && !spaces(input) &&
    input.length >= 8 && input.length <= 50) {
      validate('password-result');
  }
  else {
      error('password-result');
  }

}

function validateDate() {
  var date = new Date(document.getElementById('date').value);
  var today = new Date();
  // check that it is valid
  if(date){
    if((today.getFullYear() - date.getFullYear()) >= 10){
      validate('date-result');
    }
    else{
      error('date-result');
    }
  }
  else{
    error('date-result');
  }

}

function genericDate() {
  var date = document.getElementById('date');
  date.innerHTML = "YYYY/MM/DD";

}

function validateZipcode() {
  var input = document.getElementById('zipcode').value;
  var ans = false;

  // checks if string is in the list of valid zipcodes
  function isValidZip(str) {
    var result = false;
    for (var i = 0; i < zips.length; i++) {
      if (zips[i] == str) {
        result = true;
      }
    }
    return result;
  }

  //check if it has the optional 4 digits.
  if(input.length > 5 && (input.indexOf("-") > -1)){
    var halves = input.split("-");
    var firstFive = halves[0];
    var lastFour = halves[1];
    var onlyNums = new RegExp(/^\d+$/);
    if(lastFour.length == 4 && onlyNums.test(lastFour) && isValidZip(firstFive)){
      ans = true;
    }
  }
  if(input.length == 5 && isValidZip(input)){
    ans = true;
  }

  if(ans){
    validate('zipcode-result');
  }
  else {
    error('zipcode-result');
  }

}

//working except for the off-focus effect
function validateState() {
  var input = document.getElementById('state').value;
  var bool = false;
  for(var i=0; i<states.length; i++){
    if((states[i].name == input) || (states[i].abbreviation == input.toUpperCase())){
      bool = true;
    }
  }
  if(bool){
    validate('state-result');
  }
  else {
    error('state-result');
  }

}
