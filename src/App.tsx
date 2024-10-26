import { useReducer } from 'react';
import AddTask from './AddTask.tsx';
import TaskList from './TaskList.tsx';
import IncompleteTask from './IncompleteTask.tsx';
import ErrorBoundaryContainer from './ErrorBoundaryContainer.tsx';
import BuggyComponent from './BuggyComponent.tsx';

interface TasksProps {
  id: number,
  text: string,
  done: boolean,
}

function tasksReducer(tasks: TasksProps[], action: any) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map( t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: TasksProps) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <ErrorBoundaryContainer >
      <h1>Prague itinerary</h1>
      <IncompleteTask tasks={tasks} />
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
      <BuggyComponent />
    </ErrorBoundaryContainer>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
