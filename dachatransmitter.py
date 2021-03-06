import socket
import sys
import time
import random
import dachadb
import threading

if __name__ == "__main__":
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    server_address = '0.0.0.0'
    server_port = 3333
    server = (server_address, server_port)

    sock.settimeout(0.5)
    sock.bind(server)

    print("Listening on " + server_address + ":" + str(server_port))

    got_data = False
    command = 1
    unitsList = dachadb.getUnitsList();
    print(unitsList)
    while(True):
        
        try:
            message, client_address = sock.recvfrom(1024)
            got_data = True
        except socket.timeout:
            print('?', sep='',end='')
#             sys.stdout.flush()
#             got_data = False
        
        if got_data:
            got_data = False
            message = str(message)
            print('Got message from address {}: {}'.format(str(client_address), message))
#             sock.sendto(b'unit001.1.1',client_address)
#             time.sleep(3)
#             sock.sendto(b'unit001.1.0',client_address)
#             time.sleep(3)
