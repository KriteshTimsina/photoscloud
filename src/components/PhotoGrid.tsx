"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

// This is a mock function. In a real app, you'd fetch this data from your backend.
const fetchPhotos = async () => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    // Add more placeholder images as needed
  ]
}

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    fetchPhotos().then(setPhotos)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-square relative overflow-hidden rounded-lg shadow-md">
          <Image src={photo || "/placeholder.svg"} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  )
}

