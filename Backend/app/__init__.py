from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config import Config, basedir
from config import app_config
import os

def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config['SECRET_KEY'] = 'thisissecret'
    app.config.from_pyfile(os.path.join(basedir, 'config.py'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app


# app = create_app(config_name="testing")
app = create_app(config_name="config")
app.config["HOST"] = "192.168.43.40"
app.debug = True
db = SQLAlchemy(app)
app.config['MAIL_SERVER'] = 'localhost'
app.config['MAIL_PORT'] = '2525'
db.init_app(app)

migrate = Migrate(app, db)


from app import routes, models