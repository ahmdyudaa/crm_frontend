$(document).ready(function () {
    // Function to load produk data
    function loadproduk() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk/',
            method: 'GET',
            success: function (data) {
                $('#produkTableBody').empty();
                data.forEach(function (produk) {
                    $('#produkTableBody').append(`
                        <tr>
                            <td>${produk.id_produk}</td>
                            <td>${produk.nama_produk}</td>
                            <td>${produk.kategori}</td>
                            <td>${produk.harga}</td>
                            <td>${produk.stok}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${produk.id_produk}" data-toggle="modal" data-target="#editProdukModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${produk.id_produk}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    // Load produk data on page load
    loadproduk();

    // Handle create produk form submission
    $('#createProdukForm').submit(function (event) {
        event.preventDefault();
        const produkData = {
            nama_produk: $('#createNamaProduk').val(),
            kategori: $('#createKategori').val(),
            harga: $('#createHarga').val(),
            stok: $('#createStok').val()
        };
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(produkData),
            success: function () {
                $('#createProdukModal').modal('hide');
                loadproduk();
            }
        });
    });

    // Handle edit produk button click
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk/${id}`,
            method: 'GET',
            success: function (produk) {
                $('#editProdukId').val(produk[0].id_produk);
                $('#editNamaProduk').val(produk[0].nama_produk);
                $('#editKategori').val(produk[0].kategori);
                $('#editHarga').val(produk[0].harga);
                $('#editStok').val(produk[0].stok);
            }
        });
    });

    // Handle edit produk form submission
    $('#editProdukForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editProdukId').val();
        const produkData = {
            nama_produk: $('#editNamaProduk').val(),
            kategori: $('#editKategori').val(),
            harga: $('#editHarga').val(),
            stok: $('#editStok').val()
        };
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(produkData),
            success: function () {
                $('#editProdukModal').modal('hide');
                loadproduk();
            }
        });
    });

    // Handle delete produk button click
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/produk/${id}`,
            method: 'DELETE',
            success: function () {
                loadproduk();
            }
        });
    });
});
