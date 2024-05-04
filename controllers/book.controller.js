export function getAllBooks(req, res) {
  console.log('Running');
  res.status(200).json({
    status: "OK",
  });
}
