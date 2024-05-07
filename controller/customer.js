import CustomerModel from "../model/CutomerModel.js";
import {customers} from "../db/db.js";


var index = 0;
var current_id = customers.length + 1;

$('#customerId').val(current_id);

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

        console.log(id);
        console.log(name);
        console.log(address);
        console.log(phone);

        let customer = new CustomerModel(id,name,address,phone);
        customers.push(customer);
        console.log(customer);

        loadTable();

        $('#customer_reset').click();
        $('#customerId').val(customers.length + 1);

});

$('#customer_table').on('click','tr', function () {
    index = $(this).index();
    let id = $(this).find('.cus-id-val').text();
    let name = $(this).find('.cus-fname-val').text();
    let address = $(this).find('.cus-address-val').text();
    let phone = $(this).find('.cus-contact-val').text();
    console.log(id)
    console.log(name)
    console.log(address)
    console.log(phone)

    $('#customerId').val(id);
    $('#fullname').val(name);
    $('#address').val(address);
    $('#contact').val(phone);
});


$(`#customer_update`).on(`click`, () => {
        console.log(customers[index])
        customers[index].id = $('#customerId').val();
        customers[index].name = $('#fullname').val();
        customers[index].address = $('#address').val();
        customers[index].phone = $('#contact').val();

        loadTable();
        $('#customer_reset').click();
        $('#customerId').val(customers.length + 1);

})

$('#customer_delete').on('click',  () => {
    customers.splice(index, 1);
    loadTable();
    $('#customer_reset').click();
    $('#customerId').val(customers.length + 1);

})

