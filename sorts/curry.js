// Trying to understand currying in JS
// a really interesting concept

// trying to make a function f that takes an
// arbitrary number of arguments
// if there is no argument
// i.e. f() is called it should represent "f" concat "o"
// any number of times until a string is passed
// as an argument and that is concat
// i.e. f()()("bar") should return "foobar"
// f("it") should return "fit"
// and the function should take any number of
// emtpy calls
// like f()()()()()()()()()()()()("o") should
// return "fooooooooooooo"

function f(s) {
  // call with no argument defaults to ""
  s = s || "";
  // if the first argument is a string
  if (s != "") {
    // return the string with "f"
    // eg/ case of f("it") >> "fit"
    return "f".concat(s);
  } else {
    let letters = ["f","o"];
    // returns function
    return curry(letters);
  }
}

function curry(arr) {
  return function(s) {
    s = s || "";
    // if the function has no string argument
    if(s == "") {
      // adds an "o" to the output
      arr.push("o");
      // recursive call to find the next argument
      return curry(arr);
    } else {
      // if there is a string passed
      // adds it to the output
      arr.push(s);
      // produces the final string and returns it
      return arr.join("");
    }
  }
}
