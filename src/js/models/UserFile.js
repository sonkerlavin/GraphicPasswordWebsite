export class FileDB{
    constructor(){
        this.allfiles = []
        this.loadAllFiles()
        if(!this.allfiles){
            localStorage.setItem("allfiles",JSON.stringify([]))
            this.allfiles = this.loadAllFiles()
        }        
    }
    addFile(data){
        let user = localStorage.getItem("curr_user")
        let alluser = JSON.parse(localStorage.getItem("users"))
        const file = {
            title:data.title,
            link:data.link,
            key:data.key
        }
        let allfiles = JSON.parse(localStorage.getItem("allfiles"))
        if(!allfiles){
            allfiles = []
        }
        allfiles.push(file)
        let new_users = alluser.map((u)=>{
            if(u.username == user){
                u.files.push(allfiles)
            }
        })
        localStorage.setItem("users",JSON.stringify(new_users))
        this.loadAllFiles()
    }
    loadAllFiles(){
        this.allfiles = JSON.parse(localStorage.getItem("allfiles"))
    }
    getAllFiles(){
        return this.allfiles
    }
    removefile(key){
        let files = this.getAllFiles()
        files = files.filter((val)=>{
            return  val.key != key
        })
        localStorage.setItem("allfiles",JSON.stringify(files))
        this.loadAllFiles()
    }
}

