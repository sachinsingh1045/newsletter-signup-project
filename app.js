const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.sname;
    const email=req.body.email;
var data={
    members:{
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME: firstname,
            LNAME:lastname
        }
    }
};
var jsonData=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/43ae7fdbb6";
const options={
    method:"POST",
    auth:"Sachin15 :ffeb83c66d415fa59a06818e1044ea13-us21"

}
const request=https.request(url,options,function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
            res.sendFile(__dirname+"/failure.html");
        }
    
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();

});

app.listen(process.env.PORT||3000,function(){
    console.log("server running on 3000");
});
// api key miilchimp  ffeb83c66d415fa59a06818e1044ea13-us21
//list id 43ae7fdbb6