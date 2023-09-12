// const simbol = `/^[!@#$%^&*()_+-=[]{}|;:'",.<>?/]+$/;`
// let nama = "raka"
// console.log(simbol.split("").filter((simbol) => {
//     return nama.split("").find((nama) => {
//         return nama == simbol
//     })
// }));
// console.log(simbol.includes(nama.split("")));
// console.log(nama.split(""));
// const email = "lala@."
// if (!email.includes("@") && !email.includes(".")) {
//     console.log("salah");
//   }

//   const kecil = " abcdefghijklmnopqrstuvwxyz";
//   const nama = "Raka"
//   console.log(kecil.split("").filter((kecil) => {
//         return nama.split("").find((nama) => {
//             return nama == kecil
//         })
//     }));


let obj = {
  prop1: "Nilai 1",
  prop2: "Nilai 2",
  prop3: "Nilai 3"
};

delete obj.prop2;

console.log(obj);