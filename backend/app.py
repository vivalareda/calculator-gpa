import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_gpa(current_gpa, current_credits, new_courses):
    """
    Calculate the new GPA based on the current GPA, current credits, and new courses.

    Parameters:
    current_gpa (float): The current GPA of the student.
    current_credits (int): The total number of credits the student has completed so far.
    new_courses (list): A list of new courses where each course is a dictionary with 'grade' and 'credits'.

    Returns:
    float: The new GPA calculated.
    """
    total_quality_points = float(current_gpa) * int(current_credits)
    total_credits = int(current_credits)

    grade_points = {
        'A+': 4.3, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'E': 0.0
    }

    for course in new_courses:
        grade = course['grade']
        current_credits = int(course['credits'])
        total_quality_points += grade_points[grade] * current_credits
        total_credits += current_credits

    if total_credits == 0:
        return 0

    new_gpa = total_quality_points / total_credits
    return new_gpa

@app.route('/api/submit', methods=['POST'])
def submit():
    """
    Handle the submission of GPA and course data, calculate the new GPA, and return the result.

    Request JSON Parameters:
    - gpa (float): The current GPA of the student.
    - credits (int): The total number of credits the student has completed so far.
    - courses (list): A list of new courses where each course is a dictionary with 'grade' and 'credits'.

    Returns:
    JSON: A JSON response containing the new GPA and total credits.
    """
    data = request.json
    current_gpa = data.get('gpa')
    current_credits = data.get('credits')
    new_courses = data.get('courses', [])

    new_gpa = calculate_gpa(current_gpa, current_credits, new_courses)

    total_credits = int(current_credits) + sum(int(course['credits']) for course in new_courses)

    print(new_gpa)

    return jsonify({
        "message": "Data received",
        "new_gpa": new_gpa,
        "total_credits": total_credits
    })

@app.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint to ensure the service is running.

    Returns:
    JSON: A JSON response indicating the service status.
    """
    return jsonify({
        "status": "Healthy"
    })

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
