import "./App.css";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import LeaguesList from "./features/leagues-list/LeaguesList";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <LeaguesList />
      </Layout>
    </>
  );
}

export default App;
