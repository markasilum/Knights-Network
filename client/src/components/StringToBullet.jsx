import React, { useState } from 'react'

const StringToBullet = (string) => {
  
  const [desc, setDesc] = useState("")
  
  function parseToBulletList(inputString) {
    // Split the input string into individual items
    var items = inputString.split('- ').filter(Boolean);
  
    // Format items into a bullet list
    var bulletList = items.map(function(item) {
        return <li key={index}>• {item.trim()}</li>;
    })
  
    return bulletList;
  }
  return (
    <ul>{parseToBulletList(string)}</ul>
  )
}

export default StringToBullet