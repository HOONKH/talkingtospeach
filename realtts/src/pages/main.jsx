import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

const Main = () => {
  // console.log(englishData); JSON 잘들어왔는지 확인
  return (
    <div className="container bg-[#f2f2f2c7]">
      <div className="flex flex-col gap-8 ">
        <h1 className="text-5xl font-[lazyday] font-black">Study English</h1>
        {englishData.map((v, i) => (
          <ul
            className={`ease-out  hover:bg-slate-200 duration-700 rounded-md ${
              v.day % 2 ? "text-black" : "text-green-600"
            }`}
          >
            <MainCard key={i} title={v.title} day={v.day} />
          </ul>
        ))}
      </div>
      <img className="ml-[380px]" src="./images/woody.svg" alt="" />
    </div>
  );
};
export default Main;
