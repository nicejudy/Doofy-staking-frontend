import { Fragment } from "react";
import Layout from "src/components/layout";
import GlobalStyles from "src/assets/styles/GlobalStyles"
import Header from "src/sections/Header/v2";
import PageHeader from "src/sections/LeaderboardPage/PageHeader";
import Leaderboard from "src/sections/LeaderboardPage";
import Footer from "src/sections/Footer/v1";

export default function LeaderboardPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="ledearboard" pageTitle="ledearboard" />
        <Leaderboard />
        <Footer />
      </Layout>
    </Fragment>
  );
}
