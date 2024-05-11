import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
const toDataURL = (url) => {
  const promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        resolve({ base64Url: reader.result });
      };
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
  return promise;
};

const ExportExcel = ({ bestSell }) => {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    // sheet.mergeCells("A1:B1");
    // sheet.mergeCells("C1:D1");
    // sheet.mergeCells("E1:G1");
    sheet.getCell("A2").value = "ລະຫັດສິນຄ້າ";
    sheet.getCell("B2").value = "ຊື່ສິນຄ້າ";
    sheet.getCell("C2").value = "ຈຳນວນ";
    sheet.getCell("D2").value = "ລາຄາ";
    sheet.getCell("E2").value = "ຫົວໜ່ວຍ";
    sheet.getCell("F2").value = "ລາຄາຂາຍ";
    sheet.getCell("G2").value = "ຂາຍໄດ້";
    sheet.getCell("H2").value = "ຮູບພາບ";
    // sheet.getRow(2).commit();
    // merge by start row, start column, end row, end column
    sheet.properties.defaultRowHeight = 80;
    color: {
      argb: "FFFF0000";
    }

    for (var i = 1; i < bestSell.length; i++) {
      sheet.properties.defaultRowHeight = 80;
    }

    for (var i = 1; i < 9; i++) {
      sheet.getRow(2).getCell(i).border = {
        top: { style: "thick" },
        left: { style: "thick" },
        bottom: { style: "thick" },
        right: { style: "thick" },
      };

      sheet.getRow(2).getCell(i).fill = {
        type: 'pattern',
        pattern:'darkVertical',
        fgColor:{argb:'00A5E8'}
      };
    }

    sheet.columns = [
      {
        // header: "ProductCode",
        key: "productCode",
        width: 10,
      },
      {
        // header: "Name",
        key: "name",
        width: 32,
      },
      {
        // header: "Amount",
        key: "amount",
        width: 20,
      },
      {
        // header: "Price",
        key: "price",
        width: 20,
      },
      {
        // header: "Unit",
        key: "unit",
        width: 15,
      },
      {
        // header: "SalsePrice",
        key: "salsePrice",
        width: 10,
      },
      {
        // header: "SalseAmount",
        key: "salseAmount",
        width: 10,
      },
      {
        // header: "Images",
        key: "images",
        width: 12,
      },
    ];

    // sheet.getColumn(3).outlineLevel = 2;
    // sheet.getRow(3).outlineLevel = 2;

    const promise = Promise.all(
      bestSell?.map(async (product, index) => {
        const rowNumber = index + 2;
        sheet.addRow({
          productCode: product?.productCode,
          name: product?.name,
          amount: product?.amount,
          price: product?.price,
          unit: product?.unit,
          salsePrice: product?.salsePrice,
          salseAmount: product?.salseAmount,
        });

        let photo = product?.images[0];
        const result = await toDataURL(photo);
        // console.log(rowNumber);

        const imageId2 = workbook.addImage({
          base64: result.base64Url,
          extension: "jpeg",
        });

        sheet.addImage(imageId2, {
          tl: { col: 7, row: rowNumber },
          ext: { width: 80, height: 50 },
        });
      })
    );

    promise.then(() => {
      const priceCol = sheet.getColumn(5);

      priceCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 50 && cellValue < 1000) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF0000" },
          };
        }
      });

      for (var i = 1; i < bestSell?.length + 3; i++) {
        sheet.getRow(i).height = 55;
      }

      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "ExportExcellication/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "download.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <>
      <div className="btn-export-excel">
        <button className="btn-export" onClick={exportExcelFile}>Export Excel</button>
      </div>
    </>
  );
};

export default ExportExcel;
