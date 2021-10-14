// // Buatlah sebuah function yang bertujuan untuk menghitung harga barang berdasarkan kualitasnya, dengan parameter kualitas barang dan quantity :
// Kentuan :
// Kualitas Barang A, Harga 4550, Jika Qty Pembelian diatas 13 mendapat potongan 231/qty
// Kualitas Barang B, Harga 5330, Jika Qty pembelian diatas 7 akan mendapatkan potongan 23%
// Kualitas Barang C, Harga 8653, Tidak ada promo untuk barang ini

// Clue : maka jika function dijalankan :
// Hitungbarang(A, 14)
// Output :  - Total harga barang : 63700
//    - Potongan : 3234
//    - Total yang harus dibayar : 60466
let A = 'A';
let B = 'B';
let C = 'C';

function countPrice(quality, qty) {
  let price = 0;
  let disc = 0;
  let total = 0;

  if (quality == A) {
    price = 4550;
    if (qty > 13) {
      disc = 231 * qty;
    }

    total = price * qty - disc;

    result = `Total harga Barang: ${price * qty} \n Potongan: ${disc}\n Total yang harus dibayar: ${total}`;
    console.log(result);
  }
  if (quality == B) {
    price = 5330;
    if (qty > 7) {
      let subTotal = price * qty;
      disc = (23 / 100) * subTotal;
    }

    total = price * qty - disc;

    result = `Total harga Barang: ${price * qty} \n Potongan: ${disc}\n Total yang harus dibayar: ${total}`;
    console.log(result);
  }
  if (quality == C) {
    price = 8653;

    total = price * qty;

    result = `Total harga Barang: ${price * qty} \n Potongan: Tidak ada promo untuk barang ini\n Total yang harus dibayar: ${total}`;
    console.log(result);
  }
}

countPrice(C, 14);
