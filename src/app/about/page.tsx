const features = [
  {
    title: "Easy Image Upload",
    description:
      "Quickly upload your photos from any device with our intuitive interface.",
  },
  {
    title: "Secure Storage",
    description:
      "Your memories are protected with industry-leading encryption and security measures.",
  },
  {
    title: "Organize with Ease",
    description:
      "Automatically organize your photos by date, location, or custom albums.",
  },
  {
    title: "Share Securely",
    description:
      "Share your photos with friends and family while maintaining control over your privacy.",
  },
];

export default function About() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-24">
      <div className="relative z-10 max-w-4xl px-4 text-center">
        <h1 className="mb-8 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Photos Cloud
          </span>
        </h1>
        <p className="mb-12 text-xl text-gray-300">
          Photos Cloud is your secure, easy-to-use solution for storing and
          sharing your precious memories.
        </p>
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-800 bg-opacity-50 p-6"
            >
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
