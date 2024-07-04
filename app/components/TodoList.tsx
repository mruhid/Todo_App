import { iTask } from "@/types/task";
import Task from "./Task";

interface TodoListProps {
  tasks: iTask[];
}
const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      {tasks.length ? (
        <table className="table bg-gray-100">
          {/* head */}
          <thead>
            <tr className="text-lg border-current	">
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((a) => (
              <Task key={a.id} task={a} />
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center">Empty Todo</h1>
      )}
    </div>
  );
};

export default TodoList;
