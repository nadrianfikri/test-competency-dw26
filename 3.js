// Buatlah function untuk mencetak pattern persegi dari karakter “#” dan “*” yang mempunyai sebuah parameter sebagai nilai panjang dengan nilai parameter harus ganjil.
//  drawImage(5)
//

function drawImage(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    // if (i ) {
    //   result += '# ';
    // } else {
    //   result += '* ';
    // }

    for (let j = 0; j < length; j++) {
      if (j % 2 === 1) {
        result += '# ';
      } else {
        if (j == Math.ceil(length / 2)) {
          result += '* ';
        } else {
          result += '# ';
        }
        // if (j % 2 === 0) {
        //   if (j === Math.ceil(length / 2)) {
        //   } else {
        //     result += '# ';
        //   }
        // } else {
        //   result += '# ';
        // }
      }
    }
    result += '\n';
  }
  return result;
}
console.log(drawImage(7));
let length = 7;
console.log(Math.ceil(length / 2));
console.log(5 / 2);
