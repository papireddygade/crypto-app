import React from "react";
import { Menu, Button, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined,
  FundOutlined,
  BulbOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { throttle } from "lodash";

type NavbarProps = {};
const menuItem = [
  {
    key: 'Home',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>
  },
  {
    key: 'Fund',
    icon: <FundOutlined />,
    label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>
  }
  , {
    key: 'Money',
    icon: <MoneyCollectOutlined />,
    label: <Link to="/exchanges">Exchanges</Link>
  },
  {
    key: 'Bulb',
    icon: <BulbOutlined />,
    label: <Link to="/news">News</Link>
  }
]
const Navbar: React.FC<NavbarProps> = () => {
  const [activeMenu, setActiveMenu] = React.useState<boolean>(false);
  const [screenSize, setScreenSize] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleResize = throttle(() => setScreenSize(window.innerWidth), 300);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (screenSize && screenSize < 801) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar
          src="https://raw.githubusercontent.com/adrianhajdin/project_cryptoverse/main/src/images/cryptocurrency.png"
          size="large"
        />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu items={menuItem} theme="dark" />
      )}
    </div>
  );
};
export default Navbar;
