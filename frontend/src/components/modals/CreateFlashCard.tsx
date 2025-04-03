import { Flashcard } from "../../../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";

interface CreateFlashCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Flashcard) => void;
}

const CreateFlashCardModal: React.FC<CreateFlashCardModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Flashcard>({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`bg-white text-black p-0 overflow-hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Créer une flashcard
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Détails du cours
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlashCardModal;
