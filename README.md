# TUJUAN PROGRAM

Program ini menghitung pajak penghasilan per tahun yang mengikuti aturan progresif ke atas sbb:

1. PKP Rp0 – Rp50.000.000 dikenakan tarif 5%
2. PKP Rp50.000.000 – Rp250.000.000 dikenakan tarif 15%
3. PKP Rp250.000.000 – Rp500.000.000 dikenakan tarif 25%
4. PKP Rp500.000.000 – Rp5.000.000.000, dikenakan tarif 30%
5. PKP di atas Rp5.000.000.000 (5 miliar rupiah) dikenakan tarif 35%

PKP dihitung dari Penghasilan Per Tahun dikurangi dengan PTKP. PTKP ditentukan sbb:

1. Jika status kawin LAJANG, PTKP adalah 54juta
2. Jika status kawin KAWIN, PTKP adalah 58,5juta
3. Jika memiliki TANGGUNGAN, PTKP ditambah 4,5juta per tanggungan dengan maksimal tanggungan sebanyak 3(tiga) orang.

# PROGRAMMING LANGUAGE

NodeJS

# PRE-INSTALLED DEPENDENCIES

-   jest, for testing
-   numeral, for formatting

# INPUT

INPUT adalah object yang memiliki element:

1. PenghasilanPerBulan
2. Status
3. Tanggungan
   Setiap elemen akan melalui validasi terlebih dahulu sebelum dihitung pajaknya.

# OUTPUT

Output adalah keterangan mengenai penghitungan pajak yang dapat ditampilkan di console/terminal.

# HOW TO RUN THE PROGRAM

1. Instal dependensi
2. Jalankan program
3. Jalankan test
4. Ubah input program di file app.js

# GLOSSARY

PKP = Penghasilan Kena Pajak
PTKP = Penghasilan Tidak Kena Pajak
