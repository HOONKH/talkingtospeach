import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useState, useEffect } from "react";
import axios from "axios";

// englishData.map((v) => console.log(v));
// v.day
const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
  const onClickSound = async () => {
    try {
      setIsLoading(true);

      if (isLoading) return;
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english,
          },
          voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 0.8,
            pitch: -15.0,
          },
        }
      );
      console.log(response);
      const binaryData = atob(response.data.audioContent);

      const byteArray = new Uint8Array(binaryData.length);
      // 형태를 변화시켜준다 Uint8Array 생성 => 바이너리데이터 길이만큼에
      for (let i = 0; i < binaryData.length; i++) {
        // console.log(binaryData.charCodeAt(i));
        // charcodAt의 역할
        byteArray[i] = binaryData.charCodeAt(i);
        // 자름과 동시에 바이트 단위에 배열을 생성 변환을 해서 바이트어래이에 저장
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
      // 블롭으로만드는 자바스크립트형태
      // console.log(binaryData);
      // console.log(blob); 블롭형태

      const newAudio = new Audio(URL.createObjectURL(blob));

      // console.log(newAudio); html 코드가 들어옴

      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 3000);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };
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
    <div className="container relative bg-[#f2f2f2c7]">
      <div className="absolute top-0 left-0 p-8">
        <Link
          to="/"
          className="btn ml-1 lazy text-xl font-black text-green-600 px-1 shadow-lg hover:bg-slate-200"
        >
          Baaack
        </Link>
      </div>
      <h1 className="lazy text-5xl font-black">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div className="lazy text-3xl">
          {dailyData.sentences[currentPage].english}
        </div>
        <button
          className={`text-xs shadow-md ${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
        <div className="mt-10">
          <button
            onClick={onClickPrev}
            className="border-2 lazy border-slate-200 rounded-md text-xl px-2 shadow-lg font-black hover:bg-slate-200"
          >
            Prev
          </button>
          <button
            className="btn ml-2 lazy text-xl px-2 shadow-lg font-black hover:bg-slate-200"
            onClick={onClickNext}
          >
            Next
          </button>
          <button
            onClick={onClickSound}
            className="btn ml-2 lazy text-xl px-2 shadow-lg font-black text-blue-700 hover:bg-slate-200"
          >
            Sound
          </button>
        </div>
      </div>
      <img className="ml-[380px] mt-[145px]" src="./images/woody.svg" alt="" />
    </div>
  );
};
export default Day;
