import fs from "fs";
import path from "path";
const __dirname = import.meta.dirname;

const myPath = path.join(__dirname, "..", "db", "books.json");
export function getAllBooks(req, res) {
  console.log("Ishlayapti");
  res.status(200).json({
    status: "OK",
  });
}

export function editBook(req, res) {
  const bookID = +req.params.id;
  const { image_link, title, author, price, year, description } = req.body;
  if (!image_link || !title || !author || !price || !year || !description) {
    res.status(400).json({
      status: "Malumot toliq emas",
    });
  } else {
    fs.readFile(myPath, "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        data = JSON.parse(data);
        const oldBook = data.find((item) => item.id == bookID);
        if (!oldBook) {
          res.status(404).json({
            status: "Malumot topilmadi",
          });
        } else {
          data.forEach((element) => {
            if (element.id == bookID) {
              element.image_link = image_link;
              element.title = title;
              element.author = author;
              element.price = price;
              element.year = year;
              element.description = description;
            }
          });
          data = JSON.stringify(data);
          fs.writeFileSync(myPath, data);
          res.status(200).json({
            status: "Updated",
          });
        }
      }
    });
  }
}

export function deleteBook(req, res) {
  try {
    const userID = req.params.id;
    fs.readFile(myPath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        data = JSON.parse(data);
        console.log(data);
        let userIndex = -1;
        data.forEach((item, index) => {
          if (userID == item.id) {
            userIndex = index;
          }
        });
        if (userIndex == -1) {
          res.status(404).json({
            status: "Malumot topilmadi",
          });
        } else {
          data.splice(userIndex, 1);
          data = JSON.stringify(data);
          fs.writeFileSync(myPath, data);
          res.status(200).json({
            status: "Deleted",
          });
        }
      }
    });
  } catch (error) {
    throw error;
  }
}
