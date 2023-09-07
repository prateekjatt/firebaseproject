import { auth } from "./firebase";
import {useNavigate, useParams} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect,useState } from "react";

function User(){
    
    const nav = useNavigate();
    const {userid} = useParams();
    
    const [user,setuser] = useState(null);

    useEffect(()=>{
        
        onAuthStateChanged(auth,(user)=>{
            if(user){
                if(user.uid === userid) setuser(user.email);
                else nav("/signin");
            }
            else{
                nav("/signin");
            }
        });
    },[]);

    return(
        <div className="w-full">
            <div className="m-auto text-center text-2xl mt-10 font-semibold">
                <h1>Welcome to {user}'s QR Page</h1>
            </div>
            <div className="mx-auto mt-10 rounded-md border-2 border-gray-400 w-1/2 h-[70vh]">

            <div className="m-auto text-center text-xl mt-10">
                <h1>Scan QR Code to Open This Page</h1>
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