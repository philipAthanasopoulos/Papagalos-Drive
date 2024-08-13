import React from 'react';

type Props = {
    blob: Blob;
};

const FileFrame: React.FC<Props> = ({ blob }) => {
    console.log(typeof blob);
    // Step 1: Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Step 2: Render the Blob
    return (  
        <img src={blobUrl} alt="" />
    );
};

export default FileFrame;