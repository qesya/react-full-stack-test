
import axios from "axios";
import React from "react";
import styled from "styled-components";
import Section from "../../layout/section";
import Wrapper from "../../layout/wrapper";
import LaunchCard from "../lauch-card";

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  min-height: 70vh;
`

const InlineWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  width: 300px;
  font-size: 18px;  
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 6px;
`

const SearchButton = styled.button`
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #5b92c8;
  border: 1px solid #5b92c8;
  border-radius: 6px;
  cursor: pointer;
`

const ResultText = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: medium;
`

const DivCenter = styled.div`
  width: 100%;
  text-align: center;
`

const Rockets = () => {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const handleSearchChange = event => setSearch(event.target.value);

  const onSearch = () => {
    setLoading(true);
    axios(`http://localhost:4000/rockets/find/${search}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",

      }
    })
    .then(res => {
      setLoading(false);
      setData(res.data);
    })
    .catch(err => {
      setLoading(false);
    })
  }

  return (
    <Container>
      <Section>
        <InlineWrapper>
          <Input type="text" value={search} onChange={handleSearchChange} placeholder="Search Rockets..." />
          <SearchButton onClick={onSearch}>Search rockets</SearchButton>
        </InlineWrapper>
      </Section>
      {!loading && data.length !== 0 && 
      <Section>
        <Wrapper>
          <ResultText>Found: {data.length} rocket{data.length > 1 ? 's' : ''} in search</ResultText>
        </Wrapper>
      </Section>}
      <Section>
        {loading ? 
        <DivCenter>Loading...</DivCenter> :
        <Wrapper>
          {data.length > 0 ?
          <div className="grid">
            {data.map((item, index) => (
              <LaunchCard
                key={index.toString()}
                index={index}
                image={item.rocket_pictures[item.rocket_pictures.length-1]}
                title={item.name}
                description={item.description}
              />
            ))} 
          </div> :
          <DivCenter>No data result.</DivCenter>}
        </Wrapper>}
      </Section>
    </Container>
  )
}

export default Rockets