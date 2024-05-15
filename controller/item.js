import ItemModel from "../model/ItemModel.js";
import {items} from "../db/db.js";
import {setItemIds} from "./order.js";


var index = 0;
var current_id = items.length + 1;

initialize()


function initialize() {
    loadItemTable();
    $('#itemCode').val(items.length + 1);
    setItemIds(items)
}

export function loadItemTable() {
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


    $('#item_reset').click();
    initialize()
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

    $('#item_reset').click();
    initialize()
})

$('#item_delete').on('click',  () => {
    items.splice(index, 1);
    $('#item_reset').click();
    initialize()
})


$("#searchItem").on("input", function() {
    console.log("hello");
    var typedText = $("#searchItem").val();
    items.map((item, index) => {
        if (typedText == "") {
                loadTable()
        }

        if (typedText == item.itemCode) {
            var select_index = index;

            $('#item_table').empty();

            var record = `<tr>
               <td class="itm-id-val">${items[select_index].itemCode}</td>
               <td class="itm-desc-val">${items[select_index].description}</td>
               <td class="itm-unitPrice-val">${items[select_index].unitPrice}</td>
               <td class="itm-qty-val">${items[select_index].qty}</td>
            </tr>`;

            console.log(record)
            $('#item_table').append(record);
        }
    })
});


