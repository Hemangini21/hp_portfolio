import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDown, 
  ArrowRight,
  Mail, 
  Github, 
  Linkedin,
  Instagram,
  Building,
  Calendar,
  MapPin,
  Award,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  BookOpen
} from "lucide-react";

import LoadingScreen from "../components/portfolio/LoadingScreen";
import ProjectCard from "../components/portfolio/ProjectCard";
import { createFadeInAnimation, createScaleAnimation, createTextRevealAnimation, createSlideInAnimation, createMagneticEffect, createFloatingAnimation, createTimelineAnimation } from "../utils/animations";
import lenis from "../utils/lenis";

// Import all logo images directly
import SyncvoxImage from "../assets/images/Syncvox.png";
import NSDCLogo from "../assets/images/NSDC.png";

import Pub1Image from "../assets/images/pub_1.png";
import Pub2Image from "../assets/images/pub_2.png";
import Pub3Image from "../assets/images/pub_3.png";
import Pub4Image from "../assets/images/pub4.png";


// Import NSDC gallery images
import NSDC1 from "../assets/images/NSDC_1.jpeg";
import NSDC2 from "../assets/images/NSDC_2.jpeg";
import NSDC3 from "../assets/images/NSDC_3.jpeg";
import NSDC4 from "../assets/images/NSDC_4.jpeg";
import NSDC5 from "../assets/images/NSDC_5.jpeg";
import NSDC6 from "../assets/images/NSDC_6.jpeg";
import NSDC7 from "../assets/images/NSDC_7.jpg";
import NSDC8 from "../assets/images/NSDC_8.jpg";
import NSDC9 from "../assets/images/NSDC_9.jpeg";
import NSDC10 from "../assets/images/NSDC_10.JPG";



import IITPLogo from "../assets/images/IITP.png";
import WinvestaLogo from "../assets/images/Winvesta.png";
import PlacementLogo from "../assets/images/PlacementLogo.png";

const publications = [
  {
    id: 1,
    title: "SyncVox: Synchronized AI Based Video Dubbing",
    authors: "Hemangini Patel and team",
    conference: "ICT Systems and Sustainability (Proceedings of ICT4SD 2025, Volume 4)",
    publisher: "Lecture Notes in Networks and Systems (LNNS, volume 1648)",
    date: "November 4, 2025",
    link: "https://link.springer.com/chapter/10.1007/978-3-032-06671-8_51",
    image: Pub1Image,
    galleryImages: [Pub1Image, Pub2Image, Pub3Image, Pub4Image],
    description: "Our research addresses the challenge of multilingual content creation by introducing SyncVox, a custom AI pipeline that handles speech recognition, translation, and lip synchronization. By integrating models like Meta's MMS, IndicTrans2, and Wav2Lip, we aimed to create natural-sounding, synchronized dubs specifically optimized for Indian languages."
  },
  
];

const projects = [
  {
    id: 1,
    title: "Syncvox",
    subtitle: "Synchronized Video Dubbing Using AI",
    description: "Developed an AI-powered Multilingual Video Dubbing Platform enabling synchronized audio translation withNatural Speech Quality, accurate Lip-Sync Alignment, and Text-to-Speech, integrating speech recognition, machine translation, adaptive prosody modeling, and real-time lip-movement matching for a seamless user experience.",
    image: SyncvoxImage,
    tech: ["Whisper ASR", "GoogleTTS", "IndicTrans2", "gTTS", "Wav2Lip", "React+Vite", "Flask"],
    link: "https://github.com/Hemangini21/Syncvox",
    date: "April 2024 - May 2025"
  },
  {
    id: 2,
    title: "NyayMitra",
    subtitle: "AI-Driven Legal Service Provider Platform",
    description: "Developed a comprehensive legal service platform featuring an AI-Powered Chatbot for instant legal guidance, Geo-Enabled Lawyer Search, Smart Contract Drafting, Interactive Legal Flowcharts, Legal Research and Advisory System, automated Legal Document Analysis with Question-Answering, and real-time Case Status Tracking.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e68260242_Nyaymitra.jpg",
    tech: ["ChromaDB", "Reactflow", "OpenMap", "LangChain", "Next.js", "Python", "Gemini", "Llama"],
    link: "https://github.com/Hemangini21/NyayMitra",
    date: "April 2025"
  },
  {
    id: 3,
    title: "ReddIQ",
    subtitle: "Social Media Analysis Dashboard",
    description: "Developed an interactive dashboard to analyze Reddit data using NLP and machine learning techniques, featuring Sentiments and Trending Topics, Time-Series visualizations, Community Distribution, Coordinated Activity Identification, Semantic Mapping, and an AI-powered chatbot for intelligent querying.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6f7e2ef86_ReddIQ.png",
    tech: ["Flask", "D3.js", "UMAP", "SentenceTransformers", "LDA", "Python", "JavaScript", "Gemini", "Reddit API"],
    link: "https://github.com/Hemangini21/ReddIQ",
    date: "May 2025"
  },
  {
    id: 4,
    title: "Agenix",
    subtitle: "AI Agent Marketplace",
    description: "Developed a marketplace that integrates various AI agents, including independent agents like Professional Email Writer, Document Summarizer, YouTube Summarizer, Web Crawler, Image Generator, and Blog Writer along with a Job Agent, Case Study Agent and a Deep Research Agent, combined into custom workflows.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8f218f516_Agenix.jpg",
    tech: ["Crew AI", "FluxAI", "FAISS", "Langflow", "Next.js", "Python", "LangChain", "Gemini", "Llama"],
    link: "https://github.com/Hemangini21/Agenix",
    date: "March 2025"
  },
  
];

