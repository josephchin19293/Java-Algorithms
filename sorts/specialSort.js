// Trying to make a sorting function that can
// sort with 2 conditions.
// the most important condition is occurrence
// the second is value.

// i.e., a list of [1,2,2,3] would sort to
// [1,3,2,2]

function specialSort(arr) {
  let special = makeSort(arr);
  return arr.sort(special);
}
function makeSort(arr) {
  return function sortby(objA, objB) {
    let checkArr = check(arr);
    if (checkArr(objA) == checkArr(objB)) {
      return objA - objB;
    }
    return checkArr(objA) - checkArr(objB);
  }
}

function check(array) {
  return function count(val) {
    out = 0;
    for(let i=0; i<array.length; i++) {
      if (array[i] == val) {
        out++;
      }
    }
    return out;
  }
}
