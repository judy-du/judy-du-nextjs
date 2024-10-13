// components/VideoSegment.js
export default function VideoSegment({ src, id }) {
  return (
    <video
      muted
      autoPlay
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      id={id}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
