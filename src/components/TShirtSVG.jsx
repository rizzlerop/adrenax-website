import React from 'react';

const TShirtSVG = ({
  color = '#ffffff',
  view = 'front',
  customText = '',
  customTextColor = '#000000',
  customFont = 'Outfit',
  customLogo = null,
  textScale = 1,
  textPosition = { x: 50, y: 45 }, // percentage based inside printable area
  logoScale = 1,
  logoPosition = { x: 50, y: 35 }, // percentage based inside printable area
}) => {
  // Select matching font family styling
  const getFontFamily = (font) => {
    switch (font) {
      case 'Outfit':
        return "'Outfit', sans-serif";
      case 'Inter':
        return "'Inter', sans-serif";
      case 'Monospace':
        return "ui-monospace, monospace";
      case 'Serif':
        return "Georgia, serif";
      case 'Impact':
        return "Impact, Charcoal, sans-serif";
      case 'Script':
        return "'Brush Script MT', cursive";
      default:
        return "'Outfit', sans-serif";
    }
  };

  const isFront = view === 'front';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.45))' }}
      >
        <defs>
          {/* Collar shadow gradient */}
          <linearGradient id="collarShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          
          {/* Underarm and body creases gradient shadow */}
          <radialGradient id="creaseShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Highlights for 3D realism */}
          <linearGradient id="bodyHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Fabric texture pattern overlay */}
          <pattern id="fabricTexture" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="none" />
            <circle cx="2" cy="2" r="0.6" fill="#000" fillOpacity="0.04" />
          </pattern>
        </defs>

        {/* --- FRONT VIEW --- */}
        {isFront ? (
          <g id="tshirt-front">
            {/* Base T-Shirt Silhouette */}
            <path
              d="M 120,120 
                 C 140,115 160,113 180,112
                 C 210,128 290,128 320,112
                 C 340,113 360,115 380,120
                 L 450,170
                 C 455,175 440,195 435,200
                 L 390,185
                 L 392,380
                 C 392,400 370,405 350,405
                 L 150,405
                 C 130,405 108,400 108,380
                 L 110,185
                 L 65,200
                 C 60,195 45,175 50,170
                 Z"
              fill={color}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1.5"
              transition="fill 0.3s ease"
            />

            {/* Inner Neck / Back collar color (darker version of color) */}
            <path
              d="M 180,112 C 210,128 290,128 320,112 C 300,103 200,103 180,112 Z"
              fill="#000000"
              fillOpacity="0.25"
            />

            {/* Front Collar ribbing */}
            <path
              d="M 180,112 C 210,128 290,128 320,112 C 310,135 190,135 180,112 Z"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.15"
              strokeWidth="5"
            />
            <path
              d="M 180,112 C 210,128 290,128 320,112 C 310,135 190,135 180,112 Z"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />

            {/* Fabric Texture Pattern overlay */}
            <path
              d="M 120,120 C 140,115 160,113 180,112 C 210,128 290,128 320,112 C 340,113 360,115 380,120 L 450,170 C 455,175 440,195 435,200 L 390,185 L 392,380 C 392,400 370,405 350,405 L 150,405 C 130,405 108,400 108,380 L 110,185 L 65,200 C 60,195 45,175 50,170 Z"
              fill="url(#fabricTexture)"
            />

            {/* Shadow Creases & Details (Fold aesthetics) */}
            {/* Left underarm wrinkle */}
            <path d="M 112,200 C 130,210 150,212 165,225" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
            <path d="M 112,200 C 130,210 150,212 165,225" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

            {/* Right underarm wrinkle */}
            <path d="M 388,200 C 370,210 350,212 335,225" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
            <path d="M 388,200 C 370,210 350,212 335,225" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.1" />

            {/* Left drop sleeve seam */}
            <path d="M 152,118 L 140,186" fill="none" stroke="#000" strokeWidth="2.5" opacity="0.15" />
            <path d="M 152,118 L 140,186" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.1" />

            {/* Right drop sleeve seam */}
            <path d="M 348,118 L 360,186" fill="none" stroke="#000" strokeWidth="2.5" opacity="0.15" />
            <path d="M 348,118 L 360,186" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.1" />

            {/* Body side shadow highlights */}
            <path
              d="M 120,120 C 140,115 160,113 180,112 C 210,128 290,128 320,112 C 340,113 360,115 380,120 L 450,170 C 455,175 440,195 435,200 L 390,185 L 392,380 C 392,400 370,405 350,405 L 150,405 C 130,405 108,400 108,380 L 110,185 L 65,200 C 60,195 45,175 50,170 Z"
              fill="url(#bodyHighlight)"
            />

            {/* Center Fabric fold vertical shadow (highly subtle) */}
            <path d="M 250,150 C 245,250 235,320 248,390" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" opacity="0.08" />
            <path d="M 250,150 C 245,250 235,320 248,390" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.04" />
            <path d="M 230,160 C 235,250 245,310 230,380" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" opacity="0.06" />

            {/* Printable Customization Area bounding box (Only active/visible during design mode, but here we render content inside it) */}
            {/* The printable area represents x: 160 to 340, y: 150 to 350 */}
            <g id="print-area-front" transform="translate(160, 150)">
              {/* Graphic Logo */}
              {customLogo && (
                <g transform={`translate(${(logoPosition.x / 100) * 180}, ${(logoPosition.y / 100) * 200}) scale(${logoScale * 0.85}) translate(-25, -25)`}>
                  {/* Preset Logos rendered as SVG graphics */}
                  {customLogo === 'adrenax-icon' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <polygon points="15,85 45,20 60,20 30,85" fill={customTextColor} />
                      <polygon points="40,85 70,20 85,20 55,85" fill="url(#orange-grad)" />
                      <defs>
                        <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff5e36" />
                          <stop offset="100%" stopColor="#ff2e93" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  {customLogo === 'adrenax-cross' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <rect x="35" y="10" width="30" height="80" rx="6" fill={customTextColor} />
                      <rect x="10" y="35" width="80" height="30" rx="6" fill="url(#cyan-grad)" />
                      <defs>
                        <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f2fe" />
                          <stop offset="100%" stopColor="#4facfe" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  {customLogo === 'lightning' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <polygon points="55,5 15,55 45,55 35,95 85,40 50,40" fill={customTextColor} />
                    </svg>
                  )}
                  {customLogo === 'shield' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <path d="M 50,10 C 70,10 85,20 85,45 C 85,70 50,90 50,90 C 50,90 15,70 15,45 C 15,20 30,10 50,10 Z" fill={customTextColor} />
                      <path d="M 50,20 C 65,20 75,27 75,45 C 75,63 50,78 50,78 C 50,78 25,63 25,45 C 25,27 35,20 50,20 Z" fill={color} />
                      <circle cx="50" cy="46" r="10" fill={customTextColor} />
                    </svg>
                  )}
                </g>
              )}

              {/* Custom Text */}
              {customText && (
                <text
                  x={(textPosition.x / 100) * 180}
                  y={(textPosition.y / 100) * 200}
                  fill={customTextColor}
                  fontFamily={getFontFamily(customFont)}
                  fontSize={`${textScale * 1.35}rem`}
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))'
                  }}
                >
                  {customText}
                </text>
              )}
            </g>

            {/* Collar & Hem double stitch lines (adds realism) */}
            {/* Hem stitch */}
            <path d="M 150,400 L 350,400" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
            {/* Left sleeve stitch */}
            <path d="M 70,195 L 105,183" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
            {/* Right sleeve stitch */}
            <path d="M 430,195 L 395,183" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
          </g>
        ) : (
          /* --- BACK VIEW --- */
          <g id="tshirt-back">
            {/* Base T-Shirt Silhouette */}
            <path
              d="M 120,120 
                 C 140,115 160,113 180,112
                 C 210,119 290,119 320,112
                 C 340,113 360,115 380,120
                 L 450,170
                 C 455,175 440,195 435,200
                 L 390,185
                 L 392,380
                 C 392,400 370,405 350,405
                 L 150,405
                 C 130,405 108,400 108,380
                 L 110,185
                 L 65,200
                 C 60,195 45,175 50,170
                 Z"
              fill={color}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1.5"
              transition="fill 0.3s ease"
            />

            {/* Back Collar high neck ribbing */}
            <path
              d="M 180,112 C 210,119 290,119 320,112 C 310,118 190,118 180,112 Z"
              fill="#000000"
              fillOpacity="0.2"
            />

            {/* Fabric Texture Pattern overlay */}
            <path
              d="M 120,120 C 140,115 160,113 180,112 C 210,119 290,119 320,112 C 340,113 360,115 380,120 L 450,170 C 455,175 440,195 435,200 L 390,185 L 392,380 C 392,400 370,405 350,405 L 150,405 C 130,405 108,400 108,380 L 110,185 L 65,200 C 60,195 45,175 50,170 Z"
              fill="url(#fabricTexture)"
            />

            {/* Wrinkles (Folds) */}
            <path d="M 112,200 C 130,210 150,212 165,225" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
            <path d="M 388,200 C 370,210 350,212 335,225" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
            <path d="M 152,118 L 140,186" fill="none" stroke="#000" strokeWidth="2.5" opacity="0.15" />
            <path d="M 348,118 L 360,186" fill="none" stroke="#000" strokeWidth="2.5" opacity="0.15" />

            {/* Highlights for 3D realism */}
            <path
              d="M 120,120 C 140,115 160,113 180,112 C 210,119 290,119 320,112 C 340,113 360,115 380,120 L 450,170 C 455,175 440,195 435,200 L 390,185 L 392,380 C 392,400 370,405 350,405 L 150,405 C 130,405 108,400 108,380 L 110,185 L 65,200 C 60,195 45,175 50,170 Z"
              fill="url(#bodyHighlight)"
            />

            {/* Yoke/Upper shoulder fold line (typical for back) */}
            <path d="M 150,150 C 200,160 300,160 350,150" fill="none" stroke="#000000" strokeWidth="2" opacity="0.12" />
            <path d="M 250,150 C 248,250 238,320 248,390" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" opacity="0.08" />

            {/* Printable Customization Area (Back) */}
            <g id="print-area-back" transform="translate(160, 150)">
              {/* Back customizable options can be rendered here */}
              {customLogo && (
                <g transform={`translate(${(logoPosition.x / 100) * 180}, ${(logoPosition.y / 100) * 200}) scale(${logoScale * 1.2}) translate(-25, -25)`}>
                  {/* Preset Logos rendered as SVG graphics */}
                  {customLogo === 'adrenax-icon' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <polygon points="15,85 45,20 60,20 30,85" fill={customTextColor} />
                      <polygon points="40,85 70,20 85,20 55,85" fill="url(#orange-grad)" />
                    </svg>
                  )}
                  {customLogo === 'adrenax-cross' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <rect x="35" y="10" width="30" height="80" rx="6" fill={customTextColor} />
                      <rect x="10" y="35" width="80" height="30" rx="6" fill="url(#cyan-grad)" />
                    </svg>
                  )}
                  {customLogo === 'lightning' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <polygon points="55,5 15,55 45,55 35,95 85,40 50,40" fill={customTextColor} />
                    </svg>
                  )}
                  {customLogo === 'shield' && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <path d="M 50,10 C 70,10 85,20 85,45 C 85,70 50,90 50,90 C 50,90 15,70 15,45 C 15,20 30,10 50,10 Z" fill={customTextColor} />
                      <path d="M 50,20 C 65,20 75,27 75,45 C 75,63 50,78 50,78 C 50,78 25,63 25,45 C 25,27 35,20 50,20 Z" fill={color} />
                      <circle cx="50" cy="46" r="10" fill={customTextColor} />
                    </svg>
                  )}
                </g>
              )}

              {customText && (
                <text
                  x={(textPosition.x / 100) * 180}
                  y={(textPosition.y / 100) * 200}
                  fill={customTextColor}
                  fontFamily={getFontFamily(customFont)}
                  fontSize={`${textScale * 1.5}rem`}
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.3))'
                  }}
                >
                  {customText}
                </text>
              )}
            </g>

            {/* Stitches */}
            <path d="M 150,400 L 350,400" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
            <path d="M 70,195 L 105,183" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
            <path d="M 430,195 L 395,183" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="3,3" opacity="0.2" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default TShirtSVG;
