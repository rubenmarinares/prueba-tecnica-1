
import {useEffect, useRef,useState, useMemo} from 'react';
import './App.css'


import {SortBy, type APIResults} from './types.d';

import { UserList } from './components/UserList';





function App() {

  const [users,setUsers]=useState<APIResults[]>([]);
  const[showColors,setShowColors]=useState(false);

  //const[sortByCountry, setSortByCountry]=useState(false)
  const[sorting, setSorting]=useState<SortBy>(SortBy.NONE)


  const[filterName,setFilterName]=useState<string | null>(null)
  const originalUsers=useRef<APIResults[]>([])
/*
  useRef-> para guardar un valod 
  que queremos que se comparta entre renderizados
  pero que al cambiar, no vuelva a renderizar el componente

  */ 
 

  
  const handleReset=()=>{
    setUsers(originalUsers.current)
  }

  const toggleColors=()=>{
    setShowColors(!showColors)
  }

  const toggleSortByCountry= ()=>{
    const newSortingValue=sorting===SortBy.NONE ? SortBy.EMAIL:SortBy.NONE
    setSorting(newSortingValue)
      //setSortByCountry(prevState=>!prevState)
  }

 

  useEffect( () => {
      fetch('https://random-data-api.com/api/v2/users?size=10')
      .then(async res=>await res.json())
      .then(res=> {
        setUsers(res)
        originalUsers.current=res
      })
      .catch(err=>
          console.error(err))

  },[]);


  const handleDelete=(index:number) =>{
    const filteredUsers=users.filter((user,userIndex)=> user.id!==index)
    setUsers(filteredUsers);
    }



    const handleChangeSort=(sort:SortBy) =>{
      setSorting(sort)
    }

const filteredUsers=useMemo(()=> {
    return typeof filterName === 'string' && filterName.length>0
    ? users.filter((user)=>{
      return user.first_name.toLowerCase().includes(filterName.toLowerCase())
    })
    : users
  },[users,filterName])


const sortedUsers=useMemo(()=>{  
  console.log("sorting",sorting)
  if(sorting===SortBy.NONE) return filteredUsers

  if(sorting===SortBy.EMAIL){
    return [...filteredUsers].sort((a,b)=>{
      return a.email.localeCompare(b.email)
    })
  }
  if(sorting===SortBy.NAME){
    return [...filteredUsers].sort((a,b)=>{
      return a.first_name.localeCompare(b.first_name)
    })
  }
  if(sorting===SortBy.LAST){
    return [...filteredUsers].sort((a,b)=>{
      return a.first_name.localeCompare(b.last_name)
    })
  }

},[filteredUsers,sorting])

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header>
          <button onClick={toggleColors}>Colorear filas</button>
          <button onClick={toggleSortByCountry}>
            {sorting===SortBy.EMAIL ? 'Desordenar':'Ordenar por Email'}            
            </button>
            <button onClick={handleReset}>
            Reset estado inicial
            </button>
            <input placeholder='Filtra por Nombre' onChange={(e)=>{setFilterName(e.target.value)}} />


      </header>
      <UserList  handleChangeSort={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
    </div>
  )
}

export default App
