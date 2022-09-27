##!/usr/bin/python
# -*- coding: utf-8 -*-


import RPi.GPIO as GPIO
import time
from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import sh1106, ssd1306
from PIL import ImageFont, ImageDraw, Image
import os
import sys
import random
import socket
from subprocess import call
import pyttsx3

serial = i2c(port=1, address=0x3C)
device = sh1106(serial)
font = ImageFont.load_default()

# wichtige Einstellungen
guthaben = 0
sprache = True
display = True
listlang = 1 #für mehr zufalls Sätze muss hier der Wert angepasst werden
timer = 0
aktuell = True

# die Textlisten mit blöden Sprüchen
# onecentListe = ["Fünf ein Cent Stücke sind Fünf Cent."]
# twocentListe = ["Fünf zwei Cent Stücke sind zehn Cent."]
# fivecentListe = ["Zwei fünf Cent Stücke sind zehn Cent"]
# tencentListe = ["Zwei Zehn Cent Stücke sind zwanzig Cent"]
# twentycentListe = ["Fünf zwanzig Cent Stücke sind ein Euro."]
# fiftycentListe = ["zwei fünfzig Cent Stücke sind ein Euro"]
# oneeuroListe = ["Fünf ein Euro Stücke sind ein Fünf Euro Schein."]
# twoeuroListe = ["Fünf zwei Euro Stücke sind ein zehn Euro Schein."]
# warteListe = [" "]

# die Textlisten mit blöden Sprüchen
# onecentListe = ["Nur ein Cent", "Hast Du nicht mehr als einen Cent?", "Naja, Kleinvieh macht auch Mist"]
# twocentListe = ["Zwei Cent sind kaum der Mühe wert", "Bei 2 Cent musst Du noch laaaaaaange zahlen",
#                 "Mit 2 Cent fährt Dein Auto 100 Meter weit"]
# fivecentListe = ["5 Cent, ich bekomme eine Kupfervergiftung", "Für 5 Cent gibt es noch nicht mal ein Kaugummi",
#                  "5 Cent, ich sag da jetzt mal nichts"]
# tencentListe = ["Hast Du nicht mehr als 10 Cent", "10 Cent, noch kein Taschengeld von mama bekommen?",
#                 "für 10 Cent tu ich fas alles nicht!"]
# twentycentListe = ["Für 20 Cent gibt es ein halbes Brötchen",
#                    "Wenn Du weiterhin nur 20 Cent einwirfst, brauchst Du noch 1000 Jahre bis zur Million",
#                    "20 Cent sind fast nichst"]
# fiftycentListe = ["Juchhuhh, ein halber Euro!", "50 Cent, jetzt kann ich mich zur Ruhe setzen",
#                   "Wau, 50 Cent machen mich richtig glücklich!"]
# oneeuroListe = ["Ein ganzer Euro, ich bin reich!", "Hast Du den Euro im Lotto gewonnen?",
#                 "Hoffentlich ist dieser Euro auch versteuert!"]
# twoeuroListe = ["2 Euro, das höchste der Gefühle", "Für zwei Euro muss meine Oma lange stricken",
#                 "Mit 2 Euro kann ich endlich mein Feuerzeug auftanken"]
# warteListe = ["Willst Du nicht endlich wieder etwas eibzahlen?", "Ich will Geld, richtig viel Geld!",
#               "Was ist los? Keine Kohle mehr?"]


onecentListe = ["ein Cent."]
twocentListe = ["Zwei Cent."]
fivecentListe = ["fünf Cent"]
tencentListe = ["zehn Cent"]
twentycentListe = ["zwanzig Cent"]
fiftycentListe = ["fünfzig Cent"]
oneeuroListe = ["ein Euro"]
twoeuroListe = ["zwei Euro"]
warteListe = [" "]




# Funktionsdefinitionen
def Euro(cent):
    euro = 0
    euro = int(cent / 100)
    return str(euro)


def euroCent(cent):
    rest = cent - (int(Euro(cent)) * 100)
    return str(rest)


