from flask import Flask, request, jsonify
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
        'A': 4,
        'B': 3,
        'C': 2,
        'D': 1,
        'E': 0
    }

    for course in new_courses:
        grade = course['grade']
        credits = int(course['credits'])
        total_quality_points += grade_points[grade] * credits
        total_credits += credits

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

if __name__ == '__main__':
    app.run(debug=True)
