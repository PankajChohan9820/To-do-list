from flask import Flask
from flask_cors import CORS
from models import db
from controllers.todo_controller import tasks_api
from views.todo_users import users_api

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db.init_app(app)

app.register_blueprint(tasks_api)
app.register_blueprint(users_api)



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
