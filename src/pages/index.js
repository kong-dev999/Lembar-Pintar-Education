import {
  CallToAction,
  Templateshow,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
  QnA,
  Fiture,
} from "../sections/index";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Templateshow />
      <Fiture />
      <Guides />
      <Pricing />
      <Testimonial />
      <CallToAction />
      <QnA />
      <Footer />
    </div>
  );
}
