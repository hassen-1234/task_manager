import Image from "next/image";
import { useEffect } from "react";

export default ({modeNuit,setModeNuit}) => {

    useEffect(() => {

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.matches ? setModeNuit(true) : setModeNuit(false);

        const ecouteurChangementMode = (e) => {
            e.matches ? setModeNuit(true) : setModeNuit(false);
        }

        media.addEventListener("change",ecouteurChangementMode)

        return () => {
            media.removeEventListener("change",ecouteurChangementMode)
        }
    },[])

    return <Image
    src={modeNuit ? "/img/nuit.png" : "/img/solar-power.png"}
    height={50}
    width={50}
    className="fixed bottom-2 right-5 bg-slate-300 !p-1 rounded-full cursor-pointer hover:opacity-90 active:opacity-80"
    onClick={() => {setModeNuit(!modeNuit)}}
    />
}