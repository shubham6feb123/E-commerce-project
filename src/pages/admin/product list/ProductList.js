import React, { useEffect, useState } from "react";
import { GetProductsByCount,DeleteProduct } from "../../../functions/product";

//css file
import './productList.css';

//components
import AdminProductCard from '../../../components/AdminProductCard/AdminProductCard';
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState(null);
   // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    GetProductsByCount(100)
      .then((res) => {
        // console.log("all the products", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log("error in getting products", err);
        setLoading(true);
      });
  };

  //deleting product
  const handleRemove = (slug)=>{
      let remove = window.confirm('Do you want to delete ?');
      if(remove){
        console.log("delete request send",slug)
        DeleteProduct(slug).then((res)=>{
          // console.log("delete response",res)
          toast.success('product deleted',{position:"bottom-right"})
          loadAllProducts();
        }).catch((err)=>{
          // if(err.response.status===400){
            toast.error('Product deletion failed',{position:"bottom-right"})
          // }
        })
      }
  }
  return <>
  
        <div className="product__container">
          {
          products?.map((product)=>(
            <AdminProductCard  key={product._id} product={product} handleRemove={handleRemove} loading={loading}/>
          ))
          }
        </div>
  </>;
}

export default ProductList;
