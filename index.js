const express=require('express');
const app=express()
const path=require('path')
const fs=require('fs')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')


app.get("/", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index.ejs",{files:files});
        console.log(files)   //[ 'file1.txt', 'file2.txt', 'file3.txt' ]
    })
})

app.post("/create",function(req,res){ 
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
               res.redirect("/")
    })
}) 
app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show.ejs',
        {filename:req.params.filename,
        filedata:filedata})
    })
})

app.listen(3000, function () {
    console.log("Server is running on 3000");
});
 

