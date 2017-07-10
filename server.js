/**
 * Created by anshul on 7/7/17.
 */
var express=require('express');

var app=express();

var fs=require("fs");

app.use('/',express.static('subfiles'));

var todolist=[];

app.get('/sendData',function(req,res){
    var obj=JSON.parse(req.query.todo);

    todolist.push(obj);
    fs.writeFile('data.json',JSON.stringify(todolist),function(err){
        if(err)throw err;
        res.send(obj.task);
    })
})

app.get('/getData',function(req,res){

    fs.readFile('data.json',function(err,data){
        if(err)throw err;
        res.send(JSON.parse(data.toString()));
    })

})
app.get('/refresh',function(req,res){

    fs.readFile('data.json',function(err,data){
        if(err)return;
        if(data.length==0)res.send([]);
        todolist=[];
        JSON.parse(data.toString()).forEach(function(el){
            todolist.push(el);
        })
        res.send(JSON.parse(data.toString()));
    })

})

app.get('/toggle',function(req,res){

    fs.readFile('data.json',function(err,data){
        if(err)throw err;
        var list=JSON.parse(data.toString());
        if(list[req.query.id].status===0)
        { list[req.query.id].status=1}
        else {
            list[req.query.id].status = 0;
        }
        todolist=[];
        list.forEach(function(el){
            todolist.push(el);
        })
        fs.writeFile('data.json',JSON.stringify(list),function(err){
            if(err)throw err;
        })
        res.send(list[req.query.id].task);
    })

})

app.get('/delet',function(req,res){

    fs.readFile('data.json',function(err,data){
        if(err)throw err;
        var list=JSON.parse(data.toString());
        var deletedtask=list[req.query.id-1000].task;

        list.splice(req.query.id-1000,1);
        todolist=[];
        list.forEach(function(el){
            todolist.push(el);
        })

        fs.writeFile('data.json',JSON.stringify(list),function(err){
            if(err)throw err;
        })
        res.send(deletedtask);

    })

})


app.listen(4000||process.env.port,function (response,err) {
    if(err)throw err;
    console.log("Server is running on port 4000");
})
