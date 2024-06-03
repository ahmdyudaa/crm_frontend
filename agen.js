$(document).ready(function () {
    // Function to load agen data
    function loadAgen() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/agen',
            method: 'GET',
            success: function (data) {
                $('#agenTableBody').empty();
                let no = 0;
                data.forEach(function (agen) {
                    no++;
                    $('#agenTableBody').append(`
                        <tr>
                            <td>${no}</td>
                            <td>${agen.nama}</td>
                            <td>${agen.telp}</td>
                            <td>${agen.alamat}</td>
                            <td>${agen.nama_agen}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${agen.id}" data-toggle="modal" data-target="#editAgenModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${agen.id}">Delete</button>
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
                $('#createNama').empty();
                data.forEach(function (prospek) {
                    if (prospek.status === 'customer') {
                        $('#createNama').append(`
                            <option value="${prospek.id}">${prospek.nama}</option>
                        `);
                    }
                });
            }
        });
    }

    $('#createAgenModal').on('show.bs.modal', function () {
        loadProspekOptions();
    });

    // Load agen data on page load
    loadAgen();

    // Handle create agen form submission
    $('#createAgenForm').submit(function (event) {
        event.preventDefault();
        loadProspekOptions();
        const agenData = {
            id: $('#createNama').val(),
            nama_agen: $('#createNamaAgen').val()
        };
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/agen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(agenData),
            success: function () {
                $('#createAgenModal').modal('hide');
                loadAgen();
            }
        });
    });

    // Handle edit agen button click
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        console.log("id agen" + id);
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/agen/${id}`,
            method: 'GET',
            success: function (agen) {
                $('#editAgenId').val(agen[0].id);
                $('#editNama').val(agen[0].nama);
                $('#editTelepon').val(agen[0].telp);
                $('#editAlamat').val(agen[0].alamat);
                $('#editNamaAgen').val(agen[0].nama_agen);
            }
        });
    });

    // Handle edit agen form submission
    $('#editAgenForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editAgenId').val();
        console.log("id_agen : " + id);
        const agenData = {
            nama: $('#editNama').val(),
            telp: $('#editTelepon').val(),
            alamat: $('#editAlamat').val(),
            nama_agen:$('#editNamaAgen').val()
        };
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/agen/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(agenData),
            success: function () {
                $('#editAgenModal').modal('hide');
                loadAgen();
            }
        });
    });

    // Handle delete agen button click
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/agen/${id}`,
            method: 'DELETE',
            success: function () {
                loadAgen();
            }
        });
    });
});
