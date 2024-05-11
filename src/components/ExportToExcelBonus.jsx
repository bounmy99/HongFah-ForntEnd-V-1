import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import Swal from "sweetalert2";
import moment from "moment";
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

 const ExportToExcelBonus = ({ selectableRow, header, setToggleCleared,setSelectableRow }) => {

  console.log("data Export",selectableRow)
  // console.log("heaer Export",header)

  // ======== find max value ==================
    // ======== find max value ==================
    let BunusTeamePV = selectableRow?.map((point)=>point.bunusTeamePV);
    let MaxBunusTeamePV = Math.max.apply(null,BunusTeamePV)
  
    let PV = selectableRow?.map((point)=>point.PV);
    let MaxPV = Math.max.apply(null,PV)
  
    let TotalBonus = selectableRow?.map((point)=>point.totalBonus);
    let MaxTotalBonus = Math.max.apply(null,TotalBonus)


  const exportExcelFile = () => {

    if (selectableRow.length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ",
      });
      return;
    }
    setSelectableRow([])
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    // sheet.mergeCells("A1:B1");
    // sheet.mergeCells("C1:D1");
    // sheet.mergeCells("E1:G1");
    sheet.getCell("A2").value = header[0]
    sheet.getCell("B2").value = header[1]
    sheet.getCell("C2").value = header[2]
    sheet.getCell("D2").value = header[3]
    sheet.getCell("E2").value = header[4]
    sheet.getCell("F2").value = header[5]
    sheet.getCell("G2").value = header[6]
    sheet.getCell("H2").value = header[7]
    sheet.getCell("I2").value = header[8]
    sheet.getCell("J2").value = header[9]
    sheet.getCell("K2").value = header[10]
    sheet.getCell("L2").value = header[11]
    sheet.getCell("M2").value = header[12]
    sheet.getCell("N2").value = header[13]
    sheet.getCell("O2").value = header[14]

    // sheet.getRow(2).commit();
    // merge by start row, start column, end row, end column
    sheet.properties.defaultRowHeight = 80;
    color: {
      argb: "FFFF0000";
    }

    for (var i = 1; i < selectableRow.length; i++) {
      sheet.properties.defaultRowHeight = 80;
    }

    for (var i = 1; i < header.length; i++) {
      sheet.getRow(2).getCell(i).border = {
        top: { style: "thick" },
        left: { style: "thick" },
        bottom: { style: "thick" },
        right: { style: "thick" },
      };

      sheet.getRow(2).getCell(i).fill = {
        type: 'pattern',
        pattern:'',
        fgColor:{argb:'00A5E8'}
      };
    }

    sheet.columns = [
      {
        // header: ".........",
        key: "userCode",
        width: 15,
      },
      {
        // header: "........",
        key: "bankName",
        width: 15,
      },
      {
        // header: ".......",
        key: "accountName",
        width: 15,
      },
      {
        // header: ".......",
        key: "accountNo",
        width: 15,
      },
      {
        // header: ".......",
        key: "lastName",
        width: 15,
      },
      {
        // header: ".....",
        key: "firstName",
        width: 15,
      },
      {
        // header: "......",
        key: "userPosition",
        width: 15,
      },
      {
        // header: "......",
        key: "children_count",
        width: 15,
      },
      {
        // header: "......",
        key: "PV",
        width: 15,
      },
      {
        // header: "......",
        key: "teamePV",
        width: 15,
      },
      {
        // header: "......",
        key: "cashback",
        width: 12,
      },
      {
        // header: "......",
        key: "bunusPV",
        width: 12,
      },
      {
        // header: "......",
        key: "recommended",
        width: 12,
      },
      {
        // header: "......",
        key: "bunusTeamePV",
        width: 12,
      },
      {
        // header: "......",
        key: "totalBonus",
        width: 12,
      },
    ];

    // sheet.getColumn(3).outlineLevel = 2;
    // sheet.getRow(3).outlineLevel = 2;

    const promise = Promise.all(
      selectableRow?.map(async (bonus, index) => {
        const rowNumber = index + 2;
        sheet.addRow({
          userCode: bonus?.userCode,
          bankName: bonus?.bankName,
          accountName: bonus?.accountName,
          accountNo: bonus?.accountNo,
          lastName: bonus?.lastName,
          firstName: bonus?.firstName,
          userPosition: bonus?.userPosition,
          bonuscashback: bonus?.bonuscashback,
          children_count: bonus?.children_count,
          PV: bonus?.PV,
          teamePV: bonus?.teamePV,
          cashback: bonus?.cashback,
          bunusPV: bonus?.bunusPV,
          recommended: bonus?.recommended,
          bunusTeamePV: bonus?.bunusTeamePV,
          totalBonus: bonus?.totalBonus,
        });

        // let photo = product?.images[0];
        // const result = await toDataURL(photo);
        // console.log(rowNumber);

        // const imageId2 = workbook.addImage({
        //   base64: result.base64Url,
        //   extension: "jpeg",
        // });

        // sheet.addImage(imageId2, {
        //   tl: { col: 7, row: rowNumber },
        //   ext: { width: 80, height: 50 },
        // });
      })
    );

    promise.then(() => {
      const PVCol = sheet.getColumn(5);
      const MaxBunusTeamePVCol = sheet.getColumn(10);
      const MaxTotalBonusCol = sheet.getColumn(6);

  // ============== qty ==================    
      PVCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 100 && cellValue <= MaxPV) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF0000" },
          };
        }
      });
  // ================ point total ===============
  MaxBunusTeamePVCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 1000 && cellValue <= MaxBunusTeamePV) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "05FC37" },
          };
        }
      });
  // ================ point ===============
  MaxTotalBonusCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 1000 && cellValue <= MaxTotalBonus) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "fc7005" },
          };
        }
      });

      for (var i = 1; i < selectableRow?.length + 3; i++) {
        sheet.getRow(i).height = 55;
      }

      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "ExportExcellication/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "ordersHistory.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });

    setToggleCleared(true)
  };

  return (
    <>
      <div>
        <button className="btn" onClick={exportExcelFile}>Export</button>
      </div>
    </>
  );
};

export default ExportToExcelBonus;
