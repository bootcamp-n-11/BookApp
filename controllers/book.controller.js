import fs from "fs"
import path from "path"


export const getAllBooks=(req, res)=>{
  const filePath=path.join(process.cwd(),'db','books.json')
  fs.readFile(filePath,"utf8",(err,data)=>{
    if (err) throw err;
    else{
      res.status(200).json({
        status:"OK",
        content: JSON.parse(data)
      })
    }
  })
}

export const getOneBooks=(req,res)=>{
  const filePath=path.join(process.cwd(),'db','books.json')
  fs.readFile(filePath,"utf8",(err,data)=>{
    if (err) throw err;
    else{
      try {
        const json=JSON.parse(data)

        const id=+req.params.id
        const book=json.find(item=>id === item.id)

        if (!book){
          res.send('Something error')
        }
        res.status(200).json({
          status:"OK",
          data:book
        })
      } catch (error) {
        res.status(500).json({
          status:"Json ma'lumotlarini o'qishda xatolik"
        })
      }
    }
  })
  
  
  
}

export const appendBook=(req,res)=>{
  
  const filePath=path.join(process.cwd(),'db','books.json')
  fs.readFile(filePath,"utf8",(err,content)=>{
    if (err) throw err;

    try {
      const json=JSON.parse(content)

      const {title,author,year}=req.body

      if (!title || !author || !year){
        res.status(404).json({
          status:"Barcha ma'lumotlar kiritilmagan"
        })
        return;
      }

      const book={
        id:json.length+1,
        title:title,
        author:author,
        year:year
      };

      json.push(book)

      fs.writeFile(filePath,JSON.stringify(json),'utf8',err=>{
        if(err) throw err;
        else{
          res.status(200).json({
            status:"Muaffaqiyatli qo'shildi",
    
          })
        }
      })
    }
      catch (error) {
      console.log('You have wrong');
      res.status(500).json({ status: "error", message: "Noma'lum xato yuz berdi" });
    }
})

}