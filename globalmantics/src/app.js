import React, { Component } from 'react';
import './main-page.css';
import FeaturedHouse from './component/FeaturedHouse/featured-house';
import Header from './component/Header/header';
import House from './component/House/house';
import HouseFilter from './component/HouseFilter/house-filter';
import SearchResults from './component/SearchResults/search-results-table';



class App extends Component {
  state = {
  }

  componentWillMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
      .then(rsp => rsp.json())
      .then(allHouses => {
        this.allHouses = allHouses;
        this.determineFeaturedHouse();
        this.determineUniqueCountries();
      })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  render() {
    
    let activeComponent = null;
    if (this.state.country)
        activeComponent = <SearchResults country={this.state.country} filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
        activeComponent = <FeaturedHouse house={this.state.activeHouse} message="Selected House" />;
    if (!activeComponent)
        activeComponent = <FeaturedHouse house={this.state.featuredHouse} message="Featured House" />;

    return (
      <div>
        <Header/>
        <HouseFilter filterHouses={this.filterHouses} countries={this.state.countries}/>
       {activeComponent}
      </div>
       )
  }
}

export default App;

