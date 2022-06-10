import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAdmin } from "../../redux/actions/auth.actions";
import SidebarMenu from "./SidebarMenu";

import logo from "../../assets/logo.jpeg";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    image: "/images/dashmenu.svg",
    img2: "/images/dashmenuwhite.svg",
  },
  {
    path: "/settings",
    name: "Settings",
    image: "/images/settings.svg",
    img2: "/images/settingsWhite.svg",
  },

  {
    path: "/",
    name: "Logout",
    image: "/images/logout.svg",
  },
];
const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    image: "/images/dashmenu.svg",
    img2: "/images/dashmenuwhite.svg",
  },

  {
    path: "/all-users-data",
    name: "All Users",
    image: "/images/user.svg",
    img2: "/images/userWhite.svg",
  },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   image: "/images/settings.svg",
  //   img2: "/images/settingsWhite.svg",
  // },

  {
    path: "/",
    name: "Logout",
    image: "/images/logout.svg",
  },
];
const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  let adminOrClientRoutes = authState.role === "admin" ? adminRoutes : routes;

  return (
    <>
      <div className='flex'>
        <motion.div
          animate={{
            width: isOpen ? "260px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}>
          <div className='top_section'>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  className='logo'>
                  <img src={logo} alt='' />
                </motion.h1>
              )}
            </AnimatePresence>

            <div className='bars'>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className='routes'>
            {adminOrClientRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className='link'
                  onClick={(e) => {
                    route.name === "Logout" && dispatch(logoutAdmin());
                    // setSubMeunIsOpen(false);
                  }}>
                  <div className='icon'>
                    <img
                      src={
                        window?.location?.pathname === route.path
                          ? route.img2
                          : route.image
                      }
                      className='svgMy'
                      alt=''></img>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        style={{
                          color:
                            window?.location?.pathname === route.path
                              ? "white"
                              : "#4A47A3",
                        }}
                        className={
                          route.name === "Logout"
                            ? "link_text lougoutclr"
                            : "link_text"
                        }>
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{ width: "100%", paddingLeft: "20px" }}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
