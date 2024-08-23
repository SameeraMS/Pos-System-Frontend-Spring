import CustomerModel from "../model/CutomerModel.js";
import {setCustomerIds} from "./order.js";


initialize()



function initialize() {

    $.ajax({
        url: "http://localhost:8082/customer",
        type: "GET",
        data: {"nextid": "nextid"},
        success: (res) => {
            let code = res.substring(1, res.length - 1);
            $('#customerId').val(code);
        },
        error: (res) => {
            console.error(res);
        }
    });

    setTimeout(() => {
        loadTable();
    },1000)
}



function loadTable() {
    $('#customer_table').empty();

    let customersArray = [];

    $.ajax({
        url: "http://localhost:8082/customer",
        type: "GET",
        data: {"all": "getAll"},
        success: (res) => {
            console.log(res);
            customersArray = JSON.parse(res);
            console.log(customersArray);

            setCustomerIds(customersArray);

            customersArray.map((customer, index) => {

                var record = `<tr>
                    <td class="cus-id-val">${customer.id}</td>
                    <td class="cus-fname-val">${customer.name}</td>
                    <td class="cus-address-val">${customer.address}</td>
                    <td class="cus-contact-val">${customer.contact}</td>
                </tr>`;

                $('#customer_table').append(record);
            });

        },
        error: (res) => {
            console.error(res);
        }
    });

}



$('#customer_submit').on('click', () => {
        var id = $('#customerId').val();
        var name = $('#fullname').val();
        var address = $('#address').val();
        var contact = $('#contact').val();

        if (id == "" || name == "" || address == "" || contact == "") {
            Swal.fire({
                title: "Please fill all the fields",
                icon: "warning"
            });
        } else if (!addressPattern.test(address)) {
            Swal.fire({
                title: "Please enter a valid address",
                icon: "warning"
            });
        } else if (!mobilePattern.test(contact)) {
            Swal.fire({
                title: "Please enter a valid phone number",
                icon: "warning"
            });
        } else {
            let customer = new CustomerModel(id,name,address,contact);
            let jsonCustomer = JSON.stringify(customer);

            $.ajax({
                url: "http://localhost:8082/customer",
                type: "POST",
                data: jsonCustomer,
                headers: { "Content-Type": "application/json" },
                success: (res) => {
                    console.log(JSON.stringify(res));
                    Swal.fire({
                        title: JSON.stringify(res),
                        icon: "success"
                    });
                },
                error: (res) => {
                    console.error(res);
                }
            });

            $('#customer_reset').click();

            setTimeout(() => {
                initialize();
            },1000)

        }

});



$('#customer_table').on('click','tr', function () {
    let id = $(this).find('.cus-id-val').text();
    let name = $(this).find('.cus-fname-val').text();
    let address = $(this).find('.cus-address-val').text();
    let phone = $(this).find('.cus-contact-val').text();

    $('#customerId').val(id);
    $('#fullname').val(name);
    $('#address').val(address);
    $('#contact').val(phone);
});



$(`#customer_update`).on(`click`, () => {

    if ($('#fullname').val() == "" || $('#address').val() == "" || $('#contact').val() == "") {
        Swal.fire({
            title: "Please fill all the fields",
            icon: "warning"
        });
    } else if (!addressPattern.test($('#address').val())) {
        Swal.fire({
            title: "Please enter a valid address",
            icon: "warning"
        });
    } else if (!mobilePattern.test($('#contact').val())) {
        Swal.fire({
            title: "Please enter a valid phone number",
            icon: "warning"
        });
    } else {
        var id = $('#customerId').val();
        var name = $('#fullname').val();
        var address = $('#address').val();
        var contact = $('#contact').val();

        let cus = {id,name,address,contact};
        let jsonCustomer = JSON.stringify(cus);

        $.ajax({
            url: "http://localhost:8082/customer",
            type: "PUT",
            data: jsonCustomer,
            headers: { "Content-Type": "application/json" },
            success: (res) => {
                console.log(JSON.stringify(res));
                Swal.fire({
                    title: JSON.stringify(res),
                    icon: "success"
                });
            },
            error: (res) => {
                console.error(res);
                Swal.fire({
                    title: JSON.stringify(res),
                    icon: "error"
                });
            }
        });

        $('#customer_reset').click();

        setTimeout(() => {
            initialize();
        },1000)
    }

})



$('#customer_delete').on('click',  () => {

    var id = $('#customerId').val();
    $.ajax({
        url: "http://localhost:8082/customer?id=" + id,
        type: "DELETE",
        success: (res) => {
            console.log(JSON.stringify(res));
            Swal.fire({
                title: JSON.stringify(res),
                icon: "success"
            });
        },
        error: (res) => {
            console.error(res);
            Swal.fire({
                title: JSON.stringify(res),
                icon: "error"
            });
        }
    });
    $('#customer_reset').click();

    setTimeout(() => {
        initialize();
    },1000)
})




$("#searchCustomer").on("input", function() {
    var typedText = $("#searchCustomer").val();

    $.ajax({
        url: "http://localhost:8082/customer",
        type: "GET",
        data: {"search": typedText},
        success: (res) => {
            console.log(res);
            let searchArray = JSON.parse(res);
            console.log(searchArray);

            $('#customer_table').empty();

            searchArray.map((customer, index) => {

                var record = `<tr>
                    <td class="cus-id-val">${customer.id}</td>
                    <td class="cus-fname-val">${customer.name}</td>
                    <td class="cus-address-val">${customer.address}</td>
                    <td class="cus-contact-val">${customer.contact}</td>
                </tr>`;

                $('#customer_table').append(record);
            });
        },
        error: (res) => {
            console.error(res);
        }
    });
});



$('#customer_reset').on('click', () => {
    initialize()
})



const addressPattern = /^[a-zA-Z0-9\s,'-]*$/
const mobilePattern = /^(?:\+94|94|0)?7\d{8}$/



