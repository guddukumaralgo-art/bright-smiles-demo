import clinicData from "./clinic.json";

const phoneHref = `tel:${clinicData.phone.replace(/[^\d+]/g, "")}`;
const emailHref = `mailto:${clinicData.email}`;
const addressLines = Array.isArray(clinicData.address) ? clinicData.address : [clinicData.address].filter(Boolean);

export const clinic = {
  ...clinicData,
  addressLines,
  addressText: addressLines.join(", "),
  phoneHref,
  emailHref
};
