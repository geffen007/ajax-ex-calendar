$(document).ready(function() {


    var currentDate = moment($('h1').attr('data-this-date'));

    insertDays(currentDate);
    insertHolidays(currentDate);

    $('#next').click(function(){
        next(currentDate);
    });
    $('#prev').click(function(){
        prev(currentDate);
    });

});

function addZero(number){
    if (number<10 && number > -10) {
        return '0'+ number;
    }
    return number;
}

function insertDays(data){
    $('ul').empty();
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

function next(data){
    if(data.month() == 11){
        alert('non puoi continuare');
    }else{
        data.add(1,'months');
        insertDays(data);
        insertHolidays(data);
    }
}
function prev(data){
    if( data.month() == 0){
        alert('non puoi continuare');
    }else{
        data.subtract(1,'months');
        insertDays(data);
        insertHolidays(data);
    }
}
