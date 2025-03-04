import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../actions/authActions';




const ProfileSettings = ({ onClose })=> {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user) || {name:'Guest'};


    const [name, setName] = useState(user.name || '');
    const [bio, setBio] = useState(user.bio || '');
    const [borderColor, setBorderColor]= useState(user.borderColor || '#000000');
    const [bgColor, setBgColor] = useState(user.bgColor || '#ffffff');


    useEffect(() => {
        if(user){
            setName(prevName => (prevName !== user.name ? user.name : prevName));
            setBio(prevBio => (prevBio !== user.bio ? user.bio : prevBio));
            setBorderColor(prevColor => (prevColor !== user.borderColor ? user.borderColor : prevColor));
            setBgColor(prevBg => (prevBg !== user.bgColor ? user.bgColor : prevBg));
        }
    },[user])

    const handleSave = () => {
        const updatedUser = {name, bio, bgColor, borderColor};
        dispatch(updateProfile(updatedUser)); // update redux golobaly
        if(typeof onClose === 'function') {
            onClose();
        }
    }



    return(
        <div className='modal'>
            <h2>Profile Settings</h2>
            <label>UserName:</label>
            <input type="text"  value={name} onChange={(e)=> setName(e.target.value)} />

            <label>User Bio:</label>
            <textarea   value={bio} onChange={(e)=> setBio(e.target.value)} />

            <label>Set Border Color:</label>
            <input type="color"  value={borderColor} onChange={(e)=> setBorderColor(e.target.value)} />

            <label>Background Color:</label>
            <input type="color"  value={bgColor} onChange={(e)=> setBgColor(e.target.value)} />

            <button onClick={handleSave}>Save</button>
            <button onClick={() => onClose && onClose()}>Close</button>
        </div>
    )
 
}


export default ProfileSettings;