import React from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, InputNumber, Button } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/crypto-api";
import TradingChart from "./TradingChart";
import Loader from "../Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoTrading = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  /* const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod }); */
  const cryptoDetails = data?.data?.coin;

  /*  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']; */

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  /*   console.log(coinHistory) */

  if (isFetching) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      {/* <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date,index) => <Option key={date}>{date}</Option>)}
      </Select>  */}
      {/* <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} /> */}

      <Title className="coin-heading-container" level={3}>
        TradingView Chart
      </Title>
      <TradingChart symbol={data?.data?.coin.symbol} />

      {/* trading stuff */}
      <Title className="coin-heading-container" level={3}>
        Trade
      </Title>
      <Row gutter={[24, 16]}>
        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <DollarCircleOutlined />
              </Text>
              <Text>buy at Price(USD)</Text>
            </Col>
            <Text className="stats">
              ${cryptoDetails?.price.toString().slice(0, 8)}
            </Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <DollarCircleOutlined />
              </Text>
              <Text>sell at Price(USD)</Text>
            </Col>
            <Text className="stats">
              ${cryptoDetails?.price.toString().slice(0, 8)}
            </Text>
          </Col>
        </Col>

        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <FundOutlined />
              </Text>
              <Text>Amount to Buy</Text>
            </Col>
            <Col className="stats">
              <InputNumber />
              <Button>Buy</Button>
            </Col>
          </Col>
        </Col>

        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <FundOutlined />
              </Text>
              <Text>Amount to Sell</Text>
            </Col>
            <Col className="stats">
              <InputNumber />
              <Button>Sell</Button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value, index }) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value, index }) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link, index) => (
            <Row className="coin-link" key={index}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoTrading;