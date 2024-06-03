$(document).ready(function () {
    // Function to load customer data
    function loadCustomer() {
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/customer',
            method: 'GET',
            success: function (data) {
                $('#customerTableBody').empty();
                let no = 0;
                data.forEach(function (customer) {
                    $('#customerTableBody').append(`
                        <tr>
                            <td>${no + 1}</td>
                            <td>${customer.nama}</td>
                            <td>${customer.telp}</td>
                            <td>${customer.alamat}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${customer.id}" data-toggle="modal" data-target="#editCustomerModal">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${customer.id}">Delete</button>
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
                    if (prospek.status === 'prospek') {
                        $('#createNama').append(`
                            <option value="${prospek.id}">${prospek.nama}</option>
                        `);
                    }
                });
            }
        });
    }

    $('#createCustomerModal').on('show.bs.modal', function () {
        loadProspekOptions();
    });

    // Load customer data on page load
    loadCustomer();

    // Handle create customer form submission
    $('#createCustomerForm').submit(function (event) {
        event.preventDefault();
        loadProspekOptions();
        const customerData = {
            nama: $('#createNama').val(),
            telp: $('#createTelepon').val(),
            alamat: $('#createAlamat').val()
        };
        $.ajax({
            url: 'https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/customer',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(customerData),
            success: function () {
                $('#createCustomerModal').modal('hide');
                loadCustomer();
            }
        });
    });

    // Handle edit customer button click
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        console.log(id);
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/customer/${id}`,
            method: 'GET',
            success: function (customer) {
                $('#editCustomerId').val(customer.id);
                $('#editNama').val(customer[0].nama);
                $('#editTelepon').val(customer[0].telp);
                $('#editAlamat').val(customer[0].alamat);
            }
        });
    });

    // Handle edit customer form submission
    $('#editCustomerForm').submit(function (event) {
        event.preventDefault();
        const id = $('#editCustomerId').val();
        console.log(id);
        const customerData = {
            nama: $('#editNama').val(),
            telp: $('#editTelepon').val(),
            alamat: $('#editAlamat').val()
        };
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/customer/5`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(customerData),
            success: function () {
                $('#editCustomerModal').modal('hide');
                loadCustomer();
            }
        });
    });

    // Handle delete customer button click
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/customer/${id}`,
            method: 'DELETE',
            success: function () {
                loadCustomer();
            }
        });
    });
});
