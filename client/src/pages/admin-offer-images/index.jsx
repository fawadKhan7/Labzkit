// pages/admin/UploadImagesPage.js

import React from 'react';
import MultiFileUploader from '../../components/MultiFileUploader';

const UploadImagesPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin - Upload Images</h2>
      <MultiFileUploader uploadEndpoint="/api/upload-images" />
    </div>
  );
};

export default UploadImagesPage;
