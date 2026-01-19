import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.text("Amazon Invoice", 20, 20);
  doc.text(`Order ID: ${order.id}`, 20, 30);
  doc.text(`Date: ${order.createdAt.toDate().toLocaleString()}`, 20, 40);

  let y = 60;
  order.items.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.title} - ₹${item.price}`, 20, y);
    y += 10;
  });

  doc.text(`Total: ₹${order.amount}`, 20, y + 10);

  doc.save(`invoice_${order.id}.pdf`);
};
