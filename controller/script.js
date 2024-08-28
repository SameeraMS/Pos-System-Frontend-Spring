// navigation

$('#customer').css('display','none');
$('#item').css('display','none');
$('#order').css('display','none');
$('#order_details').css('display','none');

$('#home_nav').on('click', () => {
    $('#home').css('display', 'block');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');

    $('#home_nav').addClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#customer_nav, #customer_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'block');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').addClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#item_nav, #item_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'block');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').addClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#order_nav, #order_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'block');
    $('#order_details').css('display','none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').addClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#order_details_nav').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','block');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').addClass('active-page');
});


const ctx2 = document.querySelector('.prog-chart');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Daily Orders',
            data: [6, 10, 8, 14, 6, 7],
            borderColor: '#0891b2',
            tension: 0.4
        },
            {
                label: 'Aver Orders',
                data: [8, 6, 7, 6, 11, 8],
                borderColor: '#ca8a04',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    display: false
                },
                border: {
                    display: false,
                    dash: [5, 5]
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});