import sqlite3

DB_NAME = "predictions.db"

def get_connection():
    return sqlite3.connect(DB_NAME)