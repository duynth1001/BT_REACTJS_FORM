// rafc
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const ProductTable = () => {
    const { productList } = useSelector((state) => state.btForm)
    const dispatch = useDispatch()

    return (
        <div className="mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.maSV}</td>
                                <td>{product.name}</td>
                                <td>{product.phone}</td>
                                <td>{product.email}</td>
                                <td style={{ width: 120 }}>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            dispatch(btFormActions.deleteProduct(product.maSV))
                                        }}
                                    >
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button
                                        className="btn btn-success ms-3"
                                        onClick={() => {
                                            dispatch(btFormActions.setProductEdit(product))
                                        }}
                                    >
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
