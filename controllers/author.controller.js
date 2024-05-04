import fs from "node:fs";
import path from "node:path";


function readJsonFile(){
  const data = fs.readFileSync(path.join(process.cwd(), "db", "authors.json"), "utf-8")
  return JSON.parse(data)
};

function writeJsonFile(data){
  const authors = JSON.stringify(data)
  fs.writeFileSync(path.join(process.cwd(), "db", "authors.json"), authors)
}

export function getAllAuthors(req, res) {
  const data = readJsonFile()

  if (!data){
    return res.status(404).json({
      status : "Ma'lumot yo'q"
    });
  };
  res.status(200).send(data)
};

export function getOneAuthor(req, res) {
  const data = readJsonFile()
  const author = data.find(author => author.id === parseInt(req.params.id))
  if (!author){
    return res.status(404).json({
      status : "Bunday author yo'q"
    });
  };
  res.status(200).send(author)
};

export function delOneAuthor(req, res) {
  const authors = readJsonFile()
  const index = authors.findIndex(author => author.id === parseInt(req.params.id))
  if (index === -1){
    return res.status(404).json({
      status : "Bunday author yo'q"
    });
  };
  const author = authors.splice(index, 1)
  writeJsonFile(authors)
  res.status(200).send(author)
};




