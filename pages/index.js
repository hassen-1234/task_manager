import { useState, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import ChangementMode from "@/pages/changement_mode";

let elementSelect = "";
const ItemBarNav = ({ texte, active, foncClique }) => {
  useEffect(() => {
    elementSelect = document.querySelector(".select");
  }, [])
  const [statutsActive, setActive] = useState(active)
  return <button onClick={(e) => { setActive(true); foncClique(e) }} className={"!p-2 cursor-pointer active:opacity-95 hover:opacity-85 flex-1" + (active ? " select" : "")}>
    {texte}
  </button>
}

const ItemTravaille = ({ setTaches,texte, active }) => {

  const changeActive = () => {
    setTaches(taches => taches.map(tache => tache.texte === texte ? {...tache,active: !tache.active} : tache));
    
  }

  const suprrimeTache = () => {
    setTaches(taches => taches.filter(tache => tache.texte != texte))
  }

  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-2 border-2 rounded-md !p-1 bg-blue-300">
    <textarea value={texte} rows={1} type="text" className="flex-1 border-2 rounded-tl-lg rounded-br-lg border-cyan-600 !p-1.5 resize-none font-semibold" readOnly></textarea>
    <input type="checkbox" onChange={changeActive} checked={!active} className="self-center size-5 opacity-85"/>
    <img src="/img/delete.png" onClick={suprrimeTache} className="self-center size-7 cursor-pointer bg-blue-400 rounded-full !p-1 hover:opacity-80 active:opacity-45" />
  </motion.div>
}
  const PartieTout = ({setTaches,taches}) => {
  return <div className="flex flex-col gap-3">
    <AnimatePresence>
    {taches?.map((tache, index) => <ItemTravaille key={index} setTaches={setTaches} texte={tache.texte} active={tache.active}  />) ?? <span className="flex justify-center !mt-40 font-bold text-2xl">Vide</span>}
    </AnimatePresence>
  </div>
}

const PartieActive = ({setTaches,taches}) => {
  return <div className="flex flex-col gap-3">
    {taches?.filter(tache => tache.active).length > 0 ? taches.map((tache, index) => {if (tache.active) return <ItemTravaille key={index} setTaches={setTaches} texte={tache.texte} active={tache.active} />})
    : <span className="flex justify-center !mt-40 font-bold text-2xl">Vide</span>}
  </div>
}

const PartieComplete = ({setTaches,taches}) => {
  return <div className="flex flex-col gap-3">
    {taches?.filter(tache => !tache.active).length > 0 ? taches.map((tache, index) => {
      if (!tache.active) return <ItemTravaille key={index}setTaches={setTaches} texte={tache.texte} active={tache.active} />
    }) : <span className="flex justify-center !mt-40 font-bold text-2xl">Vide</span>
    }
  </div>
}

const PartieStatistique = ({taches}) => {
  return <div>
    <table className="border w-full h-64 !mt-5">
      <tr>
        <th className="border !p-1">Tout</th>
        <th className="border !p-1">Active</th>
        <th className="border !p-1">Complète</th>
      </tr>
      <tr>
        <td className="border !p-2 text-center">{taches?.length ?? 0}</td>
        <td className="border !p-2 text-center">{taches?.filter(tache => tache.active)?.length ?? 0}</td>
        <td className="!p-2 text-center">{taches?.filter(tache => !tache.active).length ?? 0}</td>
      </tr>
    </table>
  </div>
}

export default () => {

  const [taches, setTaches] = useState([]);
  const [affichagePartie, setAffichagePartie] = useState("tout");
  const [modeNuit, setModeNuit] = useState();

  const ajoutTache = () =>{

    const texte = document.getElementById("champTache").value;
    if (!texte) return;

    setTaches([...taches,{texte,active:true}]);
    document.getElementById("champTache").value = "";
}

  const foncTout = (e) => {
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
  document.getElementById("affichageTravaille");
  setAffichagePartie("tout");
}
const foncActive = (e) => {
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
  setAffichagePartie("active");
}
const foncComplete = (e) => {
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
  setAffichagePartie("complète");
}
const foncStatistique = (e) => {
  elementSelect.classList.remove("select");
  e.target.classList.add("select");
  elementSelect = e.target;
  setAffichagePartie("statistique");
}

  return <div className={`h-[100vh] bg-white dark:bg-slate-500 p-1 flex flex-col items-center gap-5 overflow-y-auto transition ${modeNuit ? "dark" : ""}`}>
    <div className="flex gap-4 w-full rounded-lg !mt-5">
      <textarea id="champTache" className="border-2 w-full !p-2 !mx-1.5 rounded-lg font-bold dark:text-white dark:border-black"></textarea>
      <button onClick={ajoutTache} className="!me-3 bg-gradient-to-br from-cyan-300 to-emerald-500 text-cyan-800 font-bold !p-3 rounded-lg cursor-pointer active:opacity-50 hover:opacity-85">Ajout</button>
    </div>
    <div className="flex bg-blue-400 text-cyan-800 font-bold rounded-lg w-full overflow-x-auto min-h-14">
      <ItemBarNav texte="Tout" foncClique={foncTout} active={true} />
      <ItemBarNav texte="Active" foncClique={foncActive} active={false} />
      <ItemBarNav texte="Complète" foncClique={foncComplete} active={false} />
      <ItemBarNav texte="Statistique" foncClique={foncStatistique} active={false} />
    </div>
    <div id="affichageTravaille" className="border-2 flex-1 w-xl rounded-2xl !p-4">
      {
        taches?.length == 0 ? <span className="flex justify-center items-center h-full font-bold text-2xl">Vide</span>
        : <div>
          {affichagePartie == "tout" && <PartieTout setTaches={setTaches} taches={taches}/>}
          {affichagePartie == "active" && <PartieActive setTaches={setTaches} taches={taches}/>}
          {affichagePartie == "complète" && <PartieComplete setTaches={setTaches} taches={taches}/>}
          {affichagePartie == "statistique" && <PartieStatistique setTaches={setTaches} taches={taches}/>}
        </div>
      }
    </div>
    <ChangementMode modeNuit={modeNuit} setModeNuit={setModeNuit}/>
  </div>
}