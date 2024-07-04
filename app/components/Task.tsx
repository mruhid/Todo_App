"use client";
import { iTask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt as Trash } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface taskProps {
  task: iTask;
}
const Task: React.FC<taskProps> = ({ task }) => {
  const router = useRouter();

  const [editModal, setEditModal] = useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<boolean>(false);

  const [deleteModal, setDeleteMoal] = useState<boolean>(false);
  const [editToTask, setEditToTask] = useState<string>(task.text);

  const deleteTaskElement = async (id: string) => {
    await deleteTodo(id);
    setRemoveModal(false);
    router.refresh();
  };
  const changeTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: editToTask,
    });
    setEditToTask(task.text);
    setEditModal(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="bg-base-200 border-current	">
      <td className="w-full">{task.text}</td>
      <td className="flex gap-3">
        <FaEdit
          cursor="pointer"
          title="Click for edit Task"
          onClick={() => setEditModal(true)}
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={editModal} setModalOpen={setEditModal}>
          <form onSubmit={changeTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={editToTask}
                onChange={(e) => setEditToTask(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
              <button
                disabled={!editToTask.length}
                type="submit"
                className="btn border-black"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <Trash
          cursor="pointer"
          className="text-red-500"
          size={23}
          title="click for Delete Task"
          onClick={() => setRemoveModal(true)}
        />
        <Modal modalOpen={removeModal} setModalOpen={setRemoveModal}>
          <h1 className="text-lg">Do you want to remove this task?</h1>
          <div className="modal-action">
            <button
              className="btn w-full bg-blue-500 text-lg"
              onClick={() => deleteTaskElement(task.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
