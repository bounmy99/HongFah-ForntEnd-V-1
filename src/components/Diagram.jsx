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
const Diagram = ({ linework, imagePreview }) => {
  const [scale, setScale] = useState(0.20000000000000015);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(null);

  console.log("linework", linework);

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
                                          <img
                                            src={
                                              level_1.user_id?.position_id?.icon
                                                ? level_1.user_id?.position_id
                                                    ?.icon
                                                : imagePreview
                                            }
                                            alt="Member"
                                          />
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
                                                        <img
                                                          src={
                                                            level_2?.user_id
                                                              ?.position_id
                                                              ?.icon
                                                              ? level_2.user_id
                                                                  ?.position_id
                                                                  ?.icon
                                                              : imagePreview
                                                          }
                                                          alt="Member"
                                                        />
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
                                                                      <img
                                                                        src={
                                                                          level_3
                                                                            ?.user_id
                                                                            ?.position_id
                                                                            ?.icon
                                                                            ? level_3
                                                                                ?.user_id
                                                                                ?.position_id
                                                                                ?.icon
                                                                            : imagePreview
                                                                        }
                                                                        alt="Member"
                                                                      />
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
                                                                                  <img
                                                                                    src={
                                                                                      level_4
                                                                                        ?.user_id
                                                                                        ?.position_id
                                                                                        ?.icon
                                                                                        ? level_4
                                                                                            ?.user_id
                                                                                            ?.position_id
                                                                                            ?.icon
                                                                                        : imagePreview
                                                                                    }
                                                                                    alt="Member"
                                                                                  />
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
                                                                                              <img
                                                                                                src={
                                                                                                  level_5
                                                                                                    ?.user_id
                                                                                                    ?.position_id
                                                                                                    ?.icon
                                                                                                    ? level_5
                                                                                                        ?.user_id
                                                                                                        ?.position_id
                                                                                                        ?.icon
                                                                                                    : imagePreview
                                                                                                }
                                                                                                alt="Member"
                                                                                              />
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
                                                                                                          <img
                                                                                                            src={
                                                                                                              level_6
                                                                                                                ?.user_id
                                                                                                                ?.position_id
                                                                                                                ?.icon
                                                                                                                ? level_6
                                                                                                                    ?.user_id
                                                                                                                    ?.position_id
                                                                                                                    ?.icon
                                                                                                                : imagePreview
                                                                                                            }
                                                                                                            alt="Member"
                                                                                                          />
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
                                                                                                                      <img
                                                                                                                        src={
                                                                                                                          level_7
                                                                                                                            ?.user_id
                                                                                                                            ?.position_id
                                                                                                                            ?.icon
                                                                                                                            ? level_7
                                                                                                                                ?.user_id
                                                                                                                                ?.position_id
                                                                                                                                ?.icon
                                                                                                                            : imagePreview
                                                                                                                        }
                                                                                                                        alt="Member"
                                                                                                                      />
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
                                                                                                                                  <img
                                                                                                                                    src={
                                                                                                                                      level_8
                                                                                                                                        ?.user_id
                                                                                                                                        ?.position_id
                                                                                                                                        ?.icon
                                                                                                                                        ? level_8
                                                                                                                                            ?.user_id
                                                                                                                                            ?.position_id
                                                                                                                                            ?.icon
                                                                                                                                        : imagePreview
                                                                                                                                    }
                                                                                                                                    alt="Member"
                                                                                                                                  />
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
                                                                                                                                              <img
                                                                                                                                                src={
                                                                                                                                                  level_9
                                                                                                                                                    ?.user_id
                                                                                                                                                    ?.position_id
                                                                                                                                                    ?.icon
                                                                                                                                                    ? level_9
                                                                                                                                                        ?.user_id
                                                                                                                                                        ?.position_id
                                                                                                                                                        ?.icon
                                                                                                                                                    : imagePreview
                                                                                                                                                }
                                                                                                                                                alt="Member"
                                                                                                                                              />
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
                                                                                                                                                          <img
                                                                                                                                                            src={
                                                                                                                                                              level_10
                                                                                                                                                                ?.user_id
                                                                                                                                                                ?.position_id
                                                                                                                                                                ?.icon
                                                                                                                                                                ? level_10
                                                                                                                                                                    ?.user_id
                                                                                                                                                                    ?.position_id
                                                                                                                                                                    ?.icon
                                                                                                                                                                : imagePreview
                                                                                                                                                            }
                                                                                                                                                            alt="Member"
                                                                                                                                                          />
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
                                                                                                                                                                      <img
                                                                                                                                                                        src={
                                                                                                                                                                          level_11
                                                                                                                                                                            ?.user_id
                                                                                                                                                                            ?.position_id
                                                                                                                                                                            ?.icon
                                                                                                                                                                            ? level_11
                                                                                                                                                                                ?.user_id
                                                                                                                                                                                ?.position_id
                                                                                                                                                                                ?.icon
                                                                                                                                                                            : imagePreview
                                                                                                                                                                        }
                                                                                                                                                                        alt="Member"
                                                                                                                                                                      />
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
                                                                                                                                                                                  <img
                                                                                                                                                                                    src={
                                                                                                                                                                                      level_12
                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                        ?.icon
                                                                                                                                                                                        ? level_12
                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                            ?.icon
                                                                                                                                                                                        : imagePreview
                                                                                                                                                                                    }
                                                                                                                                                                                    alt="Member"
                                                                                                                                                                                  />
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
                                                                                                                                                                                              <img
                                                                                                                                                                                                src={
                                                                                                                                                                                                  level_13
                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                    ?.icon
                                                                                                                                                                                                    ? level_13
                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                        ?.icon
                                                                                                                                                                                                    : imagePreview
                                                                                                                                                                                                }
                                                                                                                                                                                                alt="Member"
                                                                                                                                                                                              />
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
                                                                                                                                                                                                          <img
                                                                                                                                                                                                            src={
                                                                                                                                                                                                              level_14
                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                ?.icon
                                                                                                                                                                                                                ? level_14
                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                    ?.icon
                                                                                                                                                                                                                : imagePreview
                                                                                                                                                                                                            }
                                                                                                                                                                                                            alt="Member"
                                                                                                                                                                                                          />
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
                                                                                                                                                                                                                      <img
                                                                                                                                                                                                                        src={
                                                                                                                                                                                                                          level_15
                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                            ?.icon
                                                                                                                                                                                                                            ? level_15
                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                ?.icon
                                                                                                                                                                                                                            : imagePreview
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        alt="Member"
                                                                                                                                                                                                                      />
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
                                                                                                                                                                                                                                  <img
                                                                                                                                                                                                                                    src={
                                                                                                                                                                                                                                      level_16
                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                        ?.icon
                                                                                                                                                                                                                                        ? level_16
                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                            ?.icon
                                                                                                                                                                                                                                        : imagePreview
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    alt="Member"
                                                                                                                                                                                                                                  />
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
                                                                                                                                                                                                                                              <img
                                                                                                                                                                                                                                                src={
                                                                                                                                                                                                                                                  level_17
                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                    ?.icon
                                                                                                                                                                                                                                                    ? level_17
                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                        ?.icon
                                                                                                                                                                                                                                                    : imagePreview
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                alt="Member"
                                                                                                                                                                                                                                              />
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
                                                                                                                                                                                                                                                          <img
                                                                                                                                                                                                                                                            src={
                                                                                                                                                                                                                                                              level_18
                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                ?.icon
                                                                                                                                                                                                                                                                ? level_18
                                                                                                                                                                                                                                                                    ?.user_id
                                                                                                                                                                                                                                                                    ?.position_id
                                                                                                                                                                                                                                                                    ?.icon
                                                                                                                                                                                                                                                                : imagePreview
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            alt="Member"
                                                                                                                                                                                                                                                          />
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
                                                                                                                                                                                                                                                                      <img
                                                                                                                                                                                                                                                                        src={
                                                                                                                                                                                                                                                                          level_19
                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                            ?.icon
                                                                                                                                                                                                                                                                            ? level_19
                                                                                                                                                                                                                                                                                ?.user_id
                                                                                                                                                                                                                                                                                ?.position_id
                                                                                                                                                                                                                                                                                ?.icon
                                                                                                                                                                                                                                                                            : imagePreview
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        alt="Member"
                                                                                                                                                                                                                                                                      />
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
                                                                                                                                                                                                                                                                                  <img
                                                                                                                                                                                                                                                                                    src={
                                                                                                                                                                                                                                                                                      level_20
                                                                                                                                                                                                                                                                                        ?.user_id
                                                                                                                                                                                                                                                                                        ?.position_id
                                                                                                                                                                                                                                                                                        ?.icon
                                                                                                                                                                                                                                                                                        ? level_20
                                                                                                                                                                                                                                                                                            ?.user_id
                                                                                                                                                                                                                                                                                            ?.position_id
                                                                                                                                                                                                                                                                                            ?.icon
                                                                                                                                                                                                                                                                                        : imagePreview
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    alt="Member"
                                                                                                                                                                                                                                                                                  />
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
