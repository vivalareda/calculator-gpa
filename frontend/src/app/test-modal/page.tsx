import CreateFlashCardModal from "../../components/modals/CreateFlashCard";

const TestModal = () => {
  return (
    <>
      <CreateFlashCardModal
        isOpen={true}
        onClose={() => console.log("test")}
        onSave={() => console.log("save")}
      />
    </>
  );
};

export default TestModal;
