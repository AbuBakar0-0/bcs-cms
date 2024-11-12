import Counter from "@/components/about/Counter";
import Engagement from "@/components/about/Engagement";
import GetInTouch from "@/components/about/GetInTouch";
import Hero from "@/components/about/Hero";
import VisionMission from "@/components/about/VisionMission";
import WhyChoose from "@/components/about/WhyChoose";
import Clients from "@/components/home/Clients";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

function About() {
  return (
    <>
      <Header />
      <Hero />
      <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-10">
        <WhyChoose />
        <Engagement />
      </div>
      <GetInTouch />

      <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-10">
        <Counter />
        <VisionMission />
        <Clients />
      </div>
      <Footer />
    </>
  );
}

export default About;
