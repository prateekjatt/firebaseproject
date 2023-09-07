import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import User from "./User";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signin'/>}/>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/user/:userid' element={<User/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
