import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import LocalBarIcon from "@mui/icons-material/LocalBar";

export const categories = [
  {
    name: "Pizza",
    outlinedIcon: <LocalPizzaOutlinedIcon className="text-white" />,
    filledIcon: <LocalPizzaIcon className="text-black" />,
    mainImg: "/images/home/carousel/pizza.jpg",
    recipes: [
      {
        name: "Margherita Pizza",
        servings: 2,
        cookTime: "30 minutes",
        img: "/images/home/carousel/margherita_pizza.jpg",
      },
      {
        name: "Pepperoni Pizza",
        servings: 2,
        cookTime: "30 minutes",
        img: "/images/home/carousel/pepperoni_pizza.jpg",
      },
    ],
  },
  {
    name: "Dessert",
    outlinedIcon: <BakeryDiningOutlinedIcon className="text-white" />,
    filledIcon: <BakeryDiningIcon className="text-black" />,
    mainImg: "/images/home/carousel/dessert.jpg",
    recipes: [
      {
        name: "Fruit Cupcake",
        servings: 4,
        cookTime: "30 minutes",
        img: "/images/home/carousel/cupcake.jpg",
      },
      {
        name: "Cake",
        servings: 5,
        cookTime: "30 minutes",
        img: "/images/home/carousel/cake.jpg",
      },
    ],
  },
  {
    name: "Grill",
    outlinedIcon: <KebabDiningOutlinedIcon className="text-white" />,
    filledIcon: <KebabDiningIcon className="text-black"></KebabDiningIcon>,
    mainImg: "/images/home/carousel/grill.jpg",
    recipes: [
      {
        name: "Grilled Pork Chops",
        servings: 2,
        cookTime: "45 minutes",
        img: "/images/home/carousel/pork_chops.jpg",
      },
      {
        name: "Cheeseburger",
        servings: 1,
        cookTime: "20 minutes",
        img: "/images/home/carousel/cheeseburger.jpg",
      },
    ],
  },
  {
    name: "Noodles",
    outlinedIcon: <RamenDiningOutlinedIcon className="text-white" />,
    filledIcon: <RamenDiningIcon className="text-black" />,
    mainImg: "/images/home/carousel/noodles.jpg",
    recipes: [
      {
        name: "Pad Thai",
        servings: 3,
        cookTime: "20 minutes",
        img: "/images/home/carousel/pad_thai.jpg",
      },
      {
        name: "Chow Mein",
        servings: 3,
        cookTime: "20 minutes",
        img: "/images/home/carousel/chow_mein.jpg",
      },
    ],
  },
  {
    name: "Mocktail",
    outlinedIcon: <LocalBarOutlinedIcon className="text-white" />,
    filledIcon: <LocalBarIcon className="text-black" />,
    mainImg: "/images/home/carousel/mocktail.jpg",
    recipes: [
      {
        name: "Virgin Mojito",
        servings: 1,
        cookTime: "10 minutes",
        img: "/images/home/carousel/mojito.jpg",
      },
      {
        name: "Virgin Bloody Mary",
        servings: 1,
        cookTime: "10 minutes",
        img: "/images/home/carousel/bloody_mary.jpg",
      },
    ],
  },
];
