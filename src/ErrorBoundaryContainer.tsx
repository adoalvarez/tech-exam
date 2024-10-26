import { ReactNode } from "react";
// react-error-boundary package
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

// fallback component when an error occured
function ErrorFallBack(props: FallbackProps) {
    const { error } = props;
    // display error thrown
    return (
        <div role="alert">
            <p style={{color: 'black'}}>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}


export default function ErrorBoundaryContainer({children} : {children: ReactNode}) {
    // Usage of ErrorBoundary
    return (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
            {children}
        </ErrorBoundary>
    )
}
