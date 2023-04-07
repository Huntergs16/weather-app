import Image from "next/image";

const degreeSymbol = String.fromCharCode(176);

export default function HourlyView({data, showHourly}) {
    if (!data){
        return null;
    }

    return (
        <div className={`flex justify-center items-center rounded-md p-8 text-md gap-2 flex-wrap ${showHourly ? "opacity-100 h-min duration-500" : "opacity-0 h-0 duration-0"} transition-all`}>
            {data.map((hour, idx) => {
                return (

                    <div key={idx} className="flex flex-col items-center justify-center rounded-md border-2 border-black border-solid p-4 shadow-2xl">
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
            })}
        </div>
    )
}

function convertTime(time) {
    if (time < 12) {
        return time + "AM"
    }
    else if (time == 12) {
        return 12 + "PM"
    }
    else if (time == 24) {
        return 12 + "AM"
    }
    else {
        time -= 12;
        return time + "PM"
    }
}