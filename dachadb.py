''' Rountines kit for create/read/modify data bases and tables

Since we use sqlite3 so let's make all tables in separate file
to allow write to each table simultaneously
'''

import sqlite3 as sq

DBUNITS = 'units_1.db3'
DBUSERS = 'users.db3'


def createDBUnits():
    with sq.connect(DBUNITS) as con:
        cur = con.cursor()
        cur.execute("""DROP TABLE IF EXISTS units;""")
        cur.execute("""CREATE TABLE IF NOT EXISTS units (
            count_id INTEGER PRIMARY KEY AUTOINCREMENT,
            unit_id INTEGER DEFAULT NULL,
            unit_name TEXT DEFAULT NULL,
            unit_adr TEXT DEFAULT NULL,
            unit_port TEXT DEFAULT NULL,
            unit_status INT DEFAULT 0,
            cat_id INTEGER NOT NULL DEFAULT 100,
            cat_aux TEXT NULL DEFAULT NULL,
            unit_func TEXT NULL DEFAULT NULL,
            unit_desc TEXT NULL DEFAULT NULL
            );""")
        cur.execute("""INSERT INTO units
            (unit_id, unit_name, unit_adr, unit_port, unit_status,
            cat_id, unit_func, unit_desc) VALUES
            ('1', 'gpio14', 'gpio','14' ,1,
            1,'readPin','embeded sensor')
            ;""")
        cur.execute("""INSERT INTO units
            (unit_id, unit_name, unit_adr, unit_port, unit_status,
            cat_id, unit_func, unit_desc) VALUES
            ('2', 'gpio15', 'gpio','15' ,1,
            1,'readPin','embeded sensor')
            ;""")


def createDBCats():
    with sq.connect(DBUNITS) as con:
        cur = con.cursor()
        cur.execute("""DROP TABLE IF EXISTS cats;""")
        cur.execute("""CREATE TABLE IF NOT EXISTS cats (
            cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
            cat_name TEXT NOT NULL,
            cat_units TEXT NULL DEFAULT NULL,
            cat_desc TEXT NULL DEFAULT NULL
            );""")
        cur.execute("""INSERT INTO cats
            (cat_name, cat_desc) VALUES
            ('security', 'all about your safety')
            ;""")
        cur.execute("""INSERT INTO cats
            (cat_name, cat_desc) VALUES
            ('luminos', 'all about luminosity of your latifundia')
            ;""")
        cur.execute("""INSERT INTO cats
            (cat_name, cat_desc) VALUES
            ('ferma', 'takes care about your garden')
            ;""")

def getUnitsList():
    return selectFromDB(DBUNITS,'units',['unit_name', 'unit_adr'])


def selectFromDB(db,table,cols = ['*'], cond = None):
    """ takes a database, table and columns list
        return iter object of choosen columns """
    with sq.connect(db) as con:
        cur = con.cursor()
        colStr = ','.join(cols)
        if cond != None:
            cond = 'WHERE '+ cond
        else:
            cond = ''
        sql = "SELECT {cl} FROM {tn} {cond};".format(cl=colStr,
                                                    tn=table,
                                                    cond=cond)
        cur.execute(sql)
        resList = list()
        for result in cur:
            dicc = dict(zip(cols,result))
            resList.append(dicc)
        return resList

def insertToDB(db,table,cols,vals):
    """ takes a database, table, columns list and values list
        insert these values into choosen database.table.columns """
    with sq.connect(db) as con:
        cur = con.cursor()
        colStr = ','.join(cols)
        valStr = ','.join(vals)
        sql = "INSERT INTO {tn} ({col}) values ({val});".format(tn=table,
                                                               col=colStr,
                                                               val=valStr)
        cur.execute(sql)
        return 1


def getCategories(catInit):
    if catInit == None:
        catInit = []
    cats = selectFromDB('units.db3','units',['unit_category'])
    for item in cats:
        print(item.values())
    pass


def createDBUsers():
    with sq.connect(DBUSERS) as con:
        cur = con.cursor()
        cur.execute("""DROP TABLE IF EXISTS users;""")
        cur.execute("""CREATE TABLE IF NOT EXISTS users (
            my_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            user_name TEXT NOT NULL,
            user_login TEXT NOT NULL,
            user_pwhash TEXT NOT NULL,
            user_privelege TEXT NULL DEFAULT NULL
            );""")


if __name__ == "__main__":
    createDBUnits()
    createDBCats()
    pass

