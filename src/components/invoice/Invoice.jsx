import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { font } from "./Phetsarath OT-normal";
const Invoice = ({ orders }) => {
    const handlePDF = () => {
        const doc = new jsPDF();
        doc.addFileToVFS("MyFont.ttf", font);
        doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("MyFont");
        let width = doc.internal.pageSize.getWidth();
        doc.text("ບຸນມີການຄ້າ", width / 2, 10, { align: "center" });
        // doc.text(`Order Id : ${orders.paymentIntent.id}`, 10, 25, { align: "left" });
        // doc.text(`Total paid : ${(orders.paymentIntent.amount /= 100).toLocaleString("en-US",{
        //     style : "currency",
        //     currency: "USD",
        // })}`, 10, 35, { align: "left" });
        // doc.text(`Currency : ${orders.paymentIntent.currency.toUpperCase()}`, 10, 45, { align: "left" });
        // doc.text(`Method : ${orders.paymentIntent.payment_method_types[0]}`, 190, 25, { align: "right" });
        // doc.text(`Payment : ${orders.paymentIntent.status.toUpperCase()}`, 190, 35, { align: "right" });
        // doc.text(`Ordered On : ${new Date(orders.paymentIntent.created * 1000).toLocaleString()}`, 190, 45, { align: "right" });
        // doc.text(`STATUS : ${orders.orderStatus}`, 190, 55, { align: "right" });
        // let data = orders.products.map((p, i) => [
        //     p.product.title,
        //     p.product.price,
        //     p.product.brand,
        //     p.color,
        //     p.count,
        //     p.product.shipping

        // ]);
        // let content = {
        //     startY: 60,
        //     head: [["Title", "Price", "Brand","Color","Count","Shipping"]],
        //     body: data,
        //     styles: { font: 'MyFont',},
        //     fontSize: 15 
        // };
        // doc.autoTable(content);
        // doc.text(`ຍອດລວມທັງໝົດ : ${orders.paymentIntent.amount}`, 190, 85, { align: "right" });
        doc.save("ໃບບິນການສັ່ງຊື້");

    }
    return (
        <button className="btn btn-primary" type="submit" onClick={handlePDF}>
            ຢືນຢັນ
        </button>
    )
}

export default Invoice