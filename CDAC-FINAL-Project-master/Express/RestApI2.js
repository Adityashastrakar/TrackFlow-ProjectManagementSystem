var exp=require("express")
var mysl=require("mysql2")
var cor=require("cors")
var bp=require("body-parser")

var con=mysl.createConnection({
    host:"localhost",
    password:"root",
    database:"trackflow",
    user:"root"

});
con.connect(function(err){
    if(!err)
    {
        console.log("Db connected");
    }
    else{
        console.log("db not connected");
    }
})
var app=exp()
app.use(cor())
app.use(bp.json())
app.listen(9001,function(){
    console.log("exp-Rest-server-900-started")
})


app.post("/inserted",function(req,res){
    
    var cnm=req.body.clientname;
	var web =req.body.website;
	var dom=req.body.domain;
	var add=req.body.address;
	var phn=req.body.contact;
  
    var query="insert into clients(clientname,website,domain,address,contact)values(?,?,?,?,?)";
    console.log("req recesive post")
    con.query(query,[cnm,web,dom,add,phn],function(err){
        if(!err)
        res.send("SUCESS");
        else
        res.send("FAILURE"+err);
    })
});



app.all("*",function(req,res){
    res.send("<p>URL IS UNKNOW</P>");
});