# Yash Sharma - 3D Portfolio Website Plan

## Theme: Itachi Uchiha / Dark Ninja Aesthetic
- Dark color scheme with Sharingan red (#DC2626) accents
- Floating crow particles in background
- Mangekyo Sharingan animated 3D geometry as centerpiece
- Genjutsu-inspired page transitions (ripple dissolve)
- Amaterasu black flame subtle effects

## Reference: miromannino.com
- Full-viewport hero with animated 3D element
- Smooth scroll-triggered section animations
- Minimal navigation with theme toggle
- Staggered text reveals
- Scroll indicator
- Card-based project showcase

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, smooth scroll
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Global styles, Tailwind, custom properties
├── components/
│   ├── three/
│   │   ├── Scene.tsx           # Main R3F Canvas wrapper
│   │   ├── SharinganModel.tsx  # 3D Mangekyo Sharingan geometry
│   │   ├── FloatingParticles.tsx # Crow-like floating particles
│   │   └── AnimatedTorus.tsx   # Background animated geometries
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with 3D scene + name reveal
│   │   ├── About.tsx           # About me section
│   │   ├── Skills.tsx          # Interactive skill bars/cards
│   │   ├── Projects.tsx        # Project showcase cards
│   │   ├── Experience.tsx      # Timeline-style experience
│   │   └── Contact.tsx         # Contact form
│   ├── ui/
│   │   ├── Navbar.tsx          # Fixed minimal navbar
│   │   ├── ScrollIndicator.tsx # Animated scroll hint
│   │   ├── Loader.tsx          # Preloader with Sharingan animation
│   │   ├── MagneticButton.tsx  # Hover-magnetic CTA buttons
│   │   └── SectionTitle.tsx    # Reusable animated section headers
│   └── layout/
│       └── SmoothScroll.tsx    # Lenis smooth scroll wrapper
├── hooks/
│   ├── useMousePosition.ts    # Track mouse for parallax
│   └── useScrollProgress.ts   # Track scroll for animations
├── lib/
│   └── animations.ts         # GSAP animation presets
└── data/
    └── portfolio.ts           # All portfolio content (from CV)
```

---

## Sections Breakdown

### 1. Preloader
- Animated Sharingan eye spinning
- "Loading..." text with tomoe dots
- Fade out on complete

### 2. Hero Section
- Full viewport height
- 3D Mangekyo Sharingan spinning slowly in center
- Floating particle crows in background
- "YASH SHARMA" large text reveal animation (staggered chars)
- Subtitle: "Software Engineer & ML Enthusiast"
- Mouse-reactive camera movement (subtle parallax)
- Scroll indicator at bottom

### 3. About Section
- Brief intro paragraph
- Itachi quote as design element
- Stats: GPA, Projects, Certifications
- Scroll-triggered fade-in animations

### 4. Skills Section
- Categorized skill cards (Languages, Frameworks, Tech)
- Progress bars with GSAP animations on scroll
- Glowing red accent on hover
- Staggered reveal

### 5. Projects Section
- Card grid layout
- Each card has gradient border, hover lift effect
- Project name, tech stack tags, description
- Skin Lesion Segmentation & Iris Flower Classification

### 6. Experience Section
- Vertical timeline design
- Suvidha Foundation internship
- CETPA Infotech training
- Animated line drawing on scroll

### 7. Contact Section
- Contact form with floating labels
- Email, phone, location info
- Social links
- Subtle 3D background element

---

## Color Palette
- Background: #0A0A0A (near black)
- Surface: #1A1A2E (dark blue-black)
- Primary: #DC2626 (Sharingan red)
- Accent: #FF4444 (bright red)
- Text: #E5E5E5 (light gray)
- Muted: #6B7280 (gray)

## Typography
- Headings: "Inter" or system sans-serif, bold
- Body: "Inter", regular weight
- Accent/Name: Custom letter-spacing for hero

## Animations
- GSAP ScrollTrigger for all section reveals
- React Three Fiber for 3D scene
- Lenis for smooth scrolling
- CSS transitions for hover states
- Staggered text reveals for headings

## Performance
- Lazy load 3D scene with Suspense
- Dynamic imports for heavy components
- Preloader masks initial load
- Optimized Three.js geometries (no heavy models)
- Mobile: simplified particles, smaller canvas

## Responsive Breakpoints
- Mobile: < 768px (simplified 3D, stacked layout)
- Tablet: 768px - 1024px
- Desktop: > 1024px (full experience)
