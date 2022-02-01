export const tablerow = `
            <div class = "db_row" style = "background-color:%_table_row_bg%">
            
            <input type = 'text' value = "%notification_key%" hidden/>
                <div class = "db_row_cell" style = "width:40px;">
                    <img src = "https://www.pngfind.com/pngs/m/225-2250632_svg-png-icon-android-notification-icon-png-transparent.png" class = "preview_btn" height = 30px width = 30px />
                </div>
                <div class = "db_row_cell"'>
                    <span style = "font-size:15px;">%_title%</span>
                </div>
                <div class = "db_row_cell">
                    <button class = "open_notification_btn">Open</button>
                </div>
            </div>
`
export const notificationpage = `
<div class = "db_main_container">
    <div style = "display:flex; flex-direction:"row"; align-items:flex-end">
        <button class = "logout_btn" style = "margin:10px 10px;background-color:transparent;padding:5px 10px;border-radius:5px">Logout</button>
    </div>
    <div class = "db_list_container">
        <div class = "db_list_header_container">
            <div class = "db_header_cell" style = "width:40px;">
                #
            </div>
            <div class = "db_header_cell">
                Title
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

export const PreviewScreen = `
<div class = "notification_container">
    <div class = "notification_box">
        <button class = "notification_close_btn">close</button>
        <div>
            <h1 style = 'text-align: center;'>%_title_%</h1>
            <p>%_message_%</p>
        </div>
    </div>
<div>
`
export const addNotification = (notifications)=>{
    let rows = ``
    let bg = "#d1d1d1"
    notifications.forEach(notification => {
        let row = tablerow
        row = row.replace("%_table_row_bg%",bg)
        let a = "aa"
        a.substr()
        if(notification.title.length > 10){
            row = row.replace("%_title%",notification.title.substr(0,10)+"....")
        }
        else{
            row = row.replace("%_title%",notification.title)
        }
        
        row = row.replace("%notification_key%",notification.id)
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

export const getNotificationPreview = (id)=>{
    axios.post("http://127.0.0.1:5000/api/getonenotification",{id:id}).then(e=>{
        data = e.data
        let html = PreviewScreen.replace("%_title_%",data["title"])
        html  = html.replace("%_message_%",data["message"])
    })
    return PreviewScreen
}
