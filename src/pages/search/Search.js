import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

//functions
import { GetBySearchText } from "../../functions/product";

//components
import Card1 from "../../components/Card/Card1";
import {UpCircleOutlined} from "@ant-design/icons";

//css
import "./search.css";
import SearchFilters from "../../components/SearchFilters/SearchFilters";

// import product from '../../../../server/models/product';

function Search() {
  const [products, setProducts] = useState([]);
  const [price,setPrice] = useState([0,60000]);
  const [loading, setLoading] = useState(true);
  const [searchFilter,setSearchFilter] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProductBySearchText({ query: search.text });

    return () => loading;
    // eslint-disable-next-line
  }, [search.text]);


  const loadProductBySearchText = async (text) => {
    try {
      const allproducts = await GetBySearchText(text);
      setProducts(allproducts.data);
      setLoading(false);
      //   console.log("all products from search",allproducts.data);
    } catch (error) {
      setLoading(true);
    }
  };


  return (
    <div className="search">
      {!loading && products?.length > 0 ? (
        <>
          <div className={searchFilter?`search__filters__container hide`:`search__filters__container display`}>
            <SearchFilters loading={loading} setLoading={setLoading} products={products} setProducts={setProducts} price={price} setPrice={setPrice}/>
          </div>
          <div className="show__search__container">
            <p>Showing search result for "{search.text}"</p>
            <div className="show__search">
              {products.map((product) => (
                <Card1
                  rate={product.rating}
                  rating={true}
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
          <div className="display__search__filters"><UpCircleOutlined onClick={()=>{setSearchFilter(!searchFilter)}} /></div>
        </>
      ) : (
        // <p>Product not found</p>
        <Loading text="Searching..." />
      )}
    </div>
  );
}

export default Search;
