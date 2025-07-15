import "../App.css";
import Card from "../Card";
import {useState,useEffect} from "react"
import allWeapons from "../weapons/allWeapons";

function createAllWeaponsCard(allWeapons) {
  return (
    <Card
      key={allWeapons.id}
      type={allWeapons.weaponType}
      name={allWeapons.weaponName}
      img={allWeapons.weaponImg}
      skill={allWeapons.weaponSkill}
      link={allWeapons.weaponLink}
    />
  );
}

function allWeaponsComp() {
  
  const [data,setData] = useState([])
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/")
    const result = await response.json()
    setData(result)
  }

useEffect(()=>{
  fetchData()
},[])

useEffect(()=>{
  console.log({data})
},[data])

if (!data || data.length === 0 )return<div></div>

  return (
    <div className="allWeapons">
      <div className="shelf">{data.map(createAllWeaponsCard)}</div>
    </div>
  );
}

export default allWeaponsComp;
