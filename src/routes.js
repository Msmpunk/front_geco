import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdLock,
  MdAnalytics,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import TablesPage from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Corpus",
    layout: "/admin",
    path: "/default",
    icon: (
      <Icon
        as={MdHome}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Lista de corpus",
    layout: "/admin",
    path: "/extra",
    icon: <Icon as={MdAnalytics} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Corpus seleccionado",
    layout: "/admin",
    path: "/corpus/:id",
    icon: <Icon as={MdAnalytics} width='20px' height='20px' color='inherit' />,
    component: TablesPage,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
