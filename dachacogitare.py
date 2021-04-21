''' abitare cogitare '''
import dachadb, dachaunits



if __name__ == "__main__":

    print('dacha cognito module')
    cols = ['unit_name','unit_category','unit_desc']
    units = dachadb.selectFromDB('units.db3','units', cols)
    print(units)
    catSet = set()
    res = {'a': 'b'}
    for item in units:
        if item.get('unit_category') in res.keys():
            catSet.add(item.get('unit_category'))
    print(catSet)
    for item in units:
        n = res[item['unit_category']].append(item['unit_name'])
        
    