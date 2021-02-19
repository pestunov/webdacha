from flask import Flask, render_template, url_for
import os
import sqlite3
import dachadb


# config const
DATABASE = dachadb.DBUNITS
DEBUG = True
SECRET_KEY = 'kgjdk?R$ghdk>jkljvv4etr3240rfd'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(DATABASE=os.path.join(app.root_path,'units.db')))



@app.route('/')
@app.route('/index/')
def index():
    print(url_for('index'))
    return render_template('index.html',
                           menu = 'Home')

@app.route('/control/')
def controlpanel():
    print(url_for('controlpanel'))
    cols = ['unit_name','unit_category','unit_desc']
    units = dachadb.selectFromDB('units.db3','units',cols )
    tree = {'security':['perimeter', 'lockers'],
            'luminos':['home', 'garden', 'entrance'],
            'ferma':['feed Cat', 'feed Bunny', 'feed Fish']}
    return render_template('controlpanel.html',
                           units = units,
                           tree = tree,
                           menu = 'Control panel')

@app.route('/dop/')
def index1():
    return render_template('base.html', title = 'addition', menu = '23')


if __name__ == '__main__':
    app.run(debug=True, port=5003, host='0.0.0.0')


