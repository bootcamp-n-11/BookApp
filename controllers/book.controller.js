books=[
  {
    id:1,
    title:"Diqqat",
    author:"Kel Nyuport",
    year:2010
  }
]

export const getAllBooks=(req, res)=>{
  res.send(books)
}

export const getOneBooks=(req,res)=>{
  const id=+req.params.id
  const book=books.find(item=>id === item.id)
  if (!book){
    res.send('Something error')
    res.end()
  }
  res.status(200).json({
    status:"OK",
    data:book
  })
}

export const appendBook=(req,res)=>{
  const {title,author,year}=req.body

  if (!title || !author || !year){
    res.status(404).json({
      status:"NOT FOUND"
    })
  }

  const book={
    id:books.length+1,
    title:title,
    author:author,
    year:year
  }

  books.push(book)
  res.status(201).json({
    status:"Sucessfull"
  })
}