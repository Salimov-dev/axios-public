import { Card, Col, Flex, Layout, Pagination, Row, Spin } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import config from "./config/config.json";
import { httpService } from "./service/https.service";
import { getErrorMessage } from "./utils/get-error-message.util";
import productService from "./service/product.service";

const { Header, Footer, Content } = Layout;

interface IProduct {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff"
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "20px"
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff"
};

const layoutStyle = {
  minHeight: "100vh"
};

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const fetchProducts = (page: number, limit: number) => {
    setIsLoading(true);

    productService
      .findAllPaginated(page, limit)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((error: unknown) => {
        getErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        {!isLoading ? (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {products.map((product) => {
              return (
                <Col span={4} key={product.id}>
                  <Card
                    hoverable
                    style={{ marginBottom: "16px" }}
                    cover={<img alt={product.title} src={product.thumbnail} />}
                  >
                    <Card.Meta
                      title={product.title}
                      description={product.description}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Flex
            style={{
              height: "80vh",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spin />
          </Flex>
        )}
      </Content>
      <Flex justify="center" style={{ marginBottom: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
          showTotal={(total) => `Всего ${total} продуктов`}
        />
      </Flex>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
