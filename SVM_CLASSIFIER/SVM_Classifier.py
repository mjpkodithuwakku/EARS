# -*- coding: utf-8 -*-
"""
Created on Thu Dec 30 14:18:58 2021

@author: mjpko
"""

# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
import json
import numpy as np
import os
import pickle
import pandas as pd
import matplotlib.pyplot as plt

hostName = "0.0.0.0"
serverPort = 8080


width = 300
height = 400


data_set = {
    "json_data":"{\"0\":[0,1],\"1\":[0,2]}"   
}



class MyServer(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        self._set_response()
        self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        post_obj = json.loads(post_data)
        print(post_obj.keys())
        data_set["json_data"] = Classifier(post_obj)
        json_dump = json.dumps(data_set)
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))

        self._set_response()
        self.wfile.write("{}".format(json_dump).encode('utf-8'))
  
def EuclideanDistance(x1,x2,y1,y2):
    return pow(pow(x1-x2,2) + pow(y1-y2,2),0.5)

def Classifier(landmarks_obj):
    X_new = []
    X_dict = {}
    for key in landmarks_obj.keys():
        row = landmarks_obj[key]
        xlist = []
        ylist = []
        for i in range(0,68): #Store X and Y coordinates in two lists     
            xlist.append(row[i*2]);
            ylist.append(row[i*2 + 1]);
        #print(row)
        #print(index)
        
        X_temp = []   
        
        #plt.scatter(xlist, ylist, s=0.2, c="blue", alpha=0.9)
        #plt.gca().invert_yaxis()
        #plt.show()
        
            
        x_min = np.min(xlist)
        x_max = np.max(xlist)
        y_min = np.min(ylist)
        y_max = np.max(ylist)
        
        for i in range(0,68): #Store X and Y coordinates in two lists     
            row[i] = (xlist[i]- x_min)*width/(x_max-x_min)
            row[i + 68] = (ylist[i]- y_min)*height/(y_max-y_min)
        
        #print(row)
        
        X_temp.append(EuclideanDistance(row[62],row[66],row[130],row[134]))
        
        #lefteye
        X_temp.append(EuclideanDistance((row[37]+row[38])/2,(row[40]+row[41])/2,(row[105]+row[106])/2,(row[108]+row[109])/2))
        
        #righteye
        X_temp.append(EuclideanDistance((row[43]+row[44])/2,(row[46]+row[47])/2,(row[111]+row[112])/2,(row[114]+row[115])/2))
        
        #left eyebrow
        X_temp.append(EuclideanDistance((row[37]+row[38])/2,(row[19]),(row[105]+row[106])/2,(row[87])))
        
        #right eyebrow
        X_temp.append(EuclideanDistance((row[43]+row[44])/2,(row[24]),(row[111]+row[112])/2,(row[92])))
        
        
        #mouth point cal 
        x1 = row[62]
        y1 = row[130]
        
        x2 = row[66]
        y2 = row[134]
        
        x3 = row[60]
        y3 = row[128]
        
        x4 = row[64]
        y4 = row[132]
        
        if(x2 != x1):
            
            m1 = (y2-y1)/(x2-x1)
            print(m1)
            _x3 = ((m1**2) * x2 - m1*y2 + m1*y3 + x3)/((m1**2) + 1)
            
            _y3 = ((m1**2) * y3 + m1*x3 - m1*x2 + y2)/((m1**2) + 1)
     
            
            _x4 = ((m1**2) * x2 - m1*y2 + m1*y4 + x4)/(m1**2 + 1)
            
            _y4 = ((m1**2) * y4 + m1*x4 - m1*x2 + y2)/((m1**2) + 1)
        else:
            _x3 = x1
            _y3 = y3
            
            _x4 = x1
            _y4 = y4
            
    
        X_temp.append(row[33])      #nose x
        X_temp.append(row[101])      #nose y
        
        X_temp.append(np.mean(row[:68]))      # x mean
        X_temp.append(np.mean(row[-68:136]))      # y mean
        
        if((y1+y2)/2 < (_y3)):
            X_temp.append(EuclideanDistance((x1+x2)/2,(_x3),(y1+y2)/2,(_y3))) #LeftMouthH
        else:
            X_temp.append(-1* EuclideanDistance((x1+x2)/2,(_x3),(y1+y2)/2,(_y3))) #LeftMouthH
        if((y1+y2)/2 < (_y4)):
            X_temp.append(EuclideanDistance((x1+x2)/2,(_x4),(y1+y2)/2,(_y4))) #RightMouthH
        else:
            X_temp.append(-1* EuclideanDistance((x1+x2)/2,(_x4),(y1+y2)/2,(_y4))) #LeftMouthH
        X_new.append(X_temp)
        guess1=emotion_model.predict(pd.DataFrame(pd.Series((X_temp[:-6] + X_temp[-2:])).values.reshape(1, -1)))
        print(guess1);
        guess2=attention_model.predict(pd.DataFrame(pd.Series(X_temp[:-2]).values.reshape(1, -1)))
        print(guess2);
        
        X_dict[key] = [int(guess1), int(guess2), int(x_min),int(x_max),int(y_min),int(y_max)]
        
        #plt.scatter(row[:68], row[-68:136], s=0.2, c="red", alpha=0.9)
        #plt.gca().invert_yaxis()
        #plt.show()
    #df = pd.DataFrame(X_new, columns=['Mouth', 'LeftEye', 'RightEye', 'LeftEyeBrow','RightEyeBrow','NoseX','NoseY','MeanX','MeanY','LeftMouthH','RightMouthH'])
    print(X_dict)
    return json.dumps(X_dict)
    
def LoadEmotionModel():
    
    with open('./model/emotion_model.pkl', 'rb') as handle:
        model = pickle.load(handle)
        return model;
    
def LoadAttentionModel():
    
    with open('./model/attention_model.pkl', 'rb') as handle:
        model = pickle.load(handle)
        return model;
    
if __name__ == "__main__":
    emotion_model = LoadEmotionModel()
    attention_model = LoadAttentionModel()
            
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
