import ItemModel from "../model/ItemModel.js";
import {items} from "../db/db.js";


var index = 0;
var current_id = items.length + 1;

$('#itemCode').val(current_id);


function loadTable() {
    $('#item_table').empty();

    items.map((item, index) => {
        var id = item.itemCode;
        var desc = item.description;
        var unit_price = item.unitPrice;
        var qty = item.qty;

        var record = `<tr>
        <td class="itm-id-val">${id}</td>
        <td class="itm-desc-val">${desc}</td>
        <td class="itm-unitPrice-val">${unit_price}</td>
        <td class="itm-qty-val">${qty}</td>
    </tr>`;

        console.log(record)

        $('#item_table').append(record);
    });

}

$('#item_submit').on('click', () => {
    var id = $('#itemCode').val();
    var desc = $('#description').val();
    var unit_price = $('#unitPrice').val();
    var qty = $('#qty').val();

    let item = new ItemModel(id,desc,unit_price,qty);
    items.push(item);
    console.log(item);

    loadTable();

    $('#item_reset').click();
    $('#itemCode').val(items.length + 1);

});

$('#item_table').on('click','tr', function () {
    index = $(this).index();
    let id = $(this).find('.itm-id-val').text();
    let desc = $(this).find('.itm-desc-val').text();
    let unit_price = $(this).find('.itm-unitPrice-val').text();
    let qty = $(this).find('.itm-qty-val').text();

    $('#itemCode').val(id);
    $('#description').val(desc);
    $('#unitPrice').val(unit_price);
    $('#qty').val(qty);
});


$(`#item_update`).on(`click`, () => {
    console.log(items[index])
    items[index].itemCode = $('#itemCode').val();
    items[index].description = $('#description').val();
    items[index].unitPrice = $('#unitPrice').val();
    items[index].qty = $('#qty').val();

    loadTable();
    $('#item_reset').click();
    $('#itemCode').val(items.length + 1);

})

$('#item_delete').on('click',  () => {
    items.splice(index, 1);
    loadTable();
    $('#item_reset').click();
    $('#itemCode').val(items.length + 1);

})

