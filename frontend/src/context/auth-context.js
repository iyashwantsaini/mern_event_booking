import React from 'react';

// for saving token here we create a context
export default React.createContext({
    token:null,
    userId:null,
    login:(token,userId,tokenExpiration)=>{},
    logout:()=>{}
});