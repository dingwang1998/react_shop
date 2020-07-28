import React from 'react'


import { Upload, message, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { BASE_IMG } from '../../utils/Constants'
import { deteimage } from "../../api";
import PropTypes from 'prop-types';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}


class PicturesWall extends React.Component {
    static propTypes = {
      imgs: PropTypes.array
    }
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '123',
        fileList: [
          // {
          //   uid: '-1',
          //   name: 'image.png',
          //   status: 'done',
          //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          // }
        ],
    }
    componentWillMount(){
      const imgs = this.props.imgs
      if(imgs && imgs.length > 0)
      {
        const fileList = imgs.map((item,index)=>({
          uid:-index,
          name:item,
          status:'done',
          url: BASE_IMG + item
        }))
        this.setState({
          fileList
       })
      }
    }
    getImage = ()=>this.state.fileList.map(file=>file.name)
  
    handleCancel = () => this.setState({ previewVisible: false });
    
    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    
    handleChange = async ({ fileList, file }) =>{
        if(file.status === 'done'){
            file = fileList[fileList.length - 1]
            let {name,url} = file.response.data
            file.name = name
            file.url = url
        }else if (file.status==='removed') {
          const result = await deteimage(file.name)
          if (result.status===0) {
            message.success('删除图片成功')
          } else {
            message.error('删除图片失败')
          }
        }
        this.setState({ fileList })
        
    };
    

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
    <div className="clearfix">
        <Upload
          name = "image"
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </div>
    )
  }
}

export default PicturesWall
