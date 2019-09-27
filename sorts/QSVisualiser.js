let barWidth = 10;
let bars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0; i < width/barWidth; i++) {
    bars.push(random(height));
  }
}

function partition(array, start, end) {
  let pivot = array[end];
  let s = start;

  for(let i=start; i<end; i++) {
    if(array[i]<pivot) {
      let temp = array[s];
      array[s] = array[i];
      array[i] = temp;
      s++;
    }
  }
  let temp = array[s];
  array[s] = pivot;
  array[end] = temp;

  return s;
}

async function quickSort(array, start, end) {
  console.log(bars);
  let p = await partition(array, start, end);

  if(p-1>start) {
    quickSort(arr, start, p - 1);
  }
  if(p+1<end) {
    quickSort(array, p + 1, end);
  }
}

function draw() {
  background(100);
  for (let i=0; i<bars.length; i++) {
    stroke(255);
    rect(i*barWidth, height-bars[i], barWidth, bars[i]);
  }
}
