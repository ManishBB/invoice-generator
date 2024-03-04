import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm() {
    const [products, setProducts] = useState([
        { id: 1, name: "", quantity: "", rate: "" },
    ]);
    const [total, setTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalWithGst, setTotalWithGst] = useState(0);

    const navigate = useNavigate();

    const validateProducts = () => {
        const invalidProduct = products.some(
            (product) =>
                !product.name.trim() ||
                product.quantity === "" ||
                product.rate === ""
        );

        if (invalidProduct) {
            alert("Please fill in all fields for each product.");
            return false; // Validation failed
        }

        return true; // Validation passed
    };

    const addProduct = () => {
        const newProduct = {
            id: products.length + 1,
            name: "",
            quantity: "",
            rate: "",
        };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, field, value) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, [field]: value } : product
        );
        setProducts(updatedProducts);
    };

    const handleNextClick = () => {
        if (!validateProducts()) return;

        navigate("/invoice", { state: { products, total, gst, totalWithGst } });
    };

    const calculateTotal = () => {
        if (!validateProducts()) return;

        const totalAmount = products.reduce((acc, curr) => {
            return acc + curr.quantity * curr.rate;
        }, 0);
        const gstAmount = totalAmount * 0.18; // 18% GST
        const finalTotal = totalAmount + gstAmount;
        setTotal(totalAmount);
        setGst(gstAmount);
        setTotalWithGst(finalTotal);

        console.log(products, totalAmount, gstAmount, finalTotal);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-5">
                    Product Form
                </h3>
                <div className="flex mb-4">
                    <div className="w-3/5 mr-2">
                        <label className="block font-bold">Product Name</label>
                    </div>
                    <div className="w-1/5 mr-2">
                        <label className="block font-bold">Quantity</label>
                    </div>
                    <div className="w-1/5">
                        <label className="block font-bold">Rate</label>
                    </div>
                </div>
                <div>
                    {products.map((product, index) => (
                        <div key={index} className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={product.name}
                                onChange={(e) =>
                                    updateProduct(
                                        product.id,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="w-3/5 px-4 py-2 mt-2 border rounded-md mr-2"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={product.quantity}
                                onChange={(e) =>
                                    updateProduct(
                                        product.id,
                                        "quantity",
                                        parseInt(e.target.value, 10)
                                    )
                                }
                                className="w-1/5 px-4 py-2 mt-2 border rounded-md mr-2"
                            />
                            <input
                                type="number"
                                placeholder="Rate"
                                value={product.rate}
                                onChange={(e) =>
                                    updateProduct(
                                        product.id,
                                        "rate",
                                        parseInt(e.target.value, 10)
                                    )
                                }
                                className="w-1/5 px-4 py-2 mt-2 border rounded-md"
                            />
                        </div>
                    ))}
                    <div className="flex justify-between flex-col sm:flex-row">
                        <button
                            onClick={addProduct}
                            className="px-6 py-2 mt-4 mr-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                        >
                            Add New Product
                        </button>
                        <button
                            onClick={calculateTotal}
                            className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900"
                        >
                            Calculate Now
                        </button>
                    </div>
                </div>
                <div className="mt-5 flex justify-between flex-col sm:flex-row">
                    <p>
                        Total:{" "}
                        <span className="font-bold">{total.toFixed(2)}</span>
                    </p>
                    <p>
                        GST (18%):{" "}
                        <span className="font-bold">{gst.toFixed(2)}</span>
                    </p>
                    <p>
                        Total with GST:{" "}
                        <span className="font-bold">
                            {totalWithGst.toFixed(2)}
                        </span>
                    </p>
                    <button
                        onClick={handleNextClick}
                        className="px-6 py-1 text-white bg-gray-600 rounded-lg hover:bg-green-900"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
