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
        const file = {
            title:data.title,
            description:data.description,
            link:data.link
        }
        allfiles = JSON.parse(localStorage.getItem("allfiles"))
        allfiles.push(file)
        localStorage.setItem("allfiles",JSON.stringify(allfiles))
    }
    loadAllFiles(){
        this.allfiles = JSON.parse(localStorage.getItem("allfiles"))
    }
    getAllFiles(){
        return this.allfiles
    }
    removefile(key){
        localStorage.removeItem(key)
        this.loadAllFiles()
    }
}

