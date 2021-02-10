''' Rountines kit for create/read/modify data bases and tebles

Since we use sqlite3 so let's make all tables in separate file
to allow one time access to each table
'''

import sqlite3 as sq

def createDBUnits():
    with sq.connect('units.db3') as con:
        cur = con.cursor()
        cur.execute("""DROP TABLE IF EXISTS units""")
        cur.execute("""CREATE TABLE IF NOT EXISTS units (
            my_id INTEGER PRIMARY KEY AUTOINCREMENT,
            unit_id INTEGER NOT NULL,
            unit_name TEXT NOT NULL,
            unit_category TEXT NULL DEFAULT NULL,
            unit_desc TEXT(65535) NULL DEFAULT NULL
            );""")

def createDBUsers():
    with sq.connect('users.db3') as con:
        cur = con.cursor()
        cur.execute("""DROP TABLE IF EXISTS users""")
        cur.execute("""CREATE TABLE IF NOT EXISTS users (
            my_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            user_name TEXT NOT NULL,
            user_login TEXT NOT NULL,
            user_pwhash TEXT NOT NULL,
            user_privelege TEXT NULL DEFAULT NULL
            );""")


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
        sql = "SELECT {cl} FROM {tn} {cond}".format(cl=colStr,
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
        sql = "INSERT INTO {tn} ({col}) values ({val})".format(tn=table,
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
        
    

if __name__ == "__main__":
#   createDBUnits()
#   createDBUsers()
    pass

