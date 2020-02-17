import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import NavigationNavPage from './pages/NavigationNavPage';
// import FormsNavPage from './pages/FormsNavPage';
// import TablesNavPage from './pages/TablesNavPage';
// import AddonsNavPage from './pages/AddonsNavPage';
// import ModalsNavPage from './pages/ModalsNavPage';
// import AdvancedNavPage from './pages/AdvancedNavPage';
// import ComponentsNavPage from './pages/ComponentsNavPage';

// FREE
// import AnimationPage from './pages/AnimationPage';
// import AlertPage from './pages/AlertPage';
// import HomePage from './pages/HomePage';
// import ButtonPage from './pages/ButtonPage';
// import CSSNavPage from './pages/CSSNavPage';
// import TablePage from './pages/TablePage';
// import TableResponsivePage from './pages/TableResponsivePage';
// import TableScrollPage from './pages/TableScrollPage';
// import TableStylesPage from './pages/TableStylesPage';
// import BadgePage from './pages/BadgePage';
// import BreadcrumbPage from './pages/BreadcrumbPage';
// import FaPage from './pages/FaPage';
// import DatatablePage from './pages/DatatablePage';
// import DatatableApiPage from './pages/DatatableApiPage';
// import ModalPage from './pages/ModalPage';
// import ModalFormPage from './pages/ModalFormPage';
// import ModalExamplesPage from './pages/ModalExamplesPage';
// import ProgressPage from './pages/ProgressPage';
// import InputPage from './pages/InputPage';
// import MediaPage from './pages/MediaPage';
// import JumbotronPage from './pages/JumbotronPage';
// import CardsPage from './pages/CardsPage';
// import PaginationPage from './pages/PaginationPage';
// import PopoverPage from './pages/PopoverPage';
// import ListGroupPage from './pages/ListGroupPage';
// import CarouselPage from './pages/CarouselPage';
// import PanelPage from './pages/PanelPage';
// import CollapsePage from './pages/CollapsePage';
// import TooltipsPage from './pages/TooltipsPage';
// import FooterPage from './pages/FooterPage';
// import MasksPage from './pages/MasksPage';
// import DropdownPage from './pages/DropdownPage';
// import VideoCarouselPage from './pages/VideoCarouselPage';
// import HoverPage from './pages/HoverPage';
// import FormsPage from './pages/FormsPage';
// import ChartsPage from './pages/ChartsPage';
// import SearchPage from './pages/SearchPage';
// import ValidationPage from './pages/ValidationPage';
// import NavbarPage from './pages/NavbarPage';
// import IframePage from './pages/IframePage';
// import EdgeHeaderPage from './pages/EdgeHeaderPage';
// import SpinnerPage from './pages/SpinnerPage';
// import MasonryPage from './pages/MasonryPage';
// import ScrollBarPage from './pages/ScrollBarPage';
// import NavsPage from './pages/NavsPage';
// import TabsPage from './pages/TabsPage';
// import PillsPage from './pages/PillsPage';
// import NotificationPage from './pages/NotificationPage';
// import InputGroupPage from './pages/InputGroupPage';
// import TreeviewPage from './pages/TreeviewPage';
// import RatingPage from './pages/RatingPage';


import Login from "views/Login.js";
import Landing from "views/Landing.js";
import Dashboard from "views/Dashboard.js";
import Question from "views/Question.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth : false
    }
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    let data = localStorage.getItem("auth");
    let parsing = JSON.parse(data);
    if(!parsing) {
      this.setState({auth : false})
    } else {
      this.setState({auth : true})
    }
  }

  render() {
    return (
      <BrowserRouter>
        {
          (this.state.auth == false) &&
          <Route path="/" component={Login}/>
        }
        {
          (this.state.auth == true) &&
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/landing" component={Landing} />
            <Route path="/question" component={Question} />
            <Redirect from="/" to="/login" />
          </Switch>
        }

      </BrowserRouter>
    );
  }
}

export default App;
