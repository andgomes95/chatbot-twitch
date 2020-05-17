$(function(){
    $("#form").submit(function(e){
        $.ajax({
            type: 'POST',
            url: location.protocol + '/localhost:3000/question',
            data: JSON.stringify({first:$("#selectA").val(), second: $("#selectB").val()}),
            contentType: 'application/json',
            headers: { "Authorization": 'Bearer '+ '0zq0d84zf114992l6y38rlji6diprj'}
        })
    })
})