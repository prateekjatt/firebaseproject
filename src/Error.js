import {Link} from "react-router-dom";

function Error(){

    return(
        <div className="w-full">
            <div className="mx-auto text-center text-3xl font-semibold mt-[30vh]">
                <h1>Page Not found!</h1>
            </div>
            <Link to='/signin'>
                <div className="mx-auto w-1/6 min-w-[10rem] p-3 rounded-md my-8 text-center text-white text-xl bg-green-500">
                    Go Back Home
                </div>
            </Link>
        </div>
    );
}

export default Error;