import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [expenseitem,setexpenseitem]=useState("")
  const [expensecost,setexpensecost]=useState("")
  const [list,setlist]=useState(()=>{
    const saved=localStorage.getItem("expenses")
    return saved? JSON.parse(saved):[]
  })
  const [filter,setfilter]=useState("All")
  const [category,setcategory]=useState("")
  const [editid,seteditid]=useState(null)
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(list))
  })
  function add(){
    if (!expensecost || !expenseitem) return
      if (editid){
        setlist(list.map((item)=>item.id===editid? {...item,title:expenseitem,cost:Number(expensecost)}:item))
        seteditid(null)
      }
      else {
    setlist([...list,{id:crypto.randomUUID(),title:expenseitem,cost:Number(expensecost),type:category}]);
    
    }
    setexpensecost("");
    setexpenseitem("");
  }
  function edit(item){
    setexpenseitem(item.title)
    setexpensecost(item.cost)
    setcategory(item.type)
    seteditid(item.id)

  }
  function remove(id){
    setlist(list.filter((item)=>item.id!==id))
  }
  const filteredlist= filter==="All"? list: list.filter((item)=>item.type===filter)
  const total=filteredlist.reduce((sum,item)=>sum+(item.cost),0)
  return (
    <>
      <div className='container'>
        <h1 className='h1'>EXPENSE TRACKER APP</h1>
        <div className='total'>
            <label htmlFor="">Total Expenses:</label>
            <p>{total}</p>
          </div>
        <div className='input'>
          <input type="text" value={expenseitem} placeholder='enter the expense title' onChange={(e)=>setexpenseitem(e.target.value)} />
          <input type="number"  value={expensecost} placeholder='enter expense cost' onChange={(e)=>setexpensecost(e.target.value)} />
          <select name="" id="" onChange={(e)=> setcategory(e.target.value)} >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <button onClick={()=>add()}  style={{backgroundColor:"blue",padding:"10"}}>{editid? "Update":"ADD"}</button>
          </div>
          <div className="nav">
          <nav>
            <button onClick={()=>setfilter("All")}>All</button>
            <button onClick={()=>setfilter("Food")}>Food</button>
            <button onClick={()=>setfilter("Travel")}>Travel</button>
            <button onClick={()=>setfilter("Shopping")}>Shopping</button>
            <button onClick={()=>setfilter("Others")}>Others</button>
          </nav>
          </div>
          <div className="list">
          <ul>
            {filteredlist.map((item)=>(
              <li key={item.id}>{item.title}-{item.cost}<button onClick={()=>edit(item)} style={{backgroundColor:"green"}}>Edit</button><button onClick={()=>remove(item.id,item.cost) }  style={{backgroundColor:"red"}}>REMOVE</button></li>
            ))}
          </ul>
          </div>
        </div>
    </>
  )
}

export default App
