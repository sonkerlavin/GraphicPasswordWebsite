const openlock = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsF5i15ttrLcAdm7_TvIKgeeTIRBxQ1Q0jMw&usqp=CAU"
const closelock = "https://cdn3.iconfinder.com/data/icons/main-ui-elements-with-color-bg-vol-2/512/open-512.png"
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
                    <img class = "privacy_btn" src = "%_privacy_%"
                    height = 20 width = 20
                    />
                </div>
                <div class = "db_row_cell">
                    <button class = "file_delete_btn">Delete</button>
                </div>
            </div>
`
export const dashboardpage = `
<div class = "db_main_container">
    <div style = "display:flex; align-items:flex-end">
        <button class = "logout_btn" style = "margin:10px 10px;background-color:transparent;padding:5px 10px;border-radius:5px">Logout</button>
    </div>
    <div class = "db_button_container">
        <input type = 'button' value = "Add new file" id = "show_addfile_btn" class = "db_addfile" />
    </div>
    <div class = "db_button_container">
        <input type = 'button' value = "Add new folder" id = "show_addfolder_btn" class = "db_addfolder" />
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
                Private
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
    <form method="POST" id="folder_form">
        <input type="file" id="folder_input" name = "folder" hidden webkitdirectory multiple/>
    </form>
</div>
`

export const addFiles = (files)=>{
    let rows = ``
    let bg = "#d1d1d1"
    files.forEach(file => {
        let row = tablerow
        row = row.replace("%_table_row_bg%",bg)
        let a = "aa"
        a.substr()
        if(file.title.length > 10){
            row = row.replace("%_title%",file.title.substr(0,10)+"....")
        }
        else{
            row = row.replace("%_title%",file.title)
        }
        if(file.private){
            row = row.replace("%_privacy_%",closelock)
        }
        else{
            row = row.replace("%_privacy_%",openlock)
        }
        row = row.replace("%file_key%",file.id)
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
