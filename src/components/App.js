import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
  }
  
  onFindPetsClick = (e) => {
    let URL = this.state.filters.type
      if(this.state.filters.type === 'all') {
        URL = '/api/pets'
      } else {
        URL = `/api/pets?type=${this.state.filters.type}`
      }
    fetch(URL)
    .then(res => res.json())
    .then((pets) => {
      this.setState ({
         pets: pets   
      })
  })
}

onAdoptPet = (id) => {
  const newArr = this.state.pets.map(pet =>  {
    if (pet.id === id){
      return {...pet, 
        isAdopted: true}
            } else {
              return pet
            }     
          
        })
        this.setState({
          pets: newArr
        })
      }

    




  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
