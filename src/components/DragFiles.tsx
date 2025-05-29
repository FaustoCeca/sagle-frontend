import React, { useState, useRef } from "react";
import { X, FileImage } from "lucide-react";
import { useFile } from "../hooks/useFile";

interface DragFilesProps {
  onChange: (file: File | null) => void;
}

const DragFiles = ({ onChange }: DragFilesProps) => {
  const [dragging, setDragging] = useState(false);
  const { file: localFile, addFile: setLocalFile, removeFile } = useFile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const isImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };

  const handleFile = (file: File | null) => {
    if (file && !isImageFile(file)) {
      alert("Por favor, seleccione solo archivos de imagen");
      return;
    }

    if (!file) {
      onChange(null);
      return;
    }

    setLocalFile(file);
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    removeFile();
    onChange(null);
  };

  // Convierte bytes a un formato legible
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {!localFile && (
        <div
          className={`w-full h-32 rounded-md flex flex-col items-center justify-center border-2 border-dashed transition-colors ${
            dragging
              ? "border-primary bg-primary/10"
              : "border-primary-light bg-custom-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
            className="hidden"
            accept="image/*"
          />
          <div className="text-center">
            <p className="text-custom-black mb-1">
              {dragging
                ? "Suelta la imagen aquí"
                : "Arrastra y suelta tu imagen aquí"}
            </p>
            <p className="text-gray-500 text-sm">
              o haz clic para seleccionar una imagen
            </p>
          </div>
        </div>
      )}

      {/* Preview de la imagen */}
      {localFile && (
        <div className="mt-4">
          <div className="flex items-center p-2 bg-gray-100 rounded-md">
            <FileImage size={16} className="mr-2 text-blue-500" />
            <div className="flex-1 truncate">
              <span className="text-sm font-medium">{localFile.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({formatFileSize(localFile.size)})
              </span>
            </div>
            <button
              type="button"
              className="ml-2 p-1 rounded-full hover:bg-gray-200"
              onClick={handleRemove}
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          {/* Preview de la imagen */}
          <div className="mt-2">
            <img
              src={URL.createObjectURL(localFile)}
              alt="Preview"
              className="max-h-48 rounded-md object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DragFiles;