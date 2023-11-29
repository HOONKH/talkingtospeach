import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

const Main = () => {
  console.log(englishData);

  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-[lazyday] font-black">Study English</h1>
        {englishData.map((v, i) => (
          <ul className="ease-out  hover:bg-slate-200 duration-700 rounded-md">
            <MainCard key={i} title={v.title} day={v.day} />
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Main;
