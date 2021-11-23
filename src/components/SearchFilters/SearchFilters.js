import React, { useEffect, useState } from "react";

//css
import "./searchfilters.css";

//functions
import { GetBySearchText, GetProductsByCount } from "../../functions/product";
import { list } from "../../functions/category";

//components
import { Slider, Checkbox, Input, Rate } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function SearchFilters({
  price,
  setPrice,
  products,
  setProducts,
  loading,
  setLoading,
}) {
  // const [price,setPrice] = useState([0,60000]);

  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [showCategory, setShowCategory] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [showStar, setShowStar] = useState(true);

  useEffect(() => {
    loadCategory();
    loadBrand();
  }, []);

  const onChange = (value) => {
    // setLoading(true);
    setPrice(value);
    //   console.log("price value",value)
  };

  const onAfterChange = (value) => {
    loadProductsByPrice({ price: price });
    //    console.log(value)
  };

  const loadProductsByPrice = async (price) => {
    try {
      const products = await GetBySearchText(price);
      //    console.log("product by price",products)
      if (products.data.length !== 0) {
        setProducts(products.data);
        setLoading(false);
      } else {
        throw new Error("Products not found");
      }
    } catch (e) {
      setLoading(false);
      // console.log("product by price",e.message);
    } finally {
      if (!products) {
        setLoading(false);
      }
    }
  };

  //load all category
  const loadCategory = async () => {
    const allCategory = await list();
    // console.log("all category", allCategory);
    setAllCategory(allCategory.data);
  };

  //checkbox category function
  const checkBox = (e) => {
    // console.log("checkbox", e.nativeEvent.target.name);
    // console.log("checkbox", e);
    if (e.target.checked) {
      loadProductByCategory({ category: e.target.name });
    }
  };

  const checkBoxBrand = (e) => {
    if (e.target.checked) {
      loadProductsByBrand({ brand: e.target.name });
    }
  };

  const checkBoxStar = (e) => {
    if (e.target.checked) {
      loadProductByStar({ stars: e.target.name });
    }
  };

  const loadProductByStar = async (star) => {
    const products = await GetBySearchText(star);
    if (products.data.length !== 0) setProducts(products.data);
  };

  const loadProductByCategory = async (category) => {
    const products = await GetBySearchText(category);
    // console.log("category--------->", products);
    if (products.data.length !== 0) setProducts(products.data);
  };

  const loadProductsByBrand = async (brand) => {
    const products = await GetBySearchText(brand);
    if (products.data.length !== 0) setProducts(products.data);
  };

  //category search bar func
  const onSearch = (v) => {
    // console.log("onsearch ", v);
    setSearchKey(v);
  };

  //brand search bar func
  const onBrand = (v) => {
    setSearchKey(v);
  };

  //load brand
  const loadBrand = async () => {
    const brand = await GetProductsByCount();
    let brandArr = [];
    for (let i = 0; i < brand.data.length; i++) {
      if (!brandArr.includes(brand.data[i].brand)) {
        brandArr.push(brand.data[i].brand);
      }
    }

    setAllBrand(brandArr);

    // console.log("brand----->", brand.data);
  };

  return (
    <div className="search__filters">
      <div className="heading">
        <span>Filters</span>
      </div>
      {/* price filter section */}
      <div className="price">
        <div className="price__heading">
          <span>Price</span>
        </div>
        <Slider
          tipFormatter={(v) => `₹${v}`}
          range
          step={10}
          max="200000"
          value={price}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
      </div>
      {/* category filter section */}
      <div className="price">
        <div
          className="category__heading"
          onClick={() => {
            showCategory ? setShowCategory(false) : setShowCategory(true);
          }}
        >
          <span className="category__span">Category</span>
          {showCategory ? <UpOutlined /> : <DownOutlined />}
        </div>
        <ul
          className="category__list"
          style={showCategory ? { display: "block" } : { display: "none" }}
        >
          {/* //search bar */}
          <Input.Search
            placeholder="search category"
            enterButton
            size="small"
            onSearch={onSearch}
          />
          {allCategory
            ?.filter((v) =>
              searchKey !== "" ? v.name.toLowerCase() === searchKey : v
            )
            .map((c) => (
              <li className="category__list__Item" key={c._id}>
                <Checkbox name={c._id} onChange={checkBox} />
                <span style={{ marginLeft: "3%" }}>{c.name}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* by brand filter section */}
      <div className="price">
        <div
          className="brand__heading"
          onClick={() => {
            showBrand ? setShowBrand(false) : setShowBrand(true);
          }}
        >
          <span className="category__span">Brand</span>
          {showBrand ? <UpOutlined /> : <DownOutlined />}
        </div>
        <ul
          className="category__list"
          style={showBrand ? { display: "block" } : { display: "none" }}
        >
          {/* //search bar */}
          <Input.Search
            placeholder="search brand"
            enterButton
            size="small"
            onSearch={onBrand}
          />

          {allBrand
            ?.filter((v) =>
              searchKey !== "" ? v.name.toLowerCase() === searchKey : v
            )
            .map((c, index) => (
              <li className="category__list__Item" key={index}>
                <Checkbox name={c} onChange={checkBoxBrand} />
                <span style={{ marginLeft: "3%" }}>{c}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* search by rating */}
      <div className="price">
        <div
          className="star__heading"
          onClick={() => {
            showStar ? setShowStar(false) : setShowStar(true);
          }}
        >
          <span className="category__span">Star</span>
          {showStar ? <UpOutlined /> : <DownOutlined />}
        </div>
        <ul
          className="category__list"
          style={showStar ? { display: "block" } : { display: "none" }}
        >
          {
            <>
              <li className="category__list__Item">
                <Checkbox name={5} onChange={checkBoxStar} />
                <span style={{ marginLeft: "3%" }}>
                  {<Rate disabled defaultValue={5} />}
                </span>
              </li>

              <li className="category__list__Item">
                <Checkbox name={4} onChange={checkBoxStar} />
                <span style={{ marginLeft: "3%" }}>
                  {<Rate disabled defaultValue={4} />}
                </span>
              </li>

              <li className="category__list__Item">
                <Checkbox name={3} onChange={checkBoxStar} />
                <span style={{ marginLeft: "3%" }}>
                  {<Rate disabled defaultValue={3} />}
                </span>
              </li>

              <li className="category__list__Item">
                <Checkbox name={2} onChange={checkBoxStar} />
                <span style={{ marginLeft: "3%" }}>
                  {<Rate disabled defaultValue={2} />}
                </span>
              </li>

              <li className="category__list__Item">
                <Checkbox name={1} onChange={checkBoxStar} />
                <span style={{ marginLeft: "3%" }}>
                  {<Rate disabled defaultValue={1} />}
                </span>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
}

export default SearchFilters;
