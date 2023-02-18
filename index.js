const key_ = document.getElementById('key');
const plaintext_ = document.getElementById('plaintext');
const ciphertext_ = document.getElementById('ciphertext');

let key = key_.value;
let plaintext = plaintext_.value;
let ciphertext_ar = []

key = key.split(''); // dizi haline getirdik, ayırdık.
let column_num = key.length; //kolon sayısını aldık.
plaintext = plaintext.split(''); // dizi haline getirdik, ayırdık.
let pt_lenght = plaintext.length;
console.log(key);
console.log(plaintext);
console.log(column_num);
console.log(pt_lenght);

let a = pt_lenght / column_num; 
a = Math.ceil(a); // sıra sayısı
let pt_sliced = [];
let c = 0;
let bosluk = ((column_num * a) - pt_lenght); // bosluk sayısı
for(let i = 0; i < a; i ++){
    pt_sliced[i] = plaintext.slice(c, (c + column_num));
        if(i == (a-1)){
            pt_sliced[i] = plaintext.slice(-(column_num - bosluk));
        }
        else{
            c += column_num;
        }
}
console.log(pt_sliced);
/*
 ['m', 'a', 'r', 'y', 'p', 'r', 'e', 'n', 's'],
 ['e', 's', 'i', 'b', 'u', 'g', 'u', 'n', 'o'],
 ['l', 'd', 'u', 'r', 'e', 'c', 'e', 'k']
*/

for (let t = 0; t < a; t ++){
    ciphertext_ar[t] = pt_sliced[t][0];
}
console.log(ciphertext_ar);
    //pt_sliced[0][0]
    //pt_sliced[1][0]
    //pt_sliced[2][0]