def dateiAktualisieren(num):
    fobj_in = open("public/money.txt")
    for line in fobj_in:
        money = int((line.rstrip()))
    money = money + num
    newmoney = str(money)
    fobj_in.close()
    fobj_out = open("public/money.txt", "w")
    fobj_out.write(newmoney)
    fobj_out.close()
    Text = "'Du hast " + Euro(money) + " Euro " + euroCent(money) + " cent'"
    if aktuell:
        sprechen(Text)
    Text = "Guthaben: " + Euro(money) + "," + euroCent(money)
    if len(euroCent(money)) < 1:
        Text = Text + "0"
        Text = Text + " Euro"
    Oledprint(Text,30)


def sprechen(text):
        engine = pyttsx3.init()
        engine.setProperty("rate", 130)
        engine.setProperty('voice', "german")
        engine.say(text)
        engine.runAndWait()


# def Oledclear():
#    with canvas(device) as draw:
#      draw.rectangle((1,1,127,63), outline=255, fill=0)

def Oledprint (text, zeile):
    if(display):
        with canvas(device) as draw:
            draw.text((2, zeile), text, font=font, fill=255)

def zufall():
    random.seed()
    return random.randrange(0, 9, 1)


GPIO.setmode(GPIO.BOARD)

GPIO.setup(15, GPIO.IN)
GPIO.setup(13, GPIO.IN)
GPIO.setup(21, GPIO.IN)
GPIO.setup(26, GPIO.IN)
GPIO.setup(23, GPIO.IN)
GPIO.setup(11, GPIO.IN)
GPIO.setup(18, GPIO.IN)
GPIO.setup(16, GPIO.IN)
GPIO.setup(19, GPIO.IN)
onecent = 0
twocent = 0
fivecent = 0
tencent = 0
twentycent = 0
fiftycent = 0
hundredcent = 0
twohundredcent = 0
waittime = 0.5
Oledprint("Hallo hier ist deine \nsprechende Spardose", 2)
# ip=([(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1])
# Oledprint("IP: " + str(ip), 20)
sprechen("'Hallo hier ist deine Spardose'")
dateiAktualisieren(0)

while True:

    if (GPIO.input(15) > 0):
        onecent = onecent + 1
        Oledprint("1 CENT ",20)
        Text = "'" + onecentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(1)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(13) > 0):
        twocent = twocent + 1
        Oledprint( "Einwurf 2 CENT",20)
        Text = "'" + twocentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(2)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(21) > 0):
        fivecent = fivecent + 1
        Oledprint( "Einwurf 5 CENT",20)
        Text = "'" + fivecentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(5)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(26) > 0):
        tencent = tencent + 1
        Oledprint( "Einwurf 10 CENT",20)
        Text = "'" + tencentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(10)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(23) > 0):
        twentycent = twentycent + 1
        Oledprint( "Einwurf 20 CENT",20)
        Text = "'" + twentycentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(20)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(11) > 0):
        fiftycent = fiftycent + 1
        Oledprint( "Einwurf 50 CENT",20)
        Text = "'" + fiftycentListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(50)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(18) > 0):
        hundredcent = hundredcent + 1
        Oledprint( "Einwurf 1 Euro",20)
        Text = "'" + oneeuroListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(100)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(16) > 0):
        twohundredcent = twohundredcent + 1
        Oledprint( "Einwurf 2 Euro",20)
        Text = "'" + twoeuroListe[random.randrange(0, listlang, 1)] + "'"
        sprechen(Text)
        dateiAktualisieren(200)
        time.sleep(waittime)
        timer = 0

    if (GPIO.input(19) > 0):
        os.system("echo 0 > /home/pi/money.txt")
        dateiAktualisieren(0)
        sprechen("'Jetzt bin ich wieder Pleite'")
        time.sleep(waittime)
        timer = 0

    timer = timer + 1
    #        print timer

    if timer > random.randrange(10000000, 100000000, 1):
        Text = "'" + warteListe[random.randrange(0, listlang, 1)] + "'"
        Text = "'Willst Du nicht langsam mal wieder etwas einwerfen?'"
        #sprechen(Text)
        timer = 0
