import React from 'react'
import axios from 'axios';

import styles from '../css/posts.module.css';
 
class ImageUpload extends React.Component{


    constructor(){
        super();
        this.state = {
            selectedImage: '',
        } 
        this.onFileChange = this.onFileChange.bind(this);
    }
 
    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            this.setState({
                selectedImage: event.target.result,
            })
        }
    }
 
    onSubmit() {
        const titleInput = document.getElementById('title-input');
        const textInput = document.getElementById('text-input');

        const formData = { 
            image: this.state.selectedImage,
            title: titleInput.value,
            text: textInput.value
        };
        let endpoint = "http://friesische-feinkost.de/api/posts/img_upload.php";
        axios.post(endpoint, formData)
            .then((res) => {
                console.log('File uploaded!', res);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    }
    

    render(){
        return(
            <div>
                <div className="form-group mb-3">
                    <label className="text-white">Select File</label>
                    <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                </div>

                <input className={styles.inputFiled} placeholder='Write a title...' name='title' id='title-input'/>
                <textarea className={styles.textArea} rows={4} maxLength={500} placeholder='Write the text under 500 charachters...' name='text' id='text-input'/>
                
                <div className="d-grid">
                   <button type="button" className="btn btn-outline-primary" onClick={()=>this.onSubmit()}>Store</button>
                </div>
                
            </div>
        )
    }
}
 
export default ImageUpload;