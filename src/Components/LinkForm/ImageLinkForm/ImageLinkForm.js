import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className = 'f3 form center pa3'>
                {'This Application will detect faces in the pictures you input'}
            </p>
            <div className = 'center form pa4 br3 shadow'>
                <input className = 'f4 pa2 w-70 center' type = 'text' onChange = {onInputChange}/>
                <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;