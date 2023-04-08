import DateDMY from "./DateDMY";
import Image from "next/image";

const degreeSymbol = String.fromCharCode(176);

export default function WeatherDay ({today, data, selected, setSelected}) {
    if (!data) {
        return null; // or handle the error in another way
    }

    const { date, maxtemp_f, mintemp_f, avgtemp_f, maxwind_mph, totalprecip_in, avgvis_miles, avghumidity, daily_will_it_rain, daily_chance_of_rain, daily_will_it_snow, daily_chance_of_snow, condition, uv, hourly } = data;

    const d = new Date();
    let currentHour = d.getHours();

    return (
        <div onClick={()=>setSelected(date)} className={`${today ? "w-1/3" : ""} min-w-fit flex flex-col justify-center items-center border-2 
        ${selected === date ? "rounded-md" : "rounded-2xl"} transition-all duration-300 border-black border-solid p-8 text-2xl shadow-2xl`}>
            {today ? "Today" :<DateDMY dateString={date} />}
            <div className="flex justify-between items-center">
                <p className="text-lg">{(today ? hourly[currentHour].temp_f : avgtemp_f)  + degreeSymbol}</p>
                <Image src={`https:${condition.icon}`}
                    alt={condition.text}
                    width={60}
                    height={60}/>
            </div>
            
            <div className="flex justify-center gap-5">
                {/* Temps */}
                <p className="text-sm">High: {maxtemp_f + degreeSymbol}</p>
                <p className="text-sm">Low: {mintemp_f + degreeSymbol}</p>
            </div>
            <div className="flex justify-center gap-5 text-sm">
                {/* Precipitation */}
                <p>Rain: {daily_will_it_rain === 0 ? "No" : "Yes"}</p>
                <p>Chance {daily_chance_of_rain}%</p>
            </div>
            <p className="text-sm">Humidity: {avghumidity}%</p>
        </div>
    )
}