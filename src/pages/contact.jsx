import { Fragment } from "react";
import Layout from "src/components/layout";
import GlobalStyles from "src/assets/styles/GlobalStyles"
import Header from "src/sections/Header/v2";
import PageHeader from "src/sections/ContactPage/PageHeader";
import Contact from "src/sections/ContactPage";
import Footer from "src/sections/Footer/v1";

export default function ContactPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="CONTACT US" pageTitle="GET IN TOUCH" />
        <Contact />
        <Footer />
      </Layout>
    </Fragment>
  );
}
