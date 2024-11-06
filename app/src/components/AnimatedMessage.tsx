import React from "react";
import { Typewriter } from "react-simple-typewriter";

interface AnimatedMessageProps {
    message: string;
}

const AnimatedMessage: React.FC<AnimatedMessageProps> = ({ message }) => {
    return (
        <span>
             <Typewriter
                words={[message]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
             />
        </span>
    );
};
export default AnimatedMessage