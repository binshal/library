"use client"
import React, { useRef, useState } from 'react'
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from "@/hooks/use-toast"

const {
  env: {
      imagekit : {publicKey, urlEndpoint}
  }
} = config;

const ImageUpload = ({onFileChange} : {onFileChange : (filePath : string) => void;}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{filePath : string } | null>(null);

  const onSuccess = (res : any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    })
  };

  const onError = (err : any) => {
    console.log(err);
    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded, please try again`,
      variant: "destructive",
    })
  };
  
  const authenticator = async () => {
    try {
      // Use the full URL with https protocol
      const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit/`);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
  
      return { token, expire, signature };
    } catch (error: any) {
      console.error(`Authentication request failed: ${error.message}`);
      toast({
        title: "Authentication failed",
        description: "Failed to authenticate with ImageKit",
        variant: "destructive",
      });
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload 
      className='hidden'
      ref={ikUploadRef}
      onError={onError}
      onSuccess={onSuccess}
      fileName="user-upload.png"
      folder='/upload'
      useUniqueFileName={true}
      />
      <button className='upload-btn' onClick={(e) => {
        e.preventDefault();
        if(ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
          <Image 
          src={"/icons/upload.svg"}
          alt='upload-icon'
          width={20}
          height={20}
          className='object-contain'
          />
          <p className='text-base text-light-100'>Upload a File</p>
          {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
        alt={file.filePath}
        path={file.filePath}
        width={500}
        height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload