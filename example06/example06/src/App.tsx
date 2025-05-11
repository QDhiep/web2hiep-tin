// import {
//   Admin,
//   Resource,
//   ShowGuesser,
//   EditGuesser,
//   ListGuesser,
//   CustomRoutes,
// } from "react-admin";
// import { Route } from "react-router-dom";
// import { Layout } from "./Layout";
// import CategoryIcon from "@mui/icons-material/Category";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { dataProvider } from "./dataProvider";
// import { authProvider } from "./authProvider";
// import { Dashboard } from "./DashBoard";
// import {
//   CategoryList,
//   CategoryCreate,
//   CategoryEdit,
// } from "./component/category";
// import { ProductList, ProductCreate, ProductEdit } from "./component/product";
// import { CartList, CartShow } from "./component/Cart"; // Thêm CartShow
// import ProductImageUpdate from "./component/ProductImageUpdate";

// export const App = () => (
//   <Admin
//     authProvider={authProvider}
//     layout={Layout}
//     dataProvider={dataProvider}
//     dashboard={Dashboard}
//   >
//     {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/> */}
//     {/* <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} /> */}
//     <CustomRoutes>
//       <Route
//         path="/products/:id/update-image"
//         element={<ProductImageUpdate />}
//       />
//     </CustomRoutes>
//     <Resource
//       name="categories"
//       list={CategoryList}
//       create={CategoryCreate}
//       edit={CategoryEdit}
//       icon={CategoryIcon}
//     />
//     <Resource
//       name="products"
//       list={ProductList}
//       create={ProductCreate}
//       edit={ProductEdit}
//       icon={Inventory2Icon}
//     />
//     <Resource
//       name="carts"
//       list={CartList}
//       show={CartShow} // Thêm show prop để hiển thị CartShow
//       icon={ShoppingCartIcon}
//     />
//   </Admin>
// );
import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./DashBoard";
import { authProvider } from "./authProvider";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
} from "./component/Category";
import { UserList, UserCreate, UserEdit } from "./component/User";
import { ProductCreate, ProductEdit, ProductList } from "./component/Product";
import ProductImageUpdate from "./component/ProductImageUpdate";
import { CartList, CartShow, CartCreate, CartEdit } from "./component/Cart";

export const App = () => (
  <Admin
    authProvider={authProvider}
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    <CustomRoutes>
      <Route
        path="/products/:id/update-image"
        element={<ProductImageUpdate />}
      ></Route>
    </CustomRoutes>
    <Resource
      name="categories"
      list={CategoryList}
      create={CategoryCreate}
      edit={CategoryEdit}
      icon={CategoryIcon}
    />
    <Resource
      name="products"
      list={ProductList}
      create={ProductCreate}
      edit={ProductEdit}
      icon={Inventory2Icon}
    />
    <Resource
 name="carts"
 list={CartList}
 show={CartShow}
 create={CartCreate}
 edit={CartEdit}    />
        <Resource
      name="users" // Thêm resource cho người dùng
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      // icon={UserIcon}
    />

  </Admin>
);
