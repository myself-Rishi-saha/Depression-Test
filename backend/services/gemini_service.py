def generate_recommendation(prediction, confidence, user_data):
    """
    Future Gemini integration point.
    """

    # Temporary fallback logic
    if prediction == 1:
        return "You're showing signs of stress. Try a 10-minute walk or breathing exercise."
    else:
        return "You're doing well. Maintain your routine and stay consistent."