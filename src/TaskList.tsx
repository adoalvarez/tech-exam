import { useEffect, useState } from 'react';

interface TasksProps {
  id: number,
  text: string,
  done: boolean,
}

interface TaskComponentProps {
  task: TasksProps,
  onChange: (task: TasksProps) => void,
  onDelete: (id: number) => void,
}

interface TaskListProps {
  tasks: TasksProps[],
  onChangeTask: (task: TasksProps) => void,
  onDeleteTask: (id: number) => void,
}

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
} : TaskListProps) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}


function Task({ task, onChange, onDelete } : TaskComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
