import fs from 'fs';
import csv from 'csv-parser';
import { execSync } from 'child_process';
import path from 'path';

const sites = [];
const outputDir = 'generated-sites';

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
      const clinicData = {
        doctorName: site.doctorName,
        specialty: site.specialty,
        heroHeadline: site.heroHeadline,
        subheadline: site.subheadline,
        phone: site.phone,
        email: site.email,
        addressText: site.addressText,
        ctaLabel: site.ctaLabel,
        ctaLink: site.ctaLink,
        phoneHref: `tel:${site.phone}`,
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
            contactTitle: 'Contact Us',
            contactPrimaryCtaLabel: 'Book Now',
            contactSecondaryCtaLabel: 'Call Us'
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
      execSync(`cp -r dist/* ${siteDir}/`, { stdio: 'inherit' });

      console.log(`Site ${site.siteName} generated in ${siteDir}`);
    });

    console.log('All sites generated.');
    console.log('To deploy: Install GitHub CLI (gh) from https://cli.github.com/, run gh auth login, then run the script again with repo creation enabled.');
    console.log('Or manually create repos and push each subfolder.');
  });