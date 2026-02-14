import React from "react";
import { useOutletContext } from "react-router";
import type { AuthContext } from "types/auth-state";

const Upload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>();

  return <div className="upload"></div>;
};

export default Upload;
