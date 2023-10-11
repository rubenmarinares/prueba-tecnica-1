import {SortBy, type APIResults} from '../types.d';


interface  Props {
    handleChangeSort: (sort:SortBy)=>void,
    deleteUser: (index:number)=>void,
    showColors:boolean,
    users: APIResults[]
}

export  function UserList({deleteUser,handleChangeSort,showColors,users}:Props){

return(
    <table width="100%">
        <thead>
            <th>Foto</th>
            <th className='pointer' onClick={()=>handleChangeSort(SortBy.NAME)}>Nombre</th>
            <th className='pointer' onClick={()=>handleChangeSort(SortBy.LAST)} >Apellidos </th>
            <th  className='pointer' onClick={()=>handleChangeSort(SortBy.EMAIL)}>username</th>
            <th>Acciones</th>
        </thead>
        <tbody>
            {users.map( (user,index)=>{
                const backgroundColor=index % 2 === 0 ? '#333':'#555'
                const color= showColors ? backgroundColor: 'transparent'                
              return(
                <tr key={user.id} style={{backgroundColor:color}}>
                    <td><img className='imagelist' src={user.avatar}></img></td>
                    <td style={{color:'#cc2'}}>{user.first_name}</td>
                    <td style={{color:'#cc2'}}>{user.last_name}</td>
                    <td style={{color:'#cc2'}}>{user.username}</td>
                    <td><button onClick={()=>{
                        deleteUser(user.id)
                        }}>Borrar</button></td>
                </tr>
              )  
            })}
            
        </tbody>


    </table>
    
)

}