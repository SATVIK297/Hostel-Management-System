import React from 'react'
import profile from '../assets/profile.png'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold ml-5">Hostal Mangement System</Link>
        <Link to="/profile">
        <Avatar name="John Doe" src ={profile} size="40" round={true} />

        </Link>

      </div>
    </header>
  )
}

export default Header