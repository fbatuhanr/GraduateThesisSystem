import {useState, useEffect} from 'react'
import axios from "axios";
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, useLocation
} from "react-router-dom"

import Login from "./pages/Login";

import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";

import Header from "./components/Header";
import Home from "./pages/Home";

import AddThesis from "./pages/AddThesis";
import FindThesis from "./pages/FindThesis";
import Thesis from "./pages/Thesis";

import Persons from "./pages/Persons";
import Supervisors from "./pages/Supervisors";
import Universities from "./pages/Universities";
import Institutes from "./pages/Institutes";

import Subjects from "./pages/Subjects";

function App() {

  return (
      <Router>
          <Header />
          <div className="bg-white dark:bg-gray-800 min-h-full">
              <div class="max-w-4xl m-auto min-h-screen">
                  <Routes>
                      <Route path="/" element={<Home />}/>

                      <Route path="/add-thesis" element={<AuthGuard><AddThesis /></AuthGuard>}/>
                      <Route path="/find-thesis" element={<FindThesis />}/>
                      <Route path="/thesis/:id" element={<Thesis/>} />

                      <Route path="/persons" element={<AuthGuard><Persons /></AuthGuard>}/>
                      <Route path="/supervisors" element={<AuthGuard><Supervisors /></AuthGuard>}/>
                      <Route path="/universities" element={<AuthGuard><Universities /></AuthGuard>}/>
                      <Route path="/institutes" element={<AuthGuard><Institutes /></AuthGuard>}/>

                      <Route path="/subjects" element={<AuthGuard><Subjects /></AuthGuard>}/>

                      <Route path="/login" element={<GuestGuard><Login /></GuestGuard>}/>
                  </Routes>
              </div>
          </div>
      </Router>
  )
}

export default App
