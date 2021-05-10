import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [updatedFood, setUpdatedFood] = useState("");

  const addToList = () => {
    axios.post("http://localhost:8000/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const onUpdateFood = (id) => {
    axios.put("http://localhost:8000/update", {
      id: id,
      updatedFood: updatedFood,
    });
  };

  const onDeleteFood = (id) => {
    axios.delete(`http://localhost:8000/delete${id}`)
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/read")
      .then((response) => {
        setFoodList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>MERN APP</h1>
      <label>Food Name</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <div className="gap" />
      <label>Days Since You Ate It </label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <div className="gap" />
      <button className="button" onClick={addToList}>
        Add to list
      </button>
      <div className="gap" />
      <div className="gap" />

      <h2>Food List</h2>
      {foodList.map((value, key) => {
        return (
          <div key={key}>
            <div className="gapMore" />
            <div className="box">
              <h3>{value.foodName}</h3>
              <h3>{value.daysSinceIAte}</h3>
              <input
                onChange={(event) => {
                  setUpdatedFood(event.target.value);
                }}
                type="text"
                placeholder="New Food Name ..."
              />
              <button
                onClick={() => onUpdateFood(value._id)}
                className="buttonUpdate"
              >
                Update
              </button>
              <button onClick={() => onDeleteFood(value._id)} className="buttonDelete">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
