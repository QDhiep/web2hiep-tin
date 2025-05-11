// // import React from "react";
// import {
//   List,
//   Datagrid,
//   TextField,
//   EmailField,
//   NumberField,
//   Create,
//   Edit,
//   SimpleForm,
//   TextInput,
//   NumberInput,
//   EditButton,
//   DeleteButton,
// } from "react-admin";

// // User List component
// export const UserList = () => (
//   <List>
//     <Datagrid rowClick={false}>
//       <TextField source="user_id" label="User ID" />
//       <TextField source="first_name" label="First Name" />
//       <TextField source="last_name" label="Last Name" />
//       <EmailField source="email" label="Email" />
//       <NumberField source="mobile_number" label="Mobile Number" />
//       <EditButton />
//       <DeleteButton />
//     </Datagrid>
//   </List>
// );

// // User Create component
// export const UserCreate = () => (
//   <Create>
//     <SimpleForm>
//       <TextInput source="first_name" label="First Name" />
//       <TextInput source="last_name" label="Last Name" />
//       <TextInput source="email" label="Email" />
//       <NumberInput source="mobile_number" label="Mobile Number" />
//       <TextInput source="password" label="Password" type="password" />
//     </SimpleForm>
//   </Create>
// );

// // User Edit component
// export const UserEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <TextInput source="user_id" label="User ID" disabled />
//       <TextInput source="first_name" label="First Name" />
//       <TextInput source="last_name" label="Last Name" />
//       <TextInput source="email" label="Email" />
//       <NumberInput source="mobile_number" label="Mobile Number" />
//       <TextInput source="password" label="Password" type="password" />
//     </SimpleForm>
//   </Edit>
// );
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  DeleteButton,
} from "react-admin";

// Danh sách người dùng
export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="User ID" />
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" label="Email" />
      <TextField source="mobileNumber" label="Mobile Number" /> {/* Đảm bảo trường này tồn tại */}

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Tạo mới người dùng
export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" label="First Name" />
      <TextInput source="lastName" label="Last Name" />
      <TextInput source="email" label="Email" />
      <TextInput source="password" label="Password" type="password" />
      <TextInput source="mobileNumber" label="Mobile Number" /> {/* Đảm bảo trường này tồn tại */}

    </SimpleForm>
  </Create>
);

// Chỉnh sửa người dùng
export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" label="User ID" disabled />
      <TextInput source="firstName" label="First Name" />
      <TextInput source="lastName" label="Last Name" />
      <TextInput source="email" label="Email" />
      <TextInput source="mobileNumber" label="Mobile Number" /> {/* Đảm bảo trường này tồn tại */}
    </SimpleForm>
  </Edit>
);