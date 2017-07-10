$(function () {

    refreshlist();

    $('#done').click(function(){

        refreshlist();

        var obj={
            "task":$('#getValue').val(),
            "status":0
        }
        if($("#getValue").val()===0)return;

        $("#getValue").val("");

        $.get('/sendData?todo='+JSON.stringify(obj),function(data){
            console.log(data+" added");
            refreshlist();
        });



    });



});
function delet(el){
    refreshlist();
    $.get('/delet?id='+el.id,function(data){
        console.log(data + " deleted");
        refreshlist();
    });


}

function toggle(el){

    $.get('/toggle?id='+el.id,function(data){
        console.log(data + " toggled")
    })


}
function refreshlist(){
    $.get('/refresh',function(data){
        console.log(data);
        var output=$("#output");
        output.html(" ");
        for(var i=0;i<data.length;i++) {
            if (data[i].status === 1) {
                output.append("<div><div class='text'><input type='checkbox' checked id=" + i + " onclick='toggle(this)'>" + data[i].task + "</div><i class='fa fa-minus-circle' aria-hidden='true' id="+(i+1000) +" onclick='delet(this)'></i></div><br><br>");
            }
            else {
                output.append("<div><div class='text'><input type='checkbox' id=" + i + " onclick='toggle(this)'>" + data[i].task + "</div><i class='fa fa-minus-circle' aria-hidden='true' id="+(i+1000) +" onclick='delet(this)'></i></div><br><br>");
            }
        }
    });



    };
