let s = [{
  "Name":"Oybekjon",
  "O'zgarishlar":"Bor"
}]

export function getAllBooks(req, res) {
  console.log("Get all books");
  res.status(200).json({
    status: "OK",
    data:s
  });
}
// comment
