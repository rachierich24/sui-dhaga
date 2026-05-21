import React, { useEffect } from 'react';

const sectionMetadata = {
  default: {
    title: "Sui Dhaga Global | Bespoke Luxury Tailoring & Custom Garments",
    description: "Sui Dhaga Global - Premium bespoke tailoring and luxury fashion. Experience high-fashion artistry, master craftsmanship, and social empowerment.",
    keywords: "bespoke luxury tailoring, premium custom suits, artisanal handmade couture, women-empowered tailoring, fair trade fashion, Sui Dhaga Global"
  },
  process: {
    title: "The Bespoke Process | Sui Dhaga Global Custom Tailoring",
    description: "From digital consultation to the final seam, explore the three-step digital luxury journey of crafting your bespoke garment with Sui Dhaga.",
    keywords: "bespoke tailoring process, digital custom styling, premium silk draping, luxury apparel reveal"
  },
  "how-we-work": {
    title: "Artisan Impact & Fair Trade Craftsmanship | Sui Dhaga Global",
    description: "Empowering artisans from rural Punjab. Discover how Sui Dhaga builds a fair-trade tailoring movement providing full financial autonomy and dignity.",
    keywords: "women empowered atelier, fair trade luxury, rural Punjab artisans, ethical fashion craftsmanship"
  },
  collection: {
    title: "Atelier Artistry & The Collection | Sui Dhaga Global",
    description: "Explore the premium visual gallery of Sui Dhaga Global bespoke garments, where high-fashion strategy meets global opportunity.",
    keywords: "custom couture gallery, premium fashion collection, bespoke velvet strategy, luxury clothing design"
  },
  visionaries: {
    title: "Meet the Visionaries & Founders | Sui Dhaga Global",
    description: "Meet the founders NavneetJit Kaur and Nishi Kant Grover, and the digital team bridging cultural heritage with modern tech bespoke systems.",
    keywords: "Sui Dhaga founders, fashion entrepreneurs, Clare's Law ecosystem, clothing tech visionaries"
  },
  book: {
    title: "Book a Luxury Bespoke Consultation | Sui Dhaga Global",
    description: "Ready to elevate your wardrobe? Schedule a personalized fitting and style consultation with our master designers via WhatsApp.",
    keywords: "book custom tailoring, WhatsApp bespoke fitting, schedule luxury moodboard"
  }
};

const SEO = () => {
  useEffect(() => {
    // 1. Dynamic Scroll-Aware Metadata Tracker
    const sections = ['process', 'how-we-work', 'collection', 'visionaries', 'book'];
    
    const updateMetadata = (sectionKey) => {
      const meta = sectionMetadata[sectionKey] || sectionMetadata.default;
      
      // Update Page Title
      document.title = meta.title;
      
      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', meta.description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        metaDesc.content = meta.description;
        document.head.appendChild(metaDesc);
      }

      // Update Meta Keywords
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (metaKey) {
        metaKey.setAttribute('content', meta.keywords);
      } else {
        metaKey = document.createElement('meta');
        metaKey.name = "keywords";
        metaKey.content = meta.keywords;
        document.head.appendChild(metaKey);
      }

      // Update Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      const cleanUrl = sectionKey === 'default' 
        ? "https://www.suidhagaglobal.com/" 
        : `https://www.suidhagaglobal.com/#${sectionKey}`;
      
      if (canonicalLink) {
        canonicalLink.setAttribute('href', cleanUrl);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = "canonical";
        canonicalLink.href = cleanUrl;
        document.head.appendChild(canonicalLink);
      }

      // Update Open Graph Title & Desc for modern sharing & AI context
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', meta.title);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', meta.description);
    };

    // Callback for intersection observer
    const handleIntersection = (entries) => {
      let activeSection = 'default';
      let maxVisibleRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
          maxVisibleRatio = entry.intersectionRatio;
          activeSection = entry.target.id;
        }
      });

      if (maxVisibleRatio > 0) {
        updateMetadata(activeSection);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center-screen biased trigger
      threshold: [0.1, 0.5]
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe scrollable sections
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe the Hero element
    const heroEl = document.querySelector('.cinematic-hero-section');
    if (heroEl) {
      // Create a dummy identity trigger for default
      heroEl.id = 'default';
      observer.observe(heroEl);
    }

    // 2. Structured Data Schema Injection (JSON-LD)
    const injectSchema = (id, schemaData) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemaData);
    };

    // A. Brand Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.suidhagaglobal.com/#organization",
      "name": "Sui Dhaga Global",
      "url": "https://www.suidhagaglobal.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.suidhagaglobal.com/finalsuidhagalogo.png",
        "caption": "Sui Dhaga Global Logo"
      },
      "description": "Sui Dhaga Global is a bespoke luxury tailoring brand offering custom couture made of premium silks and velvets, empowered by fair trade practices.",
      "sameAs": [
        "https://www.instagram.com/suidhagaglobal",
        "https://www.facebook.com/suidhagaglobal",
        "https://wa.me/61470270478"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+61-470-270-478",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Punjabi"]
      }
    };
    injectSchema('seo-organization-schema', organizationSchema);

    // B. Custom Service / Bespoke Tailor Schema
    const tailorSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.suidhagaglobal.com/#tailorservice",
      "additionalType": "https://schema.org/Tailor",
      "name": "Sui Dhaga Global Bespoke Tailoring",
      "image": "https://www.suidhagaglobal.com/woman.png",
      "telephone": "+61470270478",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "UK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.5074",
        "longitude": "-0.1278"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    };
    injectSchema('seo-tailor-schema', tailorSchema);

    // C. FAQ Schema (Boosts rich search answer visual space)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Sui Dhaga Global's bespoke tailoring process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our bespoke process consists of three main stages: a private digital styling consultation, master artisan stitching with premium materials (silks &amp; velvets), and a luxury garment delivery in our signature black-and-gold package."
          }
        },
        {
          "@type": "Question",
          "name": "Where are Sui Dhaga Global garments crafted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every garment is handcrafted by women artisans in rural Punjab, India. We operate in a fair-trade, safe, and empowering environment where artisans receive living wages and financial autonomy."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a styling consultation with Sui Dhaga Global?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can schedule a wardrobe consultation directly via WhatsApp by clicking our book button, which will connect you directly with our design consultants."
          }
        }
      ]
    };
    injectSchema('seo-faq-schema', faqSchema);

    // D. Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.suidhagaglobal.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "The Collection",
          "item": "https://www.suidhagaglobal.com/#collection"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Bespoke Tailoring",
          "item": "https://www.suidhagaglobal.com/#how-we-work"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Our Process",
          "item": "https://www.suidhagaglobal.com/#process"
        }
      ]
    };
    injectSchema('seo-breadcrumb-schema', breadcrumbSchema);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      ['seo-organization-schema', 'seo-tailor-schema', 'seo-faq-schema', 'seo-breadcrumb-schema'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return null; // Pure functional side-effect component
};

export default SEO;
