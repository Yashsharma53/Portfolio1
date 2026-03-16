# Architecture Overview

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **3D**: React Three Fiber + Three.js + @react-three/drei
- **Animation**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

## Rendering Strategy
- Server-side layout with client-side interactive components
- 3D scene loaded via `next/dynamic` with SSR disabled
- React Suspense for lazy loading

## Component Hierarchy
```
RootLayout (server)
└── Home (client)
    ├── Loader → fades out after 2.5s
    ├── SmoothScroll (Lenis wrapper)
    │   ├── Navbar (fixed, glass-morphism)
    │   ├── Scene (fixed, z-0, React Three Fiber)
    │   │   ├── SharinganModel (procedural geometry)
    │   │   ├── FloatingParticles (800 points)
    │   │   └── AnimatedTorus (wireframe decorations)
    │   ├── main (z-10, content sections)
    │   │   ├── Hero
    │   │   ├── About
    │   │   ├── Skills
    │   │   ├── Projects
    │   │   ├── Experience
    │   │   ├── Contact
    │   │   └── Footer
    │   └── ScrollIndicator
    └── (mouse position tracked for parallax)
```

## Performance Considerations
- 3D scene is fixed background, content scrolls over it
- Particles use BufferGeometry (no individual mesh instances)
- Procedural geometry (no 3D model files to load)
- Dynamic import for Scene component
- GSAP ScrollTrigger with `once: true` where appropriate
- Mobile: reduced particle count, smaller canvas resolution

## File Organization
```
src/
├── app/           # Next.js App Router pages
├── components/
│   ├── three/     # All React Three Fiber 3D components
│   ├── sections/  # Page sections (Hero, About, etc.)
│   ├── ui/        # Reusable UI components
│   └── layout/    # Layout wrappers (SmoothScroll)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions, animation configs
└── data/          # Static data (portfolio content)
```
