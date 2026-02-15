import { generate3DView } from "lib/ai.action";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const VisualizerId = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { initialImage, initialRender, name } = location.state || {};

  const hasInitialGenerated = useRef(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(
    initialRender || null,
  );

  const handleBack = () => navigate("/");

  const runGeneration = async () => {
    if (!initialImage) return;

    try {
      setIsProcessing(true);
      const result = await generate3DView({ sourceImage: initialImage });

      if (result.renderedImage) {
        setCurrentImage(result.renderedImage);

        // update the project with the rendered image
      }
    } catch (error) {
      console.error(`Failed to generate 3D view: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!initialImage || !hasInitialGenerated.current) return;

    if (initialRender) {
      setCurrentImage(initialRender);
      hasInitialGenerated.current = true;
      return;
    }

    hasInitialGenerated.current = true;
    runGeneration();
  }, [initialImage, initialRender]);

  return (
    <section>
      <div className="visualizer">
        {initialImage && (
          <div className="image-container">
            <h2>Source Image</h2>
            <img src={initialImage} alt="source" />
          </div>
        )}
      </div>
    </section>
  );
};

export default VisualizerId;
