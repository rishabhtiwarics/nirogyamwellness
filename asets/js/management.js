/* ============================================================
   management.js
   The old dossier-section IntersectionObserver script has been
   removed along with the commented-out .ldr/.dossier markup and
   CSS. This file now only renders the Founder Members marquee.
   ============================================================ */
(function () {
  const track = document.getElementById('v1-track');
  if (!track) return;

  const founderMembers = [
    {
      name: "Dr. Sunil Garg", role: "Health Consultant (Ph.D. in Skin Psoriasis)", permanent: false,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202026-05-31%20at%208.49.28%20PM.jpeg"
    },
    {
      name: "Seema Goyal", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/NH557496_image.jpg"
    },
    {
      name: "Ramesh Chandra Singh", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202026-05-10%20at%209.35.16%20AM.jpeg"
    },
    {
      name: "Harender Kumar", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202026-05-10%20at%2010.27.28%20AM.jpeg"
    },
    {
      name: "Manjitrao Bhoite", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/dbff7bc1-478f-49e8-a71d-4f22b3a2720a.jpg"
    },
    {
      name: "Dr. Ajay Upadhyay", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202024-06-19%20at%2008.49.58_9eada674.jpg"
    },
    {
      name: "Mr. Prem Nath Gupta", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/MANJITRAO%20BHOITE%20Maharastra.jpeg"
    },
    {
      name: "Mr. Dinesh Chandra Patel Surat", role: "Permanent Founder Member", permanent: true,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202023-12-05%20at%2012.04.44_bea63c5f.jpg"
    },
    {
      name: "Sapna", role: "Founder Member", permanent: false,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202023-10-28%20at%202.47.04%20PM.jpeg"
    },
    {
      name: "Debendra Nath Mohanta", role: "Founder Member", permanent: false,
      img: "https://www.nirogyamwellness.com/uploads/management/Untitled%20design%20(6).png"
    },
    {
      name: "Arun Singh Nayak", role: "Founder Member", permanent: false,
      img: "https://www.nirogyamwellness.com/uploads/management/WhatsApp%20Image%202024-08-10%20at%2014.12.51_ef8f2a5b.jpg"
    }
  ];

  function founderCardHTML(m) {
    return `
      <div class="v1-card">
        <div class="v1-photo"><img src="${m.img}" alt="${m.name}" loading="lazy"></div>
        <div class="v1-name">${m.name}</div>
        <div class="v1-role${m.permanent ? ' is-permanent' : ''}">${m.role}</div>
      </div>
    `;
  }

  /* Duplicate the group once so translateX(-50%) loops seamlessly —
     same technique as .hero-marquee__track / .cert-track. */
  const group = founderMembers.map(founderCardHTML).join('');
  track.innerHTML = `
    <div class="v1-group">${group}</div>
    <div class="v1-group">${group}</div>
  `;
})();