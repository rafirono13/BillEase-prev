import React from "react";
import HeroCarousel from "../../Components/Custom/HeroCarousel";
import ProvidersSection from "../../Components/Custom/ProvidersSection";
import FactsSection from "../../Components/Custom/FactsSection";
import StatsSection from "../../Components/Custom/StatsSection";
import FAQSection from "../../Components/Custom/FAQSection";
import { motion } from "framer-motion";
import FadeIn from "../../Components/Custom/FadeIn";
import Timeline from "../../Components/Custom/Timeline";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <section className="my-10">
        <FadeIn direction="down" delay={0.2}>
          <HeroCarousel />
        </FadeIn>
      </section>

      <section>
        <FadeIn direction="right" delay={0.3}>
          <ProvidersSection />
        </FadeIn>
      </section>

      <section>
        <FadeIn direction="left" delay={0.4}>
          <FactsSection />
        </FadeIn>
      </section>

      <section>
        <FadeIn direction="down" delay={0.5}>
          <Timeline></Timeline>
        </FadeIn>
      </section>

      <section>
        <FadeIn direction="left" delay={0.6}>
          <StatsSection />
        </FadeIn>
      </section>

      <section>
        <FadeIn direction="up" delay={0.7}>
          <FAQSection />
        </FadeIn>
      </section>
    </div>
  );
};

export default HomePage;
