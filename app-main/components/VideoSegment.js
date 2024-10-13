// components/VideoSegment.js
export default function VideoSegment({ src, id }) {
  return (
    <video
      muted
      autoPlay
      loop
      className="video-segment"
      id={id}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
