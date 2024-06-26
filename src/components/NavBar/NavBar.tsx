import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NavBar.css";
import default_user from "../image_assets/default_user.png";
import CreateEvent from "../Cards/CreateEvent/CreateEvent";
import Signup from "../Signup/Signup";
import { toast } from "react-toastify";
import { signOutUser } from "../../firebaseConf";
import logo from "../image_assets/logo.png";
import theme from "../../theme";

import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Person2Icon from "@mui/icons-material/Person2";
import AdbIcon from "@mui/icons-material/Adb";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import NotificationsPanel from "../Notification/NotificationsPanel";
import { Switch } from "@mui/material";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [mode, SetMode] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const isActive = (path: String) => {
    return location.pathname === path;
  };

  const isHome = location.pathname === "/";

  const toggleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded);
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);

    setExpanded(false);
  };

  const handleLogout = () => {
    signOutUser();
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    SetMode(!mode);
  };

  const userPic = localStorage.getItem("userPic");
  const is_signup = userPic ? true : false;
  const userUid = localStorage.getItem("userUid");

  const handleDashboard = () => {
    if (!is_signup) setShow(!show);
    handleMobileMenuClose();
  };

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
      "&:hover": {
        "& .MuiSwitch-thumb": {
          color: "black",
        },
        "& + .MuiSwitch-track": {
          backgroundColor: "black",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      color: "#007fff",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#007fff",
    },
  }));
  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontWeight: 700,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "black",
      "& .MuiSwitch-track": {
        backgroundColor: "black",
      },
      "& .MuiSwitch-thumb": {
        color: "black",
      },
    },
  }));

  const mobileMenuItems = (
    <>
      <MenuItem
        component={Link}
        to="/"
        onClick={handleMobileMenuClose}
        sx={{
          fontWeight: 700,
          color: "white",

          "&:hover": {
            backgroundColor: theme.colors.primary,
            color: "black",
          },
        }}
      >
        Home
      </MenuItem>
      <MenuItem
        component={Link}
        to="/dashboard"
        onClick={() => {
          handleMobileMenuClose();
          handleDashboard();
        }}
        sx={{
          fontWeight: 700,
          color: "white",

          "&:hover": {
            backgroundColor: theme.colors.primary,
            color: "black",
          },
        }}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/events"
        onClick={handleMobileMenuClose}
        sx={{
          fontWeight: 700,
          color: "white",

          "&:hover": {
            backgroundColor: theme.colors.primary,
            color: "black",
          },
        }}
      >
        Events
      </MenuItem>
      <MenuItem
        component={Link}
        to="/article"
        onClick={handleMobileMenuClose}
        sx={{
          fontWeight: 700,
          color: "white",

          "&:hover": {
            backgroundColor: theme.colors.primary,
            color: "black",
          },
        }}
      >
        Articles
      </MenuItem>
      <StyledMenuItem onClick={toggleTheme}>
        Mode:{" "}
        <CustomSwitch
          checked={mode}
          onChange={toggleTheme}
          icon={<Brightness4 />}
          checkedIcon={<Brightness7 />}
          color="default"
        />
      </StyledMenuItem>
      <MenuItem
        component={Link}
        to="/createEvent"
        onClick={handleMobileMenuClose}
        sx={{
          fontWeight: 700,
          color: "white",

          "&:hover": {
            backgroundColor: theme.colors.primary,
            color: "black",
          },
        }}
      >
        Create Event
      </MenuItem>
    </>
  );

  const screenTheme = useTheme();
  const isSmallScreen = useMediaQuery(screenTheme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(screenTheme.breakpoints.down("lg"));

  const iconPadding = isSmallScreen ? "8px 10px" : "16px";
  const mdGap = isMediumScreen ? "16px" : "32px";
  const mdFontSize = isMediumScreen ? "16px" : theme.fontSize.textBody;
  return (
    <AppBar
      position="fixed"
      sx={{
        background: isHome ? "transparent" : theme.colors.darkBackground,
        backdropFilter: isHome ? "blur(12px)" : "none",
        zIndex: 1000,
        paddingTop: "1rem",
        paddingBottom: ".6rem",
        // paddingY: "20px",
        boxShadow: "none",
        display: "flex",
      }}
    >
      <Signup isShow={show} returnShow={setShow} />
      <Toolbar>
        <Container maxWidth="xl">
          <Box
            sx={{
              margin: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 0,
                justifyContent: "center",
              }}
            >
              <img
                src={logo}
                width={isSmallScreen ? "42px" : "48px"}
                height={isSmallScreen ? "42px" : "48px"}
                alt="Lupo Skill logo"
                style={{ pointerEvents: "none", marginRight: "10px" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: isSmallScreen
                    ? "1.3rem"
                    : isMediumScreen
                    ? "1.8rem"
                    : theme.fontSize.subheading,
                }}
              >
                Lupo Skill
              </Typography>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                fontWeight: 700,
                border: isHome ? "1px solid" : "none",
                borderColor: theme.colors.lightBackground,
                padding: isHome ? "10px 16px" : "0px 12px",
                gap: mdGap,
                borderRadius: "32px",
                alignItems: "center",

                backgroundColor: isHome
                  ? "rgba(255, 255, 255, 0.17)"
                  : "transparent",
              }}
            >
              <Button
                href="/"
                sx={{
                  boxSizing: "border-box",
                  fontWeight: 700,
                  fontSize: mdFontSize,
                  color: isHome
                    ? isActive("/")
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)"
                    : isActive("/")
                    ? "black"
                    : theme.colors.brightBackground,
                  backgroundColor: isHome
                    ? isActive("/")
                      ? theme.colors.primary
                      : "transparent"
                    : isActive("/")
                    ? theme.colors.secondaryDark
                    : "transparent",
                  display: "block",
                  borderRadius: theme.borderRadius.large,
                  border: isHome ? "2px solid transparent" : "none",

                  // paddingX: 2,
                  padding: "2px 16px",

                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: isHome
                      ? theme.colors.primary
                      : theme.colors.secondaryDark,
                    color: isHome ? "white" : "black",
                    border: isHome ? "2px solid white" : "none",
                  },
                }}
              >
                Home
              </Button>
              <Button
                href="/dashboard"
                onClick={handleDashboard}
                sx={{
                  boxSizing: "border-box",
                  display: "block",
                  fontWeight: 600,
                  gap: "10px",
                  padding: "2px 16px",
                  fontSize: mdFontSize,
                  color: isHome
                    ? isActive("/dashboard")
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)"
                    : isActive("/dashboard")
                    ? "black"
                    : "white",
                  backgroundColor: isHome
                    ? isActive("/dashboard")
                      ? theme.colors.primary
                      : "rgba(252, 252, 252, 0.2)"
                    : isActive("/dashboard")
                    ? theme.colors.secondaryDark
                    : "transparent",
                  borderRadius: theme.borderRadius.large,
                  textTransform: "none",
                  border: isHome ? "2px solid transparent" : "none",
                  "&:hover": {
                    backgroundColor: isHome
                      ? theme.colors.primary
                      : theme.colors.secondaryDark,
                    color: isHome ? "white" : "black",
                    border: isHome ? "2px solid white" : "none",
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                href="/events"
                onClick={handleMobileMenuClose}
                sx={{
                  display: "block",
                  fontWeight: 600,
                  gap: "10px",
                  padding: "2px 16px",
                  fontSize: mdFontSize,
                  color: isHome
                    ? isActive("/events")
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)"
                    : isActive("/events")
                    ? "black"
                    : "white",
                  backgroundColor: isHome
                    ? isActive("/events")
                      ? theme.colors.primary
                      : "rgba(252, 252, 252, 0.2)"
                    : isActive("/events")
                    ? theme.colors.secondaryDark
                    : "transparent",
                  border: isHome ? "2px solid transparent" : "none",

                  "&:hover": {
                    backgroundColor: isHome
                      ? theme.colors.primary
                      : theme.colors.secondaryDark,
                    color: isHome ? "white" : "black",
                    border: isHome ? "2px solid white" : "none",
                  },
                  borderRadius: theme.borderRadius.large,
                  textTransform: "none",
                }}
              >
                Events
              </Button>
              <Button
                href="/article"
                onClick={handleMobileMenuClose}
                sx={{
                  display: "block",
                  fontWeight: 600,
                  gap: "10px",
                  padding: "2px 16px",
                  fontSize: mdFontSize,
                  color: isHome
                    ? isActive("/article")
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)"
                    : isActive("/article")
                    ? "black"
                    : "white",
                  backgroundColor: isHome
                    ? isActive("/article")
                      ? theme.colors.primary
                      : "rgba(252, 252, 252, 0.2)"
                    : isActive("/article")
                    ? theme.colors.secondaryDark
                    : "transparent",
                  border: isHome ? "2px solid transparent" : "none",

                  "&:hover": {
                    backgroundColor: isHome
                      ? theme.colors.primary
                      : theme.colors.secondaryDark,
                    color: isHome ? "white" : "black",
                    border: isHome ? "2px solid white" : "none",
                  },
                  borderRadius: theme.borderRadius.large,
                  textTransform: "none",
                }}
              >
                Articles
              </Button>

              <Button
                href="/createEvent"
                onClick={handleMobileMenuClose}
                sx={{
                  display: "block",
                  fontWeight: 600,
                  gap: "10px",
                  padding: "2px 16px",
                  fontSize: mdFontSize,
                  color: isHome
                    ? isActive("/createEvent")
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)"
                    : isActive("/createEvent")
                    ? "black"
                    : "white",
                  backgroundColor: isHome
                    ? isActive("/createEvent")
                      ? theme.colors.primary
                      : "rgba(252, 252, 252, 0.2)"
                    : isActive("/createEvent")
                    ? theme.colors.secondaryDark
                    : "transparent",
                  border: isHome ? "2px solid transparent" : "none",

                  "&:hover": {
                    backgroundColor: isHome
                      ? theme.colors.primary
                      : theme.colors.secondaryDark,
                    color: isHome ? "white" : "black",
                    border: isHome ? "2px solid white" : "none",
                  },
                  borderRadius: theme.borderRadius.large,
                  textTransform: "none",
                }}
              >
                Create Event
              </Button>
            </Box>
            {/* icons */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                columnGap: "2.2rem",
              }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: mdGap,
                }}
              >
                {!isSmallScreen && (
                  <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    sx={{
                      border: isHome ? "1px solid" : "none",
                      borderColor: theme.colors.lightBackground,
                      padding: iconPadding,
                      gap: "32px",
                      borderRadius: "32px",
                      alignItems: "center",

                      backgroundColor: isHome
                        ? "rgba(255, 255, 255, 0.17)"
                        : "transparent",
                    }}
                  >
                    {mode ? <Brightness4 /> : <Brightness7 />}
                  </IconButton>
                )}
                <IconButton>
                  <NotificationsPanel />
                </IconButton>

                {!is_signup ? (
                  // <Signup />

                  <IconButton
                    onClick={handleDashboard}
                    color="inherit"
                    sx={{
                      border: isHome ? "1px solid" : "none",
                      borderColor: theme.colors.lightBackground,
                      padding: iconPadding,
                      gap: "32px",
                      borderRadius: "32px",
                      alignItems: "center",

                      backgroundColor: isHome
                        ? "rgba(255, 255, 255, 0.17)"
                        : "transparent",
                    }}
                  >
                    <Person2Icon />
                  </IconButton>
                ) : (
                  <div>
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{
                        border: isHome ? "1px solid" : "none",
                        borderColor: theme.colors.lightBackground,
                        borderRadius: "32px",
                        alignItems: "center",
                        backgroundColor: isHome
                          ? "rgba(255, 255, 255, 0.17)"
                          : "transparent",
                      }}
                    >
                      <Avatar alt="User Avatar" src={userPic || default_user} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{ margin: 1 }}
                    >
                      <MenuItem
                        component={Link}
                        to={`/profile/${userUid ? userUid : ""}`}
                        onClick={handleMenuClose}
                        sx={{ color: "green" }}
                      >
                        View Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Box>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileMenuOpen}
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {expanded && (
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                  position: "fixed",
                  top: "14px",
                  left: "-16px",
                  zIndex: 1,
                }}
                MenuListProps={{
                  sx: {
                    padding: 0, // Remove padding from MenuList
                    backgroundColor: "#0F0F0F",
                  },
                }}
              >
                {" "}
                <Box sx={{ backgroundColor: "#0F0F0F", width: "100%" }}>
                  {mobileMenuItems}
                </Box>
              </Menu>
            )}
          </Box>
        </Container>{" "}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
