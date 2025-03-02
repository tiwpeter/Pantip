from flask import Blueprint, request, jsonify
import json
import os
from flask_cors import CORS

room_api = Blueprint('room_api', __name__)
CORS(room_api)  # Enable CORS for this Blueprint

# Load data from JSON file
data_path = os.path.join(os.path.dirname(__file__), 'room3.json')  # Update path to JSON file
try:
    with open(data_path, 'r', encoding='utf-8') as file:
        room_data = json.load(file)
except FileNotFoundError:
    raise FileNotFoundError(f"{data_path} file not found.")
except json.JSONDecodeError:
    raise json.JSONDecodeError("Error decoding JSON from room3.json.")
except Exception as e:
    raise Exception(f"An unexpected error occurred: {e}")

@room_api.route('', methods=['GET'])
def get_room3_data():
    try:
        return jsonify(room_data)
    except Exception as e:
        return jsonify({"error": "Error reading JSON file"}), 500

@room_api.route('/roomtag', methods=['GET'])
def get_roomtag_data():
    tag = request.args.get('tag')  # Get tag from query parameter
    filtered_data = [room for room in room_data if tag in room.get('h2_text', '')]
    return jsonify(filtered_data)