const experiences = [
  {
    id: 1,
    title: "AI Intern",
    company: "Winvesta",
    duration: "March 2025 – June 2025",
    location: "Mumbai, India",
    description: [
      "Implemented N8N Agentic AI workflow automation, evaluating its effectiveness in automating repetitive business tasks across financial domains, including trend analysis and data-driven decision making for investment recommendations.",
      "Designed automation workflows including Caption Writing Agents, Copywriting Agents, and Trend Analysis Agents for LinkedIn, Twitter, and YouTube; built a Financial Analysis Workflow recommending stock purchases, assisting in investment decision-making using Python for data manipulation and analysis."
    ]
  },
  {
    id: 2,
    title: "AI/ML Intern",
    company: "Indian Institute of Technology Patna",
    duration: "March 2025 - September 2025",
    location: "Patna, India",
    description: [
      "Implemented a suite of advanced ML models, including Tree-Augmented Naive Bayes (TAN), Tree-based classifierslike Random Forest, Tree-Structured SVM Ensemble, and Voting Classifier on curated datasets for robust classification tasks, applying statistical analysis and forecasting capabilities."
    ]
  }
];

const extraCurriculars = [
  {
    id: 1,
    title: "Placement Coordinator",
    organization: "DJSCE Placement Cell",
    type: "Full-time",
    duration: "Jun 2025 - Present",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Corporate Relations", "Student Coordination", "Event Management", "Communication Skills", "Team Leadership"],
    logo: PlacementLogo
  },
  {
    id: 2,
    title: "Secretary",
    organization: "DJS-NSDC",
    type: "Full-time",
    duration: "May 2024 - May 2025",
    location: "Mumbai, Maharashtra, India",
    workType: "Hybrid",
    skills: ["Administrative Management", "Documentation & Record Keeping", "Meeting Coordination", "Organizational Skills", "Official Communication"],
    logo: NSDCLogo,
    galleryImages: [NSDC1, NSDC2, NSDC3, NSDC4, NSDC5, NSDC6],
    hasFlipCard: true
  },
  {
    id: 3,
    title: "Internship Coordinator",
    organization: "DJSCE Placement Cell",
    type: "Full-time",
    duration: "September 2024 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Student Counseling", "Company Coordination", "Opportunity Sourcing", "Database Management", "Professional Networking"],
    logo: PlacementLogo
  },
  {
    id: 4,
    title: "Marketing Assistant",
    organization: "DJS-NSDC",
    type: "Full-time",
    duration: "May 2023 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Digital Marketing", "Content Creation", "Brand Promotion", "Sponsor Outreach"],
    logo: NSDCLogo,
    hasFlipCard: true,
    galleryImages: [NSDC7, NSDC8, NSDC9, NSDC10]

  },
  
];

