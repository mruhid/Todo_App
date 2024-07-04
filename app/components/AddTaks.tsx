"use client";
import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, use, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

const AddTaks = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");

  const handleTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: nanoid(),
      text: modalText,
    });
    console.log(modalText);
    setModalText("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Taks
        <FaPlus size={18} className="ml-3" />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
            <button
              disabled={!modalText.length}
              type="submit"
              className="btn border-black"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTaks;
