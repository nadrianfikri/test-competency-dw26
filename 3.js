// Buatlah function untuk mencetak pattern persegi dari karakter “#” dan “*” yang mempunyai sebuah parameter sebagai nilai panjang dengan nilai parameter harus ganjil.
//  drawImage(5)
//

function drawImage(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i === 0 || i === length - 1) {
        result += '*';
      } else {
        if (j === 0 || j === length - 1) {
          result += '*';
        } else {
          result += ' ';
        }
      }
    }
    result += '\n';
  }
  return result;
}
console.log(drawImage(7));
