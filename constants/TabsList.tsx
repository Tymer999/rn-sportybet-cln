import { ImageSourcePropType } from "react-native";

export interface TabItem {
  id: string;
  name: string;
  icon: ImageSourcePropType | undefined;
  activeIcon: string;
}

export const TabsList: TabItem[] = [
  {
    id: "index",
    name: "Home",
    icon: require("../assets//bottom_nav_icons/home.png"),
    activeIcon: require("../assets//bottom_nav_icons/home.png"),
  },
  {
    id: "menu",
    name: "Menu",
    icon: require("../assets//bottom_nav_icons/az_menu.png"),
    activeIcon: require("../assets//bottom_nav_icons/az_menu.png"),
  },
  {
    id: "games",
    name: "Games",
    icon: require("../assets//bottom_nav_icons/games.png"),
    activeIcon: require("../assets//bottom_nav_icons/games.png"),
  },
  {
    id: "openBet",
    name: "Open Bet",
    icon: require("../assets//bottom_nav_icons/open_bet.png"),
    activeIcon: require("../assets//bottom_nav_icons/open_bet.png"),
  },

  {
    id: "profile",
    name: "Profile",
    icon: require("../assets//bottom_nav_icons/profile.png"),
    activeIcon: require("../assets//bottom_nav_icons/profile.png"),
  },
];
