import React,{ useState } from 'react'

//css
import './uploadImage.css';

//components
import {Upload,Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {upload}from '../../functions/cloudinaryImageUpload'
import { useSelector } from 'react-redux';



function UploadImage({setImages,images,values,setValues,allUploadedFiles}) {
  const { user } = useSelector((state) => ({ ...state }));
  const [uploading,setUploading] = useState(false)


    
    const uploadChange = (value)=>{
console.log("value file onchange",value)
value?.file?.status ==="done" && setImages((prev)=>([...value.fileList]))
value?.file?.status ==="removed" && setImages([...value.fileList])
 }

 const cloudinary = async(uri,user)=>{
  //  console.log("images uri",uri)
  try {
   const uploadedImg  = await upload(uri,user);
  //  console.log("yooo")
   allUploadedFiles = [...allUploadedFiles,uploadedImg.data];
   console.log("alluploaded files---",allUploadedFiles);
    setValues(prev=>({...prev,images:allUploadedFiles}))

    setUploading(false)
   console.log("uploaded image------>",uploadedImg);
  } catch (error) {

   console.log("uploading err", error);

  }

}

const uploadImages = ()=>{

  for(let i=0;i<images.length;i++){
    // console.log("uri",images[i]?.thumbUrl);
    setUploading(true)
    let uri = images[i]?.thumbUrl;
      cloudinary(uri,user);
  }


}
 

    return (//...values.images,value.file
        <>
         <Upload
         accept="image/*"
         multiple={true}
         onChange={uploadChange}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
    //   defaultFileList={[...fileList]}
    className="upload-list-inline"
    >
      <Button icon={<UploadOutlined />}>Choose File</Button>
    </Upload>
    <Button className="upload__Button" type="primary" disabled={images.length>0?false:true} loading={uploading?true:false} onClick={uploadImages}>{uploading?"Uploading...":"Upload"}</Button>

        </>
    )
}

export default UploadImage
