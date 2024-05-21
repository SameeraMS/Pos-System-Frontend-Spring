import CustomerModel from "../model/CutomerModel.js";
import {customers, items} from "../db/db.js";
import {setCustomerIds} from "./order.js";


var index = 0;

initialize()


function initialize() {
    loadTable();

    if (customers.length == 0) {
        $('#customerId').val(1);
    } else {
        $('#customerId').val(parseInt(customers[customers.length - 1].id) + 1);
    }

    setCustomerIds(customers)
}

function loadTable() {
    $('#customer_table').empty();

    customers.map((customer, index) => {
        var id = customer.id;
        var name = customer.name;
        var address = customer.address;
        var phone = customer.phone;

        var record = `<tr>
        <td class="cus-id-val">${id}</td>
        <td class="cus-fname-val">${name}</td>
        <td class="cus-address-val">${address}</td>
        <td class="cus-contact-val">${phone}</td>
    </tr>`;

        console.log(record)

        $('#customer_table').append(record);
    });

}

$('#customer_submit').on('click', () => {
        var id = $('#customerId').val();
        var name = $('#fullname').val();
        var address = $('#address').val();
        var phone = $('#contact').val();


        if (id == "" || name == "" || address == "" || phone == "") {
            alert("Please fill all the fields");
        } else if (!addressPattern.test(address)) {
            alert("Please enter a valid address");
        } else if (!mobilePattern.test(phone)) {
            alert("Please enter a valid phone number");
        } else {
            let customer = new CustomerModel(id,name,address,phone);
            customers.push(customer);
            console.log(customer);


            $('#customer_reset').click();
            initialize()
        }

});

$('#customer_table').on('click','tr', function () {
    index = $(this).index();
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
        alert("Please fill all the fields");
    } else if (!addressPattern.test($('#address').val())) {
        alert("Please enter a valid address");
    } else if (!mobilePattern.test($('#contact').val())) {
        alert("Please enter a valid phone number");
    } else {
        console.log(customers[index])
        customers[index].id = $('#customerId').val();
        customers[index].name = $('#fullname').val();
        customers[index].address = $('#address').val();
        customers[index].phone = $('#contact').val();

        $('#customer_reset').click();
        initialize()
    }

})

$('#customer_delete').on('click',  () => {
    customers.splice(index, 1);
    $('#customer_reset').click();
    initialize()
})

$("#searchCustomer").on("input", function() {
    var typedText = $("#searchCustomer").val();
    customers.map((customer, index) => {
        if (typedText == "") {
            loadTable()
        }

        if (typedText == customer.id) {
            var select_index = index;

            $('#customer_table').empty();

            var record = `<tr>
                <td class="cus-id-val">${customers[select_index].id}</td>
                <td class="cus-fname-val">${customers[select_index].name}</td>
                <td class="cus-address-val">${customers[select_index].address}</td>
                <td class="cus-contact-val">${customers[select_index].phone}</td>
            </tr>`;

            $('#customer_table').append(record);
        }
    })
});




const addressPattern = /^[a-zA-Z0-9\s,'-]*$/
const mobilePattern = /^(?:\+94|94|0)?7\d{8}$/



