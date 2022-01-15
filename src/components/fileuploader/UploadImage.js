import React,{ useState } from 'react'
import Resizer from "react-image-file-resizer";

//css
import './uploadImage.css';

//components
import {Button} from 'antd';
// import {DeleteOutlined} from '@ant-design/icons';
import {upload}from '../../functions/cloudinaryImageUpload'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



function UploadImage({setImages,images,values,setValues,allUploadedFiles}) {
  const { user } = useSelector((state) => ({ ...state }));
  const [uploading,setUploading] = useState(false)
  const imageList = [];

const uploadChange = async(e)=>{
  try{
  // console.log("file change",e.target.files);
  // console.log(typeof e.taregt.fileList)
  let file = e.target.files;
  for(let i=0;i<file.length;i++){
  // console.log("from inside loop",file[i])
  const image = await resizeFile(file[i]);
  imageList.push(image);
  setImages([...images,...imageList]);
  // console.log("resized image",imageList)
}
  }catch(error){
    // console.log("file onchnge error",error)
  }
}

 const cloudinary = async(uri,user)=>{
  //  console.log("images uri",uri)
  try {
   const uploadedImg  = await upload(uri,user);
  //  console.log("yooo")
   allUploadedFiles = [...allUploadedFiles,uploadedImg.data];
  //  console.log("alluploaded files---",allUploadedFiles);
    setValues(prev=>({...prev,images:allUploadedFiles}))
    setUploading(false)
    toast.success("Product images uploaded!",{position:"bottom-right"})
  //  console.log("uploaded image------>",uploadedImg);
   setImages([])
  } catch (error) {
  //  console.log("uploading err", error);
  toast.error("Failed to upload images",{position:"bottom-right"})

  }

}

const uploadImages = ()=>{
  // console.log("images--->",images)
  
  for(let i=0;i<images.length;i++){
    // console.log("uri",images[i]?.thumbUrl);
    setUploading(true)
    let uri = images[i];
    // console.log(uri)
      cloudinary(uri,user);
  }


}

const resizeFile = (file)=>{
return new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    300,
    300,
    "JPEG",
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    "base64"
  );
});
}

const deleteImg = (value)=>{
 const index = value.target.name; 
// console.log("button cicked",value.target)
// console.log("images",images)
images.splice(index,1)
setImages([...images]);
// console.log("image----->",images.splice(index,1))
}
 

    return (//...values.images,value.file
        <>
    <div className="upload__container">
      <input type="file" accept="image/*" multiple onChange={uploadChange}/>
      <div className="show__uploaded__images">
      {
      images?.map((img,index)=>(
        <div key={index}>
        <img src={img} alt={`${index+1}`}/>
        <div className="image__mask">
        <Button name={index} onClick={deleteImg} type="primary" style={{width:"100%"}}>
          Delete
        </Button>
        </div>
        </div>
      ))}
      </div>
    </div>
    <Button className="upload__Button" type="primary" disabled={images.length>0?false:true} loading={uploading?true:false} onClick={uploadImages}>{uploading?"Uploading...":"Upload"}</Button>

        </>
    )
}

export default UploadImage
