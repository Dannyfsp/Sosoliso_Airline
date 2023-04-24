"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = require("jspdf");
const nodemailer_1 = __importDefault(require("nodemailer"));
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    service: SMTP_HOST,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});
function generateReceiptAndSendEmail(recipientEmail, firstName, amount, tranId, flightClass, seatNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new jspdf_1.jsPDF();
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
        const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
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
            yield transporter.sendMail(msg);
            console.log(`mail successfully sent to ${firstName}`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = generateReceiptAndSendEmail;
