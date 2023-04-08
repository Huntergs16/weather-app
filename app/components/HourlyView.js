import Image from "next/image";
import LineChart from "./LineChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";

const degreeSymbol = String.fromCharCode(176);
Chart.register(CategoryScale);

export default function HourlyView({data, showHourly}) {
    if (!data){
        return null;
    }

    const [viewType, setViewType] = useState(true);

    const [chartData, setChartData] = useState({
        labels: data.map((data, idx) => convertTime(idx+1)), 
        datasets: [
          {
            label: "Temp",
            data: data.map((data) => data.temp_f),
            borderWidth: 1,
            fill: false,
            pointBorderColor: "rgb(147, 197, 253, .3)",
          }
        ]
      });

    return (
        <div className={`w-[90%] flex flex-col justify-center items-center ${showHourly ? "opacity-100 h-full duration-300" : "opacity-0 h-0 duration-0"} transition-all`}>
            <button onClick={() => setViewType(!viewType)} className="bg-blue-100 hover:shadow-xl active:text-xs text-sm py-2 px-4 rounded-md shadow-lg shadow-cyan-500/50">
                Switch view
            </button>
            <div className={`flex pt-8 justify-center min-h-[70%] h-full w-full sm:p-0 sm:w-full sm:h-full sm:text-xs items-center rounded-md text-md gap-2 flex-wrap`}>
                
                {viewType ? (
                    data.map((hour, idx) => {
                        return (
        
                            <div key={idx} className="flex flex-col items-center justify-center rounded-md border-2 border-black border-solid p-4 shadow-2xl sm:w-[10%] md:w-[18%] lg:w-[12%]">
                                <p>{convertTime(idx+1)}</p>
                                <Image src={`https:${hour.condition.icon}`}
                                        alt={hour.condition.text}
                                        width={40}
                                        height={40}
                                        />
                                <div>
                                    {hour.temp_f + degreeSymbol}
                                </div>
                            </div>
                        )
                    })
                ) 
                :
                (
                    <LineChart chartData={chartData} />
                )
                }
            </div>
        </div>
    )
}

function convertTime(time) {
    if (time < 12) {
        return time + "AM"
    }
    else if (time == 12) {
        return "Noon"
    }
    else if (time == 24) {
        return "Midnight"
    }
    else {
        time -= 12;
        return time + "PM"
    }
}