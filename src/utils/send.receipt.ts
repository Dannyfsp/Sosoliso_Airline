import { jsPDF } from "jspdf";
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export default async function generateReceiptAndSendEmail(
  recipientEmail: string,
  firstName: string,
  amount: number,
  tranId: string,
  flightClass: string,
  seatNumber: string
): Promise<void> {
  const doc = new jsPDF();

  // add the document content
  doc
    .setFontSize(25)
    .text("SOSOLISO AIRLINE", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });
  doc
    .setFontSize(20)
    .text("Receipt of Payment", doc.internal.pageSize.getWidth() / 2, 30, {
      align: "center",
    });
  doc.setFontSize(14).text("Payment details:", 20, 50);
  doc.setFontSize(12).text(`Amount paid: ${amount}`, 20, 60);
  doc.setFontSize(12).text(`Transaction ID: ${tranId}`, 20, 70);
  doc.setFontSize(12).text(`Flight Class: ${flightClass}`, 20, 80);
  doc.setFontSize(12).text(`Seat Number: ${seatNumber}`, 20, 90);
  doc.setFontSize(12).text(`Payment Status: success`, 20, 100);
  doc.setFontSize(12).text("Thank you for your payment!", 20, 110);

  // generate the PDF file
  const pdfBuffer: Buffer = Buffer.from(doc.output("arraybuffer"));

  const msg = {
    to: recipientEmail,
    from: `Sosoliso Airline <${process.env.SMTP_USER}>`,
    subject: "Your Payment Receipt",
    html: `<h1>Hello ${firstName}</h1><p>Thank you for your payment! Please find your receipt attached.</p>`,
    attachments: [
      {
        content: pdfBuffer,
        filename: "receipt.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  try {
    await transporter.sendMail(msg);
    console.log(`mail successfully sent to ${firstName}`);
  } catch (error) {
    console.log(error);
  }
}
