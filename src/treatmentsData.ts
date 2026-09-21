// ─── Treatment family data ──────────────────────────────────────────────────
// Shared by the homepage "Our Treatments" section, the header mega-menu, and
// the individual treatment detail pages so content stays in sync everywhere.

export interface TreatmentDetail {
  slug: string;
  tag: string;
  title: string;
  subtitle?: string;
  img: string;
  desc: string;
  features: string[];
  heroParagraphs: string[];
  checklist: string[];
  whatWeProvide: { heading: string; desc: string; items: string[] };
  expectedResult: { desc: string; items: string[] };
  ctaQuestion: string;
  ctaDesc: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const TREATMENTS: TreatmentDetail[] = [
  {
    slug: "orthodontics-care",
    tag: "01",
    title: "Orthodontics Care",
    subtitle: "Aligners & Braces",
    img: new URL("./orthodonticsscare.png", import.meta.url).href,
    desc: "Personalized orthodontic care designed to improve alignment, function, and facial harmony through modern treatment solutions tailored to every smile.",
    features: [
      "Clear Aligners",
      "Ceramic & Metal Braces",
      "Digital Treatment Planning",
      "Retainers & Smile Maintenance",
    ],
    heroParagraphs: [
      "Achieve a straighter, healthier smile with our advanced orthodontic treatments. We provide personalized solutions to correct misaligned teeth, bite issues, and jaw irregularities using modern braces and clear aligners. Our treatment plans are designed to improve both the appearance and function of your smile while ensuring long-term oral health and comfort.",
      "Using advanced diagnostic technology and precise treatment planning, we deliver predictable, effective results tailored to your unique dental needs. Throughout your orthodontic journey, our experienced specialists provide continuous care and guidance to ensure a comfortable experience and a confident, lasting smile.",
    ],
    checklist: [
      "Teeth Alignment – Precision",
      "Bite Correction – Function",
      "Smile Enhancement – Confidence",
      "Jaw Alignment – Balance",
    ],
    whatWeProvide: {
      heading:
        "Advanced orthodontic care with personalized treatment for straighter teeth, healthier bites, and confident smiles.",
      desc: "Advanced orthodontic care with personalized treatment for straighter teeth, healthier bites, and confident smiles.",
      items: [
        "Metal Braces Treatment",
        "Ceramic Braces Treatment",
        "Clear Aligner Therapy",
        "Bite Correction Solutions",
        "Jaw Alignment Care",
        "Retainer Maintenance Program",
        "Personalized Orthodontic Planning",
      ],
    },
    expectedResult: {
      desc: "Experience a beautifully aligned smile with improved bite function, enhanced facial aesthetics, and lasting confidence through customized orthodontic treatment.",
      items: [
        "Straighter Well-Aligned Teeth",
        "Corrected Bite Alignment",
        "Improved Oral Function",
        "Enhanced Facial Profile",
        "Confident Beautiful Smile",
        "Better Long-Term Stability",
        "Healthier Teeth And Gums",
      ],
    },
    ctaQuestion: "Want to know if Orthodontic Treatment is the right choice for you?",
    ctaDesc:
      "Book a consultation with our experienced dentists. We'll examine your oral health, answer all your questions, and recommend the best treatment plan for your smile.",
    metaTitle: "Orthodontics Care | Braces & Clear Aligners | Serene Dentistry",
    metaDescription:
      "Straighten your smile with expert orthodontic care — ceramic & metal braces, clear aligners, bite correction, and personalized treatment planning at Serene Dentistry.",
    keywords: [
      "orthodontics",
      "braces",
      "clear aligners",
      "invisalign",
      "bite correction",
      "teeth straightening",
      "orthodontist near me",
    ],
  },
  {
    slug: "digital-smile-designing",
    tag: "02",
    title: "Digital Smile Designing",
    img: new URL("./digital.png", import.meta.url).href,
    desc: "Every exceptional smile begins with thoughtful planning. Our digital smile design process combines facial aesthetics, precision, and technology to create smiles that are uniquely yours.",
    features: [
      "Facial Smile Analysis",
      "Digital Smile Simulation",
      "Smile Makeover Planning",
      "Personalized Treatment Design",
    ],
    heroParagraphs: [
      "Visualize your perfect smile before treatment even begins. Our digital smile design process uses advanced facial and dental analysis to plan a smile that's balanced, natural, and uniquely yours.",
      "By combining photography, 3D simulation, and precise measurements, we create a personalized blueprint for your transformation — giving you confidence in the outcome before we begin any treatment.",
    ],
    checklist: [
      "Facial Analysis – Balance",
      "Smile Simulation – Preview",
      "Treatment Mapping – Precision",
      "Makeover Planning – Confidence",
    ],
    whatWeProvide: {
      heading:
        "Comprehensive digital planning combining facial aesthetics, simulation, and precision technology for smiles designed uniquely around you.",
      desc: "Comprehensive digital planning combining facial aesthetics, simulation, and precision technology for smiles designed uniquely around you.",
      items: [
        "Facial Smile Analysis",
        "3D Digital Smile Simulation",
        "Smile Makeover Planning",
        "Personalized Treatment Design",
        "Photographic Smile Mapping",
        "Bite & Symmetry Assessment",
        "Treatment Outcome Preview",
      ],
    },
    expectedResult: {
      desc: "See your new smile before it happens, then experience the confidence of a treatment plan built entirely around your features and goals.",
      items: [
        "A Smile Matched To Your Face",
        "Clear Treatment Roadmap",
        "Predictable, Natural Results",
        "Reduced Treatment Surprises",
        "Higher Confidence In Your Plan",
        "Faster, More Efficient Visits",
        "A Smile You Helped Design",
      ],
    },
    ctaQuestion: "Curious what your new smile could look like?",
    ctaDesc:
      "Book a digital smile design consultation and see a preview of your transformation before treatment begins.",
    metaTitle: "Digital Smile Designing | Smile Simulation | Serene Dentistry",
    metaDescription:
      "Preview your new smile before treatment with digital smile design — facial analysis, 3D simulation, and personalized smile makeover planning at Serene Dentistry.",
    keywords: [
      "digital smile design",
      "smile simulation",
      "smile makeover planning",
      "facial smile analysis",
      "cosmetic dentistry planning",
    ],
  },
  {
    slug: "general-dentistry",
    tag: "03",
    title: "General Dentistry",
    img: new URL("./generaldentistry.png", import.meta.url).href,
    desc: "Healthy smiles begin with prevention. From routine care to restorative treatments, we help preserve your oral health through precise, minimally invasive dentistry.",
    features: [
      "Preventive Dental Care",
      "Professional Teeth Cleaning",
      "Tooth Coloured Fillings",
      "Root Canal Treatment",
    ],
    heroParagraphs: [
      "Healthy smiles begin with prevention. Our general dentistry services combine routine care with restorative treatments to protect your oral health at every stage of life.",
      "From regular cleanings to fillings and root canal therapy, our gentle, minimally invasive approach helps you avoid complex problems later — keeping your teeth and gums strong for years to come.",
    ],
    checklist: [
      "Preventive Care – Protection",
      "Professional Cleaning – Hygiene",
      "Tooth Fillings – Restoration",
      "Root Canal – Relief",
    ],
    whatWeProvide: {
      heading:
        "Comprehensive preventive and restorative dentistry to protect your oral health and catch issues before they become serious.",
      desc: "Comprehensive preventive and restorative dentistry to protect your oral health and catch issues before they become serious.",
      items: [
        "Routine Dental Checkups",
        "Professional Teeth Cleaning",
        "Tooth Coloured Fillings",
        "Root Canal Treatment",
        "Oral Cancer Screening",
        "Gum Disease Treatment",
        "Digital X-Ray Diagnostics",
      ],
    },
    expectedResult: {
      desc: "Enjoy a healthier mouth, fresher breath, and fewer dental emergencies with consistent preventive care and precise restorative treatment.",
      items: [
        "Healthier Teeth And Gums",
        "Fewer Cavities Over Time",
        "Fresher, Cleaner Breath",
        "Early Problem Detection",
        "Reduced Risk Of Emergencies",
        "Stronger Restored Teeth",
        "Long-Term Oral Wellness",
      ],
    },
    ctaQuestion: "Ready for a healthier, more confident smile?",
    ctaDesc:
      "Schedule a general dentistry checkup and let our team help you stay ahead of any oral health concerns.",
    metaTitle: "General Dentistry | Preventive & Restorative Care | Serene Dentistry",
    metaDescription:
      "Comprehensive general dentistry — checkups, cleanings, fillings, and root canal treatment focused on prevention and long-term oral health at Serene Dentistry.",
    keywords: [
      "general dentistry",
      "preventive dental care",
      "teeth cleaning",
      "tooth fillings",
      "root canal treatment",
      "dental checkup",
    ],
  },
  {
    slug: "dental-implants",
    tag: "04",
    title: "Dental Implants",
    img: new URL("./implants.png", import.meta.url).href,
    desc: "Restore missing teeth with implant solutions designed for strength, stability, and long-term success. Every treatment is planned for seamless, natural-looking results.",
    features: [
      "Single Tooth Implants",
      "Multiple Teeth Replacement",
      "Full Mouth Implants",
      "Implant Supported Prostheses",
    ],
    heroParagraphs: [
      "Restore missing teeth with implant solutions built for strength, stability, and a natural look. Our implant treatments replace both the tooth root and crown for lasting function.",
      "Whether you need a single implant or a full mouth restoration, every treatment is carefully planned using advanced imaging to ensure a seamless, long-term result you can rely on.",
    ],
    checklist: [
      "Single Implants – Precision",
      "Full Arch Options – Stability",
      "Bone Integration – Strength",
      "Natural Look – Confidence",
    ],
    whatWeProvide: {
      heading:
        "Strong, natural-looking implant solutions designed for long-term function, comfort, and confidence in your smile.",
      desc: "Strong, natural-looking implant solutions designed for long-term function, comfort, and confidence in your smile.",
      items: [
        "Single Tooth Implants",
        "Multiple Teeth Replacement",
        "Full Mouth Implants",
        "Implant Supported Prostheses",
        "Bone Grafting & Preparation",
        "3D Implant Planning",
        "Same-Day Implant Options",
      ],
    },
    expectedResult: {
      desc: "Enjoy the comfort and confidence of a permanent tooth replacement that looks, feels, and functions like your natural teeth.",
      items: [
        "Permanent Tooth Replacement",
        "Improved Chewing Function",
        "Natural Facial Appearance",
        "No Slipping Or Discomfort",
        "Preserved Jawbone Health",
        "Long-Term Durability",
        "Renewed Smile Confidence",
      ],
    },
    ctaQuestion: "Wondering if dental implants are right for you?",
    ctaDesc:
      "Book a consultation to explore implant options tailored to your needs and get a personalized treatment plan.",
    metaTitle: "Dental Implants | Permanent Tooth Replacement | Serene Dentistry",
    metaDescription:
      "Restore missing teeth with strong, natural-looking dental implants — single tooth, multiple teeth, and full mouth implant solutions at Serene Dentistry.",
    keywords: [
      "dental implants",
      "tooth replacement",
      "full mouth implants",
      "implant supported dentures",
      "missing teeth solution",
    ],
  },
  {
    slug: "veneers-laminates",
    tag: "05",
    title: "Veneers & Laminates",
    img: new URL("./veneers.png", import.meta.url).href,
    desc: "Subtle enhancements create lasting impressions. Our veneers and laminates are crafted to enhance your smile while preserving a naturally beautiful appearance.",
    features: [
      "Porcelain Veneers",
      "Ultra Thin Laminates",
      "Smile Makeovers",
      "Minimal Preparation Dentistry",
    ],
    heroParagraphs: [
      "Subtle enhancements can create a lasting impression. Our porcelain veneers and ultra-thin laminates are crafted to enhance the shape, colour, and symmetry of your smile.",
      "Using minimal preparation techniques, we preserve as much of your natural tooth structure as possible while delivering a beautifully refined, natural-looking result.",
    ],
    checklist: [
      "Porcelain Veneers – Beauty",
      "Ultra Thin Laminates – Subtlety",
      "Smile Makeovers – Transformation",
      "Minimal Prep – Preservation",
    ],
    whatWeProvide: {
      heading:
        "Custom-crafted veneers and laminates designed to enhance your smile while preserving your natural tooth structure.",
      desc: "Custom-crafted veneers and laminates designed to enhance your smile while preserving your natural tooth structure.",
      items: [
        "Porcelain Veneers",
        "Ultra Thin Laminates",
        "Composite Veneers",
        "Smile Makeover Design",
        "Minimal Preparation Dentistry",
        "Colour & Shape Customisation",
        "Long-Lasting Cosmetic Finish",
      ],
    },
    expectedResult: {
      desc: "Reveal a naturally beautiful, symmetrical smile that enhances your features while feeling completely comfortable and authentic.",
      items: [
        "Brighter, Symmetrical Smile",
        "Natural-Looking Results",
        "Stain Resistant Surface",
        "Improved Tooth Shape & Size",
        "Minimal Tooth Reduction",
        "Long-Lasting Cosmetic Results",
        "Renewed Smile Confidence",
      ],
    },
    ctaQuestion: "Curious if veneers are right for your smile?",
    ctaDesc:
      "Book a cosmetic consultation to explore veneer and laminate options tailored to your smile goals.",
    metaTitle: "Veneers & Laminates | Porcelain Veneers | Serene Dentistry",
    metaDescription:
      "Enhance your smile with porcelain veneers and ultra-thin laminates — minimal preparation cosmetic dentistry for a naturally beautiful result at Serene Dentistry.",
    keywords: [
      "porcelain veneers",
      "dental laminates",
      "smile makeover",
      "cosmetic dentistry",
      "minimal prep veneers",
    ],
  },
  {
    slug: "oral-maxillofacial-surgery",
    tag: "06",
    title: "Oral & Maxillofacial Surgery",
    img: new URL("./oralmaxi.png", import.meta.url).href,
    desc: "Advanced surgical care delivered with meticulous planning, modern techniques, and a strong focus on comfort, safety, and predictable outcomes.",
    features: [
      "Wisdom Tooth Removal",
      "Surgical Extractions",
      "Impacted Teeth Treatment",
      "Jaw Corrective Surgery",
    ],
    heroParagraphs: [
      "Our oral and maxillofacial surgery services address complex dental and facial conditions with meticulous planning and advanced surgical techniques.",
      "From wisdom tooth removal to corrective jaw surgery, our team prioritises patient comfort, safety, and predictable outcomes at every stage of treatment.",
    ],
    checklist: [
      "Wisdom Teeth – Removal",
      "Surgical Extractions – Precision",
      "Jaw Surgery – Correction",
      "Impacted Teeth – Treatment",
    ],
    whatWeProvide: {
      heading:
        "Advanced surgical care delivered with precision, modern techniques, and a strong focus on patient comfort and safety.",
      desc: "Advanced surgical care delivered with precision, modern techniques, and a strong focus on patient comfort and safety.",
      items: [
        "Wisdom Tooth Removal",
        "Surgical Tooth Extractions",
        "Impacted Teeth Treatment",
        "Jaw Corrective Surgery",
        "Facial Trauma Care",
        "Pre-Prosthetic Surgery",
        "Sedation & Comfort Options",
      ],
    },
    expectedResult: {
      desc: "Recover comfortably with reduced pain and complications, restored oral function, and a foundation ready for further treatment if needed.",
      items: [
        "Relief From Pain Or Impaction",
        "Improved Jaw Function",
        "Faster, Guided Recovery",
        "Reduced Risk Of Complications",
        "Restored Facial Symmetry",
        "Better Prosthetic Foundation",
        "Long-Term Oral Health",
      ],
    },
    ctaQuestion: "Need expert care for a complex dental issue?",
    ctaDesc:
      "Book a consultation with our oral surgery specialists to discuss your condition and the best treatment approach.",
    metaTitle:
      "Oral & Maxillofacial Surgery | Wisdom Teeth & Jaw Surgery | Serene Dentistry",
    metaDescription:
      "Expert oral and maxillofacial surgery — wisdom tooth removal, surgical extractions, and jaw corrective surgery performed with precision and care.",
    keywords: [
      "oral surgery",
      "maxillofacial surgery",
      "wisdom tooth removal",
      "jaw surgery",
      "surgical extraction",
      "impacted teeth",
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    tag: "07",
    title: "Full Mouth Rehabilitation",
    img: new URL("./fullmouth.png", import.meta.url).href,
    desc: "Comprehensive rehabilitation that restores function, aesthetics, and confidence through carefully coordinated treatment planning designed for long-term oral health.",
    features: [
      "Full Mouth Reconstruction",
      "Bite Rehabilitation",
      "Worn Teeth Restoration",
      "Comprehensive Treatment Planning",
    ],
    heroParagraphs: [
      "Full mouth rehabilitation restores function, aesthetics, and confidence for patients with extensive dental wear, damage, or multiple missing teeth.",
      "Through carefully coordinated treatment planning, we combine restorative, cosmetic, and surgical techniques to rebuild a fully functional, healthy smile.",
    ],
    checklist: [
      "Full Reconstruction – Function",
      "Bite Rehabilitation – Balance",
      "Worn Teeth – Restoration",
      "Treatment Planning – Precision",
    ],
    whatWeProvide: {
      heading:
        "Comprehensive, carefully coordinated treatment planning that rebuilds function, aesthetics, and long-term oral health.",
      desc: "Comprehensive, carefully coordinated treatment planning that rebuilds function, aesthetics, and long-term oral health.",
      items: [
        "Full Mouth Reconstruction",
        "Bite Rehabilitation",
        "Worn Teeth Restoration",
        "Comprehensive Treatment Planning",
        "Crown & Bridge Restoration",
        "Implant-Supported Rehabilitation",
        "Occlusal (Bite) Correction",
      ],
    },
    expectedResult: {
      desc: "Experience a fully restored smile with balanced bite function, renewed aesthetics, and lasting confidence in your everyday life.",
      items: [
        "Fully Restored Bite Function",
        "Renewed Smile Aesthetics",
        "Reduced Tooth Wear & Sensitivity",
        "Improved Chewing Comfort",
        "Long-Term Structural Stability",
        "Balanced Facial Support",
        "Lasting Confidence & Comfort",
      ],
    },
    ctaQuestion: "Ready to fully restore your smile?",
    ctaDesc:
      "Book a comprehensive consultation to build a personalized full mouth rehabilitation plan tailored to your needs.",
    metaTitle:
      "Full Mouth Rehabilitation | Complete Smile Restoration | Serene Dentistry",
    metaDescription:
      "Comprehensive full mouth rehabilitation — restore function, aesthetics, and confidence through coordinated restorative and cosmetic treatment planning.",
    keywords: [
      "full mouth rehabilitation",
      "full mouth reconstruction",
      "bite rehabilitation",
      "smile restoration",
      "worn teeth treatment",
    ],
  },
];

export function getTreatmentBySlug(slug: string | undefined) {
  return TREATMENTS.find((t) => t.slug === slug);
}
