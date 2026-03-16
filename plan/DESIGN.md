# Design System

## Theme: Itachi Uchiha / Dark Ninja

### Color Palette
| Token          | Value     | Usage                    |
|----------------|-----------|--------------------------|
| background     | #0A0A0A   | Page background          |
| surface        | #1A1A2E   | Cards, elevated surfaces |
| primary        | #DC2626   | Accents, CTAs, highlights|
| primary-light  | #FF4444   | Hover states, glows      |
| foreground     | #E5E5E5   | Body text                |
| muted          | #6B7280   | Secondary text           |

### Typography
- **Font**: Inter (Google Fonts)
- **Hero name**: 6rem+ bold, letter-spacing tight
- **Section titles**: 2.5rem semibold
- **Body**: 1rem/1.125rem regular
- **Accent text**: gradient-text class (red gradient)

### Animations
- **Entrance**: fade-in-up (40px translate, 0.6s)
- **Stagger**: 0.1s between children
- **3D rotation**: continuous slow auto-rotate
- **Particles**: drift at 0.001 speed per frame
- **Scroll indicator**: bounce 1.5s infinite
- **Loader exit**: slide up + fade out 0.8s

### Spacing
- Section padding: py-24 (6rem) desktop, py-16 mobile
- Container max-width: 1200px centered
- Card padding: p-6 to p-8
- Grid gaps: gap-6 to gap-8

### Effects
- Glass-morphism: backdrop-blur-12 + rgba bg
- Gradient borders: CSS mask trick
- Glow: box-shadow with red rgba
- Magnetic buttons: transform translate on hover

### Responsive Breakpoints
- sm: 640px
- md: 768px  (mobile menu threshold)
- lg: 1024px (two-column layouts)
- xl: 1280px (max container)
