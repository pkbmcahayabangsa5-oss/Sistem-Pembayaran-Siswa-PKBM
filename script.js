// ======================================================
// DATA UTAMA
// ======================================================

let dataSiswa =
    JSON.parse(
        localStorage.getItem("dataSiswa")
    ) || [];

let dataPembayaran =
    JSON.parse(
        localStorage.getItem("dataPembayaran")
    ) || [];

let indexSiswaSedangDiedit = -1;


// ======================================================
// HELPER
// ======================================================

function el(id) {
    return document.getElementById(id);
}


function formatRupiah(angka) {
    return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}


function formatTanggal(tanggal) {

    if (!tanggal) {
        return "-";
    }

    const bagian = tanggal.split("-");

    if (bagian.length !== 3) {
        return tanggal;
    }

    return (
        bagian[2] +
        "-" +
        bagian[1] +
        "-" +
        bagian[0]
    );
}


function formatBulan(bulan) {

    if (!bulan) {
        return "-";
    }

    const bagian = bulan.split("-");

    if (bagian.length !== 2) {
        return bulan;
    }

    const daftarBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const nomor = Number(bagian[1]) - 1;

    return (
        daftarBulan[nomor] +
        " " +
        bagian[0]
    );
}


function simpanData() {

    localStorage.setItem(
        "dataSiswa",
        JSON.stringify(dataSiswa)
    );

    localStorage.setItem(
        "dataPembayaran",
        JSON.stringify(dataPembayaran)
    );
}


// ======================================================
// PINDAH HALAMAN
// ======================================================

function tampilkanHalaman(namaHalaman) {

    const semuaHalaman =
        document.querySelectorAll(".halaman");

    semuaHalaman.forEach(function(halaman) {
        halaman.style.display = "none";
    });

    const halamanDipilih =
        el(namaHalaman);

    if (halamanDipilih) {
        halamanDipilih.style.display = "block";
    }

    updateSemuaData();
}


// ======================================================
// MENU SIDEBAR
// ======================================================

function aktifkanMenu(tombol) {

    const semuaTombol =
        document.querySelectorAll(".sidebar button");

    semuaTombol.forEach(function(item) {
        item.classList.remove("aktif");
    });

    if (tombol) {
        tombol.classList.add("aktif");
    }
}


// ======================================================
// FORM DATA SISWA
// ======================================================

function tampilkanFormSiswa() {

    indexSiswaSedangDiedit = -1;

    resetFormSiswa();

    if (el("judulFormSiswa")) {
        el("judulFormSiswa").textContent =
            "Tambah Siswa";
    }

    if (el("tombolSimpanSiswa")) {
        el("tombolSimpanSiswa").textContent =
            "Simpan Siswa";
    }

    if (el("formSiswa")) {
        el("formSiswa").style.display =
            "block";
    }

    if (el("namaSiswa")) {
        el("namaSiswa").focus();
    }
}


function sembunyikanFormSiswa() {

    if (el("formSiswa")) {
        el("formSiswa").style.display =
            "none";
    }
}


function batalFormSiswa() {

    resetFormSiswa();

    indexSiswaSedangDiedit = -1;

    if (el("judulFormSiswa")) {
        el("judulFormSiswa").textContent =
            "Tambah Siswa";
    }

    if (el("tombolSimpanSiswa")) {
        el("tombolSimpanSiswa").textContent =
            "Simpan Siswa";
    }

    sembunyikanFormSiswa();
}


function resetFormSiswa() {

    if (el("namaSiswa")) {
        el("namaSiswa").value = "";
    }

    if (el("nisSiswa")) {
        el("nisSiswa").value = "";
    }

    if (el("programSiswa")) {
        el("programSiswa").value = "";
    }

    if (el("kelasSiswa")) {
        el("kelasSiswa").value = "";
    }

    if (el("sppSiswa")) {
        el("sppSiswa").value = "";
    }

    if (el("statusSiswa")) {
        el("statusSiswa").value =
            "Aktif";
    }
}


// ======================================================
// SIMPAN SISWA
// ======================================================

function simpanSiswa() {

    const nama =
        el("namaSiswa")
            ? el("namaSiswa").value.trim()
            : "";

    const nis =
        el("nisSiswa")
            ? el("nisSiswa").value.trim()
            : "";

    const program =
        el("programSiswa")
            ? el("programSiswa").value
            : "";

    const kelas =
        el("kelasSiswa")
            ? el("kelasSiswa").value.trim()
            : "";

    const spp =
        el("sppSiswa")
            ? Number(el("sppSiswa").value)
            : 0;

    const status =
        el("statusSiswa")
            ? el("statusSiswa").value
            : "Aktif";


    if (
        !nama ||
        !nis ||
        !program ||
        !kelas ||
        !spp
    ) {

        alert(
            "Silakan lengkapi semua data siswa."
        );

        return;
    }


    if (spp <= 0) {

        alert(
            "Nominal SPP harus lebih dari 0."
        );

        return;
    }


    const nisSudahAda =
        dataSiswa.some(
            function(siswa, index) {

                return (
                    String(siswa.nis) === nis &&
                    index !==
                        indexSiswaSedangDiedit
                );
            }
        );


    if (nisSudahAda) {

        alert(
            "NIS tersebut sudah digunakan."
        );

        return;
    }


    const dataBaru = {

        nama: nama,

        nis: nis,

        program: program,

        kelas: kelas,

        spp: spp,

        status: status
    };


    if (
        indexSiswaSedangDiedit >= 0
    ) {

        dataSiswa[
            indexSiswaSedangDiedit
        ] = {

            ...dataSiswa[
                indexSiswaSedangDiedit
            ],

            ...dataBaru
        };


        alert(
            "Data siswa berhasil diperbarui."
        );

    } else {

        dataSiswa.push(
            dataBaru
        );


        alert(
            "Data siswa berhasil disimpan."
        );
    }


    simpanData();

    resetFormSiswa();

    indexSiswaSedangDiedit = -1;

    sembunyikanFormSiswa();

    updateSemuaData();
}


