// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto



//https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// "response": [
//     {
//         "name": "Capodanno",
//         "date": "2018-01-01"
//     }




$(document).ready(function() {

    var attributo = $('h1').attr('data-this-date');

    var first = 1;

    var currentDate = moment('2018-01-01');

    insertDays(currentDate);
    insertHolidays(currentDate);

    $('#next').click(function(){
            if (first<12){
            $('ul').html('');
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
            $('ul').html('');
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
                    listItem.append('-' + arr[i].name);
                    listItem.addClass('holiday');
                }

            },
            error: function(){
                alert('errore')
            }
        }
    );
}
