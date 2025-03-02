from flask import Blueprint, jsonify
import json
import os

# Create Blueprint
tagId_api = Blueprint('tagId_api', __name__)

# Paths to JSON files
consolidated_data_path = os.path.join(os.path.dirname(__file__), 'consolidated_data.json')
room_page_data_path = os.path.join(os.path.dirname(__file__), 'RoomDetailSile.json')

def load_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at path {file_path}")
        return {}
    except json.JSONDecodeError:
        print(f"Error: JSON decode error for file {file_path}")
        return {}
    except Exception as e:
        print(f"An unexpected error occurred while loading {file_path}: {e}")
        return {}

# Load data from JSON files
consolidated_data = load_json_file(consolidated_data_path)
room_page_data = load_json_file(room_page_data_path)

def get_section_data(category, header, data_source):
    category_data = data_source.get(category, {})
    if not category_data:
        return None

    section_data = category_data.get("sections", [])
    for sec in section_data:
        if sec["header"] == header:
            return sec
    return None

@tagId_api.route('/<string:category>/Announce', methods=['GET'])
def get_announce(category):
    # Attempt to get section from both data sources
    section = get_section_data(category, "Announce", consolidated_data)
    if not section:
        section = get_section_data(category, "Announce", room_page_data)
    
    if section:
        return jsonify(section)
    else:
        return jsonify({"error": "Section not found"}), 404

@tagId_api.route('/<string:category>/กระทู้แนะนำโดยสมาชิก', methods=['GET'])
def get_recommendations(category):
    section = get_section_data(category, "กระทู้แนะนำโดยสมาชิก", consolidated_data)
    if not section:
        section = get_section_data(category, "กระทู้แนะนำโดยสมาชิก", room_page_data)
    
    if section:
        return jsonify(section)
    else:
        return jsonify({"error": "Section not found"}), 404

@tagId_api.route('/<string:category>/Pantip Trend', methods=['GET'])
def get_pantip_trend(category):
    section = get_section_data(category, "Pantip Trend", consolidated_data)
    if not section:
        section = get_section_data(category, "Pantip Trend", room_page_data)
    
    if section:
        return jsonify(section)
    else:
        return jsonify({"error": "Section not found"}), 404

@tagId_api.route('/<string:category>/กระทู้ล่าสุด', methods=['GET'])
def get_latest_posts(category):
    section = get_section_data(category, "กระทู้ล่าสุด", consolidated_data)
    if not section:
        section = get_section_data(category, "กระทู้ล่าสุด", room_page_data)
    
    if section:
        return jsonify(section)
    else:
        return jsonify({"error": "Section not found"}), 404

@tagId_api.route('/<string:category>/Pantip Pick', methods=['GET'])
def get_pantip_pick(category):
    section = get_section_data(category, "Pantip Pick", consolidated_data)
    if not section:
        section = get_section_data(category, "Pantip Pick", room_page_data)
    
    if section:
        return jsonify(section)
    else:
        return jsonify({"error": "Section not found"}), 404
