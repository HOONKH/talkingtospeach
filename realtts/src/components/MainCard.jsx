import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li>
        <span className="font-semibold mr-3 font-[lazyday] text-4xl">
          Day{day}
        </span>
        <span className="font-[lazyday] text-2xl">{title}</span>
      </li>
    </Link>
  );
};
export default MainCard;
