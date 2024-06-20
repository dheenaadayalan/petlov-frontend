import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import NavBar from '../Components/NavBar'
import Adoption from '../Pages/Adoption'
import PetOwners from '../Pages/PetOwners'
import SignUp from '../Pages/SignUp'
import SignIn from '../Pages/SignIn'
import SingUpPetOwner from '../Pages/SingUpPetOwner'
import Profile from '../Pages/Profile'
import AddPets from '../Components/AddPets'
import { useState } from 'react'
import EditPet from '../Pages/EditPet'

function App() {
const [petId, setPetId] = useState(null)
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adoption' element={<Adoption/>}/>
          <Route path='/pet/owners' element={<PetOwners setPetId={setPetId}/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup-petowner' element={<SingUpPetOwner />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/add/pets' element={<AddPets/>}/>
          <Route path='/pet/owners/edit/:id' element={<EditPet petId={petId}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
