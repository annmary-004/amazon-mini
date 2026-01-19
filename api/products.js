export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "Mobile", price: 10000 },
    { id: 2, name: "Laptop", price: 50000 }
  ]);
}