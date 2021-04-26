import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Router, Switch } from "react-router";
import Launches from "./components/screen/launches";
import Rockets from "./components/screen/rockets";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Wrapper from "./layout/wrapper";
import LaunchCard from "./components/lauch-card";
import { device, history } from "./helpers";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  @media ${device.tablet} {
    .grid {
      flex-direction: row;
    }
  }
`;

const ContentSelector = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 10px;
    min-width: 100px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

function App() {
  const [data, setData] = useState({ launches: [] });
  const [loading, setLoading] = useState(true);
  const [tabActive, setTabActive] = useState('launches');

  const handleChangeTab = async (tabName) => {
    setTabActive(tabName);
    setLoading(true);
    const response = await axios(`http://localhost:4000/${tabName}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",

      }
    })
    setData({ launches: response.data });
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/launches", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
  
        }
      });

      console.log(result.data);

      setData({ launches: result.data });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Router history={history}>
      <MainWrapper>
        <Header />
        <Section>
          <Hero />
        </Section>
        <Section>
          <ContentSelector>
            <button disabled={loading} onClick={() => handleChangeTab('launches')}>Launches</button>
            <button disabled={loading} onClick={() => handleChangeTab('rockets')}>Rockets</button>          
          </ContentSelector>
        </Section>
        <Switch>
          <Route path="/launches"><Launches /></Route>
          <Route path="/rockets"><Rockets /></Route>
          <Route exact path="/">
            <Section>
              {loading && <div>loading....</div>}

              {!loading && tabActive === 'launches' && (
                <Wrapper>
                  <div className="grid">
                    {data.launches.map((item, index) => (
                      <LaunchCard
                        key={index.toString()}
                        index={index}
                        image={item.mission_patch_small}
                        title={item.name}
                        description={item.details}
                      />
                    ))}
                  </div>
                </Wrapper>
              )}
              {!loading && tabActive === 'rockets' && (
                <Wrapper>
                  <div className="grid">
                    {data.launches.map((item, index) => (
                      <LaunchCard
                        key={index.toString()}
                        index={index}
                        image={item.rocket_pictures[item.rocket_pictures.length-1]}
                        title={item.name}
                        description={item.description}
                      />
                    ))}
                  </div>
                </Wrapper>
              )}
            </Section>
          </Route>
        </Switch>
      </MainWrapper>
    </Router>
  );
}

export default App;
