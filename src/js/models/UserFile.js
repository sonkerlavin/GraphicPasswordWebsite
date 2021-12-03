export class FileDB{
    constructor(){
        this.allfiles = []
            
    }
    addFile(user){
        let inp = `<input type = "number" hidden name = "user_id" value = ${user.id} />`
        $("#upload-file").append(inp)
        var form_data = new FormData($('#upload-file')[0]);
        console.log(form_data)
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/addfile',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(e) {
                swal('File uploaded');
            },
        })
        //this.loadAllFiles()
    }
    loadAllFiles(userid){
        return axios.post("http://127.0.0.1:5000/api/allfiles",{userid:userid.id}).then(e=>{
            this.allfiles = e.data
            return this.allfiles
        })
    }
    getAllFiles(userid){
        
        return this.loadAllFiles(userid).then(e=>{
            this.allfiles = e
            return this.allfiles
        })
        
    }
    removefile(key){
        return axios.post("http://127.0.0.1:5000/api/deletefile",{key:key}).then(e=>{
            console.log(e)
        })
    }
    addFolder(user){
        let form = document.getElementById("folder_form")
        let folder_input = document.getElementById("folder_input")
        folder_input.click()
        folder_input.addEventListener("change",(e)=>{
            console.log(e)
            let inp = `<input type = "number" hidden name = "user_id" value = ${user.id} />`
            $("#folder_form").append(inp)
            let form_data = new FormData(form)
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5000/api/addfolder',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(e) {
                    folder_input.value = ""
                    swal('Folder uploaded');
                },
            })
        })
    }
}

