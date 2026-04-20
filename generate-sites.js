import fs from "node:fs";
import path from "node:path";
import csv from "csv-parser";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const csvPath = path.join(rootDir, "sites.csv");
const outputDir = path.join(rootDir, "generated-sites");
const clinicJsonPath = path.join(rootDir, "src", "data", "clinic.json");
const perSiteClinicJsonRelativePath = path.join("src", "data", "clinic.json");

const SHARED_IMAGES = {
  logo: "/assets/shared/logo.png",
  hero: "/assets/shared/hero.jpg",
  doctor: "/assets/shared/doctor.jpg",
  gallery: ["/assets/shared/gallery-1.jpg", "/assets/shared/gallery-2.jpg"]
};

const DEFAULT_COPY = {
  footerTagline: "Helping patients smile with confidence.",
  ctaLabel: "Book Now",
  contactBlurb: "Get in touch to schedule an appointment or ask a question.",
  doctorCredentials: ["DDS Degree", "10+ Years Experience", "Patient-Focused Care"],
  testimonials: [
    {
      quote: "A comfortable, thoughtful dental experience from start to finish.",
      author: "Samantha R."
    },
    {
      quote: "Professional care with a friendly team and clear communication.",
      author: "James P."
    },
    {
      quote: "The team made every step easy and reassuring.",
      author: "Lena K."
    }
  ],
  trustItems: ["Trusted care", "Modern technology", "Family-friendly", "Convenient scheduling"],
  reasons: [
    { title: "Gentle Treatment", copy: "We prioritize your comfort in every appointment." },
    { title: "Modern Techniques", copy: "Updated technology for faster, more effective care." },
    { title: "Personalized Plans", copy: "Individualized recommendations that fit your goals." },
    { title: "Calm Environment", copy: "A relaxed space designed to reduce anxiety." }
  ],
  pageCopy: {
    home: {
      heroPrimaryCtaLabel: "Book Appointment",
      heroSecondaryCtaLabel: "Call Now",
      servicesTitle: "Our Services",
      servicesCopy: "We offer a thoughtful range of dental services tailored to your goals.",
      doctorSectionTitle: "Meet Our Doctor",
      doctorSectionBody: "Experienced, attentive care focused on comfort, clarity, and long-term oral health.",
      aboutPrimaryCtaLabel: "Learn More",
      aboutSecondaryCtaLabel: "Contact Us",
      whyChooseUsTitle: "Why Choose Us",
      whyChooseUsCopy: "A modern practice built around patient comfort, clear treatment planning, and dependable care.",
      testimonialsTitle: "Patient Stories",
      testimonialsCopy: "Read what our patients say about their experience.",
      contactTitle: "Contact Us",
      contactPrimaryCtaLabel: "Book Now",
      contactSecondaryCtaLabel: "Call Us"
    },
    about: {
      heroTitle: "About Our Practice",
      heroCopy: "We focus on calm, patient-centered care and treatment planning.",
      philosophyTitle: "Practice Philosophy",
      philosophyCopy: "Our approach is built around trust, comfort, and long-term results.",
      values: [
        { title: "Patient Focus", copy: "Your comfort and goals guide every decision." },
        { title: "Clear Communication", copy: "We explain treatment options in plain language." },
        { title: "Lasting Results", copy: "Care that supports your smile now and years ahead." }
      ],
      expectTitle: "What to Expect",
      expectCopy: "A clear, supportive experience designed to make dental care feel easy.",
      expectSteps: [
        "Initial consultation and exam",
        "Personalized treatment recommendations",
        "Comfortable care and follow-up support"
      ]
    },
    services: {
      heroTitle: "Dental Services",
      heroCopy: "From preventive care to restorative and cosmetic procedures, we support your smile goals.",
      processTitle: "How Care Is Planned",
      processCopy: "Our process helps you feel informed and confident at every step.",
      processSteps: [
        "Detailed consultation and exam",
        "Customized treatment planning",
        "Comfort-focused care",
        "Ongoing support and follow-up"
      ]
    },
    contact: {
      heroTitle: "Contact Our Clinic",
      heroCopy: "Reach out to schedule your next appointment or learn more about services.",
      reuseNote: "We will help you find a convenient appointment time and answer any questions."
    }
  }
};

const REQUIRED_FIELDS = [
  "slug",
  "clinic_name",
  "doctor_name",
  "specialty",
  "city",
  "phone",
  "email",
  "address",
  "cta_link",
  "primary_color",
  "secondary_color",
  "headline",
  "subheadline",
  "services",
  "about",
  "hours",
  "status"
];

const warn = (message) => {
  console.warn(`Warning: ${message}`);
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const removeGitDir = (dirPath) => {
  fs.rmSync(path.join(dirPath, ".git"), { recursive: true, force: true });
};

const toPhoneHref = (phoneNumber) => `tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`;

const toEmailHref = (email) => `mailto:${email}`;

const slugToName = (slug) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const splitServices = (value) =>
  String(value)
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((title) => ({
      title,
      description: `${title} delivered with clear guidance and patient-first care.`
    }));

const splitHours = (value) =>
  String(value)
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean);

