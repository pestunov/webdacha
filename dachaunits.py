from gpiozero import Button
import dachadb


INIT_CATECORIES = ['security', 'luminos', 'ferma', 'meteo']

class UnitBase():
    """ Base class for all units """
    def __init__(self, name, cat, idNum=0):
        self.name = name
        self.id = idNum
        if type(cat) is list:
            self.cat = cat
        elif type(cat) is str:
            self.cat = [cat]
        self.view = None


    def __del__(self):
        print('object \'{name}\' deleted. Test message'.format(name=self.name))

    def getState(self):
        pass
    
    def saveToDB(self):
        pass
    
    def readFromDB(self):
        pass
    
    def getName(self):
        return self.name

    def setName(self, _name):
        self.name = _name
    
    def addToCatList(self,_cat):
        if _cat not in self.cat:
            self.cat.append(_cat)
        
    def remFromCatList(self,_cat):
        self.cat = [_x for _x in self.cat if _x != _cat]
        
    def txDataToUnit(self, _data):
        pass
    
    def rxDataFromUnit(self, _data):
        pass
    
    
class UnitWiredPerimeter(UnitBase):
    """Class for security objects.
    Wired perimeter """
    def __init__(self, name, cat='security', pin = 0):
        super().__init__(name, cat)
        self.pin = pin
        if self.pin in list(range(28)):
            pass
        else:
            print("no such port. GPIO0 will be connected")
            self.pin = 0
        self.port = Button(self.pin)
        print(self.cat)
        
    def getState(self):
        return self.port.is_pressed
            
            
  
def tests():
    u1 = UnitWiredPerimeter(name='perimeter1', cat=['security', 'garden'], pin=18)
    unitsList = []
    unitsList.append(u1)
    for u in unitsList:
        print(u.getState())
        
    
            
if __name__ == "__main__":
    print("unit module running")
    tests()
    pass

        
