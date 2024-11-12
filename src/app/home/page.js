import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import ImportantFeatures from "@/components/home/ImportantFeatures";
import Introducing from "@/components/home/Introducing";
import Software from "@/components/home/Software";
import WhyCMS from "@/components/home/WhyCMS";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <Hero />
      <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-10">
        <Introducing />
        <ImportantFeatures />
        <WhyCMS />
        <Software />
        <Clients />
      </div>
      <Footer />
    </>
  );
}
