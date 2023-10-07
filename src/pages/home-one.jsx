import { Fragment } from "react";
import GlobalStyles from "src/assets/styles/GlobalStyles"
import Layout from "src/components/layout";
import Banner from "src/sections/Banner/v1";
import Header from "src/sections/Header/v2";
import Statistics from "src/sections/Statistics/v1";
import Footer from "src/sections/Footer/v1";

export default function HomeOne() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <Banner />
        <Statistics />
        
        <Footer />
      </Layout>
    </Fragment>
  );
}