// ======================================================
// EDIT SISWA
// ======================================================

function editSiswa(index) {

    const siswa =
        dataSiswa[index];

    if (!siswa) {
        return;
    }


    indexSiswaSedangDiedit =
        index;


    if (el("namaSiswa")) {
        el("namaSiswa").value =
            siswa.nama || "";
    }

    if (el("nisSiswa")) {
        el("nisSiswa").value =
            siswa.nis || "";
    }

    if (el("programSiswa")) {
        el("programSiswa").value =
            siswa.program || "";
    }

    if (el("kelasSiswa")) {
        el("kelasSiswa").value =
            siswa.kelas || "";
    }

    if (el("sppSiswa")) {
        el("sppSiswa").value =
            siswa.spp || "";
    }

    if (el("statusSiswa")) {
        el("statusSiswa").value =
            siswa.status || "Aktif";
    }


    if (el("judulFormSiswa")) {
        el("judulFormSiswa").textContent =
            "Edit Data Siswa";
    }

    if (el("tombolSimpanSiswa")) {
        el("tombolSimpanSiswa").textContent =
            "Update Data";
    }


    if (el("formSiswa")) {
        el("formSiswa").style.display =
            "block";

        el("formSiswa").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


// ======================================================
// HAPUS SISWA
// ======================================================

function hapusSiswa(index) {

    const siswa =
        dataSiswa[index];

    if (!siswa) {
        return;
    }


    const yakin =
        confirm(
            "Hapus data siswa " +
            siswa.nama +
            "?"
        );


    if (!yakin) {
        return;
    }


    dataSiswa.splice(
        index,
        1
    );


    simpanData();

    updateSemuaData();

    alert(
        "Data siswa berhasil dihapus."
    );
}


// ======================================================
// DATA AWAL 20 SISWA
// ======================================================

function masukkanDataAwal() {

    const yakin =
        confirm(
            "Masukkan 20 data siswa awal?\n\n" +
            "Data yang sudah ada tidak akan dihapus."
        );


    if (!yakin) {
        return;
    }


    const dataAwal = [

        ["001", "BILFAQIH", 250000],
        ["002", "ADEEVA", 250000],
        ["003", "JUNA", 250000],
        ["004", "AHNAF", 250000],
        ["005", "AURELIA", 100000],
        ["006", "DEWI", 250000],
        ["007", "ZAFIRA", 300000],
        ["008", "RIDHO", 250000],
        ["009", "AINA", 600000],
        ["010", "SYAFA", 100000],
        ["011", "HAQQIE", 700000],
        ["012", "JOHAN", 50000],
        ["013", "DAFFA", 250000],
        ["014", "FARIS", 250000],
        ["015", "BIANDRA", 300000],
        ["016", "ZAVIER", 250000],
        ["017", "ISHAQ", 250000],
        ["018", "REIFAN", 250000],
        ["019", "AZZA", 250000],
        ["020", "ARTA", 250000]

    ];


    let jumlah =
        0;


    dataAwal.forEach(function(item) {

        const sudahAda =
            dataSiswa.some(
                function(siswa) {

                    return String(siswa.nis) ===
                        String(item[0]);

                }
            );


        if (!sudahAda) {

            dataSiswa.push({

                nis: item[0],

                nama: item[1],

                program: "Paket A",

                kelas: "-",

                spp: item[2],

                status: "Aktif"

            });


            jumlah++;
        }
    });


    simpanData();

    updateSemuaData();


    alert(
        jumlah +
        " data siswa berhasil ditambahkan."
    );
}


// ======================================================
// TAMPILKAN DATA SISWA + PENCARIAN
// ======================================================

function tampilkanDataSiswa() {

    const tabel =
        el("tabelSiswa");

    const pesan =
        el("pesanSiswa");

    if (
        !tabel ||
        !pesan
    ) {
        return;
    }


    const pencarian =
        el("pencarianSiswa");


    const filterStatus =
        el("filterStatusSiswa");


    const kata =
        pencarian
            ? pencarian.value
                .trim()
                .toLowerCase()
            : "";


    const statusFilter =
        filterStatus
            ? filterStatus.value
            : "Semua";


    const hasil =
        dataSiswa.filter(
            function(siswa) {

                const nama =
                    String(
                        siswa.nama || ""
                    ).toLowerCase();


                const nis =
                    String(
                        siswa.nis || ""
                    ).toLowerCase();


                const cocokCari =
                    nama.includes(kata) ||
                    nis.includes(kata);


                const cocokStatus =
                    statusFilter ===
                        "Semua" ||
                    siswa.status ===
                        statusFilter;


                return (
                    cocokCari &&
                    cocokStatus
                );
            }
        );


    tabel.innerHTML = "";


    if (
        hasil.length === 0
    ) {

        pesan.style.display =
            "block";


        pesan.textContent =
            dataSiswa.length === 0
                ? "Belum ada data siswa."
                : "Data siswa tidak ditemukan.";


        return;
    }


    pesan.style.display =
        "none";


    hasil.forEach(
        function(siswa) {

            const indexAsli =
                dataSiswa.indexOf(
                    siswa
                );


            const baris =
                tabel.insertRow();


            const statusClass =
                siswa.status ===
                    "Aktif"
                    ? ""
                    : "tidak-aktif";


            baris.innerHTML = `

                <td>
                    ${indexAsli + 1}
                </td>

                <td>
                    ${siswa.nis}
                </td>

                <td>
                    ${siswa.nama}
                </td>

                <td>
                    ${siswa.program}
                </td>

                <td>
                    ${siswa.kelas}
                </td>

                <td>
                    ${formatRupiah(
                        siswa.spp
                    )}
                </td>

                <td>

                    <span
                        class="status ${statusClass}">

                        ${siswa.status}

                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="tombol-edit"
                        onclick="editSiswa(${indexAsli})">

                        🖉 Edit

                    </button>


                    <button
                        type="button"
                        class="tombol-hapus"
                        onclick="hapusSiswa(${indexAsli})">

                        🗑 Hapus

                    </button>

                </td>

            `;
        }
    );
}


// ======================================================
// DROPDOWN SISWA
// ======================================================

function perbaruiDropdownSiswa() {

    const dropdown =
        el("pembayaranSiswa");


    if (!dropdown) {
        return;
    }


    const nilaiLama =
        dropdown.value;


    dropdown.innerHTML = `

        <option value="">
            Pilih Nama Siswa
        </option>

    `;


    dataSiswa.forEach(
        function(siswa) {

            if (
                siswa.status ===
                "Aktif"
            ) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    siswa.nama;


                option.textContent =
                    siswa.nama;


                dropdown.appendChild(
                    option
                );
            }
        }
    );


    const masihAda =
        Array.from(
            dropdown.options
        ).some(
            function(option) {

                return (
                    option.value ===
                    nilaiLama
                );
            }
        );


    if (masihAda) {

        dropdown.value =
            nilaiLama;
    }
}


// ======================================================
// GET BULAN TAGIHAN
// ======================================================

function getBulanTagihan(
    pembayaran
) {

    if (
        pembayaran.bulanTagihan
    ) {

        return pembayaran.bulanTagihan;
    }


    if (
        pembayaran.tanggal
    ) {

        return pembayaran.tanggal.substring(
            0,
            7
        );
    }


    return "";
}


// ======================================================
// HITUNG SPP SISWA
// ======================================================

function hitungSPPSiswa(
    namaSiswa,
    bulan
) {

    return dataPembayaran
        .filter(
            function(pembayaran) {

                return (
                    pembayaran.siswa ===
                        namaSiswa &&

                    pembayaran.jenis ===
                        "SPP" &&

                    getBulanTagihan(
                        pembayaran
                    ) === bulan
                );
            }
        )
        .reduce(
            function(
                total,
                pembayaran
            ) {

                return (
                    total +
                    Number(
                        pembayaran.nominal ||
                        0
                    )
                );

            },
            0
        );
}


// ======================================================
// NOMINAL SPP OTOMATIS
// ======================================================

function updateNominalPembayaran() {

    const siswaSelect =
        el("pembayaranSiswa");


    const jenisSelect =
        el("jenisPembayaran");


    const nominalInput =
        el("nominalPembayaran");


    const bulanInput =
        el("bulanTagihan");


    const info =
        el("infoNominalSPP");


    if (
        !siswaSelect ||
        !jenisSelect ||
        !nominalInput
    ) {
        return;
    }


    const nama =
        siswaSelect.value;


    const jenis =
        jenisSelect.value;


    const bulan =
        bulanInput
            ? bulanInput.value
            : "";


    if (
        nama === ""
    ) {

        nominalInput.value =
            "";


        if (info) {

            info.textContent =
                "Pilih siswa terlebih dahulu.";

            info.style.color =
                "#64748b";
        }


        return;
    }


    if (
        jenis !== "SPP"
    ) {

        nominalInput.value =
            "";


        if (info) {

            info.textContent =
                "Masukkan nominal pembayaran secara manual.";

            info.style.color =
                "#64748b";
        }


        return;
    }


    const siswa =
        dataSiswa.find(
            function(item) {

                return item.nama === nama;

            }
        );


    if (!siswa) {
        return;
    }


    const tagihan =
        Number(
            siswa.spp || 0
        );


    const sudahBayar =
        bulan
            ? hitungSPPSiswa(
                nama,
                bulan
            )
            : 0;


    const sisa =
        Math.max(
            tagihan -
            sudahBayar,
            0
        );


    nominalInput.value =
        sisa;


    if (info) {

        if (
            !bulan
        ) {

            info.textContent =
                "Pilih bulan tagihan SPP.";

            info.style.color =
                "#64748b";
        }

        else if (
            sisa <= 0
        ) {

            info.textContent =
                "SPP " +
                formatBulan(bulan) +
                " sudah LUNAS.";

            info.style.color =
                "#15803d";
        }

        else if (
            sudahBayar > 0
        ) {

            info.textContent =
                "Sudah dibayar " +
                formatRupiah(
                    sudahBayar
                ) +
                ". Sisa " +
                formatRupiah(
                    sisa
                );

            info.style.color =
                "#d97706";
        }

        else {

            info.textContent =
                "Tagihan " +
                formatBulan(bulan) +
                ": " +
                formatRupiah(tagihan);

            info.style.color =
                "#64748b";
        }
    }
}


// ======================================================
// SIMPAN PEMBAYARAN
// ======================================================

function simpanPembayaran() {

    const siswa =
        el("pembayaranSiswa")
            ? el("pembayaranSiswa").value
            : "";


    const jenis =
        el("jenisPembayaran")
            ? el("jenisPembayaran").value
            : "";


    const tanggal =
        el("tanggalPembayaran")
            ? el("tanggalPembayaran").value
            : "";


    const nominal =
        el("nominalPembayaran")
            ? Number(
                el("nominalPembayaran").value
            )
            : 0;


    const bulanTagihan =
        el("bulanTagihan")
            ? el("bulanTagihan").value
            : "";


    const keterangan =
        el("keteranganPembayaran")
            ? el("keteranganPembayaran")
                .value
                .trim()
            : "";


    if (
        !siswa ||
        !jenis ||
        !tanggal ||
        !nominal
    ) {

        alert(
            "Silakan lengkapi data pembayaran."
        );

        return;
    }


    if (
        nominal <= 0
    ) {

        alert(
            "Nominal pembayaran harus lebih dari 0."
        );

        return;
    }


    // ==================================================
    // VALIDASI SPP
    // ==================================================

    if (
        jenis === "SPP"
    ) {

        if (
            !bulanTagihan
        ) {

            alert(
                "Silakan pilih bulan tagihan SPP."
            );

            return;
        }


        const siswaData =
            dataSiswa.find(
                function(item) {

                    return (
                        item.nama ===
                        siswa
                    );
                }
            );


        if (!siswaData) {

            alert(
                "Data siswa tidak ditemukan."
            );

            return;
        }


        const tagihan =
            Number(
                siswaData.spp || 0
            );


        const sudahBayar =
            hitungSPPSiswa(
                siswa,
                bulanTagihan
            );


        const sisa =
            Math.max(
                tagihan -
                sudahBayar,
                0
            );


        if (
            sisa <= 0
        ) {

            alert(
                "SPP " +
                formatBulan(
                    bulanTagihan
                ) +
                " sudah lunas."
            );

            return;
        }


        if (
            nominal > sisa
        ) {

            alert(
                "Pembayaran melebihi sisa tagihan.\n\n" +
                "Sisa SPP: " +
                formatRupiah(
                    sisa
                )
            );

            return;
        }
    }


    // ==================================================
    // SIMPAN
    // ==================================================

    dataPembayaran.push({

        siswa:
            siswa,

        jenis:
            jenis,

        tanggal:
            tanggal,

        bulanTagihan:
            jenis === "SPP"
                ? bulanTagihan
                : "",

        nominal:
            nominal,

        keterangan:
            keterangan
    });


    simpanData();

    resetPembayaran();

    updateSemuaData();


    alert(
        "Pembayaran berhasil disimpan."
    );
}


// ======================================================
// RESET PEMBAYARAN
// ======================================================

function resetPembayaran() {

    if (el("pembayaranSiswa")) {
        el("pembayaranSiswa").value =
            "";
    }

    if (el("jenisPembayaran")) {
        el("jenisPembayaran").value =
            "";
    }

    if (el("nominalPembayaran")) {
        el("nominalPembayaran").value =
            "";
    }

    if (el("keteranganPembayaran")) {
        el("keteranganPembayaran").value =
            "";
    }


    if (el("infoNominalSPP")) {

        el("infoNominalSPP").textContent =
            "Nominal akan terisi otomatis untuk pembayaran SPP.";

        el("infoNominalSPP").style.color =
            "#64748b";
    }


    setTanggalDefault();
}


// ======================================================
// TANGGAL DEFAULT
// ======================================================

function setTanggalDefault() {

    const sekarang =
        new Date();


    const tahun =
        sekarang.getFullYear();


    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const tanggal =
        String(
            sekarang.getDate()
        ).padStart(
            2,
            "0"
        );


    const tanggalSekarang =
        tahun +
        "-" +
        bulan +
        "-" +
        tanggal;


    const bulanSekarang =
        tahun +
        "-" +
        bulan;


    if (
        el("tanggalPembayaran") &&
        !el("tanggalPembayaran").value
    ) {

        el("tanggalPembayaran").value =
            tanggalSekarang;
    }


    if (
        el("bulanTagihan") &&
        !el("bulanTagihan").value
    ) {

        el("bulanTagihan").value =
            bulanSekarang;
    }
}


// ======================================================
// REKAP SPP BULANAN + FILTER
// ======================================================

function tampilkanRekapSPP() {

    const tabel =
        el("tabelRekapSPP");


    const pesan =
        el("pesanRekapSPP");


    const inputBulan =
        el("bulanRekap");


    const filterStatus =
        el("filterStatusSPP");


    if (
        !tabel ||
        !pesan ||
        !inputBulan
    ) {
        return;
    }


    const bulan =
        inputBulan.value;


    const statusDipilih =
        filterStatus
            ? filterStatus.value
            : "Semua";


    tabel.innerHTML =
        "";


    if (
        !bulan
    ) {

        pesan.style.display =
            "block";


        pesan.textContent =
            "Silakan pilih bulan SPP.";


        resetRingkasanSPP();


        return;
    }


    const siswaAktif =
        dataSiswa.filter(
            function(siswa) {

                return (
                    siswa.status ===
                    "Aktif"
                );
            }
        );


    if (
        siswaAktif.length === 0
    ) {

        pesan.style.display =
            "block";


        pesan.textContent =
            "Belum ada data siswa aktif.";


        resetRingkasanSPP();


        return;
    }


    const dataRekap =
        siswaAktif.map(
            function(siswa) {

                const tagihan =
                    Number(
                        siswa.spp || 0
                    );


                const terbayar =
                    hitungSPPSiswa(
                        siswa.nama,
                        bulan
                    );


                const sisa =
                    Math.max(
                        tagihan -
                        terbayar,
                        0
                    );


                let status;


                if (
                    terbayar >= tagihan
                ) {

                    status =
                        "Lunas";

                } else if (
                    terbayar === 0
                ) {

                    status =
                        "Belum Bayar";

                } else {

                    status =
                        "Belum Lunas";
                }


                return {

                    siswa:
                        siswa,

                    tagihan:
                        tagihan,

                    terbayar:
                        terbayar,

                    sisa:
                        sisa,

                    status:
                        status
                };
            }
        );


    const hasil =
        statusDipilih === "Semua"
            ? dataRekap
            : dataRekap.filter(
                function(item) {

                    return (
                        item.status ===
                        statusDipilih
                    );
                }
            );


    if (
        hasil.length === 0
    ) {

        pesan.style.display =
            "block";


        pesan.textContent =
            "Tidak ada siswa dengan status " +
            statusDipilih +
            ".";


        resetRingkasanSPP();


        return;
    }


    pesan.style.display =
        "none";


    let totalTagihan =
        0;


    let totalTerbayar =
        0;


    let totalSisa =
        0;


    let jumlahBelumBayar =
        0;


    hasil.forEach(
        function(
            item,
            index
        ) {

            totalTagihan +=
                item.tagihan;


            totalTerbayar +=
                item.terbayar;


            totalSisa +=
                item.sisa;


            if (
                item.status ===
                "Belum Bayar"
            ) {

                jumlahBelumBayar++;
            }


            let statusClass =
                "";


            if (
                item.status ===
                "Lunas"
            ) {

                statusClass =
                    "lunas";

            } else if (
                item.status ===
                "Belum Bayar"
            ) {

                statusClass =
                    "belum-bayar";

            } else {

                statusClass =
                    "belum-lunas";
            }


            const baris =
                tabel.insertRow();


            baris.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${item.siswa.nis}
                </td>

                <td>
                    ${item.siswa.nama}
                </td>

                <td>
                    ${formatRupiah(
                        item.tagihan
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        item.terbayar
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        item.sisa
                    )}
                </td>

                <td>

                    <span
                        class="status ${statusClass}">

                        ${item.status}

                    </span>

                </td>
            `;
        }
    );


    if (el("totalTagihanSPP")) {

        el("totalTagihanSPP").textContent =
            formatRupiah(
                totalTagihan
            );
    }


    if (el("totalTerbayarSPP")) {

        el("totalTerbayarSPP").textContent =
            formatRupiah(
                totalTerbayar
            );
    }


    if (el("totalSisaSPP")) {

        el("totalSisaSPP").textContent =
            formatRupiah(
                totalSisa
            );
    }


    if (el("jumlahBelumBayarSPP")) {

        el("jumlahBelumBayarSPP").textContent =
            jumlahBelumBayar;
    }
}


// ======================================================
// RESET RINGKASAN SPP
// ======================================================

function resetRingkasanSPP() {

    if (el("totalTagihanSPP")) {
        el("totalTagihanSPP").textContent =
            "Rp0";
    }

    if (el("totalTerbayarSPP")) {
        el("totalTerbayarSPP").textContent =
            "Rp0";
    }

    if (el("totalSisaSPP")) {
        el("totalSisaSPP").textContent =
            "Rp0";
    }

    if (el("jumlahBelumBayarSPP")) {
        el("jumlahBelumBayarSPP").textContent =
            "0";
    }
}


// ======================================================
// REKAP SELURUH TRANSAKSI
// ======================================================

function tampilkanRekapPembayaran() {

    const tabel =
        el("tabelPembayaran");


    const pesan =
        el("pesanRekap");


    if (
        !tabel
    ) {
        return;
    }


    tabel.innerHTML =
        "";


    if (
        dataPembayaran.length === 0
    ) {

        if (pesan) {
            pesan.style.display =
                "block";
        }

        return;
    }


    if (pesan) {
        pesan.style.display =
            "none";
    }


    dataPembayaran.forEach(
        function(
            pembayaran,
            index
        ) {

            const baris =
                tabel.insertRow();


            let bulan =
                "";


            if (
                pembayaran.jenis ===
                    "SPP"
            ) {

                bulan =
                    getBulanTagihan(
                        pembayaran
                    );
            }


            baris.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${formatTanggal(
                        pembayaran.tanggal
                    )}
                </td>

                <td>
                    ${pembayaran.siswa}
                </td>

                <td>

                    ${pembayaran.jenis}

                    ${
                        bulan
                            ? "<br><small>" +
                              formatBulan(
                                  bulan
                              ) +
                              "</small>"
                            : ""
                    }

                </td>

                <td>
                    ${formatRupiah(
                        pembayaran.nominal
                    )}
                </td>

                <td>
                    ${pembayaran.keterangan || "-"}
                </td>

                <td>

                    <button
                        type="button"
                        class="tombol-hapus"
                        onclick="hapusPembayaran(${index})">

                        🗑 Hapus

                    </button>

                </td>

            `;
        }
    );


    updateRingkasanRekap();
}


// ======================================================
// HAPUS PEMBAYARAN
// ======================================================

function hapusPembayaran(index) {

    const pembayaran =
        dataPembayaran[index];


    if (!pembayaran) {
        return;
    }


    const yakin =
        confirm(
            "Hapus transaksi pembayaran " +
            pembayaran.siswa +
            " sebesar " +
            formatRupiah(
                pembayaran.nominal
            ) +
            "?"
        );


    if (!yakin) {
        return;
    }


    dataPembayaran.splice(
        index,
        1
    );


    simpanData();

    updateSemuaData();


    alert(
        "Transaksi berhasil dihapus."
    );
}


// ======================================================
// RINGKASAN TRANSAKSI
// ======================================================

function updateRingkasanRekap() {

    const total =
        dataPembayaran.reduce(
            function(
                hasil,
                pembayaran
            ) {

                return (
                    hasil +
                    Number(
                        pembayaran.nominal ||
                        0
                    )
                );

            },
            0
        );


    if (el("totalTransaksiRekap")) {

        el("totalTransaksiRekap").textContent =
            dataPembayaran.length;
    }


    if (el("totalPembayaranRekap")) {

        el("totalPembayaranRekap").textContent =
            formatRupiah(
                total
            );
    }
}


// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard() {

    const jumlah =
        el("jumlahSiswaDashboard");


    if (jumlah) {

        jumlah.textContent =
            dataSiswa.length;
    }


    const sekarang =
        new Date();


    const tahun =
        sekarang.getFullYear();


    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const tanggal =
        String(
            sekarang.getDate()
        ).padStart(
            2,
            "0"
        );


    const hariIni =
        tahun +
        "-" +
        bulan +
        "-" +
        tanggal;


    const totalHariIni =
        dataPembayaran
            .filter(
                function(pembayaran) {

                    return (
                        pembayaran.tanggal ===
                        hariIni
                    );
                }
            )
            .reduce(
                function(
                    hasil,
                    pembayaran
                ) {

                    return (
                        hasil +
                        Number(
                            pembayaran.nominal ||
                            0
                        )
                    );

                },
                0
            );


    if (
        el("pembayaranHariIni")
    ) {

        el("pembayaranHariIni").textContent =
            formatRupiah(
                totalHariIni
            );
    }


    const totalBulanIni =
        dataPembayaran
            .filter(
                function(pembayaran) {

                    return (
                        pembayaran.tanggal &&
                        pembayaran.tanggal.startsWith(
                            tahun +
                            "-" +
                            bulan
                        )
                    );
                }
            )
            .reduce(
                function(
                    hasil,
                    pembayaran
                ) {

                    return (
                        hasil +
                        Number(
                            pembayaran.nominal ||
                            0
                        )
                    );

                },
                0
            );


    if (
        el("pembayaranBulanIni")
    ) {

        el("pembayaranBulanIni").textContent =
            formatRupiah(
                totalBulanIni
            );
    }


    if (
        el("jumlahTransaksi")
    ) {

        el("jumlahTransaksi").textContent =
            dataPembayaran.length;
    }


    tampilkanPembayaranTerbaru();
}


