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
  seoSections?: {
    heading: string;
    paragraphs?: string[];
    items?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
}

export const TREATMENTS: TreatmentDetail[] = [
  {
    slug: "orthodontics-care",
    tag: "01",
    title: "Orthodontics Care in Whitefield",
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
    ctaQuestion:
      "Want to know if Orthodontic Treatment is the right choice for you?",
    ctaDesc:
      "Book a consultation with our experienced dentists. We'll examine your oral health, answer all your questions, and recommend the best treatment plan for your smile.",
    metaTitle:
      "Orthodontist in Whitefield | Braces & Clear Aligners | Serene Dentistry",
    metaDescription:
      "Straighten your smile with expert orthodontic care — ceramic & metal braces, clear aligners, bite correction, and personalized treatment planning at Serene Dentistry.",
    keywords: [
      "orthodontics",
      "braces",
      "clear aligners",
      "invisalign",
      "bite correction",
      "teeth straightening",
      "orthodontist in Whitefield",
      "braces treatment in Whitefield",
      "clear aligners in Whitefield",
      "teeth alignment treatment Whitefield",
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
    metaTitle:
      "General Dentistry | Preventive & Restorative Care | Serene Dentistry",
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
    title: "Dental Implants in Whitefield",
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
    metaTitle: "Dental Implants in Whitefield, Bangalore | Serene Dentistry",
    metaDescription:
      "Restore missing teeth with strong, natural-looking dental implants — single tooth, multiple teeth, and full mouth implant solutions at Serene Dentistry.",
    keywords: [
      "dental implants in Whitefield",
      "dental implant clinic Whitefield",
      "tooth implant Whitefield",
      "missing tooth replacement Whitefield",
      "full mouth dental implants Whitefield",
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
  {
    slug: "root-canal-treatment-whitefield",
    tag: "08",
    title: "Root Canal Treatment in Whitefield, Bangalore",
    subtitle: "Tooth Pain Treatment & Restorative Care",
    img: new URL("./generaldentistry.png", import.meta.url).href,
    desc: "Root canal treatment can help preserve a tooth affected by infection or inflammation. Your dentist will assess the tooth and explain the most suitable treatment options for your needs.",
    features: [
      "Tooth Pain Evaluation",
      "Root Canal Treatment Planning",
      "Tooth Restoration After RCT",
      "Follow-up Care Guidance",
    ],
    heroParagraphs: [
      "Root canal treatment removes diseased tissue from inside a tooth so it can be cleaned, sealed, and restored where clinically appropriate. At Serene Dentistry, each case begins with an examination and appropriate imaging.",
      "If you have ongoing tooth pain or sensitivity, a timely dental assessment can help identify the cause and prevent the problem from progressing. Treatment recommendations depend on the condition of the tooth and your overall oral health.",
    ],
    checklist: [
      "Tooth Pain – Assessment",
      "Infection – Treatment",
      "Tooth Structure – Preservation",
      "Restoration – Protection",
    ],
    whatWeProvide: {
      heading:
        "Careful assessment and root canal treatment planning for teeth that may be infected or inflamed.",
      desc: "Your dentist will discuss the findings, treatment choices, and restoration needed after the root canal procedure.",
      items: [
        "Dental Examination",
        "Digital Imaging When Needed",
        "Root Canal Treatment",
        "Tooth-Coloured Restoration",
        "Assessment Of Cracked Or Damaged Teeth",
        "Aftercare Guidance",
      ],
    },
    expectedResult: {
      desc: "The aim is to address the source of the problem and preserve the natural tooth when possible. Healing and long-term maintenance vary between patients.",
      items: [
        "A Clearer Diagnosis",
        "Removal Of Infected Tissue",
        "Preservation Of Natural Tooth",
        "Restored Chewing Function",
        "Personalised Follow-up Plan",
      ],
    },
    ctaQuestion: "Have tooth pain or sensitivity that needs attention?",
    ctaDesc:
      "Book an assessment with our dental team to understand the cause and discuss suitable treatment options.",
    metaTitle: "Root Canal Treatment in Whitefield | Serene Dentistry",
    metaDescription:
      "Explore root canal treatment in Whitefield at Serene Dentistry. Get a careful assessment for tooth pain, infection, and restorative care tailored to your needs.",
    keywords: [
      "root canal treatment in Whitefield",
      "root canal dentist Whitefield",
      "RCT treatment Whitefield",
      "tooth pain treatment Whitefield",
      "root canal specialist Whitefield",
    ],
    seoSections: [
      {
        heading: "What is root canal treatment?",
        paragraphs: [
          "Root canal treatment is a procedure used to clean infected or inflamed tissue from inside a tooth. The space is then cleaned, sealed, and restored so the tooth can continue to function when it is suitable to preserve.",
        ],
      },
      {
        heading: "When might it be recommended?",
        paragraphs: [
          "Your dentist may discuss root canal treatment when decay, a crack, trauma, or repeated dental work has affected the pulp inside a tooth. An examination and imaging help determine the diagnosis.",
        ],
      },
      {
        heading: "Common symptoms",
        items: [
          "Persistent toothache",
          "Sensitivity to hot or cold",
          "Pain when biting",
          "Swelling or tenderness around a tooth",
          "A darkened or damaged tooth",
        ],
      },
      {
        heading: "The treatment process",
        paragraphs: [
          "The appointment usually includes examination, local anaesthesia, access to the tooth, cleaning of the canals, sealing, and a planned restoration. The number of visits depends on the tooth and individual clinical needs.",
        ],
      },
      {
        heading: "Recovery and aftercare",
        paragraphs: [
          "Follow the instructions given by your dentist, avoid chewing hard foods on a recently treated tooth until it has been restored as advised, and contact the clinic if symptoms worsen or do not settle.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is root canal treatment suitable for every painful tooth?",
        answer:
          "No. Tooth pain can have several causes. Your dentist will examine the tooth and recommend treatment based on the diagnosis.",
      },
      {
        question: "How long does root canal treatment take?",
        answer:
          "Timing varies with the tooth, infection, and restoration required. Your dentist can explain the expected appointments after assessment.",
      },
      {
        question: "What happens after the root canal?",
        answer:
          "The tooth usually needs a suitable restoration and follow-up care. Your dentist will advise when and how to protect it.",
      },
    ],
  },
  {
    slug: "clear-aligners-whitefield",
    tag: "09",
    title: "Clear Aligners in Whitefield",
    subtitle: "Transparent Teeth Alignment",
    img: new URL("./orthodonticsscare.png", import.meta.url).href,
    desc: "Clear aligner treatment uses a series of removable transparent trays to guide selected teeth into a planned position. Suitability depends on your bite, alignment, and treatment goals.",
    features: [
      "Digital Alignment Assessment",
      "Removable Clear Trays",
      "Progress Reviews",
      "Retainer Planning",
    ],
    heroParagraphs: [
      "Clear aligners may be suitable for some spacing, crowding, and alignment concerns. A dentist or orthodontic provider will assess your teeth and bite before recommending a plan.",
      "Treatment is planned in stages, with each aligner worn as instructed and reviewed at appropriate intervals. Traditional braces may be more suitable for some cases.",
    ],
    checklist: [
      "Alignment – Planning",
      "Bite – Assessment",
      "Trays – Guidance",
      "Retention – Maintenance",
    ],
    whatWeProvide: {
      heading:
        "Thoughtful clear aligner planning for selected teeth alignment concerns.",
      desc: "The consultation focuses on your oral health, bite, goals, and the options available for your particular case.",
      items: [
        "Initial Consultation",
        "Digital Treatment Planning",
        "Clear Aligner Review Visits",
        "Oral Hygiene Guidance",
        "Retainer Planning",
      ],
    },
    expectedResult: {
      desc: "The aim is to improve alignment in a way that fits your clinical needs. Movement, duration, and retention vary between patients.",
      items: [
        "A Personalised Plan",
        "Improved Tooth Alignment",
        "Guided Progress Reviews",
        "Better Understanding Of Options",
        "Retention Advice",
      ],
    },
    ctaQuestion: "Considering clear aligners for your smile?",
    ctaDesc:
      "Book a consultation to discuss whether clear aligners or another orthodontic option may suit your teeth and bite.",
    metaTitle: "Clear Aligners in Whitefield, Bangalore | Serene Dentistry",
    metaDescription:
      "Explore clear aligners in Whitefield, Bangalore at Serene Dentistry. Discuss transparent aligners, teeth alignment, treatment planning, and retainers.",
    keywords: [
      "clear aligners Whitefield",
      "invisible braces Whitefield",
      "transparent aligners Whitefield",
      "teeth alignment Whitefield",
      "clear aligners Whitefield Bangalore",
    ],
    seoSections: [
      {
        heading: "What are clear aligners?",
        paragraphs: [
          "Clear aligners are removable, transparent trays made to guide teeth through a planned series of positions. They are designed for selected cases after an assessment of your teeth and bite.",
        ],
      },
      {
        heading: "Who may be suitable?",
        paragraphs: [
          "Suitability depends on factors such as crowding, spacing, bite, gum health, and treatment goals. Some cases may be better managed with traditional braces or another approach.",
        ],
      },
      {
        heading: "Treatment process",
        items: [
          "Consultation and clinical assessment",
          "Digital planning where appropriate",
          "A series of prescribed aligners",
          "Progress reviews and adjustments",
          "Retainers after active treatment",
        ],
      },
      {
        heading: "Care instructions",
        paragraphs: [
          "Wear aligners as instructed, remove them for eating unless advised otherwise, clean them regularly, and maintain your usual brushing and dental checkups.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are clear aligners better than braces?",
        answer:
          "Neither option is universally better. The appropriate choice depends on your alignment, bite, oral health, and treatment goals.",
      },
      {
        question: "How long does clear aligner treatment take?",
        answer:
          "Duration varies with the complexity of movement and how consistently the aligners are worn. Your provider will estimate timing after assessment.",
      },
      {
        question: "Will I need retainers?",
        answer:
          "Retention is commonly discussed after teeth alignment because teeth can move over time. Your dentist will recommend a suitable plan.",
      },
    ],
  },
  {
    slug: "pediatric-dentist-whitefield",
    tag: "10",
    title: "Pediatric Dental Care in Whitefield",
    subtitle: "Gentle Care for Growing Smiles",
    img: new URL("./hall.jpg", import.meta.url).href,
    desc: "Supportive dental care for children, with age-appropriate checkups, prevention, hygiene guidance, and treatment discussions for growing smiles.",
    features: [
      "Children's Checkups",
      "Cavity Prevention",
      "Hygiene Guidance",
      "Child-Friendly Visits",
    ],
    heroParagraphs: [
      "Regular dental visits help children become familiar with the clinic and allow developing teeth to be monitored. Appointments are adapted to the child’s age, comfort, and needs.",
      "Our team can discuss brushing, diet, fluoride where clinically appropriate, cavities, and ways families can support healthy dental habits at home.",
    ],
    checklist: [
      "Checkups – Prevention",
      "Cavities – Early Care",
      "Hygiene – Guidance",
      "Visits – Confidence",
    ],
    whatWeProvide: {
      heading:
        "Practical preventive and restorative dental support for children and their families.",
      desc: "We take time to explain findings in an age-appropriate way and help parents understand the next steps.",
      items: [
        "Dental Checkups",
        "Cavity Assessment",
        "Preventive Advice",
        "Fluoride Discussion Where Appropriate",
        "Hygiene And Diet Guidance",
        "Referral When Needed",
      ],
    },
    expectedResult: {
      desc: "The goal is to build positive dental routines, identify concerns early, and support healthy development with care suited to each child.",
      items: [
        "Comfortable Familiar Visits",
        "Early Concern Detection",
        "Better Brushing Habits",
        "Family Guidance",
        "Age-Appropriate Care",
      ],
    },
    ctaQuestion: "Looking for a pediatric dentist in Whitefield?",
    ctaDesc:
      "Book a child-friendly dental appointment to discuss checkups, prevention, tooth pain, or any concern about your child’s teeth.",
    metaTitle: "Pediatric Dentist in Whitefield | Kids Dental Care",
    metaDescription:
      "Serene Dentistry offers pediatric dental care in Whitefield, including children's checkups, cavity prevention, hygiene guidance, and family-focused appointments.",
    keywords: [
      "pediatric dentist Whitefield",
      "kids dentist Whitefield",
      "child dentist Whitefield",
      "children dental clinic Whitefield",
      "kids dental care Whitefield",
    ],
    seoSections: [
      {
        heading: "Children's dental checkups",
        paragraphs: [
          "Checkups allow the dentist to monitor primary and permanent teeth, discuss habits, and identify concerns before they become more difficult to manage.",
        ],
      },
      {
        heading: "Preventive care and hygiene",
        paragraphs: [
          "Children benefit from help with brushing technique, fluoride toothpaste, diet, and regular dental visits. Fluoride recommendations depend on age, risk, and clinical assessment.",
        ],
      },
      {
        heading: "When should a child visit a dentist?",
        paragraphs: [
          "A child should be seen if there is tooth pain, swelling, injury, sensitivity, visible decay, or difficulty eating. Routine visits are also useful even when no problem is obvious.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should children have dental checkups?",
        answer:
          "The appropriate interval depends on age, oral health, and risk of cavities. The dentist will recommend a schedule for your child.",
      },
      {
        question: "Should children receive fluoride?",
        answer:
          "Fluoride may be recommended when clinically appropriate. Your dentist will consider the child’s age, exposure, and cavity risk.",
      },
      {
        question: "What if my child is nervous?",
        answer:
          "Tell the team about the concern before the visit. A gradual, age-appropriate approach can help children become more comfortable with dental care.",
      },
    ],
  },
  {
    slug: "wisdom-tooth-extraction-whitefield",
    tag: "11",
    title: "Wisdom Tooth Extraction in Whitefield",
    subtitle: "Evaluation & Surgical Dental Care",
    img: new URL("./oralmaxi.png", import.meta.url).href,
    desc: "Wisdom teeth are assessed individually. When a tooth is impacted, painful, infected, or affecting nearby structures, your dentist can explain monitoring, treatment, or removal options.",
    features: [
      "Wisdom Tooth Assessment",
      "Impaction Evaluation",
      "Surgical Extraction Planning",
      "Recovery Guidance",
    ],
    heroParagraphs: [
      "Wisdom teeth can develop normally, remain partly erupted, or become impacted. An examination and appropriate imaging help determine their position and whether treatment is needed.",
      "Not every wisdom tooth requires removal. Recommendations depend on symptoms, cleaning access, infection, damage, and the tooth’s relationship with surrounding structures.",
    ],
    checklist: [
      "Wisdom Teeth – Review",
      "Impaction – Imaging",
      "Removal – Planning",
      "Recovery – Guidance",
    ],
    whatWeProvide: {
      heading:
        "Careful wisdom tooth evaluation and extraction planning based on your symptoms and dental imaging.",
      desc: "Your dentist will explain the findings, alternatives, expected recovery, and when referral may be appropriate.",
      items: [
        "Clinical Examination",
        "Dental Imaging",
        "Impacted Tooth Assessment",
        "Extraction Planning",
        "Post-Procedure Instructions",
        "Referral When Clinically Needed",
      ],
    },
    expectedResult: {
      desc: "The intended outcome depends on the reason for treatment and the individual procedure. Your dentist will discuss risks, recovery, and follow-up care before proceeding.",
      items: [
        "Clearer Diagnosis",
        "A Personalised Recommendation",
        "Planned Procedure",
        "Recovery Instructions",
        "Follow-up Support",
      ],
    },
    ctaQuestion: "Does a wisdom tooth need evaluation?",
    ctaDesc:
      "Book an appointment to discuss pain, swelling, impaction, or any concern about a wisdom tooth.",
    metaTitle: "Wisdom Tooth Extraction in Whitefield | Serene Dentistry",
    metaDescription:
      "Get a careful assessment for wisdom tooth extraction in Whitefield. Serene Dentistry discusses impacted wisdom teeth, removal options, and aftercare.",
    keywords: [
      "wisdom tooth extraction Whitefield",
      "wisdom tooth removal Whitefield",
      "impacted wisdom tooth Whitefield",
      "tooth extraction Whitefield",
      "wisdom tooth dentist Whitefield",
    ],
    seoSections: [
      {
        heading: "What are wisdom teeth?",
        paragraphs: [
          "Wisdom teeth are the final molars to develop, usually in the late teens or early adulthood. Their position and available space can vary considerably between people.",
        ],
      },
      {
        heading: "Common problems and symptoms",
        items: [
          "Pain or tenderness at the back of the mouth",
          "Swelling or difficulty opening the mouth",
          "Food trapping or gum inflammation",
          "Damage or decay affecting a nearby tooth",
          "Repeated infection around a partly erupted tooth",
        ],
      },
      {
        heading: "Evaluation and extraction process",
        paragraphs: [
          "The dentist will examine the area and may recommend imaging to understand the tooth’s position. If removal is advised, the procedure and anaesthesia options will be explained before treatment.",
        ],
      },
      {
        heading: "Recovery and aftercare",
        paragraphs: [
          "Follow the written instructions provided after extraction, protect the area while it heals, and contact the clinic if you have concerns about bleeding, swelling, pain, or healing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does every wisdom tooth need to be removed?",
        answer:
          "No. Some wisdom teeth can be monitored if they are healthy, functional, and easy to keep clean. The recommendation depends on the individual examination.",
      },
      {
        question: "What is an impacted wisdom tooth?",
        answer:
          "An impacted wisdom tooth is blocked from erupting normally by gum, bone, or another tooth. Imaging helps assess its position.",
      },
      {
        question: "How long is recovery?",
        answer:
          "Recovery varies with the tooth and procedure. Your dentist will provide individual aftercare instructions and explain what to expect.",
      },
    ],
  },
  {
    slug: "teeth-whitening-whitefield",
    tag: "12",
    title: "Professional Teeth Whitening in Whitefield",
    subtitle: "A Brighter, Healthier-Looking Smile",
    img: new URL("./veneers.png", import.meta.url).href,
    desc: "Professional teeth whitening begins with an assessment of your teeth, gums, and the cause of discoloration. Treatment and expected changes vary between patients.",
    features: [
      "Discoloration Assessment",
      "Professional Whitening Options",
      "Sensitivity Guidance",
      "Aftercare Advice",
    ],
    heroParagraphs: [
      "Teeth can darken or stain because of food and drinks, tobacco, age-related changes, medication, or changes within the tooth. A dental assessment helps determine whether whitening is suitable.",
      "Professional whitening is planned around your oral health and goals. Existing fillings, crowns, and veneers may not change colour in the same way as natural teeth.",
    ],
    checklist: [
      "Stains – Assessment",
      "Suitability – Review",
      "Whitening – Planning",
      "Aftercare – Guidance",
    ],
    whatWeProvide: {
      heading:
        "A considered whitening consultation focused on suitability, oral health, and realistic expectations.",
      desc: "Your dentist will discuss the available approach, possible sensitivity, and how existing dental work may respond.",
      items: [
        "Shade And Stain Assessment",
        "Gum And Tooth Check",
        "Professional Whitening Planning",
        "Sensitivity Advice",
        "Aftercare Recommendations",
      ],
    },
    expectedResult: {
      desc: "Whitening can lighten some types of natural tooth discoloration, but the degree and duration of change vary with the cause of staining and daily habits.",
      items: [
        "A Personalised Assessment",
        "Clearer Treatment Expectations",
        "Professional Guidance",
        "Aftercare Plan",
        "Advice On Future Staining",
      ],
    },
    ctaQuestion: "Interested in professional teeth whitening?",
    ctaDesc:
      "Book a consultation to discuss the cause of discoloration and whether professional whitening may suit your smile.",
    metaTitle: "Teeth Whitening in Whitefield, Bangalore | Serene Dentistry",
    metaDescription:
      "Explore professional teeth whitening in Whitefield, Bangalore at Serene Dentistry. Discuss suitability, discoloration, sensitivity, and aftercare.",
    keywords: [
      "teeth whitening Whitefield",
      "professional teeth whitening Whitefield",
      "teeth whitening dentist Whitefield",
      "smile whitening Whitefield",
    ],
    seoSections: [
      {
        heading: "What causes tooth discoloration?",
        paragraphs: [
          "Discoloration may be linked to food and drink, tobacco, ageing, medication, trauma, or changes inside a tooth. Identifying the cause helps set appropriate expectations.",
        ],
      },
      {
        heading: "Professional whitening and suitability",
        paragraphs: [
          "Whitening is generally considered only after the dentist checks for active decay, gum concerns, sensitivity, and restorations. The most suitable approach depends on your examination.",
        ],
      },
      {
        heading: "Treatment and aftercare",
        paragraphs: [
          "Your dentist will explain the planned whitening process and how to manage temporary sensitivity if it occurs. Limiting strongly staining foods and drinks may help maintain the change, though results vary.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will whitening change crowns or veneers?",
        answer:
          "Whitening changes natural tooth structure differently from many restorations. Your dentist can explain how existing dental work may affect the overall shade.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "Results vary with the original cause of discoloration, diet, tobacco use, oral hygiene, and natural changes over time.",
      },
      {
        question: "Can everyone have teeth whitening?",
        answer:
          "Not everyone is an immediate candidate. A dental assessment is needed to check oral health and whether whitening is appropriate.",
      },
    ],
  },
];

export function getTreatmentBySlug(slug: string | undefined) {
  return TREATMENTS.find((t) => t.slug === slug);
}
