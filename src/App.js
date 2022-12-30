import Appbar from "./Appbar";
import AddLibrarian from "./Librariancomponent/AddLibrarian";
import ListLibrarian from "./Librariancomponent/ListLibrarians";
import ListMembers from "./MemberComponent/ListMembers";
import AddMember from "./MemberComponent/AddMember";
import DisplayBooks from "./BookComponent/DisplayBooks";
import AddBook from "./BookComponent/AddBook";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

function App() {
  return (
   <div className="App">
    <Appbar/>
    <Router>
      <Routes>
        <Route exact path={"/librarianslist"} element={<ListLibrarian/>}/>
        <Route exact path={"/librarianadd"} element={<AddLibrarian/>}/>

        <Route exact path={"/memberslist"} element={<ListMembers/>}/>
        <Route exact path={"/memberadd"} element={<AddMember/>}/>

        <Route exact path={"/booklist"} element={<DisplayBooks/>}/>
        <Route exact path={"/addBook"} element={<AddBook/>}/>
      </Routes>
    </Router>
    
   </div>
  );
}

export default App;
