import { UploadIcon } from "lucide-react";
import React from "react";
import { useOutletContext } from "react-router";
import type { AuthContext } from "types/auth-state";

const Upload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>();

  return (
    <div className="upload">
      {!file ? (
        <div className={`dropzone ${isDragging ? "is-dragging" : ""}`}>
          <input
            type="file"
            className="drop-input"
            accept=".jpg, .jpeg, .png"
            disabled={!isSignedIn}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>

            <p>
              {isSignedIn ? (
                <div>Click to upload or just drag and drop</div>
              ) : (
                <div>Sign in or sign up with Puter to upload</div>
              )}
            </p>
            <p className="help">Maximum file size: 10MB</p>
          </div>
        </div>
      ) : (
        <div>NO FILE</div>
      )}
    </div>
  );
};

export default Upload;
