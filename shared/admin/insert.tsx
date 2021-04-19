
import { isNonNullType, stripIgnoredCharacters } from 'graphql'
import { stringify } from 'node:querystring'
import React from 'react'
export const Insert:React.FC =()=>{

   const insert = (e:React.FormEvent) =>{
   let formData= new FormData()
       e.preventDefault()
     let form=(e.target as HTMLFormElement)
     let title= ( form[0] as HTMLInputElement).value
     let description= ( form[1] as HTMLInputElement).value
     let price= ( form[2] as HTMLInputElement).value
     let cat= ( form[3] as HTMLInputElement).value
     let image= ( form[4] as HTMLInputElement).files
    formData.append('title',title)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('cat',cat)
    if (image)
   { formData.append('image',image[0])}
      const response=fetch('http://localhost:9000/form/Inproducts',{
          method:'POST',
          headers:{'Authorization':'insert'},
          body:formData
      })
      .then(res=>console.log(res))
      .catch(error=>console.log(error))
       
   }
return (
    <React.Fragment>
        <form  onSubmit={insert} className="insertForm" encType="multipart/form-data">
         <input type="text" name="title" placeholder="title"></input>
         <textarea  name="description" placeholder="description"></textarea>
         <input type="number" name="price" placeholder="price"></input>
         <input type="text" name="cat" placeholder="category"></input>
         <input  type="file" name="image" placeholder="select image"></input>
         <input type="submit" />
        </form>
    </React.Fragment>
)
}