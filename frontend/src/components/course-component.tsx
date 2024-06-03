
interface CourseProps {
    id: number
    name?: string
    credits?: string
    grade?: string
}

const CourseComponent = ({name, credits, grade}:CourseProps) => {
    return (
        <div>
            <p><strong>Nom du cours:</strong> {name}</p>
            <p><strong>Crédits:</strong> {credits}</p>
            <p><strong>Note:</strong> {grade}</p>
        </div>
     );
}

export default CourseComponent;
