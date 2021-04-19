interface iuser {username:string,email:string}

export const addUser=(user:iuser)=>{
    const action ={
        type:'adduser',
        payload:user
    }
}