import {OrderModel} from "../model/OrderModel.js";
import {customers} from "../db/db.js";
import {items} from "../db/db.js";
import {orders} from "../db/db.js";


var index = 0;
var current_id = orders.length + 1;
let cart = [];

const order_id = $('#order_Id');
const customer_id = $('#custId');
const date = $('#orderDate');
const item_Id = $('#item_Id');
const order_qty = $('#order_quantity');

const customer_name = $('#custName');
const qty_on_hand = $('#qtyOnHand');
const description = $('#desc');
const unit_price = $('#unit_price');
const net_total = $('.net_total span:nth-child(2)');
const sub_total = $('.sub_total span:nth-child(2)');
const discount = $('#discount');
const cash = $('#cash');
const balance = $('#balance');

const cart_btn = $('.cart_btn');
const order_btn = $('.order_btn');


initialize()

function initialize() {
    $('#order_Id').val(orders.length + 1);
    setCustomerIds(customers)
}

export function setCustomerIds(data) {
    customer_id.empty();
    customer_id.append('<option selected>select the customer</option>');

    for (let i = 0; i < data.length; i++) {
        customer_id.append('<option value="' + (i + 1) + '">' + data[i].id + '</option>');
    }
}

export function setItemIds(data) {
    item_Id.empty();
    item_Id.append('<option selected>select the customer</option>');

    for (let i = 0; i < data.length; i++) {
        item_Id.append('<option value="' + (i + 1) + '">' + data[i].itemCode + '</option>');
    }
}

customer_id.on('input', () => {
    if (customer_id.val() !== 'select the customer'){
        customer_name.val(customers[customer_id.val() - 1].name);
    }else{
        customer_name.val('');
    }
});

item_Id.on('input', () => {
    if (item_Id.val() !== 'select the customer'){
        description.val(items[item_Id.val() - 1].description);
        qty_on_hand.val(items[item_Id.val() - 1].qty);
        unit_price.val(items[item_Id.val() - 1].unitPrice);
    }else{
        description.val('');
    }
});