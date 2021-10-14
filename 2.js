// Diketahui sebuah array seperti berikut :

// 0   1	2   3   4  5   6   7   8	9

// 20  12  35  11  17  9  58  23   69  21

// Susun lah array berikut berdasarkan nilai terkecil dengan membandingkan semua elemen array satu per satu. (Bubble Sort) Dilarang Menggunakan Build in function (HOF)

let array = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

function sortArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return array;
}

console.log(sortArr(array));
