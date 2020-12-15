import React, { useRef, useState, useEffect}from 'react';
import Button from './Button';
import './ImageUpload.css'

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        // use the fileReader to convert the binary data to a readable outputable image
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        // this function will call once the read is done
        fileReader.readAsDataURL(file);
        // create a URL 
    }, [file]);

    const pickedHanlder = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
        setIsValid(false);
        fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };
    const pickImageHandler = () => {
        filePickerRef.current.click();
        // exists on this DOM node and will open up a the file picker
    };
    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHanlder}
            />
            <div className={`image-upload ${props.center && `center`}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p>Please pick up a image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}> PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;