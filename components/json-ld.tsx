import { site } from "@/content/site";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Product Manager & Founder",
    description: site.tagline,
    almamater: {
      "@type": "EducationalOrganization",
      name: site.education.school,
    },
    sameAs: [
      site.linkedin,
      site.instagram,
    ].filter(Boolean),
    knowsAbout: [
      "Product Management",
      "Business Strategy",
      "Full Stack Engineering",
      "User Experience Design",
      "Artificial Intelligence",
      "E-Commerce",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
