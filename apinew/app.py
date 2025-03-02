from flask import Flask
from flask_cors import CORS
from mainPage.tags_api import tags_api
from roomslie.room_api import room_api
from TagId.TagId import tagId_api
from nameHeader.nameHeader import nameHeader  # Use absolute import

app = Flask(__name__)

# Enable CORS
CORS(app)

# Register Blueprints with URL prefixes
app.register_blueprint(tags_api, url_prefix='/api/tags') # = tags/+nameapi
app.register_blueprint(room_api, url_prefix='/api/rooms3')  # Adjust the prefix if needed
app.register_blueprint(tagId_api, url_prefix='/api/tags-id')
app.register_blueprint(nameHeader, url_prefix='/api/name-header')

if __name__ == '__main__':
    app.run(debug=True)
