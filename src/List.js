import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items,RemoveItem ,EditItem}) => {
  return (
    <div className='todo-list'>
        {items.map((item) =>
        {
            return(
                <article className='todo-item' key={item.id} >
                    <p className='title'>{item.title}</p>
                    <div className='btn-container'>
                        <button type='button' className='edit-btn' onClick={ () => EditItem(item.id)}>
                            <FaEdit/>
                        </button>
                        <button type='button' className='delete-btn' onClick={ () => RemoveItem(item.id)}>
                            <FaTrash/>
                        </button>
                    </div>
            </article>
            )
        })}

    </div>
  );
};

export default List
