import { Form, Upload, message, Button, Modal, Avatar } from 'antd'
import { UploadFile, ItemRender } from 'antd/lib/upload/interface'
import { color } from '@assets/color';
import { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;




function getBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.toString());
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default function FormImageProduct() {

    const [_loading, set_loading] = useState(false)
    const [_imageUrl, set_imageUrl] = useState("")
    const [_modalPreview, set_modalPreview] = useState({
        visible: false,
        title: null,
        image: null
    })
    const [_fileList, set_fileList] = useState<UploadFile[]>([])

    function checkFile(file: UploadFile) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJpgOrPng || !isLt2M) {
            return false
        }
        
        else
            return true
    }


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const uploadButton = (
        <div>
            {_loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        set_modalPreview({
            visible: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            image: file.url || file.preview
        })

        // this.setState({
        //   previewImage: file.url || file.preview,
        //   previewVisible: true,
        //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        // });
    };

    const handleUploadChange = (data: { fileList: UploadFile[], file: UploadFile }) => {
        // console.log(data.fileList.filter(item => checkFile(item) == true))
        // const files = data.fileList.filter(item => checkFile(item) == true)
        // set_fileList(files)
        if (checkFile(data.file))
            set_fileList(data.fileList)
    };





    return (
        <>
            <Form
                layout="vertical"
                style={{
                    width: "100%", backgroundColor: color.sectionDark,
                    padding: '45px 100px', marginTop: 20, borderRadius: 10,
                    transition: 'all .4s',
                    minHeight: 500
                }}
                onValuesChange={onFinish}
            >

                <h3 style={{ color: "#fff", }}>
                    Upload image
                </h3>

                <Dragger
                    style={{ backgroundColor: "#0000", marginBottom: 20 }}
                    listType="picture-card"
                    fileList={_fileList}
                    onPreview={handlePreview}
                    onChange={handleUploadChange}
                    beforeUpload={beforeUpload}
                    
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text" style={{ color: "#fff" }}>Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint" style={{ color: "#fff" }}>
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>

                <div style={{ marginTop: 30 }} />

                {/* <Upload
                    listType="picture-card"
                    fileList={_fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={(e)=>{console.log(e)}}
                   
                >
                    {_fileList.length >= 8 ? null : uploadButton}
                </Upload> */}


                <Modal
                    visible={_modalPreview.visible}
                    title={_modalPreview.title}
                    footer={null}
                    onCancel={() => set_modalPreview({ visible: false, title: null, image: null })}
                >
                    <img alt="example" style={{ width: '100%' }} src={_modalPreview.image} />
                </Modal>

                <style jsx global>{`
                    .ant-upload.ant-upload-select-picture-card{
                        border: 0;
                    }
                    .ant-upload-list-picture-card .ant-upload-list-item-uploading.ant-upload-list-item{
                        background-color: #0000;
                    }
                    .ant-upload-list-item-thumbnail{
                        color: #fff;
                    }
                `}</style>

            </Form>
        </>
    )
}