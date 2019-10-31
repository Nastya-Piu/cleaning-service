import React from 'react';
import ImageUploader from 'react-images-upload';
import api from '../../../api';

const UploadImage = ({ label, input }) => {

  const onDrop = async (picture) => {

    if (picture.length) {
      var formData = new FormData();

      formData.append('upload', picture[0])

      const pictureUrl = await api.post('/image-upload', formData);

      input.onChange(pictureUrl.data.url)
    } else {
      input.onChange('');
    }

  }

  return (
    <div className="image-uploader">
      {input.value && <img src={input.value} width="100" />}
      <ImageUploader
        withIcon={true}
        buttonText={label}
        onChange={onDrop}
        singleImage={true}
        withLabel={false}
        withIcon={false}
        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
        maxFileSize={5242880}
      />
    </div>
  )
}

export default UploadImage;
