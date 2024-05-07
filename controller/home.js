import {customers} from "../db/db.js";
import {items} from "../db/db.js";


setInterval(initialize, 1000)

function initialize() {
    $(`#cus_count`).text(customers.length);
    $("#item_count").text(items.length);
};