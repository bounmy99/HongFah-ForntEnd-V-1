
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

const ExportToExcel = ({ data, header, setToggleCleared,setDataExport }) => {

  // console.log("data Export",data)
  // console.log("heaer Export",header[0])

  // ======== find max value ==================
  let pointsTotal = data?.map((point)=>point.totalPoint);
  let MaxTotalPoint = Math.max.apply(null,pointsTotal)

  let points = data?.map((point)=>point.productpoint);
  let MaxPoint = Math.max.apply(null,points)

  let qty = data?.map((point)=>point.productqty);
  let MaxQty = Math.max.apply(null,qty)


  const exportExcelFile = () => {

    if (!data) {
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
    setDataExport([]);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    // sheet.mergeCells("A1:B1");
    // sheet.mergeCells("C1:D1");
    // sheet.mergeCells("E1:G1");
// =========== way 1
    // sheet.getCell("A2").value = "ລະຫັດລູກຄ້າ";
    // sheet.getCell("B2").value = "ຊື່ລູກຄ້າ";
    // sheet.getCell("C2").value = "ຊື່ສິນຄ້າ";
    // sheet.getCell("D2").value = "ລາຄາສິນຄ້າ";
    // sheet.getCell("E2").value = "ຈຳນວນສິນຄ້າ";
    // sheet.getCell("F2").value = "ຄະແນນສິນຄ້າ";
    // sheet.getCell("G2").value = "ຈຳນວນລວມ";
    // sheet.getCell("H2").value = "ລາຄາລວມ";
    // sheet.getCell("I2").value = "ເງິນທີ່ໄດ້ຮັບ";
    // sheet.getCell("J2").value = "ຄະແນນທັງໝົດ";
    // sheet.getCell("K2").value = "ເງິນທີ່ໄດ້ຮັບທັງໝົດ";
    // sheet.getCell("L2").value = "ປະເພດການຈ່າຍ";
    // sheet.getCell("M2").value = "ສະຖານະ";
    // sheet.getCell("N2").value = "ວັນທີສ້າງ";
    
//================= way 2
    sheet.getCell("A2").value = header[1];
    sheet.getCell("B2").value = header[2];
    sheet.getCell("C2").value = header[3];
    sheet.getCell("D2").value = header[4];
    sheet.getCell("E2").value = header[5];
    sheet.getCell("F2").value = header[6];
    sheet.getCell("G2").value = header[7];
    sheet.getCell("H2").value = header[8];
    sheet.getCell("I2").value = header[9];
    sheet.getCell("J2").value = header[10];
    sheet.getCell("K2").value = header[11];
    sheet.getCell("L2").value = header[12];
    sheet.getCell("M2").value = header[13];
    sheet.getCell("N2").value = header[14];
    sheet.getRow(2).commit();
    // merge by start row, start column, end row, end column
    sheet.properties.defaultRowHeight = 80;
    color: {
      argb: "FFFF0000";
    }

    for (var i = 1; i < data.length; i++) {
      sheet.properties.defaultRowHeight = 80;
    }

    for (var i = 1; i < header.length; i++) {
      sheet.getRow(2).getCell(i).border = {
        top: { style: "thin", color: { argb: "9c9997" } },
        left: { style: "thin", color: { argb: "9c9997" } },
        bottom: { style: "thin", color: { argb: "9c9997" } },
        right: { style: "thin", color: { argb: "9c9997" } },
      };

      sheet.getRow(2).getCell(i).fill = {
        type: "gradient",
        gradient: "angle",
        degree: 0,
        stops: [
          { position: 0, color: { argb: "00A5E8" } },
          { position: 0.5, color: { argb: "00A5E8" } },
          { position: 1, color: { argb: "00A5E8" } },
        ],
      };
    }

    sheet.columns = [
      {
        // header: ".........",
        key: "customeruserCode",
        width: 15,
      },
      {
        // header: "........",
        key: "customerfirstName",
        width: 15,
      },
      {
        // header: ".......",
        key: "productname",
        width: 15,
      },
      {
        // header: ".......",
        key: "productprice",
        width: 15,
      },
      {
        // header: ".......",
        key: "productqty",
        width: 15,
      },
      {
        // header: ".....",
        key: "productpoint",
        width: 15,
      },
      {
        // header: "......",
        key: "totalQty",
        width: 15,
      },
      {
        // header: "......",
        key: "totalPrice",
        width: 10,
      },
      {
        // header: "......",
        key: "productcashback",
        width: 15,
      },
      {
        // header: "......",
        key: "totalPoint",
        width: 15,
      },
      {
        // header: "......",
        key: "totalCashback",
        width: 15,
      },
      {
        // header: "......",
        key: "paymentType",
        width: 15,
      },
      {
        // header: "......",
        key: "status",
        width: 12,
      },
      {
        // header: "......",
        key: "createdAt",
        width: 12,
      },
    ];
    // sheet.getColumn(3).outlineLevel = 2;
    // sheet.getRow(3).outlineLevel = 2;

    const promise = Promise.all(
      data?.map(async (product, index) => {
        const rowNumber = index + 2;
        sheet.addRow({
          customeruserCode: product?.customeruserCode,
          customerfirstName: product?.customerfirstName,
          productname: product?.productname,
          productprice: product?.productprice,
          productqty: product?.productqty,
          productpoint: product?.productpoint,
          totalQty: product?.totalQty,
          totalPrice: product?.totalPrice,
          productcashback: product?.productcashback,
          totalPoint: product?.totalPoint,
          totalCashback: product?.totalCashback,
          paymentType: product?.paymentType,
          status: product?.status,
          createdAt: moment(product?.createdAt).format("DD-MM-YYYY"),
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
      const QtyCol = sheet.getColumn(5);
      const pointsCol = sheet.getColumn(6);
      const pointTotalCol = sheet.getColumn(10);

  // ============== qty ==================    
      QtyCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 100 && cellValue <= MaxQty) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF0000" },
          };
        }
      });
  // ================ point total ===============
      pointTotalCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 1000 && cellValue <= MaxTotalPoint) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "05FC37" },
          };
        }
      });
  // ================ point ===============
      pointsCol.eachCell((cell) => {
        const cellValue = sheet.getCell(cell?.address).value;

        if (cellValue > 1000 && cellValue <= MaxPoint) {
          sheet.getCell(cell?.address).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "fc7005" },
          };
        }
      });

      for (var i = 1; i < data?.length + 3; i++) {
        sheet.getRow(i).height = 55;
      }

      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "ExportExcellication/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "ອໍເດີ້ທີ່ສຳເລັດ.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });

    setToggleCleared(true)
  };

  return (
    <>
      <div>
        <button className="btns-export" onClick={exportExcelFile}>Export</button>
      </div>
    </>
  );
};

export default ExportToExcel;
