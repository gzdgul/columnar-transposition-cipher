document.addEventListener('keydown', (event) => {
        
    if (event.key === 'Escape') {
        location.reload();
    }
});

function encrypt(key, plaintext) {

    key = key.split(''); // dizi haline getirdik, ayırdık.
    const column_num = key.length; // kolon sayısını aldık.
    plaintext = plaintext.split(''); // dizi haline getirdik, ayırdık.
    const pt_lenght = plaintext.length; // uzunluğunu aldık.

    const row_num = Math.ceil(pt_lenght / column_num); // sıra sayısını aldık.
    const space_num = ((column_num * row_num) - pt_lenght);

    /*
     ['m', 'a', 'r', 'y', 'p', 'r', 'e', 'n', 's'],
     ['e', 's', 'i', 'b', 'u', 'g', 'u', 'n', 'o'],
     ['l', 'd', 'u', 'r', 'e', 'c', 'e', 'k']
    */
    let pt_sliced = [];
    let c = 0;
    for (let i = 0; i < row_num; i++) {
        pt_sliced[i] = plaintext.slice(c, (c + column_num));
        if (i == (row_num - 1)) {
            pt_sliced[i] = plaintext.slice(-(column_num - space_num));
        }
        else {
            c += column_num;
        }
    }

    // Parçalanmış Matrisin 'Key' değerine göre tablolaştırılması.
    // DANIMARKA
    // AAADIKMNR
    let ciphertext_table = [];
    for (let i = 0; i < column_num; i++) {
        ciphertext_table[i] = [];
        for (let j = 0; j < row_num; j++) {
            ciphertext_table[i].push(pt_sliced[j][i]);
        }
    }

    // 'Key' değerinine göre mapleyelim.
    let key_map = [...key]; // Kopya oluşturualım.
    key_map = key_map.map((x, index) => {
        return {
            char: x,
            default: index,
            cipher: ciphertext_table[index]
        }
    });
    key_map = key_map.sort((a, b) => a.char.localeCompare(b.char));

    // 'Key' değerinin 'A-Z' sıralaması yapalım.
    let ciphertext_result = [];
    key_map.forEach(x => {
        ciphertext_result.push(x.cipher.join(''));
    });
    ciphertext_result = ciphertext_result.join('').toLocaleUpperCase();

    console.log(ciphertext_result);

    return ciphertext_result;
}

function decrypt() {
    // HTML tarafından verilerin çekilmesi.
    const key_element = document.getElementById('key')?.value;
    const ciphertext_element = document.getElementById('ciphertext')?.value;

    const key = key_element.split(''); // dizi haline getirdik, ayırdık.
    const column_num = key.length; // kolon sayısını aldık.
    const ciphertext = ciphertext_element.split(''); // dizi haline getirdik, ayırdık.
    const cp_lenght = ciphertext.length; // uzunluğunu aldık.

    const row_num = Math.ceil(cp_lenght / column_num); // sıra sayısını aldık.
    const space_num = ((column_num * row_num) - cp_lenght);

    let key_map = [...key]; // Kopya oluşturualım.
    key_map = key_map.map((x, index) => {
        return {
            char: x,
            default: index,
            plain: null
        }
    });
    key_map = key_map.sort((a, b) => a.char.localeCompare(b.char));

    let c = 0;
    key_map.forEach((x, index) => {
        if (x.default < (key.length - space_num)) {
            x.plain = ciphertext.slice(c, c + row_num);
            c += row_num;
        } else {
            x.plain = ciphertext.slice(c, c + (row_num - 1));
            c += (row_num - 1);
        }
    });
    key_map = key_map.sort((a, b) => a.default - b.default);

    let ciphertext_table = [];
    key_map.forEach((x) => {
        ciphertext_table.push(x.plain);
    });

    let pt_sliced = [];
    for (let i = 0; i < row_num; i++) {
        pt_sliced[i] = [];
        for (let j = 0; j < column_num; j++) {
            pt_sliced[i].push(ciphertext_table[j][i]);
        }
    }

    let plaintext = [];
    pt_sliced.forEach((x) => {
        plaintext.push(x.join(''));
    });
    console.log(plaintext.join(''));
}

function startup(event) {

    if (event.key !== "Enter") {
        return;
    }

    let girdi = document.getElementById("terminal_input");
    girdi.setAttribute("disabled", true);

    if(girdi.value == 'columnar_transposition_cipher') {
        let menu = document.getElementById("main_menu");
        menu.style.display = "block";
        let nextInput = document.getElementById('selector');
        nextInput.focus();
    }

}

function selector(event) {
    
    if (event.key !== "Enter") {
        return;
    }

    let selector_input = document.getElementById("selector");
    selector_input.setAttribute('disabled', true);

    switch(selector_input.value) {
        case '1': 
            let encrypt_div = document.getElementById("encrypt");
            encrypt_div.style.display = "block";
            let nextInput = document.getElementById('encrypt_key');
            nextInput.focus();
            break;
        
        case '2':

            break;
    }
}

function encrypt_key_submit(event) {

    if (event.key !== "Enter") {
        return;
    }

    let encrypt_key = document.getElementById("encrypt_key");
    encrypt_key.setAttribute("disabled", true);

    let output = document.getElementById("encrypt_key_output");
    output.innerHTML = 'Encrypt KEY : ' + encrypt_key.value;

    let plaintext = document.getElementById("encrypt_plaintext_label");
    plaintext.style.display = "block";

    let nextInput = document.getElementById('encrypt_plaintext');
    nextInput.focus();

}

function plaintext_submit(event) {

    if (event.key !== "Enter") {
        return;
    }

    let encrypt_key = document.getElementById("encrypt_key");
    let plaintext = document.getElementById("encrypt_plaintext");
    plaintext.setAttribute('disabled', true);

    let output = document.getElementById("plaintext_output");
    output.innerHTML = 'PLAINTEXT : ' + plaintext.value;

    let encrypt_result = encrypt(encrypt_key.value, plaintext.value);

    let result = document.getElementById("encrypt_result");
    result.innerHTML = 'RESULT : ' + encrypt_result + ' (if you want clear press "esc")';

}