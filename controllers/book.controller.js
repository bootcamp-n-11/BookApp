let s = [{
  "Name":"Oybekjon",
  "O'zgarishlar":"Bor"
}]

export function getAllBooks(req, res) {
  res.status(200).json({
    status: "OK",
    data:s
  });
}
