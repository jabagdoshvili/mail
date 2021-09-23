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


void function InitDomEvents() {

    $('.status-tab').click(function () {
        $('.filter-dropdown').toggleClass('active')
        $('.filter-dropdown-header').removeClass('active')
    })

    $('.dropdown').click(function () {
        $('.filter-dropdown-header').toggleClass('active')
    })

    $('input[name="search"]').on('input', function() {
        $('#rounded-table').searchGridData($(this).val())
    })

    $('.add-button').on('click', function() {
        $('.email-popup').addClass('visible')
    })

    $('.set-up').on('click', function() {
        $('.email-popup').removeClass('visible')
        $('.add-inbox').addClass('visible')
    })

    $('.calendar-tab').on('click', function() {
        $('.calendar-wrapper ').toggleClass('visible')
        $('.filter-dropdown').removeClass('visible')
    })

    $('tbody tr > td:not(:last-child)').on('click', function(e) {
        var target = $( e.target );
        if(target.is('.round')) {
            $('.mail-inside').removeClass('visible')
        } else {
            $('.mail-inside').addClass('visible')
        }
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
        $(`.${atr}`,'.modal-wrapper').addClass('active').siblings().removeClass('active')
        if(atr == 'schedule' && $(`.${atr}`,'.modal-wrapper').hasClass('active')) {
            $('.send').html('Save')
        } else {
            $('.send').html('Proceed to Save')
        }
    })

    $('form').on('submit', function(ev) {
        ev.preventDefault()
        if(!$(this).hasClass('schedule')) {
            $('.modal-menu li.active').next().trigger('click')
        } else {
            // submit here
        }
    })

    $(document).on('click', function() {
        $('.filter-dropdown-header.active').removeClass('active')
    })

    $('.filter-dropdown-header, .dropdown').on('click', function(e) {
        e.stopPropagation()
    })

    $(document).on('click', function() {
        $('.filter-dropdown.active').removeClass('active')
    })

    $('.filter-dropdown, .status-tab').on('click', function(e) {
        e.stopPropagation()
    })

    $(document).on('click', function() {
        $('.overflow.visible').removeClass('visible')
    })

    $('.modals, .add-button, table tr').on('click', function(e) {
        e.stopPropagation()
    })


    $(document).on('click', function() {
        $('.calendar-wrapper.visible').removeClass('visible')
    })

    $('.calendar-wrapper, .calendar-tab').on('click', function(e) {
        e.stopPropagation()
    })

}()

  