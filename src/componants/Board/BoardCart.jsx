import React, { useState, } from "react";
import Style from "./Board.module.css";
import collapseall from "../../assets/icon/collapseall.png";
import DataCard from "../DataCard/DataCard";
function BoardCart({ name, setAddbtn, data, setshare, setFetchTasks }) {
  const [Collapseal, setcollapseall] = useState(false);

  const toggleCollapseAll = () => {
    setcollapseall(!Collapseal);
  };
  return (
    <main className={Style.cartContainer}>
      <div  >
        <div>
          <p>{name}</p>
        </div>
        <div style={{display:'flex', gap:'50px'}} >
       {name==='To do'? <div  onClick={(e) => {
          e.stopPropagation() 
          setAddbtn(true) }} >
          <button style={{fontSize:'25px' ,fontWeight:'700'}} >+</button>
        </div>:<></>}
        <div onClick={(e)=>{
            e.stopPropagation() 
          toggleCollapseAll()
          }}  >
          <img src={collapseall} alt="collapseallBtn" />
        </div>
          
        </div>
       
      </div>

      <div className={Style.cartContaint}>
        <div className={Style.showContaint}>
          {data.map((item, index) => (
            <DataCard key={index} setFetchTasks={setFetchTasks} Collapseall={Collapseal} cardData={item} setshare={setshare} />
          ))
          }
        </div>
      </div>
    </main>

  );
}

export default BoardCart;
