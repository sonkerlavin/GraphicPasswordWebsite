export const PreviewScreen = `
<div class = "preview_container">
    <div class = "preview_box">
        <button class = "preview_close_btn">close</button>
        <iframe src="https://drive.google.com/file/d/%_doc_id%/preview" width="640" height="480" allow="autoplay">
        </iframe>
    </div>
<div>
`
export const getPreviewScreen = (id)=>{
    return PreviewScreen.replace("%_doc_id%",id)
}
export const getDocId = (url)=>{
    //https://drive.google.com/file/d/1cstQnXvVCsdVAze5NmzTfIPt4Y7oE_RR/view?usp=sharing
    return url.split("/")[5]
}
