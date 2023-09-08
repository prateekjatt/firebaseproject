import { auth,db } from "./firebase";
import {useNavigate, useParams} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect,useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Qrious from "qrious";

function User(){
    
    const nav = useNavigate();
    const {userid} = useParams();
    
    const [user,setuser] = useState({email:"",qrcode:""});

    useEffect(()=>{

        
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                if(user.uid === userid){

                    const userqr = await getDoc(doc(db,"qrcodes",user.uid));

                    if(userqr.exists()){
                        setuser({email:user.email,qrcode:userqr.data().qr});
                    }
                    else{
                        makeqr();
                    }
                }
                else nav("/signin");
            }
            else{
                nav("/signin");
            }
        });
    },[]);
    
    async function makeqr(e){
        var qr = new Qrious({
            background: 'white',
            backgroundAlpha: 0.8,
            foreground: (e&&e.target?e.target.value:undefined),
            foregroundAlpha: 0.8,
            level: 'H',
            padding: 25,
            size: 500,
            value: window.location.href
        });
        await setDoc(doc(db,"qrcodes",userid),{qr:qr.toDataURL()});
        setuser({email:user.email,qrcode:qr.toDataURL()});
    }


    return(
        <div className="w-full">
            <div className="m-auto text-center text-2xl mt-10 font-semibold">
                <h1>Welcome to {user.email}'s QR Page</h1>
            </div>
            <div className="mx-auto mt-10 rounded-md border-2 border-gray-400 w-1/2 h-[70vh]">
                <div className="m-auto text-center text-xl mt-10">
                    <h1>Scan QR Code to Open This Page</h1>
                </div>
                <div id="qrcontainer" className="mx-auto mt-5 sm:w-72 sm:h-72 w-32 h-32  overflow-hidden">
                    <div id="qrcode" className="hidden">
                    </div>

                    <div className="w-full h-full">
                        <img className="w-full h-full" src={user.qrcode}/>
                    </div>
                </div>
                <div className="text-center m-auto">
                    <label htmlFor="color">Choose Color for QR: </label>
                    <input type="color" id="color" onChange={makeqr}/>
                </div>
            </div>
            <div className="m-auto text-center text-xl mt-4">
                <button onClick={()=>{signOut(auth);}} type="button" className="flex mx-auto w-1/6 min-w-[10rem] justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 active:bg-green-400">
                    Sign Out
                </button>
            </div>

        </div>
    );

}

export default User;