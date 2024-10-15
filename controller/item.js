import ItemModel from "../model/ItemModel.js";
import {setItemIds} from "./order.js";

initialize()


function initialize() {

    $.ajax({
        url: "http://localhost:8080/api/v1/items/nextId",
        type: "GET",
        success: (res) => {
            $('#itemCode').val(res);
        },
        error: (res) => {
            console.error(res);
        }
    });

    setTimeout(() => {
        loadItemTable();
    },1000)
}



export function loadItemTable() {
    $('#item_table').empty();

    let itemArray = [];

    $.ajax({
        url: "http://localhost:8080/api/v1/items",
        type: "GET",
        success: (res) => {
            itemArray = res;

            setItemIds(itemArray);

            itemArray.map((item, index) => {

                var record = `<tr>
                    <td class="itm-id-val">${item.id}</td>
                    <td class="itm-desc-val">${item.description}</td>
                    <td class="itm-unitPrice-val">${item.unitPrice}</td>
                    <td class="itm-qty-val">${item.qty}</td>
                </tr>`;

                $('#item_table').append(record);
            });

            $("#item_count").text(itemArray.length);
        },
        error: (res) => {
            console.error(res);
        }
    });

}



$('#item_submit').on('click', () => {
    var id = $('#itemCode').val();
    var desc = $('#description').val();
    var unit_price = $('#unitPrice').val();
    var qty = $('#qty').val();


    if (desc == '' || unit_price == '' || qty == '') {
        Swal.fire({
            title: "Please fill all the fields",
            icon: "warning"
        });
    } else if (!pricePattern.test(unit_price)) {
        Swal.fire({
            title: "Please enter a valid price",
            icon: "warning"
        });
    } else {
        let item = new ItemModel(id,desc,unit_price,qty);
        let jsonItem = JSON.stringify(item);

        $.ajax({
            url: "http://localhost:8080/api/v1/items",
            type: "POST",
            data: jsonItem,
            headers: { "Content-Type": "application/json" },
            success: (res) => {
                Swal.fire({
                    icon: "success"
                });
            },
            error: (res) => {
                console.error(res);
            }
        });

        $('#item_reset').click();

        setTimeout(() => {
            initialize()
        },1000)

    }

});



$('#item_table').on('click','tr', function () {
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

    if ($('#description').val() == '' || $('#unitPrice').val() == '' || $('#qty').val() == '') {
        Swal.fire({
            title: "Please fill all the fields",
            icon: "warning"
        });
    } else if (!pricePattern.test($('#unitPrice').val())) {
        Swal.fire({
            title: "Please enter a valid price",
            icon: "warning"
        });
    } else {
        var id = $('#itemCode').val();
        var description = $('#description').val();
        var unitPrice = $('#unitPrice').val();
        var qty = $('#qty').val();

        let item = new ItemModel(id,description,unitPrice,qty);
        let jsonItem = JSON.stringify(item);


        $.ajax({
            url: "http://localhost:8080/api/v1/items/"+id,
            type: "PUT",
            data: jsonItem,
            headers: { "Content-Type": "application/json" },
            success: (res) => {
                Swal.fire({
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

        $('#item_reset').click();

        setTimeout(() => {
            initialize()
        },1000)
    }

})



$('#item_delete').on('click',  () => {
    var id = $('#itemCode').val();

    $.ajax({
        url: "http://localhost:8080/api/v1/items/" + id,
        type: "DELETE",
        success: (res) => {
            Swal.fire({
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

    $('#item_reset').click();

    setTimeout(() => {
        initialize();
    },1000)

})



$("#searchItem").on("input", function() {
    var typedText = $("#searchItem").val();


    if(typedText == ""){
        loadItemTable();
    } else {
        $.ajax({
            url: "http://localhost:8080/api/v1/items/" + typedText,
            type: "GET",
            success: (res) => {
                let searchArray = res;

                $('#item_table').empty();

                searchArray.map((item, index) => {

                    var record = `<tr>
                    <td class="itm-id-val">${item.id}</td>
                    <td class="itm-desc-val">${item.description}</td>
                    <td class="itm-unitPrice-val">${item.unitPrice}</td>
                    <td class="itm-qty-val">${item.qty}</td>
                </tr>`;

                    $('#item_table').append(record);
                });
            },
            error: (res) => {
                console.error(res);
            }
        });
    }
});



$('#item_reset').on('click', () => {
    initialize()
})


const pricePattern = /^\$?\d+(\.\d{2})?$/
