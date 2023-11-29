import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useState, useEffect } from "react";

// englishData.map((v) => console.log(v));
// v.day
const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { day } = useParams();
  // day

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };
  const onClickPrev = () => {
    // 까지 제한
    currentPage === 0
      ? setCurrentPage(dailyData.sentences.length - 1)
      : setCurrentPage(currentPage - 1);
  };
  // 다음과 이전 구현 참고 !!!!!!!
  // *********************************************************
  useEffect(() => {
    englishData.forEach((v) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, [day]);
  // 맵함수 목적은 새로운 배열을 만들기 위한 용도
  // 반복문 탐색을 위해서 forEach 씀
  useEffect(() => {
    console.log(dailyData);
  }, [dailyData]);

  // useEffect(()=>{
  //   setDailyData(englishData[+day-1])
  // })

  if (!dailyData) return <div>Loading!</div>;
  // 데일리데이터가 빈상태에서 불러왔을때 에러 잡기위해서
  // useState의 초기값이 0이기떄문에 렌더링시 로딩

  return (
    <div className="container relative">
      <div className="absolute top-0 left-0 p-8">
        <Link
          to="/"
          className="btn ml-1 lazy text-xl font-black px-1 shadow-lg hover:bg-slate-200"
        >
          Baaack
        </Link>
      </div>
      <h1 className="lazy text-4xl font-black">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <dic className="lazy text-3xl">
          {dailyData.sentences[currentPage].english}
        </dic>
        <button
          className={`text-xs ${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
        <div className="mt-3">
          <button
            onClick={onClickPrev}
            className="border-2 lazy border-slate-200 rounded-md text-xl px-2 shadow-lg hover:bg-slate-200"
          >
            Prev
          </button>
          <button
            className="btn ml-2 lazy text-xl px-2 shadow-lg hover:bg-slate-200"
            onClick={onClickNext}
          >
            Next
          </button>
          <button className="btn ml-2 lazy text-xl px-2 shadow-lg hover:bg-slate-200">
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};
export default Day;
