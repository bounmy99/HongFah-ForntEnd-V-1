/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect, useRef } from "react";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  AimOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import EmptyContent from "./EmptyContent";
import { Tooltip } from "antd";
import { formatPrice } from "../functions/FormatPrices";
const Diagram = ({ linework, imagePreview }) => {
  const [scale, setScale] = useState(0.20000000000000015);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(null);

  useEffect(() => {
    const element = document.getElementById("box");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, []);

  // Zoom in function
  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };

  // Zoom Out function
  const handleZoomOut = () => {
    if (scale <= 0.2) return;
    setScale((scale) => scale - 0.1);
  };

  // Focus function
  const handleFocus = () => {
    const element = document.getElementById("box");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };
  // Focus function
  const handleResetScale = () => {
    setScale(0.20000000000000015);
  };

  // Effect for handling object dragging and zooming
  useEffect(() => {
    const elemets = zoomRef.current;

    // console.log("ZoomObj", ZoomObj);

    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    // Mouse down event handling for starting obj drag
    const handleMouseDown = (e) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    // Mouse move event  handler for dragging the obj
    const handlerMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    // Mouse up event handler for ending
    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listener
    elemets?.addEventListener("mousedown", handleMouseDown);
    elemets?.addEventListener("mousemove", handlerMouseMove);
    elemets?.addEventListener("mouseup", handleMouseUp);

    // Remove envent listener on component unmount
    return () => {
      elemets?.removeEventListener("mousedown", handleMouseDown);
      elemets?.removeEventListener("mousemove", handlerMouseMove);
      elemets?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [zoomRef, scale]);

  return (
    <>
      <div className={`genealogy-body genealogy-scroll `}>
        <div className="icons-show-hide">
          <ZoomInOutlined className="btn-zoomIn" onClick={handleZoomIn} />
          <ZoomOutOutlined className="btn-zoomOut" onClick={handleZoomOut} />
          <AimOutlined className="btn-focus" onClick={handleFocus} />
          <FullscreenExitOutlined
            className="btn-reset-scale"
            onClick={handleResetScale}
          />
        </div>
        <>
          {linework ? (
            <div
              rel={zoomRef}
              style={{
                cursor: "move",
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              }}
              draggable={false}
              className={`genealogy-tree genealogy-scroll`}
            >
              {linework && (
                <ul>
                  <li>
                    <Link to={`/lineWork/Details/${linework?._id}`}>
                      <div className="member-view-box">
                        <div className="member-image" id="box">
                          <Tooltip
                            title={
                              !linework?.user_id?.position_id &&
                              !linework?.user_id?.package_id ? (
                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                              ) : (
                                <>
                                  {linework?.user_id?.package_id && (
                                    <div>
                                      <p>
                                        ຄະແນນ :{" "}
                                        {linework?.user_id?.package_id?.PV}
                                      </p>
                                      <p>
                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ :{" "}
                                        {
                                          linework?.user_id?.package_id
                                            ?.bonusLevel
                                        }
                                      </p>
                                      <p>
                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ :{" "}
                                        <input
                                          style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            width: "80px",
                                            color: "white",
                                          }}
                                          readOnly
                                          type="text"
                                          value={
                                            linework?.user_id?.package_id
                                              ?.bonusPerLevel
                                          }
                                        />
                                      </p>
                                      <p>
                                        ແພັກເກດ :{" "}
                                        {
                                          linework?.user_id?.package_id
                                            ?.packageName
                                        }
                                      </p>
                                      <p>
                                        ຄ່າແນະນຳ :{" "}
                                        {formatPrice(
                                          linework?.user_id?.package_id
                                            ?.recommendedFee
                                        )}
                                      </p>
                                    </div>
                                  )}
                                  {linework?.user_id?.position_id && (
                                    <div>
                                      <p>
                                        ຄະແນນ :{" "}
                                        {formatPrice(
                                          linework?.user_id?.position_id?.PV
                                        )}
                                      </p>
                                      <p>
                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ :{" "}
                                        {
                                          linework?.user_id?.position_id
                                            ?.bonusLevel
                                        }
                                      </p>
                                      <p>
                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ :{" "}
                                        <input
                                          style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            width: "80px",
                                            color: "white",
                                          }}
                                          readOnly
                                          type="text"
                                          value={
                                            linework?.user_id?.package_id
                                              ?.bonusPerLevel
                                          }
                                        />
                                      </p>
                                      <p>
                                        ຕຳແໜ່ງ :{" "}
                                        {
                                          linework?.user_id?.position_id
                                            ?.packageName
                                        }
                                      </p>
                                      <p>
                                        ຄ່າແນະນຳ :{" "}
                                        {formatPrice(
                                          linework?.user_id?.position_id
                                            ?.recommendedFee
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )
                            }
                            color="#00A5E8"
                          >
                            <img
                              src={
                                linework?.user_id?.package_id?.image
                                  ? linework?.user_id?.package_id?.image
                                  : linework?.user_id?.position_id?.image
                                  ? linework?.user_id?.position_id?.image
                                  : imagePreview
                              }
                              alt="Member"
                            />
                          </Tooltip>
                          <div className="member-details">
                            <h3>
                              {linework?.user_id &&
                                linework?.user_id?.firstName}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {linework && (
                      <ul className="active">
                        <li>
                          <ul>
                            {linework?.children &&
                              linework?.children.map((level_1, index) => (
                                <>
                                  <li key={index}>
                                    <Link
                                      to={`/lineWork/Details/${level_1?._id}`}
                                    >
                                      <div className="member-view-box">
                                        <div className="member-image">
                                          <Tooltip
                                            title={
                                              !level_1?.user_id?.position_id &&
                                              !level_1?.user_id?.package_id ? (
                                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                              ) : (
                                                <>
                                                  {level_1?.user_id
                                                    ?.package_id && (
                                                    <div>
                                                      <p>
                                                        ຄະແນນ :{" "}
                                                        {formatPrice(
                                                          level_1?.user_id
                                                            ?.package_id?.PV
                                                        )}
                                                      </p>
                                                      <p>
                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ :{" "}
                                                        {
                                                          level_1?.user_id
                                                            ?.package_id
                                                            ?.bonusLevel
                                                        }
                                                      </p>
                                                      <p>
                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                        :{" "}
                                                        <input
                                                          style={{
                                                            backgroundColor:
                                                              "transparent",
                                                            border: "none",
                                                            width: "80px",
                                                            color: "white",
                                                          }}
                                                          readOnly
                                                          type="text"
                                                          value={
                                                            level_1?.user_id
                                                              ?.package_id
                                                              ?.bonusPerLevel
                                                          }
                                                        />
                                                      </p>
                                                      <p>
                                                        ແພັກເກດ :{" "}
                                                        {
                                                          level_1?.user_id
                                                            ?.package_id
                                                            ?.packageName
                                                        }
                                                      </p>
                                                      <p>
                                                        ຄ່າແນະນຳ :{" "}
                                                        {formatPrice(
                                                          level_1?.user_id
                                                            ?.package_id
                                                            ?.recommendedFee
                                                        )}
                                                      </p>
                                                    </div>
                                                  )}
                                                  {level_1?.user_id
                                                    ?.position_id && (
                                                    <div>
                                                      <p>
                                                        ຄະແນນ :{" "}
                                                        {formatPrice(
                                                          level_1?.user_id
                                                            ?.position_id?.PV
                                                        )}
                                                      </p>
                                                      <p>
                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ :{" "}
                                                        {
                                                          level_1?.user_id
                                                            ?.position_id
                                                            ?.bonusLevel
                                                        }
                                                      </p>
                                                      <p>
                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                        :{" "}
                                                        <input
                                                          style={{
                                                            backgroundColor:
                                                              "transparent",
                                                            border: "none",
                                                            width: "80px",
                                                            color: "white",
                                                          }}
                                                          readOnly
                                                          type="text"
                                                          value={
                                                            level_1?.user_id
                                                              ?.package_id
                                                              ?.bonusPerLevel
                                                          }
                                                        />
                                                      </p>
                                                      <p>
                                                        ຕຳແໜ່ງ :{" "}
                                                        {
                                                          level_1?.user_id
                                                            ?.position_id
                                                            ?.packageName
                                                        }
                                                      </p>
                                                      <p>
                                                        ຄ່າແນະນຳ :{" "}
                                                        {formatPrice(
                                                          level_1?.user_id
                                                            ?.position_id
                                                            ?.recommendedFee
                                                        )}
                                                      </p>
                                                    </div>
                                                  )}
                                                </>
                                              )
                                            }
                                            color="#00A5E8"
                                          >
                                            <img
                                              src={
                                                level_1.user_id?.package_id
                                                  ?.image
                                                  ? level_1.user_id?.package_id
                                                      ?.image
                                                  : level_1.user_id?.position_id
                                                      ?.image
                                                  ? level_1.user_id?.position_id
                                                      ?.image
                                                  : imagePreview
                                              }
                                              alt="Member"
                                            />
                                          </Tooltip>
                                          <div className="member-details">
                                            <h3>
                                              {level_1?.user_id &&
                                                level_1?.user_id?.firstName}
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                    {level_1 && (
                                      <ul>
                                        {level_1 &&
                                          level_1?.children.map(
                                            (level_2, index) => (
                                              <>
                                                <li key={index}>
                                                  <Link
                                                    to={`/lineWork/Details/${level_2?._id}`}
                                                  >
                                                    <div className="member-view-box">
                                                      <div className="member-image">
                                                        <Tooltip
                                                          title={
                                                            !level_2?.user_id
                                                              ?.position_id &&
                                                            !level_2?.user_id
                                                              ?.package_id ? (
                                                              "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                            ) : (
                                                              <>
                                                                {level_2
                                                                  ?.user_id
                                                                  ?.package_id && (
                                                                  <div>
                                                                    <p>
                                                                      ຄະແນນ :{" "}
                                                                      {formatPrice(
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.package_id
                                                                          ?.PV
                                                                      )}
                                                                    </p>
                                                                    <p>
                                                                      ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                      :{" "}
                                                                      {
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.package_id
                                                                          ?.bonusLevel
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                      :{" "}
                                                                      <input
                                                                        style={{
                                                                          backgroundColor:
                                                                            "transparent",
                                                                          border:
                                                                            "none",
                                                                          width:
                                                                            "80px",
                                                                          color:
                                                                            "white",
                                                                        }}
                                                                        readOnly
                                                                        type="text"
                                                                        value={
                                                                          level_2
                                                                            ?.user_id
                                                                            ?.package_id
                                                                            ?.bonusPerLevel
                                                                        }
                                                                      />
                                                                    </p>
                                                                    <p>
                                                                      ແພັກເກດ :{" "}
                                                                      {
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.package_id
                                                                          ?.packageName
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      ຄ່າແນະນຳ :{" "}
                                                                      {formatPrice(
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.package_id
                                                                          ?.recommendedFee
                                                                      )}
                                                                    </p>
                                                                  </div>
                                                                )}
                                                                {level_2
                                                                  ?.user_id
                                                                  ?.position_id && (
                                                                  <div>
                                                                    <p>
                                                                      ຄະແນນ :{" "}
                                                                      {formatPrice(
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.position_id
                                                                          ?.PV
                                                                      )}
                                                                    </p>
                                                                    <p>
                                                                      ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                      :{" "}
                                                                      {
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.position_id
                                                                          ?.bonusLevel
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                      :{" "}
                                                                      <input
                                                                        style={{
                                                                          backgroundColor:
                                                                            "transparent",
                                                                          border:
                                                                            "none",
                                                                          width:
                                                                            "80px",
                                                                          color:
                                                                            "white",
                                                                        }}
                                                                        readOnly
                                                                        type="text"
                                                                        value={
                                                                          level_2
                                                                            ?.user_id
                                                                            ?.package_id
                                                                            ?.bonusPerLevel
                                                                        }
                                                                      />
                                                                    </p>
                                                                    <p>
                                                                      ຕຳແໜ່ງ :{" "}
                                                                      {
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.position_id
                                                                          ?.packageName
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      ຄ່າແນະນຳ :{" "}
                                                                      {formatPrice(
                                                                        level_2
                                                                          ?.user_id
                                                                          ?.position_id
                                                                          ?.recommendedFee
                                                                      )}
                                                                    </p>
                                                                  </div>
                                                                )}
                                                              </>
                                                            )
                                                          }
                                                          color="#00A5E8"
                                                        >
                                                          <img
                                                            src={
                                                              level_2.user_id
                                                                ?.package_id
                                                                ?.image
                                                                ? level_2
                                                                    .user_id
                                                                    ?.package_id
                                                                    ?.image
                                                                : level_2
                                                                    .user_id
                                                                    ?.position_id
                                                                    ?.image
                                                                ? level_2
                                                                    .user_id
                                                                    ?.position_id
                                                                    ?.image
                                                                : imagePreview
                                                            }
                                                            alt="Member"
                                                          />
                                                        </Tooltip>
                                                        <div className="member-details">
                                                          <h3>
                                                            {level_2?.user_id &&
                                                              level_2?.user_id
                                                                ?.firstName}
                                                          </h3>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Link>
                                                  {level_2 && (
                                                    <ul>
                                                      {level_2 &&
                                                        level_2?.children.map(
                                                          (level_3, index) => (
                                                            <>
                                                              <li key={index}>
                                                                <Link
                                                                  to={`/lineWork/Details/${level_3?._id}`}
                                                                >
                                                                  <div className="member-view-box">
                                                                    <div className="member-image">
                                                                      <Tooltip
                                                                        title={
                                                                          !level_3
                                                                            ?.user_id
                                                                            ?.position_id &&
                                                                          !level_3
                                                                            ?.user_id
                                                                            ?.package_id ? (
                                                                            "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                          ) : (
                                                                            <>
                                                                              {level_3
                                                                                ?.user_id
                                                                                ?.package_id && (
                                                                                <div>
                                                                                  <p>
                                                                                    ຄະແນນ
                                                                                    :{" "}
                                                                                    {formatPrice(
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.package_id
                                                                                        ?.PV
                                                                                    )}
                                                                                  </p>
                                                                                  <p>
                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                    :{" "}
                                                                                    {
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.package_id
                                                                                        ?.bonusLevel
                                                                                    }
                                                                                  </p>
                                                                                  <p>
                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                    :{" "}
                                                                                    <input
                                                                                      style={{
                                                                                        backgroundColor:
                                                                                          "transparent",
                                                                                        border:
                                                                                          "none",
                                                                                        width:
                                                                                          "80px",
                                                                                        color:
                                                                                          "white",
                                                                                      }}
                                                                                      readOnly
                                                                                      type="text"
                                                                                      value={
                                                                                        level_3
                                                                                          ?.user_id
                                                                                          ?.package_id
                                                                                          ?.bonusPerLevel
                                                                                      }
                                                                                    />
                                                                                  </p>
                                                                                  <p>
                                                                                    ແພັກເກດ
                                                                                    :{" "}
                                                                                    {
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.package_id
                                                                                        ?.packageName
                                                                                    }
                                                                                  </p>
                                                                                  <p>
                                                                                    ຄ່າແນະນຳ
                                                                                    :{" "}
                                                                                    {formatPrice(
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.package_id
                                                                                        ?.recommendedFee
                                                                                    )}
                                                                                  </p>
                                                                                </div>
                                                                              )}
                                                                              {level_3
                                                                                ?.user_id
                                                                                ?.position_id && (
                                                                                <div>
                                                                                  <p>
                                                                                    ຄະແນນ
                                                                                    :{" "}
                                                                                    {formatPrice(
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.position_id
                                                                                        ?.PV
                                                                                    )}
                                                                                  </p>
                                                                                  <p>
                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                    :{" "}
                                                                                    {
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.position_id
                                                                                        ?.bonusLevel
                                                                                    }
                                                                                  </p>
                                                                                  <p>
                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                    :{" "}
                                                                                    <input
                                                                                      style={{
                                                                                        backgroundColor:
                                                                                          "transparent",
                                                                                        border:
                                                                                          "none",
                                                                                        width:
                                                                                          "80px",
                                                                                        color:
                                                                                          "white",
                                                                                      }}
                                                                                      readOnly
                                                                                      type="text"
                                                                                      value={
                                                                                        level_3
                                                                                          ?.user_id
                                                                                          ?.package_id
                                                                                          ?.bonusPerLevel
                                                                                      }
                                                                                    />
                                                                                  </p>
                                                                                  <p>
                                                                                    ຕຳແໜ່ງ
                                                                                    :{" "}
                                                                                    {
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.position_id
                                                                                        ?.packageName
                                                                                    }
                                                                                  </p>
                                                                                  <p>
                                                                                    ຄ່າແນະນຳ
                                                                                    :{" "}
                                                                                    {formatPrice(
                                                                                      level_3
                                                                                        ?.user_id
                                                                                        ?.position_id
                                                                                        ?.recommendedFee
                                                                                    )}
                                                                                  </p>
                                                                                </div>
                                                                              )}
                                                                            </>
                                                                          )
                                                                        }
                                                                        color="#00A5E8"
                                                                      >
                                                                        <img
                                                                          src={
                                                                            level_3
                                                                              .user_id
                                                                              ?.package_id
                                                                              ?.image
                                                                              ? level_3
                                                                                  .user_id
                                                                                  ?.package_id
                                                                                  ?.image
                                                                              : level_3
                                                                                  .user_id
                                                                                  ?.position_id
                                                                                  ?.image
                                                                              ? level_3
                                                                                  .user_id
                                                                                  ?.position_id
                                                                                  ?.image
                                                                              : imagePreview
                                                                          }
                                                                          alt="Member"
                                                                        />
                                                                      </Tooltip>
                                                                      <div className="member-details">
                                                                        <h3>
                                                                          {level_3?.user_id &&
                                                                            level_3
                                                                              ?.user_id
                                                                              ?.firstName}
                                                                        </h3>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </Link>
                                                                <ul>
                                                                  {level_3 &&
                                                                    level_3?.children.map(
                                                                      (
                                                                        level_4,
                                                                        index
                                                                      ) => (
                                                                        <>
                                                                          <li
                                                                            key={
                                                                              index
                                                                            }
                                                                          >
                                                                            <Link
                                                                              to={`/lineWork/Details/${level_4?._id}`}
                                                                            >
                                                                              <div className="member-view-box">
                                                                                <div className="member-image">
                                                                                  <Tooltip
                                                                                    title={
                                                                                      !level_4
                                                                                        ?.user_id
                                                                                        ?.position_id &&
                                                                                      !level_4
                                                                                        ?.user_id
                                                                                        ?.package_id ? (
                                                                                        "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                      ) : (
                                                                                        <>
                                                                                          {level_4
                                                                                            ?.user_id
                                                                                            ?.package_id && (
                                                                                            <div>
                                                                                              <p>
                                                                                                ຄະແນນ
                                                                                                :{" "}
                                                                                                {formatPrice(
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.package_id
                                                                                                    ?.PV
                                                                                                )}
                                                                                              </p>
                                                                                              <p>
                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                :{" "}
                                                                                                {
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.package_id
                                                                                                    ?.bonusLevel
                                                                                                }
                                                                                              </p>
                                                                                              <p>
                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                :{" "}
                                                                                                <input
                                                                                                  style={{
                                                                                                    backgroundColor:
                                                                                                      "transparent",
                                                                                                    border:
                                                                                                      "none",
                                                                                                    width:
                                                                                                      "80px",
                                                                                                    color:
                                                                                                      "white",
                                                                                                  }}
                                                                                                  readOnly
                                                                                                  type="text"
                                                                                                  value={
                                                                                                    level_4
                                                                                                      ?.user_id
                                                                                                      ?.package_id
                                                                                                      ?.bonusPerLevel
                                                                                                  }
                                                                                                />
                                                                                              </p>
                                                                                              <p>
                                                                                                ແພັກເກດ
                                                                                                :{" "}
                                                                                                {
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.package_id
                                                                                                    ?.packageName
                                                                                                }
                                                                                              </p>
                                                                                              <p>
                                                                                                ຄ່າແນະນຳ
                                                                                                :{" "}
                                                                                                {formatPrice(
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.package_id
                                                                                                    ?.recommendedFee
                                                                                                )}
                                                                                              </p>
                                                                                            </div>
                                                                                          )}
                                                                                          {level_4
                                                                                            ?.user_id
                                                                                            ?.position_id && (
                                                                                            <div>
                                                                                              <p>
                                                                                                ຄະແນນ
                                                                                                :{" "}
                                                                                                {formatPrice(
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.position_id
                                                                                                    ?.PV
                                                                                                )}
                                                                                              </p>
                                                                                              <p>
                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                :{" "}
                                                                                                {
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.position_id
                                                                                                    ?.bonusLevel
                                                                                                }
                                                                                              </p>
                                                                                              <p>
                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                :{" "}
                                                                                                <input
                                                                                                  style={{
                                                                                                    backgroundColor:
                                                                                                      "transparent",
                                                                                                    border:
                                                                                                      "none",
                                                                                                    width:
                                                                                                      "80px",
                                                                                                    color:
                                                                                                      "white",
                                                                                                  }}
                                                                                                  readOnly
                                                                                                  type="text"
                                                                                                  value={
                                                                                                    level_4
                                                                                                      ?.user_id
                                                                                                      ?.package_id
                                                                                                      ?.bonusPerLevel
                                                                                                  }
                                                                                                />
                                                                                              </p>
                                                                                              <p>
                                                                                                ຕຳແໜ່ງ
                                                                                                :{" "}
                                                                                                {
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.position_id
                                                                                                    ?.packageName
                                                                                                }
                                                                                              </p>
                                                                                              <p>
                                                                                                ຄ່າແນະນຳ
                                                                                                :{" "}
                                                                                                {formatPrice(
                                                                                                  level_4
                                                                                                    ?.user_id
                                                                                                    ?.position_id
                                                                                                    ?.recommendedFee
                                                                                                )}
                                                                                              </p>
                                                                                            </div>
                                                                                          )}
                                                                                        </>
                                                                                      )
                                                                                    }
                                                                                    color="#00A5E8"
                                                                                  >
                                                                                    <img
                                                                                      src={
                                                                                        level_4
                                                                                          .user_id
                                                                                          ?.package_id
                                                                                          ?.image
                                                                                          ? level_4
                                                                                              .user_id
                                                                                              ?.package_id
                                                                                              ?.image
                                                                                          : level_4
                                                                                              .user_id
                                                                                              ?.position_id
                                                                                              ?.image
                                                                                          ? level_4
                                                                                              .user_id
                                                                                              ?.position_id
                                                                                              ?.image
                                                                                          : imagePreview
                                                                                      }
                                                                                      alt="Member"
                                                                                    />
                                                                                  </Tooltip>
                                                                                  <div className="member-details">
                                                                                    <h3>
                                                                                      {level_4?.user_id &&
                                                                                        level_4
                                                                                          ?.user_id
                                                                                          ?.firstName}
                                                                                    </h3>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </Link>
                                                                            <ul>
                                                                              {level_4 &&
                                                                                level_4?.children.map(
                                                                                  (
                                                                                    level_5,
                                                                                    index
                                                                                  ) => (
                                                                                    <>
                                                                                      <li
                                                                                        key={
                                                                                          index
                                                                                        }
                                                                                      >
                                                                                        <Link
                                                                                          to={`/lineWork/Details/${level_5?._id}`}
                                                                                        >
                                                                                          <div className="member-view-box">
                                                                                            <div className="member-image">
                                                                                              <Tooltip
                                                                                                title={
                                                                                                  !level_5
                                                                                                    ?.user_id
                                                                                                    ?.position_id &&
                                                                                                  !level_5
                                                                                                    ?.user_id
                                                                                                    ?.package_id ? (
                                                                                                    "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                  ) : (
                                                                                                    <>
                                                                                                      {level_5
                                                                                                        ?.user_id
                                                                                                        ?.package_id && (
                                                                                                        <div>
                                                                                                          <p>
                                                                                                            ຄະແນນ
                                                                                                            :{" "}
                                                                                                            {formatPrice(
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.package_id
                                                                                                                ?.PV
                                                                                                            )}
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                            :{" "}
                                                                                                            {
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.package_id
                                                                                                                ?.bonusLevel
                                                                                                            }
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                            :{" "}
                                                                                                            <input
                                                                                                              style={{
                                                                                                                backgroundColor:
                                                                                                                  "transparent",
                                                                                                                border:
                                                                                                                  "none",
                                                                                                                width:
                                                                                                                  "80px",
                                                                                                                color:
                                                                                                                  "white",
                                                                                                              }}
                                                                                                              readOnly
                                                                                                              type="text"
                                                                                                              value={
                                                                                                                level_5
                                                                                                                  ?.user_id
                                                                                                                  ?.package_id
                                                                                                                  ?.bonusPerLevel
                                                                                                              }
                                                                                                            />
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ແພັກເກດ
                                                                                                            :{" "}
                                                                                                            {
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.package_id
                                                                                                                ?.packageName
                                                                                                            }
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ຄ່າແນະນຳ
                                                                                                            :{" "}
                                                                                                            {formatPrice(
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.package_id
                                                                                                                ?.recommendedFee
                                                                                                            )}
                                                                                                          </p>
                                                                                                        </div>
                                                                                                      )}
                                                                                                      {level_5
                                                                                                        ?.user_id
                                                                                                        ?.position_id && (
                                                                                                        <div>
                                                                                                          <p>
                                                                                                            ຄະແນນ
                                                                                                            :{" "}
                                                                                                            {formatPrice(
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.position_id
                                                                                                                ?.PV
                                                                                                            )}
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                            :{" "}
                                                                                                            {
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.position_id
                                                                                                                ?.bonusLevel
                                                                                                            }
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                            :{" "}
                                                                                                            <input
                                                                                                              style={{
                                                                                                                backgroundColor:
                                                                                                                  "transparent",
                                                                                                                border:
                                                                                                                  "none",
                                                                                                                width:
                                                                                                                  "80px",
                                                                                                                color:
                                                                                                                  "white",
                                                                                                              }}
                                                                                                              readOnly
                                                                                                              type="text"
                                                                                                              value={
                                                                                                                level_5
                                                                                                                  ?.user_id
                                                                                                                  ?.package_id
                                                                                                                  ?.bonusPerLevel
                                                                                                              }
                                                                                                            />
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ຕຳແໜ່ງ
                                                                                                            :{" "}
                                                                                                            {
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.position_id
                                                                                                                ?.packageName
                                                                                                            }
                                                                                                          </p>
                                                                                                          <p>
                                                                                                            ຄ່າແນະນຳ
                                                                                                            :{" "}
                                                                                                            {formatPrice(
                                                                                                              level_5
                                                                                                                ?.user_id
                                                                                                                ?.position_id
                                                                                                                ?.recommendedFee
                                                                                                            )}
                                                                                                          </p>
                                                                                                        </div>
                                                                                                      )}
                                                                                                    </>
                                                                                                  )
                                                                                                }
                                                                                                color="#00A5E8"
                                                                                              >
                                                                                                <img
                                                                                                  src={
                                                                                                    level_5
                                                                                                      .user_id
                                                                                                      ?.package_id
                                                                                                      ?.image
                                                                                                      ? level_5
                                                                                                          .user_id
                                                                                                          ?.package_id
                                                                                                          ?.image
                                                                                                      : level_5
                                                                                                          .user_id
                                                                                                          ?.position_id
                                                                                                          ?.image
                                                                                                      ? level_5
                                                                                                          .user_id
                                                                                                          ?.position_id
                                                                                                          ?.image
                                                                                                      : imagePreview
                                                                                                  }
                                                                                                  alt="Member"
                                                                                                />
                                                                                              </Tooltip>
                                                                                              <div className="member-details">
                                                                                                <h3>
                                                                                                  {level_5.user_id &&
                                                                                                    level_5
                                                                                                      ?.user_id
                                                                                                      ?.firstName}
                                                                                                </h3>
                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                        </Link>
                                                                                        <ul>
                                                                                          {level_5 &&
                                                                                            level_5?.children.map(
                                                                                              (
                                                                                                level_6,
                                                                                                index
                                                                                              ) => (
                                                                                                <>
                                                                                                  <li
                                                                                                    key={
                                                                                                      index
                                                                                                    }
                                                                                                  >
                                                                                                    <Link
                                                                                                      to={`/lineWork/Details/${level_6?._id}`}
                                                                                                    >
                                                                                                      <div className="member-view-box">
                                                                                                        <div className="member-image">
                                                                                                          <Tooltip
                                                                                                            title={
                                                                                                              !level_6
                                                                                                                ?.user_id
                                                                                                                ?.position_id &&
                                                                                                              !level_6
                                                                                                                ?.user_id
                                                                                                                ?.package_id ? (
                                                                                                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                              ) : (
                                                                                                                <>
                                                                                                                  {level_6
                                                                                                                    ?.user_id
                                                                                                                    ?.package_id && (
                                                                                                                    <div>
                                                                                                                      <p>
                                                                                                                        ຄະແນນ
                                                                                                                        :{" "}
                                                                                                                        {formatPrice(
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.package_id
                                                                                                                            ?.PV
                                                                                                                        )}
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                        :{" "}
                                                                                                                        {
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.package_id
                                                                                                                            ?.bonusLevel
                                                                                                                        }
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                        :{" "}
                                                                                                                        <input
                                                                                                                          style={{
                                                                                                                            backgroundColor:
                                                                                                                              "transparent",
                                                                                                                            border:
                                                                                                                              "none",
                                                                                                                            width:
                                                                                                                              "80px",
                                                                                                                            color:
                                                                                                                              "white",
                                                                                                                          }}
                                                                                                                          readOnly
                                                                                                                          type="text"
                                                                                                                          value={
                                                                                                                            level_6
                                                                                                                              ?.user_id
                                                                                                                              ?.package_id
                                                                                                                              ?.bonusPerLevel
                                                                                                                          }
                                                                                                                        />
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ແພັກເກດ
                                                                                                                        :{" "}
                                                                                                                        {
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.package_id
                                                                                                                            ?.packageName
                                                                                                                        }
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ຄ່າແນະນຳ
                                                                                                                        :{" "}
                                                                                                                        {formatPrice(
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.package_id
                                                                                                                            ?.recommendedFee
                                                                                                                        )}
                                                                                                                      </p>
                                                                                                                    </div>
                                                                                                                  )}
                                                                                                                  {level_6
                                                                                                                    ?.user_id
                                                                                                                    ?.position_id && (
                                                                                                                    <div>
                                                                                                                      <p>
                                                                                                                        ຄະແນນ
                                                                                                                        :{" "}
                                                                                                                        {formatPrice(
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id
                                                                                                                            ?.PV
                                                                                                                        )}
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                        :{" "}
                                                                                                                        {
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id
                                                                                                                            ?.bonusLevel
                                                                                                                        }
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                        :{" "}
                                                                                                                        <input
                                                                                                                          style={{
                                                                                                                            backgroundColor:
                                                                                                                              "transparent",
                                                                                                                            border:
                                                                                                                              "none",
                                                                                                                            width:
                                                                                                                              "80px",
                                                                                                                            color:
                                                                                                                              "white",
                                                                                                                          }}
                                                                                                                          readOnly
                                                                                                                          type="text"
                                                                                                                          value={
                                                                                                                            level_6
                                                                                                                              ?.user_id
                                                                                                                              ?.package_id
                                                                                                                              ?.bonusPerLevel
                                                                                                                          }
                                                                                                                        />
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ຕຳແໜ່ງ
                                                                                                                        :{" "}
                                                                                                                        {
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id
                                                                                                                            ?.packageName
                                                                                                                        }
                                                                                                                      </p>
                                                                                                                      <p>
                                                                                                                        ຄ່າແນະນຳ
                                                                                                                        :{" "}
                                                                                                                        {formatPrice(
                                                                                                                          level_6
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id
                                                                                                                            ?.recommendedFee
                                                                                                                        )}
                                                                                                                      </p>
                                                                                                                    </div>
                                                                                                                  )}
                                                                                                                </>
                                                                                                              )
                                                                                                            }
                                                                                                            color="#00A5E8"
                                                                                                          >
                                                                                                            <img
                                                                                                              src={
                                                                                                                level_6
                                                                                                                  .user_id
                                                                                                                  ?.package_id
                                                                                                                  ?.image
                                                                                                                  ? level_6
                                                                                                                      .user_id
                                                                                                                      ?.package_id
                                                                                                                      ?.image
                                                                                                                  : level_6
                                                                                                                      .user_id
                                                                                                                      ?.position_id
                                                                                                                      ?.image
                                                                                                                  ? level_6
                                                                                                                      .user_id
                                                                                                                      ?.position_id
                                                                                                                      ?.image
                                                                                                                  : imagePreview
                                                                                                              }
                                                                                                              alt="Member"
                                                                                                            />
                                                                                                          </Tooltip>
                                                                                                          <div className="member-details">
                                                                                                            <h3>
                                                                                                              {level_6?.user_id &&
                                                                                                                level_6
                                                                                                                  ?.user_id
                                                                                                                  ?.firstName}
                                                                                                            </h3>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </Link>
                                                                                                    <ul>
                                                                                                      {level_6 &&
                                                                                                        level_6?.children.map(
                                                                                                          (
                                                                                                            level_7,
                                                                                                            index
                                                                                                          ) => (
                                                                                                            <>
                                                                                                              <li
                                                                                                                key={
                                                                                                                  index
                                                                                                                }
                                                                                                              >
                                                                                                                <Link
                                                                                                                  to={`/lineWork/Details/${level_7?._id}`}
                                                                                                                >
                                                                                                                  <div className="member-view-box">
                                                                                                                    <div className="member-image">
                                                                                                                      <Tooltip
                                                                                                                        title={
                                                                                                                          !level_7
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id &&
                                                                                                                          !level_7
                                                                                                                            ?.user_id
                                                                                                                            ?.package_id ? (
                                                                                                                            "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                          ) : (
                                                                                                                            <>
                                                                                                                              {level_7
                                                                                                                                ?.user_id
                                                                                                                                ?.package_id && (
                                                                                                                                <div>
                                                                                                                                  <p>
                                                                                                                                    ຄະແນນ
                                                                                                                                    :{" "}
                                                                                                                                    {formatPrice(
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.package_id
                                                                                                                                        ?.PV
                                                                                                                                    )}
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                    :{" "}
                                                                                                                                    {
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.package_id
                                                                                                                                        ?.bonusLevel
                                                                                                                                    }
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                    :{" "}
                                                                                                                                    <input
                                                                                                                                      style={{
                                                                                                                                        backgroundColor:
                                                                                                                                          "transparent",
                                                                                                                                        border:
                                                                                                                                          "none",
                                                                                                                                        width:
                                                                                                                                          "80px",
                                                                                                                                        color:
                                                                                                                                          "white",
                                                                                                                                      }}
                                                                                                                                      readOnly
                                                                                                                                      type="text"
                                                                                                                                      value={
                                                                                                                                        level_7
                                                                                                                                          ?.user_id
                                                                                                                                          ?.package_id
                                                                                                                                          ?.bonusPerLevel
                                                                                                                                      }
                                                                                                                                    />
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ແພັກເກດ
                                                                                                                                    :{" "}
                                                                                                                                    {
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.package_id
                                                                                                                                        ?.packageName
                                                                                                                                    }
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                    :{" "}
                                                                                                                                    {formatPrice(
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.package_id
                                                                                                                                        ?.recommendedFee
                                                                                                                                    )}
                                                                                                                                  </p>
                                                                                                                                </div>
                                                                                                                              )}
                                                                                                                              {level_7
                                                                                                                                ?.user_id
                                                                                                                                ?.position_id && (
                                                                                                                                <div>
                                                                                                                                  <p>
                                                                                                                                    ຄະແນນ
                                                                                                                                    :{" "}
                                                                                                                                    {formatPrice(
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id
                                                                                                                                        ?.PV
                                                                                                                                    )}
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                    :{" "}
                                                                                                                                    {
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id
                                                                                                                                        ?.bonusLevel
                                                                                                                                    }
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                    :{" "}
                                                                                                                                    <input
                                                                                                                                      style={{
                                                                                                                                        backgroundColor:
                                                                                                                                          "transparent",
                                                                                                                                        border:
                                                                                                                                          "none",
                                                                                                                                        width:
                                                                                                                                          "80px",
                                                                                                                                        color:
                                                                                                                                          "white",
                                                                                                                                      }}
                                                                                                                                      readOnly
                                                                                                                                      type="text"
                                                                                                                                      value={
                                                                                                                                        level_7
                                                                                                                                          ?.user_id
                                                                                                                                          ?.package_id
                                                                                                                                          ?.bonusPerLevel
                                                                                                                                      }
                                                                                                                                    />
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ຕຳແໜ່ງ
                                                                                                                                    :{" "}
                                                                                                                                    {
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id
                                                                                                                                        ?.packageName
                                                                                                                                    }
                                                                                                                                  </p>
                                                                                                                                  <p>
                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                    :{" "}
                                                                                                                                    {formatPrice(
                                                                                                                                      level_7
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id
                                                                                                                                        ?.recommendedFee
                                                                                                                                    )}
                                                                                                                                  </p>
                                                                                                                                </div>
                                                                                                                              )}
                                                                                                                            </>
                                                                                                                          )
                                                                                                                        }
                                                                                                                        color="#00A5E8"
                                                                                                                      >
                                                                                                                        <img
                                                                                                                          src={
                                                                                                                            level_7
                                                                                                                              .user_id
                                                                                                                              ?.package_id
                                                                                                                              ?.image
                                                                                                                              ? level_7
                                                                                                                                  .user_id
                                                                                                                                  ?.package_id
                                                                                                                                  ?.image
                                                                                                                              : level_7
                                                                                                                                  .user_id
                                                                                                                                  ?.position_id
                                                                                                                                  ?.image
                                                                                                                              ? level_7
                                                                                                                                  .user_id
                                                                                                                                  ?.position_id
                                                                                                                                  ?.image
                                                                                                                              : imagePreview
                                                                                                                          }
                                                                                                                          alt="Member"
                                                                                                                        />
                                                                                                                      </Tooltip>
                                                                                                                      <div className="member-details">
                                                                                                                        <h3>
                                                                                                                          {level_7?.user_id &&
                                                                                                                            level_7
                                                                                                                              ?.user_id
                                                                                                                              ?.firstName}
                                                                                                                        </h3>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </div>
                                                                                                                </Link>
                                                                                                                <ul>
                                                                                                                  {level_7 &&
                                                                                                                    level_7?.children.map(
                                                                                                                      (
                                                                                                                        level_8,
                                                                                                                        index
                                                                                                                      ) => (
                                                                                                                        <>
                                                                                                                          <li
                                                                                                                            key={
                                                                                                                              index
                                                                                                                            }
                                                                                                                          >
                                                                                                                            <Link
                                                                                                                              to={`/lineWork/Details/${level_8?._id}`}
                                                                                                                            >
                                                                                                                              <div className="member-view-box">
                                                                                                                                <div className="member-image">
                                                                                                                                  <Tooltip
                                                                                                                                    title={
                                                                                                                                      !level_8
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id &&
                                                                                                                                      !level_8
                                                                                                                                        ?.user_id
                                                                                                                                        ?.package_id ? (
                                                                                                                                        "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                      ) : (
                                                                                                                                        <>
                                                                                                                                          {level_8
                                                                                                                                            ?.user_id
                                                                                                                                            ?.package_id && (
                                                                                                                                            <div>
                                                                                                                                              <p>
                                                                                                                                                ຄະແນນ
                                                                                                                                                :{" "}
                                                                                                                                                {formatPrice(
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.package_id
                                                                                                                                                    ?.PV
                                                                                                                                                )}
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                :{" "}
                                                                                                                                                {
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.package_id
                                                                                                                                                    ?.bonusLevel
                                                                                                                                                }
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                :{" "}
                                                                                                                                                <input
                                                                                                                                                  style={{
                                                                                                                                                    backgroundColor:
                                                                                                                                                      "transparent",
                                                                                                                                                    border:
                                                                                                                                                      "none",
                                                                                                                                                    width:
                                                                                                                                                      "80px",
                                                                                                                                                    color:
                                                                                                                                                      "white",
                                                                                                                                                  }}
                                                                                                                                                  readOnly
                                                                                                                                                  type="text"
                                                                                                                                                  value={
                                                                                                                                                    level_8
                                                                                                                                                      ?.user_id
                                                                                                                                                      ?.package_id
                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                  }
                                                                                                                                                />
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ແພັກເກດ
                                                                                                                                                :{" "}
                                                                                                                                                {
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.package_id
                                                                                                                                                    ?.packageName
                                                                                                                                                }
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                :{" "}
                                                                                                                                                {formatPrice(
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.package_id
                                                                                                                                                    ?.recommendedFee
                                                                                                                                                )}
                                                                                                                                              </p>
                                                                                                                                            </div>
                                                                                                                                          )}
                                                                                                                                          {level_8
                                                                                                                                            ?.user_id
                                                                                                                                            ?.position_id && (
                                                                                                                                            <div>
                                                                                                                                              <p>
                                                                                                                                                ຄະແນນ
                                                                                                                                                :{" "}
                                                                                                                                                {formatPrice(
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id
                                                                                                                                                    ?.PV
                                                                                                                                                )}
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                :{" "}
                                                                                                                                                {
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id
                                                                                                                                                    ?.bonusLevel
                                                                                                                                                }
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                :{" "}
                                                                                                                                                <input
                                                                                                                                                  style={{
                                                                                                                                                    backgroundColor:
                                                                                                                                                      "transparent",
                                                                                                                                                    border:
                                                                                                                                                      "none",
                                                                                                                                                    width:
                                                                                                                                                      "80px",
                                                                                                                                                    color:
                                                                                                                                                      "white",
                                                                                                                                                  }}
                                                                                                                                                  readOnly
                                                                                                                                                  type="text"
                                                                                                                                                  value={
                                                                                                                                                    level_8
                                                                                                                                                      ?.user_id
                                                                                                                                                      ?.package_id
                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                  }
                                                                                                                                                />
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ຕຳແໜ່ງ
                                                                                                                                                :{" "}
                                                                                                                                                {
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id
                                                                                                                                                    ?.packageName
                                                                                                                                                }
                                                                                                                                              </p>
                                                                                                                                              <p>
                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                :{" "}
                                                                                                                                                {formatPrice(
                                                                                                                                                  level_8
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id
                                                                                                                                                    ?.recommendedFee
                                                                                                                                                )}
                                                                                                                                              </p>
                                                                                                                                            </div>
                                                                                                                                          )}
                                                                                                                                        </>
                                                                                                                                      )
                                                                                                                                    }
                                                                                                                                    color="#00A5E8"
                                                                                                                                  >
                                                                                                                                    <img
                                                                                                                                      src={
                                                                                                                                        level_8
                                                                                                                                          .user_id
                                                                                                                                          ?.package_id
                                                                                                                                          ?.image
                                                                                                                                          ? level_8
                                                                                                                                              .user_id
                                                                                                                                              ?.package_id
                                                                                                                                              ?.image
                                                                                                                                          : level_8
                                                                                                                                              .user_id
                                                                                                                                              ?.position_id
                                                                                                                                              ?.image
                                                                                                                                          ? level_8
                                                                                                                                              .user_id
                                                                                                                                              ?.position_id
                                                                                                                                              ?.image
                                                                                                                                          : imagePreview
                                                                                                                                      }
                                                                                                                                      alt="Member"
                                                                                                                                    />
                                                                                                                                  </Tooltip>
                                                                                                                                  <div className="member-details">
                                                                                                                                    <h3>
                                                                                                                                      {level_8?.user_id &&
                                                                                                                                        level_8
                                                                                                                                          ?.user_id
                                                                                                                                          ?.firstName}
                                                                                                                                    </h3>
                                                                                                                                  </div>
                                                                                                                                </div>
                                                                                                                              </div>
                                                                                                                            </Link>
                                                                                                                            <ul>
                                                                                                                              {level_8 &&
                                                                                                                                level_8?.children.map(
                                                                                                                                  (
                                                                                                                                    level_9,
                                                                                                                                    index
                                                                                                                                  ) => (
                                                                                                                                    <>
                                                                                                                                      <li
                                                                                                                                        key={
                                                                                                                                          index
                                                                                                                                        }
                                                                                                                                      >
                                                                                                                                        <Link
                                                                                                                                          to={`/lineWork/Details/${level_9?._id}`}
                                                                                                                                        >
                                                                                                                                          <div className="member-view-box">
                                                                                                                                            <div className="member-image">
                                                                                                                                              <Tooltip
                                                                                                                                                title={
                                                                                                                                                  !level_9
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id &&
                                                                                                                                                  !level_9
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.package_id ? (
                                                                                                                                                    "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                  ) : (
                                                                                                                                                    <>
                                                                                                                                                      {level_9
                                                                                                                                                        ?.user_id
                                                                                                                                                        ?.package_id && (
                                                                                                                                                        <div>
                                                                                                                                                          <p>
                                                                                                                                                            ຄະແນນ
                                                                                                                                                            :{" "}
                                                                                                                                                            {formatPrice(
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.package_id
                                                                                                                                                                ?.PV
                                                                                                                                                            )}
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                            :{" "}
                                                                                                                                                            {
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.package_id
                                                                                                                                                                ?.bonusLevel
                                                                                                                                                            }
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                            :{" "}
                                                                                                                                                            <input
                                                                                                                                                              style={{
                                                                                                                                                                backgroundColor:
                                                                                                                                                                  "transparent",
                                                                                                                                                                border:
                                                                                                                                                                  "none",
                                                                                                                                                                width:
                                                                                                                                                                  "80px",
                                                                                                                                                                color:
                                                                                                                                                                  "white",
                                                                                                                                                              }}
                                                                                                                                                              readOnly
                                                                                                                                                              type="text"
                                                                                                                                                              value={
                                                                                                                                                                level_9
                                                                                                                                                                  ?.user_id
                                                                                                                                                                  ?.package_id
                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                              }
                                                                                                                                                            />
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ແພັກເກດ
                                                                                                                                                            :{" "}
                                                                                                                                                            {
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.package_id
                                                                                                                                                                ?.packageName
                                                                                                                                                            }
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                            :{" "}
                                                                                                                                                            {formatPrice(
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.package_id
                                                                                                                                                                ?.recommendedFee
                                                                                                                                                            )}
                                                                                                                                                          </p>
                                                                                                                                                        </div>
                                                                                                                                                      )}
                                                                                                                                                      {level_9
                                                                                                                                                        ?.user_id
                                                                                                                                                        ?.position_id && (
                                                                                                                                                        <div>
                                                                                                                                                          <p>
                                                                                                                                                            ຄະແນນ
                                                                                                                                                            :{" "}
                                                                                                                                                            {formatPrice(
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id
                                                                                                                                                                ?.PV
                                                                                                                                                            )}
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                            :{" "}
                                                                                                                                                            {
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id
                                                                                                                                                                ?.bonusLevel
                                                                                                                                                            }
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                            :{" "}
                                                                                                                                                            <input
                                                                                                                                                              style={{
                                                                                                                                                                backgroundColor:
                                                                                                                                                                  "transparent",
                                                                                                                                                                border:
                                                                                                                                                                  "none",
                                                                                                                                                                width:
                                                                                                                                                                  "80px",
                                                                                                                                                                color:
                                                                                                                                                                  "white",
                                                                                                                                                              }}
                                                                                                                                                              readOnly
                                                                                                                                                              type="text"
                                                                                                                                                              value={
                                                                                                                                                                level_9
                                                                                                                                                                  ?.user_id
                                                                                                                                                                  ?.package_id
                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                              }
                                                                                                                                                            />
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ຕຳແໜ່ງ
                                                                                                                                                            :{" "}
                                                                                                                                                            {
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id
                                                                                                                                                                ?.packageName
                                                                                                                                                            }
                                                                                                                                                          </p>
                                                                                                                                                          <p>
                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                            :{" "}
                                                                                                                                                            {formatPrice(
                                                                                                                                                              level_9
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id
                                                                                                                                                                ?.recommendedFee
                                                                                                                                                            )}
                                                                                                                                                          </p>
                                                                                                                                                        </div>
                                                                                                                                                      )}
                                                                                                                                                    </>
                                                                                                                                                  )
                                                                                                                                                }
                                                                                                                                                color="#00A5E8"
                                                                                                                                              >
                                                                                                                                                <img
                                                                                                                                                  src={
                                                                                                                                                    level_9
                                                                                                                                                      .user_id
                                                                                                                                                      ?.package_id
                                                                                                                                                      ?.image
                                                                                                                                                      ? level_9
                                                                                                                                                          .user_id
                                                                                                                                                          ?.package_id
                                                                                                                                                          ?.image
                                                                                                                                                      : level_9
                                                                                                                                                          .user_id
                                                                                                                                                          ?.position_id
                                                                                                                                                          ?.image
                                                                                                                                                      ? level_9
                                                                                                                                                          .user_id
                                                                                                                                                          ?.position_id
                                                                                                                                                          ?.image
                                                                                                                                                      : imagePreview
                                                                                                                                                  }
                                                                                                                                                  alt="Member"
                                                                                                                                                />
                                                                                                                                              </Tooltip>
                                                                                                                                              <div className="member-details">
                                                                                                                                                <h3>
                                                                                                                                                  {level_9?.user_id &&
                                                                                                                                                    level_9
                                                                                                                                                      ?.user_id
                                                                                                                                                      ?.firstName}
                                                                                                                                                </h3>
                                                                                                                                              </div>
                                                                                                                                            </div>
                                                                                                                                          </div>
                                                                                                                                        </Link>
                                                                                                                                        <ul>
                                                                                                                                          {level_9 &&
                                                                                                                                            level_9?.children.map(
                                                                                                                                              (
                                                                                                                                                level_10,
                                                                                                                                                index
                                                                                                                                              ) => (
                                                                                                                                                <>
                                                                                                                                                  <li
                                                                                                                                                    key={
                                                                                                                                                      index
                                                                                                                                                    }
                                                                                                                                                  >
                                                                                                                                                    <Link
                                                                                                                                                      to={`/lineWork/Details/${level_10?._id}`}
                                                                                                                                                    >
                                                                                                                                                      <div className="member-view-box">
                                                                                                                                                        <div className="member-image">
                                                                                                                                                          <Tooltip
                                                                                                                                                            title={
                                                                                                                                                              !level_10
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id &&
                                                                                                                                                              !level_10
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.package_id ? (
                                                                                                                                                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                              ) : (
                                                                                                                                                                <>
                                                                                                                                                                  {level_10
                                                                                                                                                                    ?.user_id
                                                                                                                                                                    ?.package_id && (
                                                                                                                                                                    <div>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {formatPrice(
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.package_id
                                                                                                                                                                            ?.PV
                                                                                                                                                                        )}
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.package_id
                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                        }
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        <input
                                                                                                                                                                          style={{
                                                                                                                                                                            backgroundColor:
                                                                                                                                                                              "transparent",
                                                                                                                                                                            border:
                                                                                                                                                                              "none",
                                                                                                                                                                            width:
                                                                                                                                                                              "80px",
                                                                                                                                                                            color:
                                                                                                                                                                              "white",
                                                                                                                                                                          }}
                                                                                                                                                                          readOnly
                                                                                                                                                                          type="text"
                                                                                                                                                                          value={
                                                                                                                                                                            level_10
                                                                                                                                                                              ?.user_id
                                                                                                                                                                              ?.package_id
                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                          }
                                                                                                                                                                        />
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ແພັກເກດ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.package_id
                                                                                                                                                                            ?.packageName
                                                                                                                                                                        }
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {formatPrice(
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.package_id
                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                        )}
                                                                                                                                                                      </p>
                                                                                                                                                                    </div>
                                                                                                                                                                  )}
                                                                                                                                                                  {level_10
                                                                                                                                                                    ?.user_id
                                                                                                                                                                    ?.position_id && (
                                                                                                                                                                    <div>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {formatPrice(
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id
                                                                                                                                                                            ?.PV
                                                                                                                                                                        )}
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id
                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                        }
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        <input
                                                                                                                                                                          style={{
                                                                                                                                                                            backgroundColor:
                                                                                                                                                                              "transparent",
                                                                                                                                                                            border:
                                                                                                                                                                              "none",
                                                                                                                                                                            width:
                                                                                                                                                                              "80px",
                                                                                                                                                                            color:
                                                                                                                                                                              "white",
                                                                                                                                                                          }}
                                                                                                                                                                          readOnly
                                                                                                                                                                          type="text"
                                                                                                                                                                          value={
                                                                                                                                                                            level_10
                                                                                                                                                                              ?.user_id
                                                                                                                                                                              ?.package_id
                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                          }
                                                                                                                                                                        />
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຕຳແໜ່ງ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id
                                                                                                                                                                            ?.packageName
                                                                                                                                                                        }
                                                                                                                                                                      </p>
                                                                                                                                                                      <p>
                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                        :{" "}
                                                                                                                                                                        {formatPrice(
                                                                                                                                                                          level_10
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id
                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                        )}
                                                                                                                                                                      </p>
                                                                                                                                                                    </div>
                                                                                                                                                                  )}
                                                                                                                                                                </>
                                                                                                                                                              )
                                                                                                                                                            }
                                                                                                                                                            color="#00A5E8"
                                                                                                                                                          >
                                                                                                                                                            <img
                                                                                                                                                              src={
                                                                                                                                                                level_10
                                                                                                                                                                  .user_id
                                                                                                                                                                  ?.package_id
                                                                                                                                                                  ?.image
                                                                                                                                                                  ? level_10
                                                                                                                                                                      .user_id
                                                                                                                                                                      ?.package_id
                                                                                                                                                                      ?.image
                                                                                                                                                                  : level_10
                                                                                                                                                                      .user_id
                                                                                                                                                                      ?.position_id
                                                                                                                                                                      ?.image
                                                                                                                                                                  ? level_10
                                                                                                                                                                      .user_id
                                                                                                                                                                      ?.position_id
                                                                                                                                                                      ?.image
                                                                                                                                                                  : imagePreview
                                                                                                                                                              }
                                                                                                                                                              alt="Member"
                                                                                                                                                            />
                                                                                                                                                          </Tooltip>
                                                                                                                                                          <div className="member-details">
                                                                                                                                                            <h3>
                                                                                                                                                              {level_10?.user_id &&
                                                                                                                                                                level_10
                                                                                                                                                                  ?.user_id
                                                                                                                                                                  ?.firstName}
                                                                                                                                                            </h3>
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                      </div>
                                                                                                                                                    </Link>
                                                                                                                                                    <ul>
                                                                                                                                                      {level_10 &&
                                                                                                                                                        level_10?.children.map(
                                                                                                                                                          (
                                                                                                                                                            level_11,
                                                                                                                                                            index
                                                                                                                                                          ) => (
                                                                                                                                                            <>
                                                                                                                                                              <li
                                                                                                                                                                key={
                                                                                                                                                                  index
                                                                                                                                                                }
                                                                                                                                                              >
                                                                                                                                                                <Link
                                                                                                                                                                  to={`/lineWork/Details/${level_11?._id}`}
                                                                                                                                                                >
                                                                                                                                                                  <div className="member-view-box">
                                                                                                                                                                    <div className="member-image">
                                                                                                                                                                      <Tooltip
                                                                                                                                                                        title={
                                                                                                                                                                          !level_11
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id &&
                                                                                                                                                                          !level_11
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.package_id ? (
                                                                                                                                                                            "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                          ) : (
                                                                                                                                                                            <>
                                                                                                                                                                              {level_11
                                                                                                                                                                                ?.user_id
                                                                                                                                                                                ?.package_id && (
                                                                                                                                                                                <div>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                        ?.PV
                                                                                                                                                                                    )}
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                    }
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    <input
                                                                                                                                                                                      style={{
                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                          "transparent",
                                                                                                                                                                                        border:
                                                                                                                                                                                          "none",
                                                                                                                                                                                        width:
                                                                                                                                                                                          "80px",
                                                                                                                                                                                        color:
                                                                                                                                                                                          "white",
                                                                                                                                                                                      }}
                                                                                                                                                                                      readOnly
                                                                                                                                                                                      type="text"
                                                                                                                                                                                      value={
                                                                                                                                                                                        level_11
                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                      }
                                                                                                                                                                                    />
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ແພັກເກດ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                    }
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                    )}
                                                                                                                                                                                  </p>
                                                                                                                                                                                </div>
                                                                                                                                                                              )}
                                                                                                                                                                              {level_11
                                                                                                                                                                                ?.user_id
                                                                                                                                                                                ?.position_id && (
                                                                                                                                                                                <div>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                        ?.PV
                                                                                                                                                                                    )}
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                    }
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    <input
                                                                                                                                                                                      style={{
                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                          "transparent",
                                                                                                                                                                                        border:
                                                                                                                                                                                          "none",
                                                                                                                                                                                        width:
                                                                                                                                                                                          "80px",
                                                                                                                                                                                        color:
                                                                                                                                                                                          "white",
                                                                                                                                                                                      }}
                                                                                                                                                                                      readOnly
                                                                                                                                                                                      type="text"
                                                                                                                                                                                      value={
                                                                                                                                                                                        level_11
                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                      }
                                                                                                                                                                                    />
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຕຳແໜ່ງ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                    }
                                                                                                                                                                                  </p>
                                                                                                                                                                                  <p>
                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                    :{" "}
                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                      level_11
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                    )}
                                                                                                                                                                                  </p>
                                                                                                                                                                                </div>
                                                                                                                                                                              )}
                                                                                                                                                                            </>
                                                                                                                                                                          )
                                                                                                                                                                        }
                                                                                                                                                                        color="#00A5E8"
                                                                                                                                                                      >
                                                                                                                                                                        <img
                                                                                                                                                                          src={
                                                                                                                                                                            level_11
                                                                                                                                                                              .user_id
                                                                                                                                                                              ?.package_id
                                                                                                                                                                              ?.image
                                                                                                                                                                              ? level_11
                                                                                                                                                                                  .user_id
                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                  ?.image
                                                                                                                                                                              : level_11
                                                                                                                                                                                  .user_id
                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                  ?.image
                                                                                                                                                                              ? level_11
                                                                                                                                                                                  .user_id
                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                  ?.image
                                                                                                                                                                              : imagePreview
                                                                                                                                                                          }
                                                                                                                                                                          alt="Member"
                                                                                                                                                                        />
                                                                                                                                                                      </Tooltip>
                                                                                                                                                                      <div className="member-details">
                                                                                                                                                                        <h3>
                                                                                                                                                                          {level_11?.user_id &&
                                                                                                                                                                            level_11
                                                                                                                                                                              ?.user_id
                                                                                                                                                                              ?.firstName}
                                                                                                                                                                        </h3>
                                                                                                                                                                      </div>
                                                                                                                                                                    </div>
                                                                                                                                                                  </div>
                                                                                                                                                                </Link>
                                                                                                                                                                <ul>
                                                                                                                                                                  {level_11 &&
                                                                                                                                                                    level_11?.children.map(
                                                                                                                                                                      (
                                                                                                                                                                        level_12,
                                                                                                                                                                        index
                                                                                                                                                                      ) => (
                                                                                                                                                                        <>
                                                                                                                                                                          <li
                                                                                                                                                                            key={
                                                                                                                                                                              index
                                                                                                                                                                            }
                                                                                                                                                                          >
                                                                                                                                                                            <Link
                                                                                                                                                                              to={`/lineWork/Details/${level_12?._id}`}
                                                                                                                                                                            >
                                                                                                                                                                              <div className="member-view-box">
                                                                                                                                                                                <div className="member-image">
                                                                                                                                                                                  <Tooltip
                                                                                                                                                                                    title={
                                                                                                                                                                                      !level_12
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id &&
                                                                                                                                                                                      !level_12
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.package_id ? (
                                                                                                                                                                                        "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                      ) : (
                                                                                                                                                                                        <>
                                                                                                                                                                                          {level_12
                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                            ?.package_id && (
                                                                                                                                                                                            <div>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                )}
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                }
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                <input
                                                                                                                                                                                                  style={{
                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                    border:
                                                                                                                                                                                                      "none",
                                                                                                                                                                                                    width:
                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                    color:
                                                                                                                                                                                                      "white",
                                                                                                                                                                                                  }}
                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                  value={
                                                                                                                                                                                                    level_12
                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ແພັກເກດ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                }
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                )}
                                                                                                                                                                                              </p>
                                                                                                                                                                                            </div>
                                                                                                                                                                                          )}
                                                                                                                                                                                          {level_12
                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                            ?.position_id && (
                                                                                                                                                                                            <div>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                )}
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                }
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                <input
                                                                                                                                                                                                  style={{
                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                    border:
                                                                                                                                                                                                      "none",
                                                                                                                                                                                                    width:
                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                    color:
                                                                                                                                                                                                      "white",
                                                                                                                                                                                                  }}
                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                  value={
                                                                                                                                                                                                    level_12
                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຕຳແໜ່ງ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                }
                                                                                                                                                                                              </p>
                                                                                                                                                                                              <p>
                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                  level_12
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                )}
                                                                                                                                                                                              </p>
                                                                                                                                                                                            </div>
                                                                                                                                                                                          )}
                                                                                                                                                                                        </>
                                                                                                                                                                                      )
                                                                                                                                                                                    }
                                                                                                                                                                                    color="#00A5E8"
                                                                                                                                                                                  >
                                                                                                                                                                                    <img
                                                                                                                                                                                      src={
                                                                                                                                                                                        level_12
                                                                                                                                                                                          .user_id
                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                          ?.image
                                                                                                                                                                                          ? level_12
                                                                                                                                                                                              .user_id
                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                              ?.image
                                                                                                                                                                                          : level_12
                                                                                                                                                                                              .user_id
                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                              ?.image
                                                                                                                                                                                          ? level_12
                                                                                                                                                                                              .user_id
                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                              ?.image
                                                                                                                                                                                          : imagePreview
                                                                                                                                                                                      }
                                                                                                                                                                                      alt="Member"
                                                                                                                                                                                    />
                                                                                                                                                                                  </Tooltip>
                                                                                                                                                                                  <div className="member-details">
                                                                                                                                                                                    <h3>
                                                                                                                                                                                      {level_12?.user_id &&
                                                                                                                                                                                        level_12
                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                          ?.firstName}
                                                                                                                                                                                    </h3>
                                                                                                                                                                                  </div>
                                                                                                                                                                                </div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </Link>
                                                                                                                                                                            <ul>
                                                                                                                                                                              {level_12 &&
                                                                                                                                                                                level_12?.children.map(
                                                                                                                                                                                  (
                                                                                                                                                                                    level_13,
                                                                                                                                                                                    index
                                                                                                                                                                                  ) => (
                                                                                                                                                                                    <>
                                                                                                                                                                                      <li
                                                                                                                                                                                        key={
                                                                                                                                                                                          index
                                                                                                                                                                                        }
                                                                                                                                                                                      >
                                                                                                                                                                                        <Link
                                                                                                                                                                                          to={`/lineWork/Details/${level_13?._id}`}
                                                                                                                                                                                        >
                                                                                                                                                                                          <div className="member-view-box">
                                                                                                                                                                                            <div className="member-image">
                                                                                                                                                                                              <Tooltip
                                                                                                                                                                                                title={
                                                                                                                                                                                                  !level_13
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id &&
                                                                                                                                                                                                  !level_13
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.package_id ? (
                                                                                                                                                                                                    "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                  ) : (
                                                                                                                                                                                                    <>
                                                                                                                                                                                                      {level_13
                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                        ?.package_id && (
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຄະແນນ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                ?.PV
                                                                                                                                                                                                            )}
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                ?.bonusLevel
                                                                                                                                                                                                            }
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            <input
                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                backgroundColor:
                                                                                                                                                                                                                  "transparent",
                                                                                                                                                                                                                border:
                                                                                                                                                                                                                  "none",
                                                                                                                                                                                                                width:
                                                                                                                                                                                                                  "80px",
                                                                                                                                                                                                                color:
                                                                                                                                                                                                                  "white",
                                                                                                                                                                                                              }}
                                                                                                                                                                                                              readOnly
                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                              value={
                                                                                                                                                                                                                level_13
                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                                                                              }
                                                                                                                                                                                                            />
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ແພັກເກດ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                ?.packageName
                                                                                                                                                                                                            }
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                ?.recommendedFee
                                                                                                                                                                                                            )}
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      )}
                                                                                                                                                                                                      {level_13
                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                        ?.position_id && (
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຄະແນນ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                ?.PV
                                                                                                                                                                                                            )}
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                ?.bonusLevel
                                                                                                                                                                                                            }
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            <input
                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                backgroundColor:
                                                                                                                                                                                                                  "transparent",
                                                                                                                                                                                                                border:
                                                                                                                                                                                                                  "none",
                                                                                                                                                                                                                width:
                                                                                                                                                                                                                  "80px",
                                                                                                                                                                                                                color:
                                                                                                                                                                                                                  "white",
                                                                                                                                                                                                              }}
                                                                                                                                                                                                              readOnly
                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                              value={
                                                                                                                                                                                                                level_13
                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                                                                              }
                                                                                                                                                                                                            />
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຕຳແໜ່ງ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                ?.packageName
                                                                                                                                                                                                            }
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                          <p>
                                                                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                              level_13
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                ?.recommendedFee
                                                                                                                                                                                                            )}
                                                                                                                                                                                                          </p>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      )}
                                                                                                                                                                                                    </>
                                                                                                                                                                                                  )
                                                                                                                                                                                                }
                                                                                                                                                                                                color="#00A5E8"
                                                                                                                                                                                              >
                                                                                                                                                                                                <img
                                                                                                                                                                                                  src={
                                                                                                                                                                                                    level_13
                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                      ? level_13
                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                      : level_13
                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                          ?.position_id
                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                      ? level_13
                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                          ?.position_id
                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                      : imagePreview
                                                                                                                                                                                                  }
                                                                                                                                                                                                  alt="Member"
                                                                                                                                                                                                />
                                                                                                                                                                                              </Tooltip>
                                                                                                                                                                                              <div className="member-details">
                                                                                                                                                                                                <h3>
                                                                                                                                                                                                  {level_13?.user_id &&
                                                                                                                                                                                                    level_13
                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                      ?.firstName}
                                                                                                                                                                                                </h3>
                                                                                                                                                                                              </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                          </div>
                                                                                                                                                                                        </Link>
                                                                                                                                                                                        <ul>
                                                                                                                                                                                          {level_13 &&
                                                                                                                                                                                            level_13?.children.map(
                                                                                                                                                                                              (
                                                                                                                                                                                                level_14,
                                                                                                                                                                                                index
                                                                                                                                                                                              ) => (
                                                                                                                                                                                                <>
                                                                                                                                                                                                  <li
                                                                                                                                                                                                    key={
                                                                                                                                                                                                      index
                                                                                                                                                                                                    }
                                                                                                                                                                                                  >
                                                                                                                                                                                                    <Link
                                                                                                                                                                                                      to={`/lineWork/Details/${level_14?._id}`}
                                                                                                                                                                                                    >
                                                                                                                                                                                                      <div className="member-view-box">
                                                                                                                                                                                                        <div className="member-image">
                                                                                                                                                                                                          <Tooltip
                                                                                                                                                                                                            title={
                                                                                                                                                                                                              !level_14
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id &&
                                                                                                                                                                                                              !level_14
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.package_id ? (
                                                                                                                                                                                                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                              ) : (
                                                                                                                                                                                                                <>
                                                                                                                                                                                                                  {level_14
                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                    ?.package_id && (
                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                            ?.PV
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                            backgroundColor:
                                                                                                                                                                                                                              "transparent",
                                                                                                                                                                                                                            border:
                                                                                                                                                                                                                              "none",
                                                                                                                                                                                                                            width:
                                                                                                                                                                                                                              "80px",
                                                                                                                                                                                                                            color:
                                                                                                                                                                                                                              "white",
                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                          readOnly
                                                                                                                                                                                                                          type="text"
                                                                                                                                                                                                                          value={
                                                                                                                                                                                                                            level_14
                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        />
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ແພັກເກດ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                            ?.packageName
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                  {level_14
                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                    ?.position_id && (
                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                            ?.PV
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                            backgroundColor:
                                                                                                                                                                                                                              "transparent",
                                                                                                                                                                                                                            border:
                                                                                                                                                                                                                              "none",
                                                                                                                                                                                                                            width:
                                                                                                                                                                                                                              "80px",
                                                                                                                                                                                                                            color:
                                                                                                                                                                                                                              "white",
                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                          readOnly
                                                                                                                                                                                                                          type="text"
                                                                                                                                                                                                                          value={
                                                                                                                                                                                                                            level_14
                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        />
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຕຳແໜ່ງ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                            ?.packageName
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                          level_14
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                </>
                                                                                                                                                                                                              )
                                                                                                                                                                                                            }
                                                                                                                                                                                                            color="#00A5E8"
                                                                                                                                                                                                          >
                                                                                                                                                                                                            <img
                                                                                                                                                                                                              src={
                                                                                                                                                                                                                level_14
                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                  ? level_14
                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                  : level_14
                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                      ?.position_id
                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                  ? level_14
                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                      ?.position_id
                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                  : imagePreview
                                                                                                                                                                                                              }
                                                                                                                                                                                                              alt="Member"
                                                                                                                                                                                                            />
                                                                                                                                                                                                          </Tooltip>
                                                                                                                                                                                                          <div className="member-details">
                                                                                                                                                                                                            <h3>
                                                                                                                                                                                                              {level_14?.user_id &&
                                                                                                                                                                                                                level_14
                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                  ?.firstName}
                                                                                                                                                                                                            </h3>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                    </Link>
                                                                                                                                                                                                    <ul>
                                                                                                                                                                                                      {level_14 &&
                                                                                                                                                                                                        level_14?.children.map(
                                                                                                                                                                                                          (
                                                                                                                                                                                                            level_15,
                                                                                                                                                                                                            index
                                                                                                                                                                                                          ) => (
                                                                                                                                                                                                            <>
                                                                                                                                                                                                              <li
                                                                                                                                                                                                                key={
                                                                                                                                                                                                                  index
                                                                                                                                                                                                                }
                                                                                                                                                                                                              >
                                                                                                                                                                                                                <Link
                                                                                                                                                                                                                  to={`/lineWork/Details/${level_15?._id}`}
                                                                                                                                                                                                                >
                                                                                                                                                                                                                  <div className="member-view-box">
                                                                                                                                                                                                                    <div className="member-image">
                                                                                                                                                                                                                      <Tooltip
                                                                                                                                                                                                                        title={
                                                                                                                                                                                                                          !level_15
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id &&
                                                                                                                                                                                                                          !level_15
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.package_id ? (
                                                                                                                                                                                                                            "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                          ) : (
                                                                                                                                                                                                                            <>
                                                                                                                                                                                                                              {level_15
                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                ?.package_id && (
                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                        ?.PV
                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                                                                          "transparent",
                                                                                                                                                                                                                                        border:
                                                                                                                                                                                                                                          "none",
                                                                                                                                                                                                                                        width:
                                                                                                                                                                                                                                          "80px",
                                                                                                                                                                                                                                        color:
                                                                                                                                                                                                                                          "white",
                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                      readOnly
                                                                                                                                                                                                                                      type="text"
                                                                                                                                                                                                                                      value={
                                                                                                                                                                                                                                        level_15
                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ແພັກເກດ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                              {level_15
                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                ?.position_id && (
                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                        ?.PV
                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                                                                          "transparent",
                                                                                                                                                                                                                                        border:
                                                                                                                                                                                                                                          "none",
                                                                                                                                                                                                                                        width:
                                                                                                                                                                                                                                          "80px",
                                                                                                                                                                                                                                        color:
                                                                                                                                                                                                                                          "white",
                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                      readOnly
                                                                                                                                                                                                                                      type="text"
                                                                                                                                                                                                                                      value={
                                                                                                                                                                                                                                        level_15
                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຕຳແໜ່ງ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                      level_15
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                            </>
                                                                                                                                                                                                                          )
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        color="#00A5E8"
                                                                                                                                                                                                                      >
                                                                                                                                                                                                                        <img
                                                                                                                                                                                                                          src={
                                                                                                                                                                                                                            level_15
                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                              ? level_15
                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                              : level_15
                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                              ? level_15
                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                              : imagePreview
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                          alt="Member"
                                                                                                                                                                                                                        />
                                                                                                                                                                                                                      </Tooltip>
                                                                                                                                                                                                                      <div className="member-details">
                                                                                                                                                                                                                        <h3>
                                                                                                                                                                                                                          {level_15?.user_id &&
                                                                                                                                                                                                                            level_15
                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                              ?.firstName}
                                                                                                                                                                                                                        </h3>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                </Link>
                                                                                                                                                                                                                <ul>
                                                                                                                                                                                                                  {level_15 &&
                                                                                                                                                                                                                    level_15?.children.map(
                                                                                                                                                                                                                      (
                                                                                                                                                                                                                        level_16,
                                                                                                                                                                                                                        index
                                                                                                                                                                                                                      ) => (
                                                                                                                                                                                                                        <>
                                                                                                                                                                                                                          <li
                                                                                                                                                                                                                            key={
                                                                                                                                                                                                                              index
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          >
                                                                                                                                                                                                                            <Link
                                                                                                                                                                                                                              to={`/lineWork/Details/${level_16?._id}`}
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                              <div className="member-view-box">
                                                                                                                                                                                                                                <div className="member-image">
                                                                                                                                                                                                                                  <Tooltip
                                                                                                                                                                                                                                    title={
                                                                                                                                                                                                                                      !level_16
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id &&
                                                                                                                                                                                                                                      !level_16
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.package_id ? (
                                                                                                                                                                                                                                        "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                                      ) : (
                                                                                                                                                                                                                                        <>
                                                                                                                                                                                                                                          {level_16
                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                            ?.package_id && (
                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                                                                    border:
                                                                                                                                                                                                                                                      "none",
                                                                                                                                                                                                                                                    width:
                                                                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                                                                    color:
                                                                                                                                                                                                                                                      "white",
                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                                  value={
                                                                                                                                                                                                                                                    level_16
                                                                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ແພັກເກດ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                          {level_16
                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                            ?.position_id && (
                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                                                                    border:
                                                                                                                                                                                                                                                      "none",
                                                                                                                                                                                                                                                    width:
                                                                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                                                                    color:
                                                                                                                                                                                                                                                      "white",
                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                                  value={
                                                                                                                                                                                                                                                    level_16
                                                                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຕຳແໜ່ງ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                  level_16
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    color="#00A5E8"
                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                    <img
                                                                                                                                                                                                                                      src={
                                                                                                                                                                                                                                        level_16
                                                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                                                          ? level_16
                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                          : level_16
                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                          ? level_16
                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                          : imagePreview
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      alt="Member"
                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                  </Tooltip>
                                                                                                                                                                                                                                  <div className="member-details">
                                                                                                                                                                                                                                    <h3>
                                                                                                                                                                                                                                      {level_16?.user_id &&
                                                                                                                                                                                                                                        level_16
                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                          ?.firstName}
                                                                                                                                                                                                                                    </h3>
                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                            </Link>
                                                                                                                                                                                                                            <ul>
                                                                                                                                                                                                                              {level_16 &&
                                                                                                                                                                                                                                level_16?.children.map(
                                                                                                                                                                                                                                  (
                                                                                                                                                                                                                                    level_17,
                                                                                                                                                                                                                                    index
                                                                                                                                                                                                                                  ) => (
                                                                                                                                                                                                                                    <>
                                                                                                                                                                                                                                      <li
                                                                                                                                                                                                                                        key={
                                                                                                                                                                                                                                          index
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                        <Link
                                                                                                                                                                                                                                          to={`/lineWork/Details/${level_17?._id}`}
                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                          <div className="member-view-box">
                                                                                                                                                                                                                                            <div className="member-image">
                                                                                                                                                                                                                                              <Tooltip
                                                                                                                                                                                                                                                title={
                                                                                                                                                                                                                                                  !level_17
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id &&
                                                                                                                                                                                                                                                  !level_17
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.package_id ? (
                                                                                                                                                                                                                                                    "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                                                  ) : (
                                                                                                                                                                                                                                                    <>
                                                                                                                                                                                                                                                      {level_17
                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                        ?.package_id && (
                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຄະແນນ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                                                                ?.PV
                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                                                                ?.bonusLevel
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                                                                backgroundColor:
                                                                                                                                                                                                                                                                  "transparent",
                                                                                                                                                                                                                                                                border:
                                                                                                                                                                                                                                                                  "none",
                                                                                                                                                                                                                                                                width:
                                                                                                                                                                                                                                                                  "80px",
                                                                                                                                                                                                                                                                color:
                                                                                                                                                                                                                                                                  "white",
                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                              readOnly
                                                                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                                                                              value={
                                                                                                                                                                                                                                                                level_17
                                                                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ແພັກເກດ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                                                                ?.packageName
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.package_id
                                                                                                                                                                                                                                                                ?.recommendedFee
                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                      {level_17
                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                        ?.position_id && (
                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຄະແນນ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                ?.PV
                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                ?.bonusLevel
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                                                                backgroundColor:
                                                                                                                                                                                                                                                                  "transparent",
                                                                                                                                                                                                                                                                border:
                                                                                                                                                                                                                                                                  "none",
                                                                                                                                                                                                                                                                width:
                                                                                                                                                                                                                                                                  "80px",
                                                                                                                                                                                                                                                                color:
                                                                                                                                                                                                                                                                  "white",
                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                              readOnly
                                                                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                                                                              value={
                                                                                                                                                                                                                                                                level_17
                                                                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                                                                  ?.bonusPerLevel
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຕຳແໜ່ງ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                ?.packageName
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                            ຄ່າແນະນຳ
                                                                                                                                                                                                                                                            :{" "}
                                                                                                                                                                                                                                                            {formatPrice(
                                                                                                                                                                                                                                                              level_17
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                ?.recommendedFee
                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                    </>
                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                color="#00A5E8"
                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                <img
                                                                                                                                                                                                                                                  src={
                                                                                                                                                                                                                                                    level_17
                                                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                                                      ? level_17
                                                                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                                                                      : level_17
                                                                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                                                                          ?.position_id
                                                                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                                                                      ? level_17
                                                                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                                                                          ?.position_id
                                                                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                                                                      : imagePreview
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  alt="Member"
                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                              </Tooltip>
                                                                                                                                                                                                                                              <div className="member-details">
                                                                                                                                                                                                                                                <h3>
                                                                                                                                                                                                                                                  {level_17?.user_id &&
                                                                                                                                                                                                                                                    level_17
                                                                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                                                                      ?.firstName}
                                                                                                                                                                                                                                                </h3>
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                        </Link>
                                                                                                                                                                                                                                        <ul>
                                                                                                                                                                                                                                          {level_17 &&
                                                                                                                                                                                                                                            level_17?.children.map(
                                                                                                                                                                                                                                              (
                                                                                                                                                                                                                                                level_18,
                                                                                                                                                                                                                                                index
                                                                                                                                                                                                                                              ) => (
                                                                                                                                                                                                                                                <>
                                                                                                                                                                                                                                                  <li
                                                                                                                                                                                                                                                    key={
                                                                                                                                                                                                                                                      index
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                    <Link
                                                                                                                                                                                                                                                      to={`/lineWork/Details/${level_18?._id}`}
                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                      <div className="member-view-box">
                                                                                                                                                                                                                                                        <div className="member-image">
                                                                                                                                                                                                                                                          <Tooltip
                                                                                                                                                                                                                                                            title={
                                                                                                                                                                                                                                                              !level_18
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id &&
                                                                                                                                                                                                                                                              !level_18
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.package_id ? (
                                                                                                                                                                                                                                                                "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                                                              ) : (
                                                                                                                                                                                                                                                                <>
                                                                                                                                                                                                                                                                  {level_18
                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                    ?.package_id && (
                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                                                                            ?.PV
                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                            backgroundColor:
                                                                                                                                                                                                                                                                              "transparent",
                                                                                                                                                                                                                                                                            border:
                                                                                                                                                                                                                                                                              "none",
                                                                                                                                                                                                                                                                            width:
                                                                                                                                                                                                                                                                              "80px",
                                                                                                                                                                                                                                                                            color:
                                                                                                                                                                                                                                                                              "white",
                                                                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                                                                          readOnly
                                                                                                                                                                                                                                                                          type="text"
                                                                                                                                                                                                                                                                          value={
                                                                                                                                                                                                                                                                            level_18
                                                                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ແພັກເກດ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                                                                            ?.packageName
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.package_id
                                                                                                                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                  {level_18
                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                    ?.position_id && (
                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຄະແນນ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                            ?.PV
                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                            ?.bonusLevel
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                            backgroundColor:
                                                                                                                                                                                                                                                                              "transparent",
                                                                                                                                                                                                                                                                            border:
                                                                                                                                                                                                                                                                              "none",
                                                                                                                                                                                                                                                                            width:
                                                                                                                                                                                                                                                                              "80px",
                                                                                                                                                                                                                                                                            color:
                                                                                                                                                                                                                                                                              "white",
                                                                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                                                                          readOnly
                                                                                                                                                                                                                                                                          type="text"
                                                                                                                                                                                                                                                                          value={
                                                                                                                                                                                                                                                                            level_18
                                                                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                                                                              ?.bonusPerLevel
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຕຳແໜ່ງ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                            ?.packageName
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                        ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                        :{" "}
                                                                                                                                                                                                                                                                        {formatPrice(
                                                                                                                                                                                                                                                                          level_18
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                            ?.recommendedFee
                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                </>
                                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            color="#00A5E8"
                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                            <img
                                                                                                                                                                                                                                                              src={
                                                                                                                                                                                                                                                                level_18
                                                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                                                                  ? level_18
                                                                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                                                                  : level_18
                                                                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                                                                      ?.position_id
                                                                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                                                                  ? level_18
                                                                                                                                                                                                                                                                      .user_id
                                                                                                                                                                                                                                                                      ?.position_id
                                                                                                                                                                                                                                                                      ?.image
                                                                                                                                                                                                                                                                  : imagePreview
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              alt="Member"
                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                          </Tooltip>
                                                                                                                                                                                                                                                          <div className="member-details">
                                                                                                                                                                                                                                                            <h3>
                                                                                                                                                                                                                                                              {level_18?.user_id &&
                                                                                                                                                                                                                                                                level_18
                                                                                                                                                                                                                                                                  ?.user_id
                                                                                                                                                                                                                                                                  ?.firstName}
                                                                                                                                                                                                                                                            </h3>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                    </Link>
                                                                                                                                                                                                                                                    <ul>
                                                                                                                                                                                                                                                      {level_18 &&
                                                                                                                                                                                                                                                        level_18?.children.map(
                                                                                                                                                                                                                                                          (
                                                                                                                                                                                                                                                            level_19,
                                                                                                                                                                                                                                                            index
                                                                                                                                                                                                                                                          ) => (
                                                                                                                                                                                                                                                            <>
                                                                                                                                                                                                                                                              <li
                                                                                                                                                                                                                                                                key={
                                                                                                                                                                                                                                                                  index
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                <Link
                                                                                                                                                                                                                                                                  to={`/lineWork/Details/${level_19?._id}`}
                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                  <div className="member-view-box">
                                                                                                                                                                                                                                                                    <div className="member-image">
                                                                                                                                                                                                                                                                      <Tooltip
                                                                                                                                                                                                                                                                        title={
                                                                                                                                                                                                                                                                          !level_19
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id &&
                                                                                                                                                                                                                                                                          !level_19
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.package_id ? (
                                                                                                                                                                                                                                                                            "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                                                                          ) : (
                                                                                                                                                                                                                                                                            <>
                                                                                                                                                                                                                                                                              {level_19
                                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                                ?.package_id && (
                                                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                                                                        ?.PV
                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                                                                                                                          "transparent",
                                                                                                                                                                                                                                                                                        border:
                                                                                                                                                                                                                                                                                          "none",
                                                                                                                                                                                                                                                                                        width:
                                                                                                                                                                                                                                                                                          "80px",
                                                                                                                                                                                                                                                                                        color:
                                                                                                                                                                                                                                                                                          "white",
                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                      readOnly
                                                                                                                                                                                                                                                                                      type="text"
                                                                                                                                                                                                                                                                                      value={
                                                                                                                                                                                                                                                                                        level_19
                                                                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ແພັກເກດ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.package_id
                                                                                                                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                              {level_19
                                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                                ?.position_id && (
                                                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຄະແນນ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                                                        ?.PV
                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                                                        ?.bonusLevel
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                                                                        backgroundColor:
                                                                                                                                                                                                                                                                                          "transparent",
                                                                                                                                                                                                                                                                                        border:
                                                                                                                                                                                                                                                                                          "none",
                                                                                                                                                                                                                                                                                        width:
                                                                                                                                                                                                                                                                                          "80px",
                                                                                                                                                                                                                                                                                        color:
                                                                                                                                                                                                                                                                                          "white",
                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                      readOnly
                                                                                                                                                                                                                                                                                      type="text"
                                                                                                                                                                                                                                                                                      value={
                                                                                                                                                                                                                                                                                        level_19
                                                                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                                                                          ?.bonusPerLevel
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຕຳແໜ່ງ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                                                        ?.packageName
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                  <p>
                                                                                                                                                                                                                                                                                    ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                                    :{" "}
                                                                                                                                                                                                                                                                                    {formatPrice(
                                                                                                                                                                                                                                                                                      level_19
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                                                        ?.recommendedFee
                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                            </>
                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        color="#00A5E8"
                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                        <img
                                                                                                                                                                                                                                                                          src={
                                                                                                                                                                                                                                                                            level_19
                                                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                                                              ? level_19
                                                                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                                                                  ?.package_id
                                                                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                                                                              : level_19
                                                                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                                                                              ? level_19
                                                                                                                                                                                                                                                                                  .user_id
                                                                                                                                                                                                                                                                                  ?.position_id
                                                                                                                                                                                                                                                                                  ?.image
                                                                                                                                                                                                                                                                              : imagePreview
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                          alt="Member"
                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                      </Tooltip>
                                                                                                                                                                                                                                                                      <div className="member-details">
                                                                                                                                                                                                                                                                        <h3>
                                                                                                                                                                                                                                                                          {level_19?.user_id &&
                                                                                                                                                                                                                                                                            level_19
                                                                                                                                                                                                                                                                              ?.user_id
                                                                                                                                                                                                                                                                              ?.firstName}
                                                                                                                                                                                                                                                                        </h3>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                </Link>
                                                                                                                                                                                                                                                                <ul>
                                                                                                                                                                                                                                                                  {level_19 &&
                                                                                                                                                                                                                                                                    level_19?.children.map(
                                                                                                                                                                                                                                                                      (
                                                                                                                                                                                                                                                                        level_20,
                                                                                                                                                                                                                                                                        index
                                                                                                                                                                                                                                                                      ) => (
                                                                                                                                                                                                                                                                        <>
                                                                                                                                                                                                                                                                          <li
                                                                                                                                                                                                                                                                            key={
                                                                                                                                                                                                                                                                              index
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                            <Link
                                                                                                                                                                                                                                                                              to={`/lineWork/Details/${level_20?._id}`}
                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                              <div className="member-view-box">
                                                                                                                                                                                                                                                                                <div className="member-image">
                                                                                                                                                                                                                                                                                  <Tooltip
                                                                                                                                                                                                                                                                                    title={
                                                                                                                                                                                                                                                                                      !level_20
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id &&
                                                                                                                                                                                                                                                                                      !level_20
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.package_id ? (
                                                                                                                                                                                                                                                                                        "ບໍ່ມີຂໍ້ມູນ Package ແລະ Position"
                                                                                                                                                                                                                                                                                      ) : (
                                                                                                                                                                                                                                                                                        <>
                                                                                                                                                                                                                                                                                          {level_20
                                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                                            ?.package_id && (
                                                                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                                                                                                                    border:
                                                                                                                                                                                                                                                                                                      "none",
                                                                                                                                                                                                                                                                                                    width:
                                                                                                                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                                                                                                                    color:
                                                                                                                                                                                                                                                                                                      "white",
                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                                                                                  value={
                                                                                                                                                                                                                                                                                                    level_20
                                                                                                                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ແພັກເກດ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.package_id
                                                                                                                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                          {level_20
                                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                                            ?.position_id && (
                                                                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຄະແນນ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                                                                    ?.PV
                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຈຳນວນຊັ້ນທີ່ຈະໄດ້ໂບນັດ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                                                                    ?.bonusLevel
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ເປີເຊັນທີ່ຈະໄດ້ຈາກແຕ່ລະຊັ້ນ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                                                                    backgroundColor:
                                                                                                                                                                                                                                                                                                      "transparent",
                                                                                                                                                                                                                                                                                                    border:
                                                                                                                                                                                                                                                                                                      "none",
                                                                                                                                                                                                                                                                                                    width:
                                                                                                                                                                                                                                                                                                      "80px",
                                                                                                                                                                                                                                                                                                    color:
                                                                                                                                                                                                                                                                                                      "white",
                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                  readOnly
                                                                                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                                                                                  value={
                                                                                                                                                                                                                                                                                                    level_20
                                                                                                                                                                                                                                                                                                      ?.user_id
                                                                                                                                                                                                                                                                                                      ?.package_id
                                                                                                                                                                                                                                                                                                      ?.bonusPerLevel
                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຕຳແໜ່ງ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                                                                    ?.packageName
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                ຄ່າແນະນຳ
                                                                                                                                                                                                                                                                                                :{" "}
                                                                                                                                                                                                                                                                                                {formatPrice(
                                                                                                                                                                                                                                                                                                  level_20
                                                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                                                                    ?.recommendedFee
                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    color="#00A5E8"
                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                    <img
                                                                                                                                                                                                                                                                                      src={
                                                                                                                                                                                                                                                                                        level_20
                                                                                                                                                                                                                                                                                          .user_id
                                                                                                                                                                                                                                                                                          ?.package_id
                                                                                                                                                                                                                                                                                          ?.image
                                                                                                                                                                                                                                                                                          ? level_20
                                                                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                                                                              ?.package_id
                                                                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                                                                          : level_20
                                                                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                                                                          ? level_20
                                                                                                                                                                                                                                                                                              .user_id
                                                                                                                                                                                                                                                                                              ?.position_id
                                                                                                                                                                                                                                                                                              ?.image
                                                                                                                                                                                                                                                                                          : imagePreview
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      alt="Member"
                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                  </Tooltip>
                                                                                                                                                                                                                                                                                  <div className="member-details">
                                                                                                                                                                                                                                                                                    <h3>
                                                                                                                                                                                                                                                                                      {level_20?.user_id &&
                                                                                                                                                                                                                                                                                        level_20
                                                                                                                                                                                                                                                                                          ?.user_id
                                                                                                                                                                                                                                                                                          ?.firstName}
                                                                                                                                                                                                                                                                                    </h3>
                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                            </Link>
                                                                                                                                                                                                                                                                          </li>
                                                                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                </ul>
                                                                                                                                                                                                                                                              </li>
                                                                                                                                                                                                                                                            </>
                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                    </ul>
                                                                                                                                                                                                                                                  </li>
                                                                                                                                                                                                                                                </>
                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                        </ul>
                                                                                                                                                                                                                                      </li>
                                                                                                                                                                                                                                    </>
                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                            </ul>
                                                                                                                                                                                                                          </li>
                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                      )
                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                </ul>
                                                                                                                                                                                                              </li>
                                                                                                                                                                                                            </>
                                                                                                                                                                                                          )
                                                                                                                                                                                                        )}
                                                                                                                                                                                                    </ul>
                                                                                                                                                                                                  </li>
                                                                                                                                                                                                </>
                                                                                                                                                                                              )
                                                                                                                                                                                            )}
                                                                                                                                                                                        </ul>
                                                                                                                                                                                      </li>
                                                                                                                                                                                    </>
                                                                                                                                                                                  )
                                                                                                                                                                                )}
                                                                                                                                                                            </ul>
                                                                                                                                                                          </li>
                                                                                                                                                                        </>
                                                                                                                                                                      )
                                                                                                                                                                    )}
                                                                                                                                                                </ul>
                                                                                                                                                              </li>
                                                                                                                                                            </>
                                                                                                                                                          )
                                                                                                                                                        )}
                                                                                                                                                    </ul>
                                                                                                                                                  </li>
                                                                                                                                                </>
                                                                                                                                              )
                                                                                                                                            )}
                                                                                                                                        </ul>
                                                                                                                                      </li>
                                                                                                                                    </>
                                                                                                                                  )
                                                                                                                                )}
                                                                                                                            </ul>
                                                                                                                          </li>
                                                                                                                        </>
                                                                                                                      )
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                              </li>
                                                                                                            </>
                                                                                                          )
                                                                                                        )}
                                                                                                    </ul>
                                                                                                  </li>
                                                                                                </>
                                                                                              )
                                                                                            )}
                                                                                        </ul>
                                                                                      </li>
                                                                                    </>
                                                                                  )
                                                                                )}
                                                                            </ul>
                                                                          </li>
                                                                        </>
                                                                      )
                                                                    )}
                                                                </ul>
                                                              </li>
                                                            </>
                                                          )
                                                        )}
                                                    </ul>
                                                  )}
                                                </li>
                                              </>
                                            )
                                          )}
                                      </ul>
                                    )}
                                  </li>
                                </>
                              ))}
                          </ul>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <EmptyContent Messages={"ບໍ່ມີຂໍ້ມູນ"} />
          )}
        </>
      </div>
    </>
  );
};

export default Diagram;
