'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';

/* WORD SPLITTER COMPONENT */
const InteractiveText = ({ text }: { text: string }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const words = text.split(' ');

  return (
    <p className="flex flex-wrap gap-x-1 leading-relaxed text-justify">
      {words.map((word, i) => (
        <span
          key={i}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
          className={`
            transition-all duration-200
            ${activeIndex === i
              ? 'bg-gradient-to-r from-[#BE123C] to-[#DB2777] bg-clip-text text-transparent scale-105'
              : 'text-gray-600 dark:text-neutral-300'
            }
          `}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <section
      ref={ref}
      id="about"
      className="my-28 px-6 flex justify-center scroll-mt-28"
    >
      <div className="w-full max-w-4xl">
        <SectionHeading heading="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            relative mt-10 rounded-3xl p-8 md:p-10
            bg-white border border-gray-200 shadow-sm
            dark:bg-[#0f0f11] dark:border-white/10
          "
        >
          <div className="space-y-6 text-[15.5px]">

            <InteractiveText
              text="I’m Wafry Ahamed, an AI & Machine Learning–focused developer and tech enthusiast who builds intelligent, data-driven systems that solve real-world problems. I develop solutions in Artificial Intelligence, where I work with technologies such as TensorFlow, Keras, PyTorch, scikit-learn, scikit-optimize, NumPy, Pandas, Matplotlib, OpenCV, NLP, Computer Vision, LLMs, RAG architectures, Hugging Face Transformers and MCP (Model Context Protocol)."
            />

            <InteractiveText
              text="I specialize in transforming complex data into impactful, production-ready solutions. I also work extensively with GIS mapping and spatial data systems, building applications that leverage spatial intelligence, geospatial analysis and advanced data visualization."
            />

            <InteractiveText
              text="Alongside AI, I develop modern web and mobile applications using React.js, Next.js, Angular, Vue.js, Flutter, Tailwind CSS, JavaScript, TypeScript, Framer Motion and Figma—focusing on intuitive, responsive and user-centered experiences."
            />

            <InteractiveText
              text="On the backend, I build scalable and secure systems using Node.js, Express, Django, Flask, FastAPI (for high-performance AI-driven APIs), Spring Boot, .NET, Go, Laravel, Python, PHP and Java. I also develop real-time and interactive applications using Socket.IO, JWT authentication and integrations. I design and manage robust data systems with PostgreSQL, MySQL, MongoDB, SQLite and PostGIS, supporting advanced GIS applications, spatial analytics and high-performance data processing."
            />

            <InteractiveText
              text="My workflow is powered by modern DevOps practices using Git, GitHub, CI/CD pipelines, Jenkins, Docker and Kubernetes. I deploy and manage applications across AWS, Azure, Vercel, Netlify and Railway, ensuring scalability, performance and reliability. What drives me is building complete, meaningful products from concept to deployment that people genuinely find useful. I’m especially passionate about AI-powered systems, secure architectures, real-time applications and spatial intelligence solutions that enhance human experiences. Beyond development, I actively explore Artificial Intelligence, Cybersecurity and Blockchain, while valuing teamwork and collaboration to bring ideas to life. Outside of tech, I enjoy hiking, exploring nature, learning emerging technologies, writing on Medium and conducting technical research to continuously grow."
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
};