const normalizeRow = (row) => {
  const normalized = {};

  for (const [key, value] of Object.entries(row)) {
    normalized[key.trim()] = typeof value === "string" ? value.trim() : value;
  }

  return normalized;
};

const rowLabel = (row, index) => row.slug || row.clinic_name || `row ${index + 2}`;

const validateRow = (row, index) => {
  const missingFields = REQUIRED_FIELDS.filter((field) => !row[field]);

  if (missingFields.length > 0) {
    warn(`Skipping ${rowLabel(row, index)} because it is missing: ${missingFields.join(", ")}`);
    return false;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) {
    warn(`Skipping ${rowLabel(row, index)} because slug "${row.slug}" is invalid`);
    return false;
  }

  const services = splitServices(row.services);
  if (services.length === 0) {
    warn(`Skipping ${rowLabel(row, index)} because services is empty after parsing "|" separators`);
    return false;
  }

  return true;
};

const buildClinicData = (row) => {
  const shortName = row.clinic_name || `${slugToName(row.slug)} Dental`;
  const services = splitServices(row.services);
  const hours = splitHours(row.hours);

  return {
    doctorName: row.doctor_name,
    specialty: row.specialty,
    heroHeadline: row.headline,
    subheadline: row.subheadline,
    phone: row.phone,
    email: row.email,
    addressText: row.address,
    city: row.city,
    name: row.clinic_name,
    shortName,
    footerTagline: DEFAULT_COPY.footerTagline,
    ctaLabel: DEFAULT_COPY.ctaLabel,
    ctaLink: row.cta_link,
    phoneHref: toPhoneHref(row.phone),
    emailHref: toEmailHref(row.email),
    colors: {
      primary: row.primary_color,
      primaryDark: row.primary_color,
      accent: row.secondary_color,
      surface: "#ffffff"
    },
    images: SHARED_IMAGES,
    services,
    hours: hours.length > 0 ? hours : [row.hours],
    doctorCredentials: DEFAULT_COPY.doctorCredentials,
    testimonials: DEFAULT_COPY.testimonials,
    trustItems: DEFAULT_COPY.trustItems,
    reasons: DEFAULT_COPY.reasons,
    aboutText: row.about,
    contactBlurb: DEFAULT_COPY.contactBlurb,
    pages: DEFAULT_COPY.pageCopy
  };
};

const writeJson = (filePath, data) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
};

const buildSite = (slug) => {
  execSync("npm run build", {
    cwd: rootDir,
    stdio: "inherit",
    env: {
      ...process.env,
      SITE_SLUG: slug
    }
  });
  removeGitDir(path.join(rootDir, "dist"));
};

const copyBuildOutput = (slug, clinicData) => {
  const siteDir = path.join(outputDir, slug);

  fs.rmSync(siteDir, { recursive: true, force: true });
  ensureDir(siteDir);
  fs.cpSync(path.join(rootDir, "dist"), siteDir, { recursive: true });
  removeGitDir(siteDir);
  fs.rmSync(path.join(siteDir, "assets", "shared"), { recursive: true, force: true });
  writeJson(path.join(siteDir, perSiteClinicJsonRelativePath), clinicData);
};

const rows = [];
const originalClinicJson = fs.readFileSync(clinicJsonPath, "utf8");

if (!fs.existsSync(csvPath)) {
  console.error(`Missing ${path.relative(rootDir, csvPath)}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
ensureDir(outputDir);

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row) => rows.push(normalizeRow(row)))
  .on("end", () => {
    let readyCount = 0;
    let generatedCount = 0;
    let mainSiteRestored = false;

    try {
      rows.forEach((row, index) => {
        if (String(row.status).toLowerCase() !== "ready") {
          return;
        }

        readyCount += 1;

        if (!validateRow(row, index)) {
          return;
        }

        const clinicData = buildClinicData(row);

        console.log(`Generating ${row.slug}...`);
        writeJson(clinicJsonPath, clinicData);
        buildSite(row.slug);
        copyBuildOutput(row.slug, clinicData);
        generatedCount += 1;
      });
    } finally {
      fs.writeFileSync(clinicJsonPath, originalClinicJson);
      execSync("npm run build", {
        cwd: rootDir,
        stdio: "inherit",
        env: process.env
      });
      removeGitDir(path.join(rootDir, "dist"));
      mainSiteRestored = true;
    }

    console.log(`Finished generating ${generatedCount} site(s) from ${readyCount} ready row(s).`);
    if (generatedCount === 0) {
      warn("No sites were generated.");
    }
    if (!mainSiteRestored) {
      warn("The main site build was not restored.");
    }
  })
  .on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
