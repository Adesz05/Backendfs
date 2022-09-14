const express = require('express')
const app = express()
const port=3000
const path=require('path')
const fs=require('fs')
const {response}=require('express')
const exp = require('constants')

app.use(express.urlencoded({extended:true}))


app.get('/adatfelvetel', function (req, res) {
  res.status(200).sendFile(path.join(__dirname+'/index.html'))
})
app.post('/rogzites',function(req,res){
    let nev=req.body.nev;
    let osztaly=req.body.osztaly;
    let lakcim=req.body.lakcim;
    let eletkor=req.body.eletkor;

    fs.appendFile('adatok.csv', `${nev};${osztaly};${lakcim};${eletkor}\n`,(err)=>{
        if(err){
            res.status(500).send("Hiba a fájl mentése közben", err)
        }
        else{
            res.status(200).send("Az adatokat elmentettük!")
        }
    })
})
app.get('/listazas',function(req,res){
    fs.readFile('adatok.csv', (err,data)=>{
        if(err){
            res.status(500).send('Hiba a fájl megnyitásakor!')
        }
        else{
            var content=data.toString().trim();
            var records=content.split('\n')
            var str='<table border="1"><thead><tr><th>Név</th><th>Osztaly</th><th>Lakcím</th><th>Életkor</th></tr></thead><tbody>'
            records.forEach(record =>{
                var datas=record.split(';');
                datas.forEach(data=>{
                    str+='<td>'+data+'</td>'
                })
                str+='</tr>'
            })

            str+='</tbody></table>'
            res.status(200).send(str);
        }
    })
})

app.listen(port,()=>{
    console.log("Server is listening on port 3000...")
});