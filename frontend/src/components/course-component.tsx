import useModalStore from "../../hooks/useModalStore";
import { useCourseToModify } from "../../hooks/courseToModify";
import useCourseStore from "../../hooks/useCourseStore";

interface CourseProps {
  name?: string;
  credits?: string;
  grade?: string;
}

const CourseComponent = ({ name, credits, grade }: CourseProps) => {
  const { openModal } = useModalStore();
  const { setCourseToModify } = useCourseToModify();
  const { courses } = useCourseStore();

  const handleCourseEditClick = (name?: string) => {
    courses.forEach((course) => {
      if (course.courseName === name) {
        setCourseToModify(course);
        openModal("editCourse", name);
      }
    });
  }

  return (
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
      <button onClick={() => { handleCourseEditClick(name); }}>
        Editer
      </button>
    </div>
  );
};

export default CourseComponent;