const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
    ]
  },
  {
    name: "Frameworks & Tools",
    skills: [
      { name: "PowerBI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "N8N", logo: "https://n8n.io/favicon.svg" },
      { name: "LangChain", logo: "https://python.langchain.com/img/brand/wordmark.png" },
      { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Canva", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Visual Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" }
    ]
  },
  {
    name: "Specializations",
    skills: ["AI/ML", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "Data Analysis"]
  }
];

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isNSDCFlipped, setIsNSDCFlipped] = useState(false);
  const [isTEDxFlipped, setIsTEDxFlipped] = useState(false);
  const [isGDSCFlipped, setIsGDSCFlipped] = useState(false);
  const [isTrinityFlipped, setIsTrinityFlipped] = useState(false);
  const [isNOVAFlipped, setIsNOVAFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTEDxImageIndex, setCurrentTEDxImageIndex] = useState(0);
  const [currentGDSCImageIndex, setCurrentGDSCImageIndex] = useState(0);
  const [currentTrinityImageIndex, setCurrentTrinityImageIndex] = useState(0);
  const [currentNOVAImageIndex, setCurrentNOVAImageIndex] = useState(0);
  const [currentPubImageIndex, setCurrentPubImageIndex] = useState(0);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleNSDCFlip = () => {
    setIsNSDCFlipped(!isNSDCFlipped);
  };

  const handleTEDxFlip = () => {
    setIsTEDxFlipped(!isTEDxFlipped);
  };

  const handleGDSCFlip = () => {
    setIsGDSCFlipped(!isGDSCFlipped);
  };

  const handleTrinityFlip = () => {
    setIsTrinityFlipped(!isTrinityFlipped);
  };

  const handleNOVAFlip = () => {
    setIsNOVAFlipped(!isNOVAFlipped);
  };

  const nextImage = () => {
    const nsdcCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 2);
    if (nsdcCard && nsdcCard.galleryImages) {
      setCurrentImageIndex((prev) => 
        prev === nsdcCard.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    const nsdcCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 2);
    if (nsdcCard && nsdcCard.galleryImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? nsdcCard.galleryImages.length - 1 : prev - 1
      );
    }
  };

  const nextTEDxImage = () => {
    const tedxCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 4);
    if (tedxCard && tedxCard.galleryImages) {
      setCurrentTEDxImageIndex((prev) => 
        prev === tedxCard.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevTEDxImage = () => {
    const tedxCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 4);
    if (tedxCard && tedxCard.galleryImages) {
      setCurrentTEDxImageIndex((prev) => 
        prev === 0 ? tedxCard.galleryImages.length - 1 : prev - 1
      );
    }
  };

  const nextGDSCImage = () => {
    const gdscCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 7);
    if (gdscCard && gdscCard.galleryImages) {
      setCurrentGDSCImageIndex((prev) => 
        prev === gdscCard.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevGDSCImage = () => {
    const gdscCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 7);
    if (gdscCard && gdscCard.galleryImages) {
      setCurrentGDSCImageIndex((prev) => 
        prev === 0 ? gdscCard.galleryImages.length - 1 : prev - 1
      );
    }
  };

  const nextTrinityImage = () => {
    const trinityCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 5);
    if (trinityCard && trinityCard.galleryImages) {
      setCurrentTrinityImageIndex((prev) => 
        prev === trinityCard.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevTrinityImage = () => {
    const trinityCard = extraCurriculars.find(card => card.hasFlipCard && card.id === 5);
    if (trinityCard && trinityCard.galleryImages) {
      setCurrentTrinityImageIndex((prev) => 
        prev === 0 ? trinityCard.galleryImages.length - 1 : prev - 1
      );
    }
  };

  const nextPubImage = () => {
    const pub = publications[0];
    if (pub && pub.galleryImages) {
      setCurrentPubImageIndex((prev) => 
        prev === pub.galleryImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPubImage = () => {
    const pub = publications[0];
    if (pub && pub.galleryImages) {
      setCurrentPubImageIndex((prev) => 
        prev === 0 ? pub.galleryImages.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'extracurriculars', 'publications', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize animations after loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add delay to ensure DOM is ready
      setTimeout(() => {
        // Enhanced fade-in animations for sections
        createFadeInAnimation('.animate-section', { duration: 1.8, y: 100, stagger: 0.2 });
        
        // Advanced scale animations for cards with bounce effect
        createScaleAnimation('.animate-card', { scale: 0.6, duration: 1.5 });
        
        // Enhanced text reveal animations
        createTextRevealAnimation('.animate-text');
        
        // Slide-in animations for navigation
        createSlideInAnimation('.animate-nav', 'top', { duration: 1.2 });

        // Slide-in animations for different elements
        createSlideInAnimation('.animate-slide-left', 'left', { duration: 1.4 });
        createSlideInAnimation('.animate-slide-right', 'right', { duration: 1.4 });
        createSlideInAnimation('.animate-slide-up', 'bottom', { duration: 1.6 });

        // Magnetic effects for interactive elements
        createMagneticEffect('.animate-magnetic');

        // Floating animation for special elements
        createFloatingAnimation('.animate-float');

        // Timeline animation for experience section
        createTimelineAnimation('#experience');
        
      }, 150);
    }
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      lenis.scrollTo(element, { duration: 2.0, easing: (t) => 1 - Math.pow(1 - t, 4) });
    }
  };

  return (
    <div className="relative text-white font-georgia">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Spline Background Animation */}
      {!isLoading && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 scale-125">
            <iframe
              src="https://my.spline.design/orbscrolltriggerforhero-1jIpf6IBLUkWeBMxBBUQfchU/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Interactive Orb Background"
              className="w-full h-full"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                filter: "brightness(1.3) contrast(1.1)"
              }}
            />
          </div>
          {/* Gradient overlay to blend with content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      )}

      {/* Navigation - Outside of scrolling content */}
      {!isLoading && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fixed-nav p-6 animate-nav"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            {/* <motion.div
              className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-float"
              whileHover={{ scale: 1.05 }}
            >
              HEMANGINI
            </motion.div> */}
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Extra-Curriculars', 'Publications', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace('-', ''))}
                  className={`capitalize transition-all duration-300 text-base font-medium ${
                    activeSection === item.toLowerCase().replace('-', '') 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2
            }}
            className="relative z-10"
          >

          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center relative text-center">
            <div className="container mx-auto px-6 flex flex-col items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.6, -0.05, 0.01, 0.99],
                  delay: 0.3
                }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Hi, I'm <motion.span 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  >
                    Hemangini
                  <br className="md:hidden" /> Patel</motion.span>
                </motion.h1>
                
                <motion.h2 
                  className="text-3xl md:text-4xl text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  AI Enthusiast
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-white/60 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Dedicated to learning and exploring in the world of business and technology!
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  <motion.button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 relative overflow-hidden group"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">View My Work</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 border border-white/40 rounded-lg text-white font-semibold backdrop-blur-sm relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(255, 255, 255, 1)",
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-white/50" />
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <motion.div 
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, x: -100, rotate: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-80 h-80 mx-auto">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-75 blur-sm"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                      }}
                    />
                    <motion.div 
                      className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "rgba(96, 165, 250, 0.5)",
                        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)"
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={require("../assets/images/Profile.png")}
                        alt="Hemangini Patel"
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center center' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
                
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.3,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                  >
                    <motion.h2 
                      className="text-4xl lg:text-5xl font-bold mb-6"
                      whileHover={{ 
                        scale: 1.02,
                        textShadow: "0 0 20px rgba(99, 102, 241, 0.8)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      About <motion.span 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >Me</motion.span>
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-white/70 leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      whileHover={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        textShadow: "0 0 10px rgba(99, 102, 241, 0.4)"
                      }}
                    >
                      I'm a passionate B.Tech student specializing in Artificial Intelligence (AI) and Data Science, with a Honors in Computational Biology, at SVKM's Dwarkadas J. Sanghvi College of Engineering, Mumbai, India.
                    </motion.p>
                    <motion.p 
                      className="text-lg text-white/70 leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      whileHover={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        textShadow: "0 0 10px rgba(99, 102, 241, 0.4)"
                      }}
                    >
                      I specialize in creating cutting-edge AI solutions, while actively building skills in AI, ML, no-code AI, data science and finance.
                    </motion.p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-32 bg-gradient-to-b from-black/40 via-gray-900/50 to-black/40 backdrop-blur-sm animate-section relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              {/* Enhanced Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-20 animate-text"
              >
                <motion.div
                  className="inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                    Professional Journey
                  </span>
                </motion.div>
                
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  My <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Experience</span>
                </h2>
                
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Driving innovation through AI workflow automation and advanced machine learning 
                  implementations across financial technology and academic research domains
                </p>
                
                {/* Animated underline */}
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
              
              {/* Timeline Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Parallel Experiences Layout */}
                

                {/* Parallel Cards Container */}
                <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-7xl mx-auto">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="relative"
                    >
                      {/* Experience Card */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.02, 
                          y: -8,
                          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group overflow-hidden h-full"
                      >
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Floating orbs */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700" />
                        
                        <div className="relative z-10">
                          {/* Header with improved layout */}
                          <div className="flex items-start gap-6 mb-8">
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.6 }}
                              className="w-28 h-28 sm:w-32 sm:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20 flex-shrink-0"
                            >
                              <img 
                                src={index === 0 ? WinvestaLogo: IITPLogo}
                                alt={`${index === 0 ? 'Winvesta' : 'IIT Patna'} logo`}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter brightness-110"
                              />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <motion.h3 
                                className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 leading-tight"
                                whileHover={{ x: 5 }}
                              >
                                {experience.title}
                              </motion.h3>
                              
                              <motion.div 
                                className="flex items-start gap-3 mb-4"
                                whileHover={{ x: 5 }}
                              >
                                <Building className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                <h4 className="text-blue-400 font-semibold text-base leading-tight">{experience.company}</h4>
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Duration and location with better spacing */}
                          <div className="flex flex-col gap-3 mb-8">
                            <motion.div 
                              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-blue-400/5 border border-blue-400/20 rounded-xl"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                              transition={{ duration: 0.2 }}
                            >
                              <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                              <span className="text-sm font-medium text-white/90">{experience.duration}</span>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500/10 to-purple-400/5 border border-purple-400/20 rounded-xl"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                              transition={{ duration: 0.2 }}
                            >
                              <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                              <span className="text-sm font-medium text-white/90">{experience.location}</span>
                            </motion.div>
                          </div>
                          
                          {/* Description with improved typography */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center">
                              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                              Key Responsibilities
                            </h4>
                            {experience.description.map((desc, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                whileHover={{ x: 5 }}
                                className="group/item"
                              >
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent hover:from-blue-500/10 hover:to-purple-500/5 transition-all duration-300">
                                  <motion.div 
                                    className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"
                                    whileHover={{ scale: 1.5 }}
                                  />
                                  <p className="text-white/85 leading-relaxed text-sm group-hover/item:text-white transition-colors duration-300">
                                    {desc}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Institute badge with improved styling */}
                          <motion.div
                            className="mt-6 flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-400">
                              {index === 0 ? 'Winvesta' : 'IIT Patna'}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Bottom CTA */}
              <motion.div
                className="text-center mt-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16 animate-text"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Innovative solutions across various domains of AI and data science
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                  <div key={project.id} className="group">
                    <ProjectCard
                      project={project}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills & Technologies Section */}
          <section id="skills" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Skills & <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Technologies</span>
                </h2>
              </motion.div>
              
              <div className="max-w-6xl mx-auto space-y-12">
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-blue-400">{category.name}</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {category.skills.map((skill, skillIndex) => {
                        const isSkillObject = typeof skill === 'object';
                        const skillName = isSkillObject ? skill.name : skill;
                        const skillLogo = isSkillObject ? skill.logo : null;
                        
                        return (
                          <motion.div
                            key={skillName}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                            whileHover={{ 
                              scale: 1.05, 
                              boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
                              y: -3
                            }}
                            className="group px-6 py-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-xl backdrop-blur-sm hover:border-blue-400/60 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-500 cursor-pointer"
                          >
                            {skillLogo ? (
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                  <img 
                                    src={skillLogo} 
                                    alt={`${skillName} logo`}
                                    className="w-full h-full object-contain group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all duration-500"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="text-white/90 font-medium group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-500">
                                  {skillName}
                                </span>
                              </div>
                            ) : (
                              <span className="text-white/90 font-medium group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-500">
                                {skillName}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Extra-Curriculars Section */}
          <section id="extracurriculars" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Extra Curricular <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Activities</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Managed committees and clubs, led initiatives, and created meaningful change through diverse leadership roles
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full opacity-30 hidden lg:block" />
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  {extraCurriculars.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className={`relative flex items-center justify-center lg:justify-${index % 2 === 0 ? 'start' : 'end'}`}
                    >
                      {/* Timeline Node */}
                      <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10 hidden lg:block"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Card */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.02, 
                          y: -8,
                          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'} group`}
                      >
                        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                          {/* Background Effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                          
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-start space-x-5 flex-1 min-w-0">
                                <motion.div 
                                  className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex-shrink-0 p-3 sm:p-4 shadow-lg"
                                  whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 12px 30px rgba(59, 130, 246, 0.25)" }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {activity.logo ? (
                                    <img 
                                      src={activity.logo} 
                                      alt={`${activity.organization} logo`}
                                      className="w-full h-full object-contain filter brightness-110 contrast-110"
                                      style={{ 
                                        imageRendering: 'crisp-edges'
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
                                      <span className="text-xs text-white text-center font-medium">
                                        {activity.organization.split(' ').map(word => word[0]).join('')}
                                      </span>
                                    </div>
                                  )}
                                  {/* Subtle glow effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                                <div className="flex-1 min-w-0 pt-1">
                                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight mb-3">
                                    {activity.title}
                                  </h3>
                                  <p className="text-blue-400 font-semibold text-base mb-3">{activity.organization}</p>
                                </div>
                              </div>
                            </div>

                            {/* Duration and Location */}
                            <div className="space-y-3 mb-6 text-sm">
                              <motion.div 
                                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-blue-400/5 border border-blue-400/20 px-4 py-2.5 rounded-xl"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="font-medium text-white/90">{activity.duration}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-purple-400/5 border border-purple-400/20 px-4 py-2.5 rounded-xl"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <span className="font-medium text-white/90">{activity.location}</span>
                              </motion.div>
                            </div>

                            {/* Skills */}
                            <div className="mb-6">
                              <h4 className="text-base font-semibold text-white/90 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                                Key Skills
                              </h4>
                              <div className="flex flex-wrap gap-2.5">
                                {activity.skills.map((skill, skillIndex) => (
                                  <motion.span
                                    key={skillIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                                    whileHover={{ 
                                      scale: 1.05, 
                                      y: -2,
                                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl text-sm text-white/85 border border-white/20 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-purple-400/5 transition-all duration-300 font-medium"
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Flip Button - Dynamic for all cards */}
                          {activity.hasFlipCard && (
                            (activity.id === 2 && !isNSDCFlipped) ||
                            (activity.id === 4 && !isTEDxFlipped) ||
                            (activity.id === 5 && !isTrinityFlipped) ||
                            (activity.id === 7 && !isGDSCFlipped) ||
                            (activity.id === 8 && !isNOVAFlipped)
                          ) && (
                            <motion.button
                              onClick={() => {
                                if (activity.id === 2) handleNSDCFlip();
                                else if (activity.id === 4) handleTEDxFlip();
                                else if (activity.id === 5) handleTrinityFlip();
                                else if (activity.id === 7) handleGDSCFlip();
                                else if (activity.id === 8) handleNOVAFlip();
                              }}
                              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)" }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl z-20"
                            >
                              <RotateCcw className="w-5 h-5" />
                            </motion.button>
                          )}

                          {/* Gallery Overlay - Dynamic for all cards */}
                          {activity.hasFlipCard && (
                            (activity.id === 2 && isNSDCFlipped) ||
                            (activity.id === 4 && isTEDxFlipped) ||
                            (activity.id === 5 && isTrinityFlipped) ||
                            (activity.id === 7 && isGDSCFlipped) ||
                            (activity.id === 8 && isNOVAFlipped)
                          ) && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-2xl z-10 p-4"
                            >
                              <div className="h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-xl font-bold text-white">{activity.organization} Gallery</h3>
                                  <span className="text-sm text-white/60">
                                    {(() => {
                                      if (activity.id === 2) return currentImageIndex + 1;
                                      if (activity.id === 4) return currentTEDxImageIndex + 1;
                                      if (activity.id === 5) return currentTrinityImageIndex + 1;
                                      if (activity.id === 7) return currentGDSCImageIndex + 1;
                                      if (activity.id === 8) return currentNOVAImageIndex + 1;
                                      return 1;
                                    })()} / {activity.galleryImages?.length || 0}
                                  </span>
                                </div>

                                {/* Image Container */}
                                <div className="relative flex-1 bg-white/5 rounded-xl overflow-hidden mb-3">
                                  {activity.galleryImages && activity.galleryImages[(() => {
                                    if (activity.id === 2) return currentImageIndex;
                                    if (activity.id === 4) return currentTEDxImageIndex;
                                    if (activity.id === 5) return currentTrinityImageIndex;
                                    if (activity.id === 7) return currentGDSCImageIndex;
                                    if (activity.id === 8) return currentNOVAImageIndex;
                                    return 0;
                                  })()] && (
                                    <motion.img
                                      key={(() => {
                                        if (activity.id === 2) return currentImageIndex;
                                        if (activity.id === 4) return currentTEDxImageIndex;
                                        if (activity.id === 5) return currentTrinityImageIndex;
                                        if (activity.id === 7) return currentGDSCImageIndex;
                                        if (activity.id === 8) return currentNOVAImageIndex;
                                        return 0;
                                      })()}
                                      src={activity.galleryImages[(() => {
                                        if (activity.id === 2) return currentImageIndex;
                                        if (activity.id === 4) return currentTEDxImageIndex;
                                        if (activity.id === 5) return currentTrinityImageIndex;
                                        if (activity.id === 7) return currentGDSCImageIndex;
                                        if (activity.id === 8) return currentNOVAImageIndex;
                                        return 0;
                                      })()]}
                                      alt={`${activity.organization} gallery ${(() => {
                                        if (activity.id === 2) return currentImageIndex;
                                        if (activity.id === 4) return currentTEDxImageIndex;
                                        if (activity.id === 5) return currentTrinityImageIndex;
                                        if (activity.id === 7) return currentGDSCImageIndex;
                                        if (activity.id === 8) return currentNOVAImageIndex;
                                        return 0;
                                      })() + 1}`}
                                      className={`w-full h-full ${
                                        activity.id === 5 && currentTrinityImageIndex === 0 
                                          ? 'object-cover object-[18%_50%]' 
                                          : 'object-cover'
                                      }`}
                                      initial={{ opacity: 0, scale: 1.1 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.5 }}
                                    />
                                  )}
                                  
                                  {/* Navigation Arrows */}
                                  <motion.button
                                    onClick={() => {
                                      if (activity.id === 2) prevImage();
                                      else if (activity.id === 4) prevTEDxImage();
                                      else if (activity.id === 5) prevTrinityImage();
                                      else if (activity.id === 7) prevGDSCImage();
                                    }}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-purple-600/70 p-3 rounded-full text-white transition-all duration-300"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </motion.button>

                                  <motion.button
                                    onClick={() => {
                                      if (activity.id === 2) nextImage();
                                      else if (activity.id === 4) nextTEDxImage();
                                      else if (activity.id === 5) nextTrinityImage();
                                      else if (activity.id === 7) nextGDSCImage();
                                    }}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-purple-600/70 p-3 rounded-full text-white transition-all duration-300"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </motion.button>
                                </div>

                                {/* Image Indicators */}
                                <div className="flex justify-center gap-2 mb-3">
                                  {activity.galleryImages?.map((_, index) => (
                                    <motion.button
                                      key={index}
                                      onClick={() => {
                                        if (activity.id === 2) setCurrentImageIndex(index);
                                        else if (activity.id === 4) setCurrentTEDxImageIndex(index);
                                        else if (activity.id === 5) setCurrentTrinityImageIndex(index);
                                        else if (activity.id === 7) setCurrentGDSCImageIndex(index);
                                        else if (activity.id === 8) setCurrentNOVAImageIndex(index);
                                      }}
                                      whileHover={{ scale: 1.3 }}
                                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                        index === (() => {
                                          if (activity.id === 2) return currentImageIndex;
                                          if (activity.id === 4) return currentTEDxImageIndex;
                                          if (activity.id === 5) return currentTrinityImageIndex;
                                          if (activity.id === 7) return currentGDSCImageIndex;
                                          if (activity.id === 8) return currentNOVAImageIndex;
                                          return 0;
                                        })()
                                          ? 'bg-purple-400 scale-125' 
                                          : 'bg-white/40 hover:bg-white/60'
                                      }`}
                                    />
                                  ))}
                                </div>

                                {/* Close Button */}
                                <motion.button
                                  onClick={() => {
                                    if (activity.id === 2) handleNSDCFlip();
                                    else if (activity.id === 4) handleTEDxFlip();
                                    else if (activity.id === 5) handleTrinityFlip();
                                    else if (activity.id === 7) handleGDSCFlip();
                                    else if (activity.id === 8) handleNOVAFlip();
                                  }}
                                  whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)" }}
                                  whileTap={{ scale: 0.9 }}
                                  className="self-end bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl"
                                >
                                  <RotateCcw className="w-5 h-5" />
                                </motion.button>
                              </div>
                            </motion.div>
                          )}

                          {/* Hover Border Glow */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  {/* Stats removed for cleaner design */}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Research Publications Section */}
          <section id="publications" className="py-20 bg-gradient-to-b from-black/40 via-gray-900/50 to-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <motion.div
                  className="inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                    Academic Contributions
                  </span>
                </motion.div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Research <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Publications</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Contributing to the advancement of AI and machine learning through peer-reviewed research
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto">
                {publications.map((publication, index) => (
                  <motion.div
                    key={publication.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="mb-8"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02, 
                        y: -8,
                        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group"
                    >
                      {/* Background Effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="grid md:grid-cols-3 gap-8 p-8">
                        {/* Publication Image */}
                        <div className="md:col-span-1">
                          <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 h-64 md:h-full"
                          >
                            <img
                              src={publication.galleryImages ? publication.galleryImages[currentPubImageIndex] : publication.image}
                              alt={publication.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Navigation Arrows */}
                            {publication.galleryImages && publication.galleryImages.length > 1 && (
                              <>
                                <motion.button
                                  onClick={(e) => { e.preventDefault(); prevPubImage(); }}
                                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                                  whileTap={{ scale: 0.9 }}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-purple-600/70 p-2 rounded-full text-white transition-all duration-300 z-10"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                  onClick={(e) => { e.preventDefault(); nextPubImage(); }}
                                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                                  whileTap={{ scale: 0.9 }}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-purple-600/70 p-2 rounded-full text-white transition-all duration-300 z-10"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </motion.button>
                              </>
                            )}
                            
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/80">
                                  <BookOpen className="w-5 h-5" />
                                  <span className="text-sm font-medium">Research Paper</span>
                                </div>
                                {publication.galleryImages && publication.galleryImages.length > 1 && (
                                  <span className="text-xs text-white/60">
                                    {currentPubImageIndex + 1} / {publication.galleryImages.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Publication Details */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                          <div>
                            <motion.h3 
                              className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              {publication.title}
                            </motion.h3>
                            
                            <div className="space-y-2 mb-4">
                              <p className="text-white/70 text-sm">
                                <span className="text-blue-400 font-medium">Authors:</span> {publication.authors}
                              </p>
                              <p className="text-white/70 text-sm">
                                <span className="text-blue-400 font-medium">Published in:</span> {publication.conference}
                              </p>
                              <p className="text-white/70 text-sm">
                                <span className="text-purple-400 font-medium">Publisher:</span> {publication.publisher}
                              </p>
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>{publication.date}</span>
                              </div>
                            </div>

                            <p className="text-white/80 leading-relaxed mb-6">
                              {publication.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-4 relative z-10">
                            <motion.a
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 cursor-pointer relative z-10"
                              style={{ pointerEvents: 'auto' }}
                            >
                              <FileText className="w-5 h-5" />
                              Read Publication
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                          </div>
                        </div>
                      </div>

                      {/* Hover Border Glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto animate-text"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Get In <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
                  </h2>
                  <p className="text-lg text-white/70">
                    Ready to create something amazing together? Let's connect!
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="glass-card p-12 rounded-2xl"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Details */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold mb-8 text-cyan-400">Contact Details</h3>
                      
                      <motion.a
                        href="mailto:hemangini.patel2164@gmail.com"
                        className="flex items-center space-x-4 text-white/70 hover:text-cyan-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Mail className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">hemangini.patel2164@gmail.com</span>
                      </motion.a>
                      
                      <motion.div
                        className="flex items-center space-x-4 text-white/70"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5"
                          whileHover={{ rotate: 15, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <MapPin className="w-6 h-6 text-green-400" />
                        </motion.div>
                        <span className="text-lg">Mumbai, India</span>
                      </motion.div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold mb-8 text-purple-400">Follow Me</h3>
                      
                      <motion.a
                        href="https://www.linkedin.com/in/hemangini21 /"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-blue-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Linkedin className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">LinkedIn</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://github.com/Hemangini21"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-gray-300 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-gray-300/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">GitHub</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://www.instagram.com/hemanginipatel2164/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-pink-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-pink-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Instagram className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">Instagram</span>
                      </motion.a>
                      
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-white/10 backdrop-blur-sm bg-black/40">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <p className="text-white/50">
                  © 2025 Hemangini Patel.
                </p>
              </motion.div>
            </div>
          </footer>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        }
        .glow-button {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        .glass-card {
          background: rgba(17, 24, 39, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}