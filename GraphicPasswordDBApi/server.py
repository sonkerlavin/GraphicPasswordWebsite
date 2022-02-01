from turtle import title
from flask import Flask,request,url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json,os
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:kapil@localhost/passwordauthapp"
app.config["UPLOAD_FOLDER"] = "static"
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer,primary_key = True)
    username = db.Column(db.String(100),nullable = False)
    textpassword = db.Column(db.String(100),nullable = False)
    colorpassword = db.Column(db.String(100),nullable = False)
    gridpassword = db.Column(db.String(100),nullable = False)
    answer = db.Column(db.String(100),nullable = False)
    
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id'            : self.id,
           'username'      : self.username,
           'textpassword'  : self.textpassword,
           'colorpassword' : self.colorpassword,
           'gridpassword'  : self.gridpassword,
           'answer'        : self.answer
       }

class Files(db.Model):
    __tablename__ = "files"
    id = db.Column(db.Integer,primary_key = True)
    userid = db.Column(db.Integer,nullable = False)
    title = db.Column(db.String(200),nullable = False)
    filename = db.Column(db.String(200),nullable = False)
    folder = db.Column(db.Integer,nullable = False,default = 0)
    private = db.Column(db.Boolean,nullable = False,default=0)
    
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id'            : self.id,
           'userid'        : self.userid,
           'title'         : self.title,
           'filename'      : self.filename,
           'folder'        : self.folder,
           'private'       : self.private
       }
class Folders(db.Model):
    __tablename__ = "folders"
    id = db.Column(db.Integer,primary_key = True)
    userid = db.Column(db.Integer,nullable = False)
    folder_name = db.Column(db.String(50),primary_key = True)
    folders = db.Column(db.Text,nullable = False,default = "{}")
    
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id'            : self.id,
           'userid'        : self.userid,
           'folder_name'   : self.folder_name,
           'folders'       : self.folders,
        }
class Notification(db.Model):
    __tablename__ = "notifications"
    id = db.Column(db.Integer,primary_key = True)
    userid = db.Column(db.Integer,nullable = False)
    title = db.Column(db.String(100))
    message = db.Column(db.Text,nullable = False);
    
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id'            : self.id,
           'userid'        : self.userid,
           'title'         : self.title,
           'message'       : self.message,
        }
@app.route("/")
def index():
    return "Hello World"


@app.route("/api/adduser",methods = ['POST'])
def adduser():
    try:
        data = request.data
        data2 = json.loads(data)
        new_user = User(
            username = data2["username"],
            textpassword = data2["password"],
            colorpassword = data2["pattern"],
            gridpassword = data2["grid"],
            answer = data2["answer"]
        )
        db.session.add(new_user)
        db.session.commit()
        return {"message":"success"}
    except:
        return {"message":"error"}

@app.route("/api/getalluser",methods = ["POST"])
def getAllUSers():
    all_users = User.query
    datalist = [i.serialize for i in all_users.all()]
    return json.dumps(datalist)

@app.route("/api/addfile",methods = ["POST"])
def Addfile():
    data = request.form
    f = request.files.get("file")
    file = Files(
        userid = data.get("user_id"),
        title = data.get("file_name"),
        filename = secure_filename(f.filename)
    )
    db.session.add(file)
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
    db.session.commit()
    return "200"


@app.route("/api/allfiles",methods = ["POST"])
def GetAllFiles():
    data = json.loads(request.data)
    files = Files.query.filter_by(userid = data["userid"])
    file_list = [i.serialize for i in files.all()]
    return json.dumps(file_list)


@app.route("/api/deletefile",methods = ["POST"])
def removeFile():
    data = json.loads(request.data)
    file = Files.query.filter_by(id = data["key"]).first()
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    db.session.delete(file)
    db.session.commit()
    return "200"

@app.route("/api/addfolder",methods = ["POST"])
def AddFolder():
    for f in request.files.getlist("folder"):
        print(f.filename)
        file = Files(
            userid = request.form.get("user_id"),
            title = f.filename.split("/")[-1],
            filename = secure_filename(f.filename.split("/")[-1])
        )
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename.split("/")[-1])))
        db.session.add(file)
    db.session.commit()
    return "200"

@app.route("/api/privacy",methods = ["POST"])
def ChangePrivacy():
    data = json.loads(request.data)
    file = Files.query.filter_by(id = data["file_id"]).first()
    file.private = not file.private
    db.session.commit()
    return "200"

@app.route("/api/preview",methods = ["POST"])
def preloadFile():
    data = json.loads(request.data)
    file = Files.query.filter_by(id = data["fileid"]).first()
    return ("http://127.0.0.1:5000"+url_for('static', filename=file.filename))
    
@app.route("/api/resetuser",methods = ["POST"])
def ResetUser():
    users = User.query.all()
    for u in users:
        db.session.delete(u)
    db.session.commit()
    return "200"

@app.route("/api/addnotification",methods = ["POST"])
def AddNotification():
    try:
        data = request.data
        data = json.loads(data)
        print(data)
        notification = Notification(
        userid = data["userid"],
        title = data['title'],
        message = data['message']
        )
        db.session.add(notification)
        db.session.commit()
        return "200"
    except:
        return "500"
@app.route("/api/getnotification",methods = ["POST"])
def GetNotification():
    data = request.data
    data = json.loads(data)
    allnotification  = Notification.query.filter_by(userid = data['userid'])
    datalist = [i.serialize for i in allnotification.all()]
    return json.dumps(datalist)

@app.route("/api/getonenotification",methods = ["POST"])
def getOneNotification():
    data = request.data
    data = json.loads(data)
    notification  = Notification.query.filter_by(id = data['id']).first()
    data = notification.serialize
    return json.dumps(data)

app.run(debug=True)