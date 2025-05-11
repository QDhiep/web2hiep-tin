// import React from "react";
// import {
//   List,
//   Datagrid,
//   TextField,
//   NumberField,
//   Create,
//   Edit,
//   SimpleForm,
//   TextInput,
//   NumberInput,
//   ReferenceInput,
//   SelectInput,
//   EditButton,
//   DeleteButton,
//   useRecordContext,
//   Link,
// } from "react-admin";
// import { Link as RouterLink } from "react-router-dom";
// import axios from "../../node_modules/axios/index";

// // Custom ImageField component
// const CustomImageField = ({ source }: { source: string }) => {
//   const record = useRecordContext();
//   const token = localStorage.getItem("jwt-token");
//   const [imageUrl, setImageUrl] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     if (record && record[source]) {
//       const fetchImage = async () => {
//         try {
//           const response = await axios.get(record[source], {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             responseType: "blob",
//           });
//           const imageUrl = URL.createObjectURL(response.data);
//           setImageUrl(imageUrl);
//         } catch (error) {
//           console.error("Error fetching image:", error);
//         }
//       };
//       fetchImage();
//     }
//   }, [record, source, token]);

//   if (!record || !record[source]) {
//     return <span>No Image</span>;
//   }

//   return (
//     <RouterLink to={`/products/${record.id}/update-image`}>
//       <img
//         src={imageUrl || ""}
//         alt="Product"
//         style={{ width: "100px", height: "auto" }}
//       />
//     </RouterLink>
//   );
// };

// // Filters for the Product List
// const postFilters = [
//   <TextInput source="search" label="Search" alwaysOn />,
//   <ReferenceInput source="categoryId" reference="categories" label="Category">
//     <SelectInput optionText="categoryName" />
//   </ReferenceInput>,
// ];

// // Product List component
// export const ProductList = () => (
//   <List filters={postFilters}>
//     <Datagrid rowClick={false}>
//       <TextField source="productId" label="Product ID" />
//       <TextField source="productName" label="Product Name" />
//       <TextField source="category.categoryName" label="Category Name" />
//       <CustomImageField source="image" />
//       <TextField source="description" label="Description" />
//       <NumberField source="quantity" label="Quantity" />
//       <NumberField source="price" label="Price" />
//       <NumberField source="discount" label="Discount" />
//       <NumberField source="specialPrice" label="Special Price" />
//       <EditButton />
//       <DeleteButton />
//     </Datagrid>
//   </List>
// );

// // Product Create component
// export const ProductCreate = () => (
//   <Create>
//     <SimpleForm>
//       <TextInput source="productName" label="Product Name" />
//       <TextInput source="description" label="Description" />
//       <NumberInput source="quantity" label="Quantity" />
//       <NumberInput source="price" label="Price" />
//       <NumberInput source="discount" label="Discount" />
//       <NumberInput source="specialPrice" label="Special Price" />
//       <ReferenceInput
//         source="categoryId"
//         reference="categories"
//         label="Category"
//       >
//         <SelectInput optionText="categoryName" />
//       </ReferenceInput>
//     </SimpleForm>
//   </Create>
// );

// // Product Edit component
// export const ProductEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <TextInput source="productId" disabled />
//       <ReferenceInput
//         source="categoryId"
//         reference="categories"
//         label="Category"
//       >
//         <SelectInput optionText="categoryName" />
//       </ReferenceInput>
//       <TextInput source="productName" />
//       <TextInput source="image" disabled />
//       <TextInput source="description" />
//       <NumberInput source="quantity" />
//       <NumberInput source="price" />
//       <NumberInput source="discount" />
//       <NumberInput source="specialPrice" />
//     </SimpleForm>
//   </Edit>
// );
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  useRecordContext,
  Link,
} from "react-admin";
import { Link as RouterLink } from "react-router-dom";

// Custom ImageField component
const CustomImageField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) {
    return <span>No Image</span>;
  }
  return (
    <RouterLink to={`/products/${record.id}/update-image`}>
      <img
        src={record[source]}
        alt="Product"
        style={{ width: "100px", height: "auto" }}
      />
    </RouterLink>
  );
};

// Filters for the Product List
const postFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  <ReferenceInput source="categoryId" reference="categories" label="Category">
    <SelectInput optionText="categoryName" />
  </ReferenceInput>,
];

// Product List component
export const ProductList = () => (
  <List filters={postFilters}>
    <Datagrid rowClick={false}>
      <TextField source="productId" label="Product ID" />
      <TextField source="productName" label="Product Name" />
      <ReferenceField
        source="categoryId"
        reference="categories"
        label="Category Name"
      >
        <TextField source="categoryName" />
      </ReferenceField>
      <CustomImageField source="image" />
      <TextField source="description" label="Description" />
      <NumberField source="quantity" label="Quantity" />
      <NumberField source="price" label="Price" />
      <NumberField source="discount" label="Discount" />
      <NumberField source="specialPrice" label="Special Price" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Product Create component
export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="productName" label="Product Name" />
      <TextInput source="description" label="Description" />
      <NumberInput source="quantity" label="Quantity" />
      <NumberInput source="price" label="Price" />
      <NumberInput source="discount" label="Discount" />
      <NumberInput source="specialPrice" label="Special Price" />
      <ReferenceInput
        source="categoryId"
        reference="categories"
        label="Category"
      >
        <SelectInput optionText="categoryName" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// Product Edit component
export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="productId" disabled />
      <ReferenceInput
        source="categoryId"
        reference="categories"
        label="Category"
      >
        <SelectInput optionText="categoryName" />
      </ReferenceInput>
      <TextInput source="productName" />
      <TextInput source="image" disabled />
      <TextInput source="description" />
      <NumberInput source="quantity" />
      <NumberInput source="price" />
      <NumberInput source="discount" />
      <NumberInput source="specialPrice" />
    </SimpleForm>
  </Edit>
);