
var dateObj = new Date()
var month = dateObj.getMonth() + 1
var year = dateObj.getFullYear()

var chosenDate = dateObj.getDate()

var currentMonthName = ''

var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

void function InitCalendar() {
    var customCalendar = $('.calendar-wrapper')

    let calendar = (`
        <div class="calendar">
            <div class="head">
                <div class="current">
                    <div class="arrow arrow-left"><img src="assets/images/arrow.svg"></div>
                    <div class="current-date">
                        <span class="current-month"></span>, <span class="current-year"></span>
                    </div>
                    <div class="arrow arrow-right"><img src="assets/images/arrow.svg"></div>
                </div>
                <ul class="date"></ul>
            </div>
            <ul class="month"></ul>
        </div>
    `)

    for (let i = 0; i < 2; i++) customCalendar.append(calendar)

    setPrefinedPeriod()
    setDays()

    function getDaysInMonth(m, y) {
        return new Date(y, m, 0).getDate();
    };


    function setDays() {
        days.forEach(el => $(`ul.date`, customCalendar).append(`<li class="date">${el.substring(0, 3)}</li>`))
    }

    function setPrefinedPeriod() {
        let prefinedPeriod = $(`
            <div class="predefined-periods">
                <p>Predefined periods:</p>
                <ul></ul>
                <div class="selected">Selected: <span class="count">0</span> <span>days</span></div>
            </div>
        `)

        let prefinedArr = ['Yesterday', 'Last week', 'Last month', 'Last year']

        let periodName = ''
        prefinedArr.forEach(period => periodName += `<li>${period}</li>`)
        $('ul', prefinedPeriod).html(periodName)

        customCalendar.append(prefinedPeriod)
    }

    function getDays(currentYear, currentMonth, eq) {
        if(eq == 1 && currentMonth == 13) currentYear+=1 
        var countDays = getDaysInMonth(currentMonth, currentYear)
        
        var prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear)


        var indexOfFirstDay = new Date(currentYear, currentMonth - 1, 1).getDay() - 1
        if (days[0].charAt(0) == 'M') indexOfFirstDay -= 1;


        var li = ''
        for (var lastMonthDays = prevMonthDays - indexOfFirstDay; lastMonthDays <= prevMonthDays; lastMonthDays++) li += `<li class="empty"></li>`

        for (var i = 1; i <= countDays; i++) {
            li += `<li class="${dateObj.getDate() == i && dateObj.getMonth() + 1 == month && dateObj.getFullYear() == year ? 'today' : ''}"><div class="date">${i}</div></li>`
        }

        for (var i = 1; i < 42 - countDays - indexOfFirstDay; i++) li += `<li class="empty"></li>`


        currentMonthName = new Date(currentYear, currentMonth, 0).toLocaleDateString("default", {
            month: "long"
        })


        $(`.calendar:eq(${eq}) .current-month`, customCalendar).html(currentMonthName)
        $(`.calendar:eq(${eq}) .current-year`, customCalendar).html(currentYear)

        $(`.calendar:eq(${eq}) ul.month`, customCalendar).html(li)
    }

    getDays(year, month, 0)
    getDays(year, month+1, 1)

    void function InitCalendarDomEvents() {

        $(customCalendar).on('click', '.arrow', function (ev) {
            var isLeft = $(this).hasClass('arrow-left')
            month = isLeft ? month -= 1 : month += 1

            if (month == 0) year -= 1, month = 12;
            else if (month > 12) month = 1, year += 1;

            getDays(year, month, 0)
            getDays(year, month+1, 1)
        })

        let iteration = 0
        let startDateSelector;
        $(customCalendar).on('click', '.month li:not(.empty)', function () {
            iteration++
            chosenDate = $(this).text()

            if ($('.month li').hasClass('end-date')) {
                iteration = 1
                $('.month li:not(.empty)').attr('class', '')
            }
            if (iteration == 1) {
                className = 'active'
                startDateSelector = $(this)
                startDateSelector.prevAll().addClass('passive start')
                
            } else if (iteration == 2) {
                className = 'end-date'
                $(this).nextAll().addClass('passive end')
                $(this).prevAll(':not(.passive)').addClass('in-range')

                startDateSelector.nextAll(':not(.passive)').addClass('in-range')
                startDateSelector.addClass('start-date')
                $('.count').html($('.in-range:not(.empty)').length + 2)
                iteration = 0
            }
            if($(this).hasClass('passive')) {
                iteration = 0
            } else $(this).addClass(className)
        })
    }()
}()
