import React, { useState } from "react";
import "./vst.css";

function VegetableSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const vegetables = [
    "Artichoke",
    "Arugula",
    "Asparagus",
    "Beetroot",
    "Bell pepper",
    "Bok choy",
    "Broccoli",
    "Brussels sprouts",
    "Cabbage",
    "Carrot",
    "Cauliflower",
    "Celery",
    "Chard",
    "Chayote",
    "Collard greens",
    "Corn",
    "Cucumber",
    "Eggplant",
    "Endive",
    "Fennel",
    "Garlic",
    "Ginger",
    "Green beans",
    "Kale",
    "Kohlrabi",
    "Leek",
    "Lettuce",
    "Mushroom",
    "Okra",
    "Onion",
    "Parsnip",
    "Pea",
    "Potato",
    "Pumpkin",
    "Radicchio",
    "Radish",
    "Rhubarb",
    "Rutabaga",
    "Shallot",
    "Spinach",
    "Squash",
    "Sweet potato",
    "Tomato",
    "Turnip",
    "Watercress",
    "Zucchini",
    "Bitter melon",
    "Cassava",
    "Daikon",
    "Edamame",
    "Fiddlehead fern",
    "Galangal",
    "Horseradish",
    "Jicama",
    "Kohlrabi greens",
    "Lotus root",
    "Malabar spinach",
    "Nopales",
    "Oca",
    "Plantain",
    "Purslane",
    "Romanesco",
    "Salsify",
    "Taro",
    "Ulluco",
    "Water chestnut",
    "Yam",
    "Yucca",
    "Amaranth leaves",
    "Beet greens",
    "Dandelion greens",
    "Lamb’s lettuce",
    "Mizuna",
    "Mustard greens",
    "Sorrel",
    "Tatsoi",
  ];

  const filteredVegetables =
    searchTerm.trim() === ""
      ? []
      : vegetables.filter((vegetable) =>
          vegetable.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

  return (
    <div className="vegetable-search-container">
      <h1 className="vegetable-search-title">Vegetable Search</h1>
      <input
        className="vegetable-search-input"
        type="text"
        placeholder="Search for a vegetable..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="vegetable-search-results">
        {filteredVegetables.length > 0 ? (
          <ul className="vegetable-search-list">
            {filteredVegetables.map((vegetable, index) => (
              <li className="vegetable-search-item" key={index}>
                {vegetable}
              </li>
            ))}
          </ul>
        ) : (
          <p className="vegetable-search-no-results">No vegetables found</p>
        )}
      </div>
    </div>
  );
}

export default VegetableSearch;
