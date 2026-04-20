import fs from 'fs';
import csv from 'csv-parser';
import { execSync } from 'child_process';
import path from 'path';

const sites = [];
const outputDir = 'generated-sites';

const getCityFromAddress = (addressText) => {
  const parts = addressText.split(',').map((part) => part.trim());
  return parts[1] || 'Your City';
};

const toBrandName = (siteName) => {
  return siteName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const toPhoneHref = (phoneNumber) => `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;

const toRelativePageHref = (href) => {
  if (!href) {
    return './contact.html';
  }

  if (href.startsWith('./')) {
    return href;
  }

  if (href.startsWith('/')) {
    return `.${href}`;
  }

  return `./${href.replace(/^\.?\//, '')}`;
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.createReadStream('sites.csv')
  .pipe(csv())
  .on('data', (data) => sites.push(data))
  .on('end', () => {
    sites.forEach((site, index) => {
      console.log(`Generating site ${index + 1}: ${site.siteName}`);

      // Update clinic.js
      const city = getCityFromAddress(site.addressText);
      const brandName = toBrandName(site.siteName);
      const clinicData = {
        doctorName: site.doctorName,
        specialty: site.specialty,
        heroHeadline: site.heroHeadline,
        subheadline: site.subheadline,
        phone: site.phone,
        email: site.email,
        addressText: site.addressText,
        city,
        name: `${brandName} Dental`,
        shortName: brandName,
        footerTagline: 'Helping patients smile with confidence.',
        ctaLabel: site.ctaLabel,
        ctaLink: toRelativePageHref(site.ctaLink),
        phoneHref: toPhoneHref(site.phone),
        emailHref: `mailto:${site.email}`,
        colors: {
          primary: '#2f89dd',
          primaryDark: '#1f6fc2',
          accent: '#dbeeff',
          surface: '#ffffff'
        },
        services: [
          { title: 'General Dentistry', description: 'Comprehensive check-ups and cleanings.' },
          { title: 'Cosmetic Dentistry', description: 'Teeth whitening and veneers.' },
          { title: 'Orthodontics', description: 'Braces and aligners for straight teeth.' },
          { title: 'Oral Surgery', description: 'Extractions and implants.' }
        ],
        hours: ['Mon-Fri: 9am-6pm', 'Sat: 10am-4pm', 'Sun: Closed'],
        doctorCredentials: ['DDS Degree', '10+ Years Experience', 'Certified Specialist'],
        testimonials: [
          { quote: 'A comfortable, thoughtful dental experience from start to finish.', author: 'Samantha R.' },
          { quote: 'Professional care with a friendly team and clean environment.', author: 'James P.' },
          { quote: 'My smile has never looked better thanks to their attention to detail.', author: 'Lena K.' }
        ],
        trustItems: ['Trusted care', 'Modern technology', 'Family-friendly', 'Convenient scheduling'],
        reasons: [
          { title: 'Gentle Treatment', copy: 'We prioritize your comfort in every appointment.' },
          { title: 'Modern Techniques', copy: 'Updated technology for faster, more effective care.' },
          { title: 'Personalized Plans', copy: 'Individualized recommendations that fit your goals.' },
          { title: 'Calm Environment', copy: 'A relaxed space designed to reduce anxiety.' }
        ],
        aboutText: 'Dedicated to providing exceptional dental care.',
        contactBlurb: 'Get in touch for appointments.',
        pages: {
          home: {
            heroPrimaryCtaLabel: 'Book Appointment',
            heroSecondaryCtaLabel: 'Call Now',
            servicesTitle: 'Our Services',
            servicesCopy: 'We offer a range of dental services.',
            doctorSectionTitle: 'Meet Our Doctor',
            doctorSectionBody: 'Experienced and caring professional.',
            aboutPrimaryCtaLabel: 'Learn More',
            aboutSecondaryCtaLabel: 'Contact Us',
            whyChooseUsTitle: 'Why Choose Us',
            whyChooseUsCopy: 'A thoughtful, modern practice focused on your long-term dental health.',
            testimonialsTitle: 'Patient Stories',
            testimonialsCopy: 'Read what our patients say about their experience.',
            contactTitle: 'Contact Us',
            contactPrimaryCtaLabel: 'Book Now',
            contactSecondaryCtaLabel: 'Call Us'
          },
          about: {
            heroTitle: 'About Our Practice',
            heroCopy: 'We focus on calm, patient-centered care and treatment planning.',
            philosophyTitle: 'Practice Philosophy',
            philosophyCopy: 'Our approach is built around trust, comfort, and long-term results.',
            values: [
              { title: 'Patient Focus', copy: 'Your comfort and goals guide every decision.' },
              { title: 'Clear Communication', copy: 'We explain treatment options in plain language.' },
              { title: 'Lasting Results', copy: 'Care that supports your smile now and years ahead.' }
            ],
            expectTitle: 'What to Expect',
            expectCopy: 'A clear, supportive experience designed to make dental care easy.',
            expectSteps: [
              'Initial consultation and exam',
              'Personalized treatment recommendations',
              'Comfortable care and follow-up support'
            ]
          },
          services: {
            heroTitle: 'Dental Services',
            heroCopy: 'From preventive care to cosmetic procedures, we support your smile goals.',
            processTitle: 'How Care Is Planned',
            processCopy: 'Our process helps you feel confident and informed at every step.',
            processSteps: [
              'Detailed consultation and exam',
              'Customized treatment planning',
              'Comfort-focused care',
              'Ongoing support and follow-up'
            ]
          },
          contact: {
            heroTitle: 'Contact Our Clinic',
            heroCopy: 'Reach out to schedule your next appointment or learn more about services.',
            reuseNote: 'We will help you find a convenient appointment time and answer any questions.'
          }
        }
      };

      fs.writeFileSync('src/data/clinic.js', `export const clinic = ${JSON.stringify(clinicData, null, 2)};`);
      fs.writeFileSync('src/data/clinic.json', JSON.stringify(clinicData, null, 2));

      // Build
      execSync('npm run build', { stdio: 'inherit' });

      // Copy dist to generated-sites/siteName
      const siteDir = path.join(outputDir, site.siteName);
      if (fs.existsSync(siteDir)) {
        fs.rmSync(siteDir, { recursive: true, force: true });
      }
      fs.mkdirSync(siteDir, { recursive: true });
      fs.cpSync('dist', siteDir, { recursive: true });

      console.log(`Site ${site.siteName} generated in ${siteDir}`);
    });

    console.log('All sites generated.');
    console.log('To deploy: Install GitHub CLI (gh) from https://cli.github.com/, run gh auth login, then run the script again with repo creation enabled.');
    console.log('Or manually create repos and push each subfolder.');
  });
