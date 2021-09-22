$.fn.dataTable.ext.errMode = 'none';
$.fn.InitTable = function (object) {

    if ($.fn.DataTable.isDataTable(this)) {
        $(this).DataTable().clear().destroy();
    }

    $(this).DataTable({
        lengthChange: false,
        dom: 'Rlfrtip',
        order: [],
        responsive: true,
        "paging": true,
        "pageLength": 5,
        ...object,
    });
}

$.fn.searchGridData = function (text) {
    $(this).DataTable().search(text).draw();
}


const response = [
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@gmail.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: true
    },
    {
        date: '06 Mar, 2021',
        email: 'johnySmith@outlook.com',
        sender: 'Johny Smith Public',
        baseLine: 20,
        increasePerDay: 4,
        maxSendsPerDay: 4,
        rate: 30,
        status: false
    }
]

$('#rounded-table').InitTable({
    data: response,
    columns: [
        {
            title: 'Date',
            data: 'date',
        },
        {
            title: 'Email Address',
            data: 'email',
            render: function (el, type, item) {
                let img = el.includes('gmail') ? 'gmail' : 'outlook'
                return `
                    <div class="mail-wrapper">
                        <div class="icon">
                            <img src="/assets/images/dark-${img}.svg">
                        </div>
                        <span>${el}</span>    
                    </div>
                `
            },
        },
        {
            title: 'Sender',
            data: 'sender',
        },
        {
            title: 'Starting (Baseline)',
            data: 'baseLine',
        },
        {
            title: 'Increase (Per Day)',
            data: 'increasePerDay',
        },
        {
            title: 'Max Sends (Per Day)',
            data: 'maxSendsPerDay',
        },
        {
            title: 'Replay Rate',
            data: 'rate',
            render: function (el, type, item) {
                return `<div class="rate">${el}%</div>`
            }
        },
        {
            title: 'Status',
            data: 'status',
            render: function (el, type, item) {
                return `                        
                    <label class="switch">
                        <input type="checkbox" ${el ? 'checked' : ''} name=""/>
                        <div class="slider round"></div>
                    </label>
                `
            }
        },
    ]
})


$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        "alwaysShowCalendars": true,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});


void function InitDomEvents() {

    $('.status-tab').click(function () {
        $('.filter-dropdown').toggleClass('active')
    })

    $('.dropdown').click(function () {
        $('.filter-dropdown-header').toggleClass('active')
    })

    $('input[name="search"]').on('input', function() {
        $('#rounded-table').searchGridData($(this).val())
    })

    $('.add-button').on('click', function() {
        $('.add-inbox').addClass('visible')
    })

    $('tbody tr').on('click', function() {
        $('.mail-inside').addClass('visible')
    })

    $('.round input[type="checkbox"]').on('click', function() {
        if ($(this).is(':checked')) {
            $('.hidden').addClass('visible')
        } else {
            $('.hidden').removeClass('visible')
        }
    })

    $('.close').on('click', function() {
        $('.overflow').removeClass('visible')
    })

    $('.modal-menu ul li').on('click', function() {
        let atr = $(this).attr('tab')
        $(this).addClass('active').siblings().removeClass('active')
        let percent = $(this).index() * 100
        $('.modal-wrapper').css('transform', `translate(-${percent}%)`)
        $(`.${atr}`,'.modal-wrapper').addClass('active').siblings().removeClass('active')
    })

    $('form').on('submit', function(ev) {
        ev.preventDefault()
        if(!$(this).hasClass('schedule')) {
            $('.modal-menu li.active').next().trigger('click')
        } else {
            // submit here
        }
    })

}()

  