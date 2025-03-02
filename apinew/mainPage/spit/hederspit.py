import json

# อ่านข้อมูลจากไฟล์ JSON เก่า
input_file = 'C:/Users/WIN10/Desktop/foderbackend/main/complieMoreTag2/apicom/spit3.json'
output_file = 'C:/Users/WIN10/Desktop/foderbackend/main/complieMoreTag2/apicom/headers_only.json'

# โหลดข้อมูลจากไฟล์ JSON
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# สร้าง dictionary ใหม่ที่เก็บข้อมูลส่วนหัว
headers_data = {}

# แยกข้อมูลส่วนหัว
for entry in data:
    if 'headers' in entry:
        headers_data.update(entry['headers'])

# บันทึกข้อมูลส่วนหัวลงในไฟล์ JSON ใหม่
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(headers_data, f, ensure_ascii=False, indent=4)

print(f"Headers have been extracted and saved to {output_file}.")
