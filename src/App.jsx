import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div className="main">
        <header></header>
        <main>
          <Switch>
            <Route path="/" exact></Route>
            <Route path="/" exact></Route>
            <Route path="/" exact></Route>
          </Switch>
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
