import { useCourseToModify } from "../../hooks/course-to-modify";
import useCourseStore from "../../hooks/use-course-store";
import useModalStore from "../../hooks/use-modal-store";
import { Button } from "./ui/button";

type CourseProps = {
  name?: string;
  credits?: string;
  grade?: string;
};

const CourseComponent = ({ name, credits, grade }: CourseProps) => {
  const { openModal } = useModalStore();
  const { setCourseToModify } = useCourseToModify();
  const { courses, deleteCourse } = useCourseStore();

  const handleCourseEditClick = (courseName?: string) => {
    for (const course of courses) {
      if (course.courseName === courseName) {
        setCourseToModify(course);
        openModal("editCourse", courseName);
        break;
      }
    }
  };

  const handleDeleteCourse = (courseName?: string) => {
    for (const course of courses) {
      if (course.courseName === courseName) {
        deleteCourse(course);
        break;
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
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
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            onClick={() => handleCourseEditClick(name)}
            type="button"
            variant="secondary"
          >
            Editer
          </Button>
        </div>
        <div>
          <Button
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
            onClick={() => handleDeleteCourse(name)}
            type="button"
            variant="secondary"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
