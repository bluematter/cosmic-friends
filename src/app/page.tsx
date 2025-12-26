import {
  Header,
  Hero,
  About,
  CharacterShowcase,
  Flywheel,
  CTA,
  Footer,
} from '@/components/landing';

const COSMIC_BG_VIDEO = 'https://cdn.basedlabs.ai/40f1ca20-e2ae-11f0-b0c3-51b2a8e655dc.mp4.mp4';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <Hero videoSrc={COSMIC_BG_VIDEO} />
      <About />
      <CharacterShowcase />
      <Flywheel />
      <CTA />
      <Footer />
    </main>
  );
}
