import { useState } from "react";
import { Button } from "./ui/button";
import { Course } from "../../types";
import CourseModal from "./modals/CourseModal";

interface CourseProps {
    name?: string;
    credits?: string;
    grade?: string;
}

const CourseComponent = ({name, credits, grade}:CourseProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleClick = () => {
        setSelectedCourse({
            courseName: name || "",
            credits: credits as "1" | "3" | "4",
            grade: grade as "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "E"
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    }

    const handleSave = () => {
        handleModalClose();
    }

    return (
        <div>
            <div className="flex flex-row items-center">
                <div className="w-1/2">
                    <p><strong>Nom du cours:</strong> {name}</p>
                    <p><strong>Crédits:</strong> {credits}</p>
                    <p><strong>Note:</strong> {grade}</p>
                </div>
                <div className="flex mt-2 w-1/2 justify-end">
                    <Button onClick={handleClick}>Editer</Button>
                </div>
                {selectedCourse && (
                    <CourseModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveCourse}
                        initialData={selectedCourse || { courseName: '', credits: undefined, grade: undefined }}
                    />
                )}
            </div>
        </div>
     );
}

export default CourseComponent;