// ======================================================
// PEMBAYARAN TERBARU
// ======================================================

function tampilkanPembayaranTerbaru() {

    const tabel =
        el("tabelPembayaranTerbaru");


    const pesan =
        el("pesanPembayaranTerbaru");


    if (
        !tabel
    ) {
        return;
    }


    tabel.innerHTML =
        "";


    if (
        dataPembayaran.length === 0
    ) {

        if (pesan) {
            pesan.style.display =
                "block";
        }

        return;
    }


    if (pesan) {
        pesan.style.display =
            "none";
    }


    const terbaru =
        [...dataPembayaran]
            .reverse()
            .slice(
                0,
                5
            );


    terbaru.forEach(
        function(
            pembayaran,
            index
        ) {

            const baris =
                tabel.insertRow();


            baris.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${formatTanggal(
                        pembayaran.tanggal
                    )}
                </td>

                <td>
                    ${pembayaran.siswa}
                </td>

                <td>
                    ${pembayaran.jenis}
                </td>

                <td>
                    ${formatRupiah(
                        pembayaran.nominal
                    )}
                </td>

            `;
        }
    );
}


// ======================================================
// LAPORAN
// ======================================================

function updateLaporan() {

    if (
        el("jumlahSiswaLaporan")
    ) {

        el("jumlahSiswaLaporan").textContent =
            dataSiswa.length;
    }


    if (
        el("transaksiLaporan")
    ) {

        el("transaksiLaporan").textContent =
            dataPembayaran.length;
    }


    const pemasukan =
        dataPembayaran.reduce(
            function(
                hasil,
                pembayaran
            ) {

                return (
                    hasil +
                    Number(
                        pembayaran.nominal ||
                        0
                    )
                );

            },
            0
        );


    if (
        el("pemasukanLaporan")
    ) {

        el("pemasukanLaporan").textContent =
            formatRupiah(
                pemasukan
            );
    }
}


// ======================================================
// BACKUP DATA
// ======================================================

function backupData() {

    const dataBackup = {

        versi:
            "1.0",

        tanggalBackup:
            new Date().toISOString(),

        dataSiswa:
            dataSiswa,

        dataPembayaran:
            dataPembayaran

    };


    const isiFile =
        JSON.stringify(
            dataBackup,
            null,
            2
        );


    const blob =
        new Blob(
            [isiFile],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    const sekarang =
        new Date();


    const tahun =
        sekarang.getFullYear();


    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const tanggal =
        String(
            sekarang.getDate()
        ).padStart(
            2,
            "0"
        );


    link.href =
        url;


    link.download =
        "backup-spp-" +
        tahun +
        "-" +
        bulan +
        "-" +
        tanggal +
        ".json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    alert(
        "Backup data berhasil dibuat."
    );
}


// ======================================================
// RESTORE DATA
// ======================================================

function restoreData(event) {

    const input =
        event.target;


    const file =
        input.files &&
        input.files[0];


    if (!file) {
        return;
    }


    const yakin =
        confirm(
            "Restore data dari file ini?\n\n" +
            "Data siswa dan pembayaran saat ini " +
            "akan digantikan oleh data dari backup."
        );


    if (!yakin) {

        input.value =
            "";

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            try {

                const hasil =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !hasil ||
                    !Array.isArray(
                        hasil.dataSiswa
                    ) ||
                    !Array.isArray(
                        hasil.dataPembayaran
                    )
                ) {

                    alert(
                        "File backup tidak valid."
                    );

                    input.value =
                        "";

                    return;
                }


                dataSiswa =
                    hasil.dataSiswa;


                dataPembayaran =
                    hasil.dataPembayaran;


                simpanData();


                updateSemuaData();


                alert(
                    "Restore berhasil.\n\n" +
                    "Jumlah siswa: " +
                    dataSiswa.length +
                    "\n" +
                    "Jumlah transaksi: " +
                    dataPembayaran.length
                );


            } catch (error) {

                alert(
                    "File backup tidak dapat dibaca."
                );

            }


            input.value =
                "";
        };


    reader.readAsText(
        file
    );
}


// ======================================================
// CETAK REKAP SPP
// ======================================================

function cetakRekapSPP() {

    const bulanInput =
        el("bulanRekap");


    const tabel =
        el("tabelRekapSPP");


    if (
        !bulanInput ||
        !bulanInput.value
    ) {

        alert(
            "Silakan pilih bulan terlebih dahulu."
        );

        return;
    }


    if (!tabel) {

        alert(
            "Tabel rekap tidak ditemukan."
        );

        return;
    }


    const bulan =
        bulanInput.value;


    const namaBulan =
        formatBulan(
            bulan
        );


    const totalTagihan =
        el("totalTagihanSPP")
            ? el("totalTagihanSPP").textContent
            : "Rp0";


    const totalTerbayar =
        el("totalTerbayarSPP")
            ? el("totalTerbayarSPP").textContent
            : "Rp0";


    const totalSisa =
        el("totalSisaSPP")
            ? el("totalSisaSPP").textContent
            : "Rp0";


    const jumlahBelumBayar =
        el("jumlahBelumBayarSPP")
            ? el("jumlahBelumBayarSPP").textContent
            : "0";


    const filterStatus =
        el("filterStatusSPP");


    const namaFilter =
        filterStatus
            ? filterStatus.value
            : "Semua";


    const jendela =
        window.open(
            "",
            "_blank",
            "width=1200,height=800"
        );


    if (!jendela) {

        alert(
            "Jendela cetak diblokir browser. Izinkan pop-up untuk aplikasi ini."
        );

        return;
    }


    jendela.document.write(`

        <!DOCTYPE html>

        <html lang="id">

        <head>

            <meta charset="UTF-8">

            <title>
                Rekap SPP ${namaBulan}
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {

                    font-family:
                        Arial,
                        sans-serif;

                    color: #222;

                    padding: 30px;

                }

                h1 {

                    text-align:
                        center;

                    margin-bottom:
                        5px;

                }

                .periode {

                    text-align:
                        center;

                    color:
                        #555;

                    margin-bottom:
                        5px;

                }

                .filter {

                    text-align:
                        center;

                    color:
                        #777;

                    font-size:
                        13px;

                    margin-bottom:
                        25px;

                }

                .ringkasan {

                    display:
                        grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap:
                        12px;

                    margin-bottom:
                        25px;

                }

                .box {

                    border:
                        1px solid #ddd;

                    padding:
                        15px;

                    border-radius:
                        8px;

                }

                .box span {

                    display:
                        block;

                    color:
                        #666;

                    font-size:
                        12px;

                    margin-bottom:
                        7px;

                }

                .box strong {

                    font-size:
                        16px;

                }

                table {

                    width:
                        100%;

                    border-collapse:
                        collapse;

                }

                th,
                td {

                    border:
                        1px solid #ccc;

                    padding:
                        8px;

                    text-align:
                        left;

                    font-size:
                        12px;

                }

                th {

                    background:
                        #f1f5f9;

                }

                .status {

                    font-weight:
                        bold;

                }

                .lunas {

                    color:
                        #15803d;

                }

                .belum-bayar {

                    color:
                        #dc2626;

                }

                .belum-lunas {

                    color:
                        #d97706;

                }

                .ttd {

                    margin-top:
                        60px;

                    display:
                        flex;

                    justify-content:
                        flex-end;

                }

                .ttd-box {

                    width:
                        220px;

                    text-align:
                        center;

                }

                @media print {

                    body {
                        padding:
                            10px;
                    }

                }

            </style>

        </head>

        <body>

            <h1>
                REKAP PEMBAYARAN SPP
            </h1>

            <div class="periode">
                Periode: ${namaBulan}
            </div>

            <div class="filter">
                Filter: ${namaFilter}
            </div>

            <div class="ringkasan">

                <div class="box">

                    <span>
                        Total Tagihan
                    </span>

                    <strong>
                        ${totalTagihan}
                    </strong>

                </div>

                <div class="box">

                    <span>
                        Sudah Dibayar
                    </span>

                    <strong>
                        ${totalTerbayar}
                    </strong>

                </div>

                <div class="box">

                    <span>
                        Sisa Tagihan
                    </span>

                    <strong>
                        ${totalSisa}
                    </strong>

                </div>

                <div class="box">

                    <span>
                        Siswa Belum Bayar
                    </span>

                    <strong>
                        ${jumlahBelumBayar}
                    </strong>

                </div>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>No</th>
                        <th>NIS</th>
                        <th>Nama Siswa</th>
                        <th>SPP/Bulan</th>
                        <th>Terbayar</th>
                        <th>Sisa</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${tabel.innerHTML}

                </tbody>

            </table>

            <div class="ttd">

                <div class="ttd-box">

                    <p>
                        Mengetahui,
                    </p>

                    <br><br><br>

                    <strong>
                        Admin
                    </strong>

                </div>

            </div>

            <script>

                window.onload =
                    function() {

                        window.print();

                    };

            <\/script>

        </body>

        </html>

    `);


    jendela.document.close();
}


// ======================================================
// UPDATE SEMUA DATA
// ======================================================

function updateSemuaData() {

    tampilkanDataSiswa();

    perbaruiDropdownSiswa();

    tampilkanRekapPembayaran();

    tampilkanRekapSPP();

    updateDashboard();

    updateLaporan();
}


// ======================================================
// SAAT APLIKASI DIBUKA
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Tanggal hari ini
        setTanggalDefault();


        // Bulan rekap = bulan sekarang
        if (
            el("bulanRekap") &&
            !el("bulanRekap").value
        ) {

            const sekarang =
                new Date();


            const tahun =
                sekarang.getFullYear();


            const bulan =
                String(
                    sekarang.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                );


            el("bulanRekap").value =
                tahun +
                "-" +
                bulan;
        }


        // Filter default
        if (
            el("filterStatusSiswa")
        ) {

            el("filterStatusSiswa").value =
                "Semua";
        }


        if (
            el("filterStatusSPP")
        ) {

            el("filterStatusSPP").value =
                "Semua";
        }


        // Tampilkan dashboard
        tampilkanHalaman(
            "dashboard"
        );

    }
);
s