import { Fragment } from "react";
import Layout from "src/components/layout";
import GlobalStyles from "src/assets/styles/GlobalStyles"
import Header from "src/sections/Header/v2";
import PageHeader from "src/sections/StakingPages/v3/PageHeader";
import Staking from "src/sections/StakingPages/v3";
import Footer from "src/sections/Footer/v1";

export default function StakingThree() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="staking" pageTitle="STAKING v3" />
        <Staking />
        <Footer />
      </Layout>
    </Fragment>
  );
}