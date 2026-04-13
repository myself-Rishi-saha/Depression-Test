from .database import get_connection

def save_prediction(name, date_time, prediction, confidence):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO predictions (name, date_time, prediction, confidence)
    VALUES (?, ?, ?, ?)
    """, (name, date_time, prediction, confidence))

    conn.commit()
    conn.close()