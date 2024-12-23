const { TARIF_UMUM, PTKP } = require("./constants");
const numeral = require("numeral");

/**
 * Fungsi ini menghitung PPh21 (pajak penghasilan) berdasarkan penghasilan per bulan, status kawin, dan jumlah tanggungan.
 * @param {Object} params - Parameter.
 * @param {number} params.penghasilanPerBulan - Penghasilan bulanan individu.
 * @param {string} params.status - Status perkawinan ("LAJANG" atau "KAWIN").
 * @param {number} params.tanggungan - Jumlah tanggungan (0 hingga 3).
 * @returns {number} - PPh21 yang dihitung atau 0 jika input tidak valid.
 */
function hitungPPh21({ penghasilanPerBulan, status, tanggungan }) {
    const input = { penghasilanPerBulan, status, tanggungan };
    const validation = validasiInput(input);

    //menampilkan error jika input tidak valid
    if (!validation.is_valid) {
        console.log(validation.error_message);
        return 0;
    }

    console.log("==== Perhitungan PPh21 Per Tahun====");
    //tentukan PTKP
    const ptkp = PTKP[status] + tanggungan * PTKP.SATU_TANGGUNGAN;

    //hitung PKP dg mengurangi penghasilan dg PTKP
    const penghasilan = penghasilanPerBulan * 12;
    let pkp = penghasilan - ptkp;

    //menampilkan data sebagai basis perhitungan
    console.log(`Penghasilan per tahun     : Rp${numeral(penghasilan).format("0,0")}`);
    console.log(`PTKP                      : Rp${numeral(ptkp).format("0,0")}`);
    console.log(`PKP                       : Rp${numeral(pkp).format("0,0")}`);

    //jika pkp tidak melebihi ptkp, berarti tidak dikenakan pajak penghasilan
    if (pkp <= 0) {
        console.log("\nTidak ada PPh yang perlu dibayar karena PKP <= 0.");
        console.log(`\nPPh total                : Rp0`);
        return 0;
    }

    //menyimpan pph total di variabel pph
    let pph = 0;
    console.log("\nRincian perhitungan PPh:");

    //menghitung pph secara progresif dengan looping setiap level TARIF_UMUM
    for (let i = 0; i < TARIF_UMUM.length; i++) {
        //hanya menghitung pph jika lebih besar dari batas bawah level tsb
        if (pkp > TARIF_UMUM[i].batas_bawah) {
            //menghitung selisih antara PKP dengan batas bawah level
            const selisih = pkp - TARIF_UMUM[i].batas_bawah;

            //menghitung pph di level ini
            const pph_level_ini = selisih * TARIF_UMUM[i].tarif;

            //menjumlahkan pph total
            pph += pph_level_ini;

            //ubah variabel pkp menjadi batas bawah agar perhitungan pph progresif sesuai tarif di bawahnya
            pkp = TARIF_UMUM[i].batas_bawah;

            //menampilkan perhitungan
            console.log(`\nBatas bawah PKP          : Rp${numeral(TARIF_UMUM[i].batas_bawah).format("0,0")}`);
            console.log(`Sisa PKP                 : Rp${numeral(selisih).format("0,0")}`);
            console.log(`Perhitungan PPh          : ${TARIF_UMUM[i].tarif * 100}% x Rp${numeral(selisih).format("0,0")} = Rp${numeral(pph_level_ini).format("0,0")}`);
        }
    }

    //menampilkan pph total setelah dijumlahkan secara progresif
    console.log(`\nPPh total                : Rp${numeral(pph).format("0,0")}`);
    return pph;
}

/**
 * Fungsi ini memvalidasi input data penghasilanPerBulan, status, dan tanggungan.
 * @param {Object} params - Parameter.
 * @param {number} params.penghasilanPerBulan - Penghasilan bulanan.
 * @param {string} params.status - Status perkawinan ("LAJANG" atau "KAWIN").
 * @param {number} params.tanggungan - Jumlah tanggungan (0 hingga 3).
 * @returns {Object} - Hasil validasi, terdiri dari is_valid (true/false) dan error_message (jika tidak valid).
 */
function validasiInput({ penghasilanPerBulan, status, tanggungan }) {
    //validasi penghasilan
    if (typeof penghasilanPerBulan != "number" || penghasilanPerBulan < 0) {
        return {
            is_valid: false,
            error_message: "penghasilan [" + penghasilanPerBulan + "] tidak valid.",
        };
    }

    //validasi status kawin
    if (!["LAJANG", "KAWIN"].includes(status)) {
        return {
            is_valid: false,
            error_message: "status [" + status + "] bukan LAJANG atau KAWIN.",
        };
    }

    //validasi jumlah tanggungan
    if (typeof tanggungan != "number" || tanggungan < 0 || tanggungan > 3) {
        return {
            is_valid: false,
            error_message: "tanggungan [" + tanggungan + "] bukan di antara 0 sampai 3.",
        };
    }

    return { is_valid: true };
}

module.exports = { hitungPPh21, validasiInput };
