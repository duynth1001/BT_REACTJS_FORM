// rafc
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { btFormActions } from "../store/BTForm/slice";

export const ProductForm = () => {
  const [formValue, setFormValue] = useState({
    maSV: "",
    name: "",
    phone: "",
    email: "",
  });

  const [formError, setFormError] = useState({
    maSV: "",
    name: "",
    phone: "",
    email: "",
  });

  const [searchValue, setSearchValue] = useState();

  const dispatch = useDispatch();

  const { productEdit } = useSelector((state) => state.btForm);

  const validate = (name, value) => {
    switch (name) {
      case "maSV":
        if (value.trim() === "") {
          return "Vui lòng nhập thông tin";
        } else {
          return "";
        }

      case "name":
        if (value === "") {
          return "Vui lòng nhập thông tin";
        } else {
          return "";
        }

      case "phone":
        if (value === "") {
          return "Vui lòng nhập thông tin";
        } else if (!value.match(new RegExp("^[0-9]*$"))) {
          return "Số điện thoại không hợp lệ";
        } else {
          return "";
        }

      case "email":
        if (value === "") {
          return "Vui lòng nhập thông tin";
        } else if (!value.match(new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"))) {
          return "Email không hợp lệ";
        } else {
          return "";
        }

      case "description":
        if (value === "") {
          return "Vui lòng nhập thông tin";
        } else {
          return "";
        }

      default:
        return "";
    }
  };

  // currying function
  const handleFormValue = (name) => (ev) => {
    setFormError({ ...formError, [name]: validate(name, ev.target.value) });

    setFormValue({
      ...formValue,
      [name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (productEdit) {
      setFormValue(productEdit);
    }
    if (searchValue) {
      setSearchValue(searchValue);
    }
  }, [productEdit]);

  return (
    <div>
      <form
        className="row"
        id="btForm"
        onSubmit={(ev) => {
          // ngăn sự kiện reload của browser

          ev.preventDefault();
          const validationError = {};
          Object.keys(formValue).forEach((name) => {
            const error = validate(name, formValue[name]); // Vui lòng nhập thông tin || ""
            if (error && error.length > 0) {
              validationError[name] = error;
            }
          });

          if (Object.keys(validationError).length > 0) {
            setFormError({ ...validationError });
            return;
          }

          if (productEdit) {
            // dispatch action Edit
            dispatch(btFormActions.editProduct(formValue));
            setFormValue({
              maSV: "",
              name: "",
              phone: "",
              email: "",
            });
          } else {
            dispatch(btFormActions.addProduct(formValue));
          }
        }}
      >
        <h2 className="p-3 bg-dark text-white">Thông tin sinh viên</h2>
        <div className="col-6">
          <div>
            <p>Mã SV</p>
            <input
              id="id"
              type="text"
              className="form-control"
              onChange={handleFormValue("maSV")}
              onBlur={handleFormValue("maSV")}
              disabled={formValue.maSV === productEdit?.maSV}
              value={formValue.maSV}
            />
            {formError.maSV && (
              <p>
                <small className="text-danger">{formError.maSV}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Số điện thoại</p>
            <input
              type="text"
              className="form-control"
              onChange={handleFormValue("phone")}
              value={formValue.phone}
            />
            {formError.phone && (
              <p>
                <small className="text-danger">{formError.phone}</small>
              </p>
            )}
          </div>
        </div>
        <div className="col-6">
          <div>
            <p>Họ tên</p>
            <input
              type="text"
              className="form-control"
              onChange={handleFormValue("name")}
              value={formValue.name}
            />
            {formError.name && (
              <p>
                <small className="text-danger">{formError.name}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Email</p>
            <input
              type="text"
              className="form-control"
              onChange={handleFormValue("email")}
              value={formValue.email}
            />
            {formError.email && (
              <p>
                <small className="text-danger">{formError.email}</small>
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          {productEdit ? (
            <button className="btn btn-info">Cập nhật</button>
          ) : (
            <button className="btn btn-success">Thêm sinh viên</button>
          )}
        </div>
      </form>
      <input
        class="form-control mt-3"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Nhập tên sinh viên cần tìm"
      />
      <button
        className="btn btn-success mt-3"
        onClick={() => {
          dispatch(btFormActions.findProduct(searchValue.trim()));
        }}
      >
        Tìm sinh viên
      </button>
    </div>
  );
};
