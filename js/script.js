$(document).ready(function() {

    var attributo = $('h1').attr('data-this-date');

    var first = 1;

    var currentDate = moment('2018-01-01');

    insertDays(currentDate);
    insertHolidays(currentDate);

    $('#next').click(function(){
            if (first<12){
            $('ul').empty();
            first++;
            var firstO = addZero(first);
            attributo = $('h1').attr('data-this-date', '2018-'+ firstO +'-01');
            attributo = moment($('h1').attr('data-this-date'));
            insertDays(attributo);
            insertHolidays(attributo);
        } else {
            alert('non puoi andare avanti');
        }
    });

    $('#prev').click(function(){
        if (first>1){
            $('ul').empty();
            first--;
            var firstO = addZero(first);
            attributo = $('h1').attr('data-this-date', '2018-'+ firstO +'-01');
            attributo = moment($('h1').attr('data-this-date'));
            insertDays(attributo);
            insertHolidays(attributo);
        } else {
            alert('non puoi andare indietro');
        }
    });


});

function addZero(number){
    if (number<10 && number > -10) {
        return '0'+ number;
    }
    return number;
}

function insertDays(data){
    var month = data.format('MMMM');
    var year = data.format('YYYY');
    $('h1.month').html(month + ' ' + year);

    var daysMonth = data.daysInMonth();

    for(var i = 1; i <= daysMonth; i++ ){

        var source = $('#day-template').html();
        var template = Handlebars.compile(source);
        var day = addZero(i);

        var context = {
            day: day,
            month: month,
            completeDate: year + '-' + data.format('MM') + '-' + day
        };

        var html = template(context);

        $('.month-list').append(html);
    }
}

function insertHolidays(data){
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: data.year(),
                month: data.month()
            },
            success: function(resp){
                var arr = resp.response;
                for (var i = 0; i < arr.length; i++) {
                    var listItem = $('li[data-complete-date = "' + arr[i].date + '"]');
                    listItem.append(' - ' + arr[i].name);
                    listItem.addClass('holiday');
                }

            },
            error: function(){
                alert('errore')
            }
        }
    );
}
