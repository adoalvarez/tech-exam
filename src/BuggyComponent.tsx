import { useState } from "react";

export default function BuggyComponent() {
    // State to manage error
    const [hasError, setHasError] = useState<boolean>(false)

    // onClick handler to set error
    const handleClick = () => {
        setHasError(true);
    }

    // Error thrower if hasError == true
    if (hasError) {
        throw new Error('An error has occurred');
    }

    // Button for buggy button
    return (
        <button style={{cursor: 'pointer'}} onClick={handleClick}>
            Buggy Button
        </button>
    )
}