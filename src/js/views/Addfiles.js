export const addfileform = `
<form id="upload-file" method="post" enctype="multipart/form-data">
    <div class = "file_form_main_container">
        <div class = "file_form_title">
            Add Your Files
        </div>
        <div class = "file_form_container">
            <div class="file_form_group field">
                <input type="input" class="file_form_field" placeholder="Name" name="file_name" required />
                <label for="name" class="file_form_label">Name</label>
            </div>
            <div class="file_form_group field">
                <input type="file" class="file_form_field" placeholder="file" name="file" required />
                <label for="name" class="file_form_label">File</label>
            </div>
            <div style = 'margin-top:30px;'>
                <button type="button" class="bn33" id = "add_file_btn">Add</button>
            </div>
        </div>
    </div>
</form>
`