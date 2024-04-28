import React, { useEffect, useState } from "react";

const RecommendList = ({ jobPostId }) => {
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    console.log(recommendation)
    
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full max-h-[150%] overflow-scroll">

      {console.log(recommendation)}
      {/* {recommendation&&(
        recommendation.map((item)=>{
          <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
          {item}
        </div>
        })
      )} */}
    </div>
  );
};

export default RecommendList;
