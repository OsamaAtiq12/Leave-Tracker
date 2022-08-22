import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/shipping.svg";
import ProductIcon from "../assets/icons/product.svg";
import UserIcon from "../assets/icons/user.svg";

const Hrside = [
  {
    id: 1,
    icon: DashboardIcon,
    path: "/hrHome",
    title: "Home",
  },
  {
    id: 2,
    icon: ProductIcon,
    path: "/hrLeaves",
    title: "My Leaves",
  },
  {
    id: 3,
    icon: ShippingIcon,
    path: "/hrApply",
    title: "Apply For Leaves",
  },

  {
    id: 4,
    icon: ShippingIcon,
    path: "/EmpLeaves",
    title: "Employee Leaves",
  },
  {
    id: 5,
    icon: ShippingIcon,
    path: "/NewUser",
    title: "Add New User",
  },

  {
    id: 6,
    icon: ShippingIcon,
    path: "/List",
    title: "User List",
  },

  {
    id: 7,
    icon: ShippingIcon,
    path: "/OnBehalf",
    title: "On Behalf Leave",
  },
];

export default Hrside;
