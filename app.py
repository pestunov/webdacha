from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig as myConfig

import dachadb, dachacogitare


app = Flask(__name__)
app.config.from_object(myConfig)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column("user_name", db.String(255))
    password = db.Column("password", db.String(255))

    def __init__(self, username):
        self.username = username

    def __repr__(self):
        return f"<User '{self.username}'>"

@app.route('/')
@app.route('/index/')
def index():
    print(url_for('index'))
    return render_template('index.html',
                           menu='Home')

@app.route('/control/')
def controlpanel():
    print(url_for('controlpanel'))
    cols = ['unit_name','unit_category','unit_desc']
    units = dachadb.selectFromDB('units.db3','units', cols)
    print(units)
    tree = {'security': ['perimeter', 'lockers', 'fenestra', 'porta'],
            'luminos': ['home', 'garden', 'entrance'],
            'ferma': ['feed Cat', 'feed Bunny', 'feed Fish']}
    return render_template('controlpanel.html',
                           units=units,
                           tree=tree,
                           menu='Control panel')

@app.route('/dop/')
def index1():
    return render_template('base.html', title = 'addition', menu = '23')


if __name__ == '__main__':
    app.run()


