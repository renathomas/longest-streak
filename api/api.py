"""
Flask API to find the longest streak of consecutive characters based on their even or odd position
in the alphabet from a given input text.

Endpoints:
    /alph-a-row (POST): Analyzes the input text and returns the longest streak of consecutive 
                        characters based on their even or odd position in the alphabet.
"""
from flask import Flask, jsonify, request

app = Flask(__name__)


def is_even(char):
    """
    Determine if the character's position in the alphabet is even.

    Args:
        char (str): A single character.

    Returns:
        bool: True if the character's position in the alphabet is even, False otherwise.
    """
    return (ord(char.lower()) - ord('a')) % 2 == 0


@app.route('/alph-a-row', methods=['POST'])
def alph_a_row():
    """
    Handle POST requests to the /alph-a-row endpoint.
    Analyzes the input text to find the longest streak of consecutive
    characters based on their even or odd position in the alphabet.

    Request JSON Body:
        text (str): The input text to be analyzed.

    Returns:
        json: A JSON object containing the longest streak and its length.
            {
                'streak': <longest streak of characters>,
                'streak_length': <length of the longest streak>
            }
    """
    data = request.get_json()

    text = data.get('text', '')

    max_streak = ""
    current_streak = ""
    current_type = None

    for char in text:
        if char.isalpha():
            char_type = is_even(char)
            if current_type is None or char_type == current_type:
                current_streak += char
            else:
                current_streak = char

            current_type = char_type
        else:
            if char.isspace():
                current_streak += char
            else:
                current_streak = ""
                current_type = None

        if len(current_streak.replace(" ", "")) > len(max_streak.replace(" ", "")):
            max_streak = current_streak

    streak_length = len(max_streak.replace(" ", ""))

    return jsonify({
        'streak': max_streak,
        'streak_length': streak_length
    })


if __name__ == '__main__':
    app.run(debug=True)
