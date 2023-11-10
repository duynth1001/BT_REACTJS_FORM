import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [
    {
      maSV: "140016",
      name: "Nguyễn Trọng Hùng",
      phone: "0904452214",
      email: "sv1@mail.com",
    },
    {
      maSV: "140017",
      name: "Trần Hoàng Nam",
      phone: "0903333154",
      email: "sv2@mail.com",
    },
    {
      maSV: "140018",
      name: "Đỗ Trung Tín",
      phone: "0904129995",
      email: "sv3@mail.com",
    },
  ],
  productEdit: undefined,
};

const BTFormSlice = createSlice({
  name: "BTForm",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      const productIndex = state.productList.findIndex(
        (item) => item.maSV === payload.maSV
      );
      if (productIndex == -1) {
        state.productList.push(payload);
      } else {
        alert("Mã sinh viên đã tồn tại, xin vui lòng nhập lại");
        return;
      }
    },
    deleteProduct: (state, { payload }) => {
      state.productList = state.productList.filter(
        (value) => value.maSV !== payload
      );
    },
    setProductEdit: (state, { payload }) => {
      state.productEdit = payload;
    },
    editProduct: (state, { payload }) => {
      const productIndex = state.productList.findIndex(
        (item) => item.maSV === payload.maSV
      );

      if (productIndex !== -1) {
        state.productList[productIndex] = payload;
        state.productList.forEach((e) => {
          e.name = e.name.trim();
        });

        state.productEdit = undefined;
      }
    },
    findProduct: (state, { payload }) => {
      const productIndex = state.productList.findIndex(
        (item) => item.name === payload
      );
      if (productIndex == -1) {
        alert("Không tìm thấy sinh viên trong danh sách");
        return;
      }
      state.productList = state.productList.filter(
        (value) => value.name === payload
      );
    },
  },
});

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice;
