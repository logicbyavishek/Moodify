import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");
    const [ isReady, setIsReady ] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const setup = async () => {
            try {
                await init({ landmarkerRef, videoRef, streamRef });

                if (isMounted) {
                    setExpression("Ready to detect");
                    setIsReady(true);
                }
            } catch (error) {
                console.error("Failed to initialize face detection", error);

                if (isMounted) {
                    setExpression("Camera/model access failed");
                }
            }
        };

        setup();

        return () => {
            isMounted = false;

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const detectedExpression = detect({ landmarkerRef, videoRef, setExpression });
        onClick(detectedExpression);
    }


    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
                muted
                autoPlay
            />
            <h2>{expression}</h2>
            <button onClick={handleClick} disabled={!isReady}>
                Detect expression
            </button>
        </div>
    );
}
