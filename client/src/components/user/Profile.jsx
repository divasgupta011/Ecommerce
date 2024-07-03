import React, { useContext } from 'react'
import Appcontext from '../../context/Appcontext'

const Profile = () => {
  const {user} = useContext(Appcontext);
  return (
    <div>Profile</div>
  )
}

export default Profile