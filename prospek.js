$(document).ready(function () {
    // Function to load prospek data
    function loadProspek() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek',
            method: 'GET',
            success: function (data) {
                $('#prospekTableBody').empty();
                data.forEach(function (prospek) {
                    $('#prospekTableBody').append(`
                        <tr>
                            <td>${prospek.id}</td>
                            <td>${prospek.nama}</td>
                            <td>${prospek.telp}</td>
                            <td>${prospek.status}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${prospek.id}" data-toggle="modal" data-target="#editProspekModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${prospek.id}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    // Load prospek data on page load
    loadProspek();

    // Handle create prospek form submission
    $('#createProspekForm').submit(function (event) {
        event.preventDefault();
        const prospekData = {
            nama: $('#createNama').val(),
            telp: $('#createTelp').val(),
            status: 'prospek',
        };
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(prospekData),
            success: function () {
                $('#createProspekModal').modal('hide');
                loadProspek();
            }
        });
    });

    // Handle edit prospek button click
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek/${id}`,
            method: 'GET',
            success: function (prospek) {
                console.log("nama : " + prospek[0].nama);
                $('#editId').val(prospek[0].id);
                $('#editNama').val(prospek[0].nama);
                $('#editTelp').val(prospek[0].telp);
                $('#editStatus').val(prospek[0].status);
            }
        });
    });

    // Handle edit prospek form submission
    $('#editProspekForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editId').val();
        const prospekData = {
            nama: $('#editNama').val(),
            telp: $('#editTelp').val(),
            status: $('#editStatus').val()
        };
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(prospekData),
            success: function () {
                $('#editProspekModal').modal('hide');
                loadProspek();
            }
        });
    });

    // Handle delete prospek button click
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/prospek/${id}`,
            method: 'DELETE',
            success: function () {
                loadProspek();
            }
        });
    });
});
