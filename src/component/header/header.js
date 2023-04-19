import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { MenuOutlined, LeftOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import "./index.scss";

export default function Header() {
  const naveigate = useNavigate();

  const [open, setOpen] = useState(false);
  const getElement = useRef();

  const navLinkClass = ({ isActive }) => {
    return isActive ? "nav-link activated" : "nav-link";
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="header" ref={getElement}>
        <div className="header-modal" onClick={() => setOpen(true)}>
          <MenuOutlined />
        </div>
        <img src="https://geekup.vn/Icons/geekup-logo-general.svg"></img>
        <span className="header-test" onClick={() => naveigate("/")}>
          Test
        </span>
        <span className="hearder-todo">
          {" "}
          <NavLink
            to="/todo"
            style={{ textDecoration: "none" }}
            className={navLinkClass}
          >
            To do
          </NavLink>
        </span>
      </div>
      <div className="modal">
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          key="left"
          className="modal-relative"
        >
          <p onClick={() => naveigate("/todo")}>To do</p>
          <div className="modal-icon" onClick={() => setOpen(false)}>
            <LeftOutlined />
          </div>
        </Drawer>
      </div>
    </>
  );
}
