import React ,{ useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App()
{
  const [name,setName] = useState('')
  const [list,setList] = useState(getLocalStorage())
  const [isEdit,setIsEdit] = useState(false)
  const [editID,setEditID] = useState(null)
  const [alert,setAlert] = useState({show:false,msg:'',type:''})

  const handleSubmit = (e) =>
  {
      e.preventDefault()
        if(!name)
            {
            setAlert({show:true,msg:'Please Enter Value',type:'danger'})
            }
        else if(name && isEdit)
        {
        setList(list.map((item) => {
            if(item.id == editID)
                return {...item,title:name}
            return item
        }))
        setName('')
        setEditID(null)
        setIsEdit(false)
      setAlert({show:true,msg:'Value Changed',type:'success'})
        }
        else
        {
      setAlert({show:true,msg:'Item Added to the List',type:'success'})
        const newItem = {id: new Date().getTime().toString(), title:name}
        setList([...list,newItem])
        setName('')
        }
  }

    useEffect(()=>
  {
    const timeout = setTimeout( () =>
    {
      setAlert({show:false,msg:'',type:''})
    },3000)
    return () => clearTimeout(timeout)
  },[alert])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);



const RemoveItem = (id) =>
  {
    setAlert({show:true,msg:'Item Removed',type:'danger'})
    setList(list.filter((item) => item.id != id))
  }

  const EditItem = (id) =>
  {
    const specificitem = list.find((item) => item.id == id)
    setIsEdit(true)
    setEditID(id)
    setName(specificitem.title)
  }
  const clearList = () =>
  {
    setAlert({show:true,msg:'List Cleared',type:'danger'})
    setList([])
  }
    return(
        <section className='section-center'>
           <form className='todo-form' onSubmit={handleSubmit}>
               {alert.show && <Alert {...alert} />}
                <h3>TO-DO LIST</h3>
                <div className='form-control'>
                    <input type='text' className='todo' value={name} onChange={(e) => setName(e.target.value) }/>
                    <button type='submit' className='submit-btn'>
                         {isEdit ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 &&
            <div className='todo-container'>
                <List items={list} RemoveItem={RemoveItem} EditItem={EditItem}/>
                <button className='clear-btn' onClick={clearList}>
                    Clear Items
                </button>
            </div>}
        </section>
    )
}
export default App