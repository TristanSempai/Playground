/* eslint-disable react/prop-types */
import "./Card.css";

function Card(props) {
  return (
    <div className="CardContainer">
      <div className="Card">
        <h2 className="type">{props.type}</h2>
        <h2 className="name">{props.name}</h2>
        <img className="img" src={props.img} />
        <h2 className="skill">{props.skill}</h2>
        <a className="link" href={props.link}>
          Wiki
        </a>
      </div>
    </div>
  );
}

export default Card;
