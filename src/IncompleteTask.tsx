import { useEffect, useState } from "react";

interface TasksProps {
    id: number,
    text: string,
    done: boolean,
}

interface IncompleteTaskProps {
    tasks: TasksProps[]
}

export default function IncompleteTask( props : IncompleteTaskProps ) {
    // task that is passed as a props parent component where useReducer is used
    const { tasks } = props; 
    // useState used to store data for count of incomplete task
    const [incompleteCount, setIncompleteCount] = useState<number>(); 

    // Function that we will use inside useEffect
    const checkCount = (tasks: TasksProps[]) => {
        // use built-in filter function to filter all incomplete task.
        const incomplete = tasks.filter( t => t.done === false);  
        // set the number of complete task using built-in Array.length.
        setIncompleteCount(incomplete.length);
    }

    useEffect( () => {
        checkCount(tasks) // call function checkCount() and enter task from props to filter.
    }, [tasks]) // used task from passed props as dependencies for useEffect.

    return (
        <div>
            {/** Display incompleteCount */}
            <span>Number of incomplete tasks : </span><span>{incompleteCount}</span>
        </div>
    )
}
