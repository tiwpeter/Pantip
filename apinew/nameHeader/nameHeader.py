from flask import Blueprint, jsonify, request
import json
import os

nameHeader = Blueprint('nameHeader', __name__)

# Function to load data from JSON file
def load_data():
    base_path = os.path.dirname(__file__)
    file_path = os.path.join(base_path, 'separated_names_links.json')
    print(f"Loading data from: {file_path}")  # For debugging
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        raise
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {file_path}")
        raise
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise

@nameHeader.route('', methods=['GET'])
def get_data():
    try:
        data = load_data()  # Load data from JSON file
        print(f"Data loaded: {data}")  # For debugging

        # Extract start and limit from query parameters
        start = int(request.args.get('start', 0))
        limit = int(request.args.get('limit', 10))

        # Validate 'start' and 'limit'
        if start < 0 or limit <= 0:
            return jsonify({'error': 'Invalid start or limit parameter'}), 400

        # Check if data contains 'names' key and is a list
        if not isinstance(data, dict) or 'names' not in data or not isinstance(data['names'], list):
            return jsonify({'error': 'Data is not in expected format'}), 500

        # Slice the data based on start and limit
        items = data['names'][start:start + limit]

        # Determine if there are more items to fetch
        has_more = (start + limit) < len(data['names'])

        # Return the paginated data
        return jsonify({
            'items': items,
            'hasMore': has_more
        })
    
    except Exception as e:
        print(f"Error in get_data: {e}")
        return jsonify({'error': 'An error occurred while processing the request'}), 500
