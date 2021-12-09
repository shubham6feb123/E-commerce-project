import React, { useEffect, useState } from "react";

//css
import "./history.css";

//components
import { SearchOutlined, FilePdfFilled } from "@ant-design/icons";
import CurrencyFormatter from "react-currency-format";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../functions/userOrders";
import Loading from "../../components/Loading/Loading";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import Logo from "../../components/nav/flipkartLogo.png";

function History() {
  const [getOrders, setGetOrders] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user) getAllOrders(user?.token);
  }, [user]);

  const getAllOrders = async (authtoken) => {
    try {
      const orders = await getUserOrders(authtoken);
      // console.log("orders--->", orders);
      setGetOrders(orders.data);
    } catch (error) {
      setGetOrders(null);

    }
  };
  return getOrders ? (
    <div className="orders">
      <div className="orders__container">
        <div className="search__bar__container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search your orders here"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <button type="button" className="search__orders__button">
              {<SearchOutlined />} search Orders
            </button>
          </div>
        </div>
        {/* //orders card */}
        {getOrders?.map((product) => (
          <>
            <div
              key={product._id}
              style={{
                padding: "0px 17px 0px 0px",
                margin: "0px 0px 20px 0px",
              }}
            >
              {product?.products?.map((item) => (
                <OrdersCard
                  key={item?._id}
                  status={product?.orderStatus}
                  color={item?.color}
                  price={item?.product?.price}
                  title={item?.product?.title}
                  image={item?.product?.images[0]?.secure_url}
                  count={item?.count}
                />
              ))}
              {invoicePdf(product,user)}
            </div>
          </>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default History;

const OrdersCard = ({ status, color, price, title, image, count }) => {
  return (
    <>
      <div className="orders__card__container">
        <div>
          <div className="image__section">
            <img src={image} alt="product" />
          </div>
          <div className="content__section">
            <div className="content__section__heading">
              {/* RCM REVITO HAIR OIL Hair Oil (450 g) */}
              {title?.substring(0, 30)}
            </div>
            {/* color section */}
            <div className="content__section__color">
              <span>Color :</span>
              <span>{color}</span>
            </div>
            {/* count section */}
            <div className="content__section__color">
              <span>Quantity :</span>
              <span>{count}</span>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="price__section">
            <CurrencyFormatter
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
          </div>
          <div className="status__section">
            <span></span>
            <span>{status}</span>
          </div>
        </div>
      </div>
    </>
  );
};

//show payment info invoice pdf
const invoicePdf = (product,user) => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      // color:"#1E70FA"
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      // textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "#f08527",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
  // console.log("from pdf section", product);
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.body}>
            <Text style={styles.header} fixed>
              ~ {new Date(product.updatedAt).toDateString()} ~
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.author}>
              <Image
                src={Logo}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt="flipshop"
              />
              FlipShop
            </Text>
            <Text style={styles.subtitle}>Order Summary</Text>
            <Table>
              <TableHeader>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Price</TableCell>
              </TableHeader>
            </Table>
            <Table data={product.products}>
              <TableBody>
                <DataTableCell getContent={(x) => x.product.title.substring(0,100)} />
                <DataTableCell getContent={(x) => x.count} />
                <DataTableCell getContent={(x) => x.color} />
                <DataTableCell getContent={(x) => `${x.product.brand}`} />
                <DataTableCell getContent={(x) => x.product.price} />
              </TableBody>
            </Table>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.text}>
              <Text>
                  Bill To: {product.orderdBy.name}
                  {"                                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 Email: {product.orderdBy.email}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 Mobile Number: {product.orderdBy.details.mobileNumber}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 City: {product.orderdBy.details.city}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 State: {product.orderdBy.details.state}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 Address: {product.orderdBy.details.address}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                 Pincode: {product.orderdBy.details.pincode}{"                                                                  "}
                </Text>
                {"\n"}
                <Text>
                  Order Id: {product.paymentIntent.id}  {"                                            "} 
                </Text>
                {"\n"}
                <Text>
                  Order Status: {product.orderStatus} {"                         "}{" "}
                </Text>
                {"\n"}
                <Text>
                  Total Paid:{" "}
                  {
                    <CurrencyFormatter
                      value={`${product.paymentIntent.amount/100}`}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" Rs."}
                    />
                  }

                </Text>
              </Text>
            </View>
            <Text style={styles.footer}>
              ~~~ Thank you for shopping with us ~~~
            </Text>
          </Page>
        </Document>
      }
      fileName="invoice.pdf"
    >
      <div className="invoice__download">
        {<FilePdfFilled />} Invoice Download
      </div>
    </PDFDownloadLink>
  );
};
