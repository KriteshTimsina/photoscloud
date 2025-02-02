"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"

interface PhotoUploadProps {
  onUploadComplete: () => void
}

export default function PhotoUpload({ onUploadComplete }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Handle file upload here
      setUploading(true)
      // Simulating upload process
      setTimeout(() => {
        setUploading(false)
        onUploadComplete()
      }, 2000)
    },
    [onUploadComplete],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading...</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <p className="mb-4">Drag 'n' drop some files here, or click to select files</p>
          <Button type="button">Select Files</Button>
        </div>
      )}
    </div>
  )
}

