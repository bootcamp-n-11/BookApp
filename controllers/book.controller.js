let s = [{
  "Name":"Oybekjon",
  "O'zgarishlar":"Bor"
}]
console.log("salom")

export function getAllBooks(req, res) {
  res.status(200).json({
    status: "OK",
    data:s
  });
}
