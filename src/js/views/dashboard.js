export const tablerow = `
            <div class = "db_row" style = "background-color:%_table_row_bg%">
            <input type = 'text' value = '%file_key%' hidden/>
                <div class = "db_row_cell">
                    <img src = "https://findicons.com/files/icons/2813/flat_jewels/512/file.png" height = 30px width = 30px />
                </div>
                <div class = "db_row_cell"'>
                    %_title%
                </div>
                
                <div class = "db_row_cell">
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
        <input type = 'button' value = "Add new file" id = "addfile_btn" class = "db_addfile" />
    </div>
    <div class = "db_list_container">
        <div class = "db_list_header_container">
            <div class = "db_header_cell">
                #
            </div>
            <div class = "db_header_cell">
                Title
            </div>
            
            <div class = "db_header_cell">
                Drive Link
            </div>
            <div class = "db_header_cell">
                
            </div>
        </div>
        <div class = "db_list_row_container">
        %_rows%
        </div>
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
