// import React, { useState, useEffect } from "react";
// import {
//   List,
//   useRecordContext,
//   ReferenceField,
//   TextField,
//   Show,
//   SimpleShowLayout,
//   NumberField,
//   TextInput,
//   ReferenceInput,
//   SelectInput,
//   Datagrid,
//   ArrayField,
// } from "react-admin";
// import PDFButton from "./PDFButton";

// // CustomImageField component
// const CustomImageField = ({ source }) => {
//   const record = useRecordContext();
//   const token = localStorage.getItem("jwt-token");
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     if (record && record[source] && token) {
//       const fetchImage = async () => {
//         try {
//           const response = await fetch(`${record[source]}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const blob = await response.blob();
//           const url = URL.createObjectURL(blob);
//           setImageSrc(url);
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

//   return <img src={imageSrc} alt="Product" style={{ maxWidth: "100px" }} />;
// };

// const CustomPDFButton = () => {
//   const record = useRecordContext();

//   useEffect(() => {
//     if (record && record.id) {
//       localStorage.setItem("cartId", record.id.toString());
//     }
//   }, [record]);

//   if (!record) {
//     return <span>Loading...</span>;
//   }

//   if (!record.id) {
//     return <span>No cart ID</span>;
//   }

//   return <PDFButton />;
// };

// // CartList component
// export const CartList = () => {
//   return (
//     <List>
//       <Datagrid rowClick="show">
//         <TextField source="cartId" label="Cart ID" />
//         <TextField source="totalPrice" label="Total Price" />
//       </Datagrid>
//     </List>
//   );
// };

// export const CartShow = () => {
//   return (
//     <Show>
//       <SimpleShowLayout>
//         <CustomPDFButton />
//         <TextField source="cartId" label="Cart ID" />
//         <NumberField source="totalPrice" label="Total Price" />
//         <ArrayField source="products" label="Products">
//           <Datagrid>
//             <TextField source="productId" label="Product ID" />
//             <TextField source="productName" label="Product Name" />
//             <CustomImageField source="image" label="Image" />
//             <TextField source="description" label="Description" />
//             <NumberField source="quantity" label="Quantity" />
//             <NumberField source="price" label="Price" />
//             <NumberField source="discount" label="Discount" />
//             <NumberField source="specialPrice" label="Special Price" />
//           </Datagrid>
//         </ArrayField>
//       </SimpleShowLayout>
//     </Show>
//   );
// };
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  ArrayField,
  Create,
  SimpleForm,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  Edit,
} from "react-admin";

// // CartList component
// export const CartList = () => {
//   return (
//     <List>
//       <Datagrid rowClick="show">
//         <TextField source="cartId" label="Cart ID" />
//         <NumberField source="products.length" label="Total Products" />
//         <EditButton />
//         <DeleteButton />
//       </Datagrid>
//     </List>
//   );
// };

// // CartShow component
// export const CartShow = () => {
//   return (
//     <Show>
//       <SimpleShowLayout>
//         <NumberField source="cartId" label="Cart ID" />
//         <ArrayField source="products" label="Products">
//           <Datagrid>
//             <NumberField source="productId" label="Product ID" />
//             <NumberField source="quantity" label="Quantity" />
//           </Datagrid>
//         </ArrayField>
//       </SimpleShowLayout>
//     </Show>
//   );
// };

// // CartCreate component
// export const CartCreate = () => {
//   return (
//     <Create>
//       <SimpleForm>
//         <NumberInput source="cartId" label="Cart ID" />
//         <ArrayInput source="products" label="Products">
//           <SimpleFormIterator>
//             <NumberInput source="productId" label="Product ID" />
//             <NumberInput source="quantity" label="Quantity" />
//           </SimpleFormIterator>
//         </ArrayInput>
//       </SimpleForm>
//     </Create>
//   );
// };

// // CartEdit component
// export const CartEdit = () => {
//   return (
//     <Edit>
//       <SimpleForm>
//         <NumberInput source="cartId" label="Cart ID" />
//         <ArrayInput source="products" label="Products">
//           <SimpleFormIterator>
//             <NumberInput source="productId" label="Product ID" />
//             <NumberInput source="quantity" label="Quantity" />
//           </SimpleFormIterator>
//         </ArrayInput>
//       </SimpleForm>
//     </Edit>
//   );
// };
export const CartShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="cartId" label="Cart ID" />
        <NumberField source="totalPrice" label="Total Price" />
        <ArrayField source="products" label="Products">
          <Datagrid>
            <NumberField source="productId" label="Product ID" />
            <TextField source="productName" label="Product Name" />
            <NumberField source="quantity" label="Quantity" />
            <NumberField source="price" label="Price" />
            <NumberField source="discount" label="Discount" />
            <NumberField source="specialPrice" label="Special Price" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
export const CartList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="cartId" label="Cart ID" />
        <NumberField source="totalPrice" label="Total Price" />
        <NumberField source="products.length" label="Total Products" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
export const CartCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <NumberInput source="cartId" label="Cart ID" />
        <NumberInput source="totalPrice" label="Total Price" />
        <ArrayInput source="products" label="Products">
          <SimpleFormIterator>
            <NumberInput source="productId" label="Product ID" />
            <NumberInput source="quantity" label="Quantity" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};
export const CartEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="cartId" label="Cart ID" />
        <NumberInput source="totalPrice" label="Total Price" />
        <ArrayInput source="products" label="Products">
          <SimpleFormIterator>
            <NumberInput source="productId" label="Product ID" />
            <NumberInput source="quantity" label="Quantity" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};