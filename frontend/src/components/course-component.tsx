import useModalStore from "../../hooks/useModalStore";
import { useCourseToModify } from "../../hooks/courseToModify";
import useCourseStore from "../../hooks/useCourseStore";
import { Button } from "./ui/button";

interface CourseProps {
  name?: string;
  credits?: string;
  grade?: string;
}

const CourseComponent = ({ name, credits, grade }: CourseProps) => {
  const { openModal } = useModalStore();
  const { setCourseToModify } = useCourseToModify();
  const { courses, deleteCourse } = useCourseStore();

  const handleCourseEditClick = (name?: string) => {
    courses.forEach((course) => {
      if (course.courseName === name) {
        setCourseToModify(course);
        openModal("editCourse", name);
      }
    });
  };

  const handleDeleteCourse = (name?: string) => {
    courses.forEach((course) => {
      if (course.courseName === name) {
        deleteCourse(course);
      }
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <p>
          <strong>Nom du cours:</strong> {name}
        </p>
        <p>
          <strong>Crédits:</strong> {credits}
        </p>
        <p>
          <strong>Note:</strong> {grade}
        </p>
      </div>
      <div>
        <div>
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleCourseEditClick(name)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Editer
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleDeleteCourse(name)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
