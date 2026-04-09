import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DataIsYours from "@/components/DataIsYours";
import Roadmap from "@/components/Roadmap";
import GetIt from "@/components/GetIt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <DataIsYours />
        <Roadmap />
        <GetIt />
      </main>
      <Footer />
    </>
  );
}
