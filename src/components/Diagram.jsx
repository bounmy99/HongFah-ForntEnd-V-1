import React, { useState, useEffect, useRef } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Diagram = ({ levelOne, linework, show, handleShow, imagePreview }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(null);

  // Zoom in function
  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };

  // Zoom Out function
  const handleZoomOut = () => {
    setScale((scale) => scale - 0.1);
  };
  // Effect for handling object dragging and zooming
  useEffect(() => {
    const ZoomObj = zoomRef.current;

    console.log("ZoomObj",ZoomObj)
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
    ZoomObj?.addEventListener("mousedown", handleMouseDown);
    ZoomObj?.addEventListener("mousemove", handlerMouseMove);
    ZoomObj?.addEventListener("mouseup", handleMouseUp);

    // Remove envent listener on component unmount
    return () => {
      ZoomObj?.removeEventListener("mousedown", handleMouseDown);
      ZoomObj?.removeEventListener("mousemove", handlerMouseMove);
      ZoomObj?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scale,zoomRef]);

  return (
    <>
      <div className="body genealogy-body genealogy-scroll">
        <>
          <div className="icons-show-hide">
            {show ? (
              <EyeOutlined className="btn-show" onClick={handleShow} />
            ) : (
              <EyeInvisibleOutlined className="btn-show" onClick={handleShow} />
            )}
            <ZoomInOutlined className="btn-zoomIn" onClick={handleZoomIn} />
            <ZoomOutOutlined className="btn-zoomOut" onClick={handleZoomOut} />
          </div>

          <div
            rel={zoomRef}
            style={{
              cursor: "move",
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            }}
            draggable={false}
            className="genealogy-tree"
          >
            <ul>
              <li>
                <Link to={`/lineWork/Details/${linework._id}`}>
                  <div className="member-view-box">
                    <div className="member-image">
                      <img
                        src={
                          linework.user_id?.position_id?.icon
                            ? linework.user_id?.position_id?.icon
                            : imagePreview
                        }
                        alt="Member"
                      />
                      <div className="member-details">
                        <h3>
                          {linework.user_id && linework.user_id.firstName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <ul className="active">
                  <li>
                    <ul>
                      {levelOne &&
                        levelOne.map((level_1, index) => (
                          <>
                            <li key={index}>
                              <Link to={`/lineWork/Details/${level_1._id}`}>
                                <div className="member-view-box">
                                  <div className="member-image">
                                    <img
                                      src={
                                        level_1.user_id?.position_id?.icon
                                          ? level_1.user_id?.position_id?.icon
                                          : imagePreview
                                      }
                                      alt="Member"
                                    />
                                    <div className="member-details">
                                      <h3>
                                        {level_1.user_id &&
                                          level_1.user_id.firstName}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <ul>
                                {level_1 &&
                                  level_1.children.map((level_2, index) => (
                                    <>
                                      <li key={index}>
                                        <Link
                                          to={`/lineWork/Details/${level_2._id}`}
                                        >
                                          <div className="member-view-box">
                                            <div className="member-image">
                                              <img
                                                src={
                                                  level_2.user_id?.position_id
                                                    ?.icon
                                                    ? level_2.user_id
                                                        ?.position_id?.icon
                                                    : imagePreview
                                                }
                                                alt="Member"
                                              />
                                              <div className="member-details">
                                                <h3>
                                                  {level_2.user_id &&
                                                    level_2.user_id.firstName}
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                        <ul>
                                          {level_2 &&
                                            level_2.children.map(
                                              (level_3, index) => (
                                                <>
                                                  <li key={index}>
                                                    <Link
                                                      to={`/lineWork/Details/${level_3._id}`}
                                                    >
                                                      <div className="member-view-box">
                                                        <div className="member-image">
                                                          <img
                                                            src={
                                                              level_3.user_id
                                                                ?.position_id
                                                                ?.icon
                                                                ? level_3
                                                                    .user_id
                                                                    ?.position_id
                                                                    ?.icon
                                                                : imagePreview
                                                            }
                                                            alt="Member"
                                                          />
                                                          <div className="member-details">
                                                            <h3>
                                                              {level_3.user_id &&
                                                                level_3.user_id
                                                                  .firstName}
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
                                  ))}
                              </ul>
                            </li>
                          </>
                        ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      </div>
    </>
  );
};

export default Diagram;
