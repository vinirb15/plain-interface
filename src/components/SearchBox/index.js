import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import './styles.css'

export default function Header() {
  const [search, setSearch] = useState(false);
  const [actived, setActived] = useState('');

  function changeState() {
    if (search === true) {
      setSearch(false)
      setActived('')
      console.log(actived)
    }
    else if (search === false) {
      setSearch(true)
      setActived('')
      console.log(actived)
    }
  }

  const icon = <button onClick={changeState} type="button">
    <FiSearch size={18} color="#9557a9" />
  </button>

  const onSearch = (
    <>
      <input type="text" name="search" placeholder="Search.." />
      <button onClick={changeState} type="button">
        <FiSearch size={18} color="#9557a9" />
      </button>
    </>
  )


  return (
    (search ? onSearch : icon)
  )
}