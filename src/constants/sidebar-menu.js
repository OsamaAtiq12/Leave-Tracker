import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/shipping.svg";
import ProductIcon from "../assets/icons/product.svg";
import UserIcon from "../assets/icons/user.svg";

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: "/",
    title: "Home",
  },
  {
    id: 2,
    icon: ProductIcon,
    path: "/Leaves",
    title: "My Leaves",
  },
  {
    id: 3,
    icon: ShippingIcon,
    path: "/Apply",
    title: "Apply For Leaves",
  },
];

export default sidebar_menu;
