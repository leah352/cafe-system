import React, { useState, useRef, useEffect } from 'react';

const AvatarWithSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const fallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="100%" height="100%" fill="%23e6e6e6"/><text x="50%" y="50%" font-size="14" text-anchor="middle" fill="%23666" dy=".3em">No Photo</text></svg>';

  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Check if image is already loaded (cached)
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div style={{position:'relative', width:120, height:120}}>
      {!loaded && !errored && (
        <div
          className="skeleton avatar-skeleton"
          aria-hidden
          style={{
            width: 120,
            height: 120,
            borderRadius: 12,
            background: 'var(--panel)',
            border: '0.5px solid var(--panel-border)'
          }}
        />
      )}

      <img
        ref={imgRef}
        src={errored ? fallback : src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onLoad={() => { setLoaded(true); }}
        onError={() => { setErrored(true); }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 12,
          objectFit: 'cover',
          display: loaded || errored ? 'block' : 'none',
          border: '0.5px solid var(--panel-border)'
        }}
      />
    </div>
  );
};

export default AvatarWithSkeleton;
