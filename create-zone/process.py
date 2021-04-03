import os
import sys

textfile = open("input.txt")
lines = textfile.readlines()

sortie = open("output.txt", "w")
sortie.write("[")

for l in lines:
    latitude = ""
    longitude = ""
    i = 0
    while(l[i] != ","):
        latitude+=l[i]
        i+=1
    i+=1 #On saute l'espace
    while(i!= len(l)-1):
        longitude+=l[i]
        i+=1
    sortie.write('{latitude:'+latitude+", longitude:"+longitude+"},")
sortie.write("]")
