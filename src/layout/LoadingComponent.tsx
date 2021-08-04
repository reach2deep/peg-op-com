import React from "react";


interface Props {
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...!' }: Props) {

    return (
        <>
            <h1>Loading...</h1>
        </>
    )
}