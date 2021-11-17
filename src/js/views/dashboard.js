export const tablerow = `
            <div class = "db_row" style = "background-color:%_table_row_bg%">
            <input type = 'text' value = "%file_key%" hidden/>
                <div class = "db_row_cell" style = "width:40px;">
                    <img src = "https://findicons.com/files/icons/2813/flat_jewels/512/file.png" class = "preview_btn" height = 30px width = 30px />
                </div>
                <div class = "db_row_cell"'>
                    <span style = "font-size:15px;">%_title%</span>
                </div>
                
                <div class = "db_row_cell" style = "margin:0px 20px;">
                    <a href = '%_link%'>%_link%</a>
                </div>
                <div class = "db_row_cell">
                    <button class = "file_delete_btn">Delete</button>
                </div>
            </div>
`
export const dashboardpage = `
<div class = "db_main_container">
    <div class = "db_button_container">
        <input type = 'button' value = "Add new file" id = "show_addfile_btn" class = "db_addfile" />
    </div>
    <div class = "db_list_container">
        <div class = "db_list_header_container">
            <div class = "db_header_cell" style = "width:40px;">
                #
            </div>
            <div class = "db_header_cell">
                Title
            </div>
            
            <div class = "db_header_cell" style = "margin:0px 20px;">
                Drive Link
            </div>
            <div class = "db_header_cell">
                
            </div>
        </div>
        <div class = "db_list_row_container">
        %_rows%
        </div>
    </div>
    <div class = "preview">
    </div>
</div>
`

export const addFiles = (files)=>{
    let rows = ``
    let bg = "#d1d1d1"
    files.forEach(file => {
        let row = tablerow
        row = row.replace("%_table_row_bg%",bg)
        row = row.replace("%_title%",file.title)
        row = row.replace("%_link%",file.link)
        row = row.replace("%_link%",file.link)
        row = row.replace("%file_key%",file.key)
        rows += row
        if (bg === "#a1a1a1") {
            bg = "#d1d1d1"
        }
        else{
            bg = "#a1a1a1"
        }
    });
    return rows
}
