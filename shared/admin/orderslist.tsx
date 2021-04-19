import React, { useEffect, useState } from 'react'
interface iorder{order:{created:string,quantaty:number,matter:{matterTitle:string,matterPrice:number},
                 user:{username:string}}}
export const OrderList:React.FC= ()=>{
    const [orders,setOrders]=useState<iorder[]>([])
    
    useEffect(()=>{
     getOrders()
    },[])
     const getOrders=async()=>{

        let query=`
                 query{
                     getOrders
                  {
                    
                     order{ created
                      matter{matterTitle}
                      user{username}
                      quantaty}
                  }
                 }
                 `
        const response=await fetch('http://localhost:9000/graphql',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({query})
        })
        .then(res=>res.json())
       
        .catch(err=>console.log(err))
        setOrders(response.data.getOrders)
       console.log(response.data.getOrders)
     }
  const orderDone=async(username:string,mattername:string,e:React.MouseEvent)=>{
  const query=`
             mutation{
                 orderDone(username:"${username}",mattername:"${mattername}")
             }
             `
             const response=await fetch('http://localhost:9000/graphql',{
                 method:"POST",
                 headers:{'Content-Type':'application/json'},
                 body:JSON.stringify({query})
             })
             .then(res=>res)
             .catch(err=>console.log(err))
             console.log(response)
             e.preventDefault()
             let target =( e.target as HTMLButtonElement)
             target.disabled=true

  }
 
    return(
        <React.Fragment>
            {orders? <table className="ordersList">
            <thead>
               <tr><th></th><th>date</th><th>matter</th><th>user</th><th>quantaty</th></tr> 
               </thead>
                <tbody>
                {orders.map((ele:iorder,index:number)=>{
                return   ( <tr key={index} >
                    <button onClick={(e)=>orderDone(ele.order.user.username,ele.order.matter.matterTitle,e)}></button>
                        <td>{ele.order.created}</td><td>{ele.order.matter?.matterTitle}</td><td>{ele.order.user?.username}</td><td>{ele.order.quantaty}</td>
                        </tr>)
                })}
                 </tbody>
            </table>:'nothing'}
        </React.Fragment>
    )

}