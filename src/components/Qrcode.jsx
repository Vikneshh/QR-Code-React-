import { useState } from "react";
import "./Qrcode.css";

const Qrcode = () => {

  const[img,setImg]=useState("");
  const[loading,setLoading]=useState(false);
  const[qrdata,setQRdata]=useState("https://www.google.com");
  const[qrsize,setQRsize]=useState("150");


const generateQR= async()=>{
  setLoading(true)
  
  try{
        const response=await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob); 
         setImg(imageUrl)
         
       
  }
  catch(error){
    console.log('Error generating image',error)
  }

  finally{
    // Stop loading message
    setLoading(false)
  }

}

const downloadQR=()=>{
  try{

    const link=document.createElement("a");
    link.href=img;
    link.download=`${qrdata}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  catch(error){
    console.log("Error downloading the QR code");
  }
}


  return (
    <div className="app-container">
     <h1>QR Code Generator</h1>

      {img &&<img src={img} alt="QR Code image will be generated here" className="image"/>}

     {loading?<p>Please wait while loading...</p>:""}
     
      <div className="inputContainer">

      <label htmlFor="input-label" className="input-label">Data for Qr code:</label>
      <input type="text" id="input-label " className="input name" placeholder="Enter data for QR Code" value={qrdata} onChange={(e)=>setQRdata(e.target.value)}/>

      <label htmlFor="input-size" className="input-label">Input Size (e.g.150):</label>
      <input type="number" id="input-size " className="input size" placeholder="Enter Image Size" value={qrsize} onChange={(e)=>setQRsize(e.target.value)}/>
      </div>
      <button className="generate-btn" onClick={generateQR} disabled={loading}>Generate QR Code</button>
      <button className="download-btn" onClick={downloadQR}>Download QR Code</button>

    </div>
  )
}

export default Qrcode