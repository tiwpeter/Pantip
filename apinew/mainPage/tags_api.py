from flask import Blueprint, request, jsonify
import json
import logging
import os
from flask_cors import CORS

# Create Blueprint
tags_api = Blueprint('tags_api', __name__)
CORS(tags_api)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load data from JSON file
data_path = os.path.join(os.path.dirname(__file__), 'spitScoll.json')
data = []
try:
    with open(data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    logging.error(f"{data_path} file not found.")
except json.JSONDecodeError:
    logging.error("Error decoding JSON from spitScoll.json.")
except Exception as e:
    logging.error(f"An unexpected error occurred: {e}")

@tags_api.route('/search', methods=['GET'])
def tag_search():
    tag = request.args.get('tag')
    start = int(request.args.get('start', 0))
    limit = int(request.args.get('limit', 10))

    if not tag:
        return jsonify({"error": "Tag parameter is required"}), 400

    logging.debug(f"Received tag: {tag}")

    result = {"headers": {}, "titles": [], "total_items": 0, "has_more": False}

    for entry in data:
        if 'headers' in entry and tag in entry['headers']:
            header_data = entry["headers"][tag]
            result["headers"] = {
                "title": header_data.get("title"),
                "second_title": header_data.get("second_title"),
                "t3": header_data.get("t3"),
                "t4": header_data.get("t4")
            }
            
            titles = entry.get("titles", [])
            result["total_items"] = len(titles)

            # Apply pagination
            paged_titles = titles[start:start + limit]
            result["titles"] = paged_titles

            # Check if there are more items available
            result["has_more"] = (start + limit) < len(titles)
            break
    else:
        result["error"] = "Tag not found"

    return jsonify(result)

@tags_api.route('/main-search', methods=['GET'])
def main_search():
    tag = request.args.get('tag')
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    if page < 1:
        return jsonify({"error": "Page number must be greater than 0"}), 400
    if per_page < 1:
        return jsonify({"error": "Items per page must be greater than 0"}), 400

    logging.debug(f"Received tag: {tag}")
    logging.debug(f"Page: {page}, Per page: {per_page}")

    if not tag:
        return jsonify({"error": "Tag parameter is required"}), 400

    result = {"headers": {}, "titles": []}

    for entry in data:
        if 'headers' in entry and tag in entry['headers']:
            header_data = entry["headers"][tag]
            result["headers"] = {
                "title": header_data.get("title"),
                "second_title": header_data.get("second_title"),
                "t3": header_data.get("t3"),
                "t4": header_data.get("t4")
            }
            
            titles = entry.get("titles", [])
            start = (page - 1) * per_page
            end = start + per_page
            paginated_titles = titles[start:end]

            result.update({
                "page": page,
                "per_page": per_page,
                "total_items": len(titles),
                "total_pages": (len(titles) + per_page - 1) // per_page,
                "titles": paginated_titles
            })
            break
    else:
        result["error"] = "Tag not found"

    return jsonify(result)
