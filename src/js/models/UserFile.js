export class FileDB{
    constructor(){
        this.allfiles = []
        this.loadAllFiles()     
    }
    addFile(data){
        let user = JSON.parse(localStorage.getItem("curr_user"))
        let alluser = JSON.parse(localStorage.getItem("users"))
        const file = {
            title:data.title,
            link:data.link,
            key:data.key
        }
        this.allfiles.push(file)
        let new_users = alluser.map((u)=>{
            if(u.username == user){
                u.files = this.allfiles
                console.log(u.files)
            }
            return u
        })
        
        localStorage.setItem("users",JSON.stringify(new_users))
        this.loadAllFiles()
    }
    loadAllFiles(){
        let user = JSON.parse(localStorage.getItem("curr_user"))
        let alluser = JSON.parse(localStorage.getItem("users"))
        let allfiles = []
        if(! alluser){
            return
        }
        alluser.map((u)=>{
            if(u.username == user){
                allfiles = u.files
            }
        })
        this.allfiles = allfiles
    }
    getAllFiles(){
        this.loadAllFiles()
        return this.allfiles
    }
    removefile(key){
        let files = this.getAllFiles()
        files = files.filter((val)=>{
            console.log(val)
            return  val.key != key
        })
        
        let user = JSON.parse(localStorage.getItem("curr_user"))
        let alluser = JSON.parse(localStorage.getItem("users"))
        let new_users = alluser.map((u)=>{
            if(u.username == user){
                u.files = files
            }
            return u
        })
        
        localStorage.setItem("users",JSON.stringify(new_users))
        this.loadAllFiles()
    }
}

