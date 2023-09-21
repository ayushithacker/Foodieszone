import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SerachResult from "./Components/SearchResult/SerachResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  console.log(data);
  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;

  return (
    <>
      <Container>
        <p>{loading}</p>
        <p>{error}</p>
        <TopContainer>
          <div className="logo">
            <img src="ucisious.png" alt="" />
          </div>
          <div className="serach">
            <input
              onChange={searchFood}
              type="search"
              placeholder="Serach Food..."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {" "}
              {value.name}
            </Button>
          ))}
        </FilterContainer>
        <SerachResult data={filteredData} />
      </Container>
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .serach {
    input {
      color: white;
      border: 1px solid red;
      height: 40px;
      background-color: transparent;
      padding: 0 12px;
    }
    ::placeholder {
      color: white;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 30px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: red;
  }
`;
