import Header from "../components/Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    {/* <Footer/> */}
  </>
);

export default Layout;
