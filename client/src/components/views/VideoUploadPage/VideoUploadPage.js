import React, {useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Card } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } =  Typography 
const { TextArea } =  Input

const PrivateOption = [
    {value: 0, label: 'Private'},
    {value: 1, label: 'Public'}
]
const CategoryOption = [
    {value: 0, label: 'Film & Animation'},
    {value: 1, label: 'Autos & Vehicles'}
]
function VideoUploadPage(props) {
  
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0); // private: 0, public: 1
  const [category, setCategory] = useState('Film & Animation');
  const [filePath, setFilePath] = useState(null);

  const user = useSelector(state => state.user); // State에 저장된 User가져올 수 있음


  const onDrop = (files) => {
     let formData = new FormData();
     const config = {
        header: {'content-type': 'multipart/form-data'}
     }
     formData.append('file', files[0]) // multiple = true 면 여러개 가능
     axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log('VideoUploadPage/response.data: ', response.data);
                setFilePath(response.data.url)
                // let variable = {
                //     url: response.data.url,
                //     fileName: response.data.fileName
                // }
                
                /** 윈도우에 ffmpeg 설치 필요 */

                // axios.post('/api/video/thumbnail', variable)
                //     .then(response => {
                //         if(response.data.success){

                //         } else {
                //             alert('썸네일 제작에 실패했습니다.')
                //         }
                //     })
            } else {
                alert('비디오 업로드를 실패했습니다.')
            }
        })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    let variables = {
        writter: user.userData._id, // redux에서 가져옴
        title: videoTitle,
        description: description,
        filePath: filePath,
        category: category,
        
    }
    axios.post('/api/video/uploadVideo', variables)
        .then(response => {
            if(response.data.success){
                message.success('성공적으로 업로드했습니다.')
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);

            } else {
                alert('업로드하는데 실패했습니다.')
            }
        })
  }
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }} >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2}> Upload Video</Title>
        </div>
        <Form>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Drop Zone */}
                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000}>
                    {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                            alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type='plus' style={{ fontSize: '3rem' }}/>

                            </div>
                        )}

                </Dropzone>
                
                {/* 썸네일  */}
                <div>
                    <img src='' alt=''/>
                </div>

            </div>
            <br/>
            <br/>
            
            <label>Title</label>
            <Input
                onChange={(e) => {setVideoTitle(e.target.value)}}
                value={videoTitle}
            />
            <br/>
            <br/>
            <label>Description</label>
            <TextArea
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}
            />
             <br/>
            <br/>
            <select onChange={(e) => {setPrivate(e.target.value)}}>
                {/* Private vs Public */}
                {PrivateOption.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
                

            </select>
            <br/>
            <br/>
            <select onChange={(e) => {setCategory(e.target.value)}}>
                {CategoryOption.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br/>
            <br/>
            <Button type='primary' size='large' onClick={onSubmit}>
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default VideoUploadPage