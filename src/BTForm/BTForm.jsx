// rafc
import React from 'react'
import { ProductForm } from './ProductForm'
import { ProductTable } from './ProductTable'

export const BTForm = () => {
    return (
        <div className="container mt-3 ">
            <ProductForm/>
            <ProductTable/>
        </div>
    )
}
