import { createContext, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const ImagesContext = createContext()

export default ImagesContext;


export const ImagesProvider = ({ children }) => {
    const history = useNavigate()
    const { authTokens } = useContext(AuthContext)
    const [images, setImages] = useState([])
    const sendImage=async(formData)=>{
        let response=await fetch('http://localhost:8000/api/createImageMessage/',{
            method:'POST',
            body:formData,
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }
        })
        let data=await response.json()
        if(response.status===200){
            console.log(data)
        }else{
            console.log(data)
        }
    
    }

    const getImages=async(group_id)=>{
        let response=await fetch(`http://localhost:8000/api/groups/${group_id}/images/`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }
        })
        let data=await response.json()
        if(response.status===200){
            setImages(data)
            console.log(data)
        }else{
            console.log(data)
        }
    
    }

    const deleteImages = async (id_image) => {
        try {
            let response = await fetch(`http://localhost:8000/api/images/${id_image}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
            if (response.status === 204) {
                console.log('Eliminado correctamente');
            } else {
                console.error('Error al eliminar la imagen:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error.message);
        }
    }


    let contextData = {
        sendImage:sendImage,
        images:images,
        getImages:getImages,
        deleteImages:deleteImages,

    }




    return (
        <ImagesContext.Provider value={contextData} >
            {children}
        </ImagesContext.Provider>
    )
}