import { channel } from "diagnostics_channel";
import fs from "fs"
import path, { join } from "path";

let dbAuthfilePath = path.join(process.cwd(),  "db", "authors.json")

export function createAuthor(req, res){
  fs.readFile(dbAuthfilePath, "utf-8", async (err, data)=>{
    err?res.send("Error reading data from file"): "ok"
    let temp = []
    temp = JSON.parse(data)
    req.body = {id: temp[temp.length - 1].id + 1, ...req.body}
    temp.push(req.body)
    fs.writeFile(dbAuthfilePath, JSON.stringify(temp), err=>{
      err?res.send("couldn't save file"):
      res.send("SUCCESS")
    })
  })
}



export function editAuthorData(req, res){
  fs.readFile(dbAuthfilePath, "utf-8", async (err, data)=>{
    err?res.send("Error reading data from file"): "ok"
    let temp = []
    let checker = false
    temp = JSON.parse(data)

    for (const i in temp)
      if(temp[i].id == req.params.id){
        temp[i].image_link = req.body.image_link || temp[i].image_link
        temp[i].fullname = req.body.fullname || temp[i].fullname
        temp[i].born = req.body.born || temp[i].born
        temp[i].dead = req.body.dead || temp[i].dead
        temp[i].description = req.body.description || temp[i].description
        checker = true
      }


    if(checker)
      fs.writeFile(dbAuthfilePath, JSON.stringify(temp), err=>{
        err?res.send("couldn't save file"):
        res.send("SUCCESS")
      })
    else
      res.send("ID not found")
  })
}



export function getAllAuthors(req, res) {
  res.status(200).json({
    status: "OK",
  });
}
