$(document).ready(function () {
    // Function to load penjualan data
    function loadPenjualan() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/penjualan',
            method: 'GET',
            success: function (data) {
                $('#penjualanTableBody').empty();
                data.forEach(function (penjualan) {
                    const totalBayar = penjualan.harga * penjualan.total;
                    $('#penjualanTableBody').append(`
                        <tr>
                            <td>${penjualan.prospek_nama}</td>
                            <td>${penjualan.nama_produk}</td>
                            <td>${penjualan.kategori}</td>
                            <td>${penjualan.harga}</td>
                            <td>${penjualan.total}</td>
                            <td>${totalBayar}</td>
                            <td>${new Date(penjualan.tanggal).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${penjualan.id_penjualan}" data-toggle="modal" data-target="#editPenjualanModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${penjualan.id_penjualan}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    function loadProspekOptions() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek',
            method: 'GET',
            success: function (data) {
                $('#createProspekId').empty();
                data.forEach(function (prospek) {
                    $('#createProspekId').append(`
                        <option value="${prospek.id}">${prospek.nama}</option>
                    `);
                });
            }
        });
    }

    function loadProdukOptions() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk',
            method: 'GET',
            success: function (data) {
                $('#createProdukId').empty();
                data.forEach(function (produk) {
                    $('#createProdukId').append(`
                        <option value="${produk.id_produk}" data-kategori="${produk.kategori}" data-harga="${produk.harga}">${produk.nama_produk}</option>
                    `);
                });
            }
        });
    }

    $('#createPenjualanModal').on('show.bs.modal', function () {
        loadProspekOptions();
        loadProdukOptions();
    });

    // Update kategori and harga fields based on selected produk
    $('#createProdukId').change(function () {
        const selectedOption = $(this).find('option:selected');
        $('#createKategori').val(selectedOption.data('kategori')).prop('disabled', true);
        $('#createHarga').val(selectedOption.data('harga')).prop('disabled', true);
    });

    // Load penjualan data on page load
    loadPenjualan();

    function loadProspekOptionsForEdit(selectedProspekId) {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek',
            method: 'GET',
            success: function (data) {
                $('#editProspekId').empty();
                data.forEach(function (prospek) {
                    const selected = (prospek.id === selectedProspekId) ? 'selected' : '';
                    $('#editProspekId').append(`
                        <option value="${prospek.id}" ${selected}>${prospek.nama}</option>
                    `);
                });
                $('#editProspekId').val(selectedProspekId);
            }
        });
    }

    // Function to load produk options
    function loadProdukOptionsForEdit(selectedProdukId) {
        console.log(selectedProdukId);
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk',
            method: 'GET',
            success: function (data) {
                $('#editProdukId').empty();
                data.forEach(function (produk) {
                    const selected = (produk.id_produk === selectedProdukId) ? 'selected' : '';
                    console.log(selected);
                    $('#editProdukId').append(`
                        <option value="${produk.id_produk}" ${selected}>${produk.nama_produk}</option>
                    `);
                });
                $('#editProdukId').val(selectedProdukId);
            }
        });
    }


    // Handle create penjualan form submission
    $('#createPenjualanForm').submit(function (event) {
        
        event.preventDefault();
        const penjualanData = {
            id_prospek: $('#createProspekId').val(),
            id_produk: $('#createProdukId').val(),
            total: $('#createTotal').val(),
            tanggal:$('#createTanggal').val(),
        };
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/penjualan',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(penjualanData),
            success: function () {
                $('#createPenjualanModal').modal('hide');
                loadPenjualan();
            }
        });
    });

    // Handle edit penjualan button click
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/penjualan/${id}`,
            method: 'GET',
            success: function (penjualan) {
                $('#editIdPenjualan').val(penjualan[0].id_penjualan);
                loadProspekOptionsForEdit(penjualan[0].prospek_id);
                loadProdukOptionsForEdit(penjualan[0].id_produk);
                $('#editKategori').val(penjualan[0].kategori);
                $('#editHarga').val(penjualan[0].harga);
                $('#editTotal').val(penjualan[0].total);
                let responseTanggal = new Date(penjualan.tanggal);
                const formattedDate = `${responseTanggal.getMonth() + 1}/${responseTanggal.getDate()}/${responseTanggal.getFullYear()}`;
                console.log(formattedDate);
                $('#editTanggal').val('10-10-2024');

            }
        });
    });

    // Handle edit penjualan form submission
    $('#editPenjualanForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editIdPenjualan').val();
        const penjualanData = {
            id_prospek:$('#editProspekId').val(),
            id_produk:$('#editProdukId').val(),
            // prospek_nama: $('#editProspekNama').val(),
            // nama_produk: $('#editNamaProduk').val(),
            // kategori: $('#editKategori').val(),
            // harga: $('#editHarga').val(),
            total: $('#editTotal').val(),
            tanggal:$('#editTanggal').val(),
        };
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/penjualan/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(penjualanData),
            success: function () {
                $('#editPenjualanModal').modal('hide');
                loadPenjualan();
            }
        });
    });

    // Handle delete penjualan button click
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/penjualan/${id}`,
            method: 'DELETE',
            success: function () {
                loadPenjualan();
            }
        });
    });
});
