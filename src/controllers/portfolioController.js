// ── Portfolio Data — Frontend components-இல் உள்ள data-வை backend-ல் வைக்கிறோம்
// ── Future-ல் DB connect பண்ண இதை மட்டும் மாற்றினால் போதும்

const projects = [
  {
    id: 1,
    number: '01',
    title: 'E-Portal — Internship Management System',
    stack: ['Django', 'Python', 'MySQL'],
    description:
      'Role-based dashboards, attendance tracking, auto-certificates, and JWT-secured REST APIs for a full intern lifecycle system managing 200+ interns end-to-end.',
    image: '/assets/work-1.jpg',
    category: 'Full Stack',
  },
  {
    id: 2,
    number: '02',
    title: 'Hanvith Jobs — Job Portal',
    stack: ['JavaScript', 'Bootstrap'],
    description:
      'A full-featured job portal with employer and candidate dashboards, live listings, and application tracking.',
    image: '/assets/work-2.jpg',
    category: 'Frontend',
  },
  {
    id: 3,
    number: '03',
    title: 'Live Customer App — 1000+ Users/Day',
    stack: ['React', 'Node.js'],
    description:
      'Built live customer app with React.js frontend + Node.js backend for 1000+ users/day. Delivered production features in Agile team with 99.9% uptime.',
    image: '/assets/work-3.jpg',
    category: 'Full Stack',
  },
]

const experiences = [
  {
    id: 1,
    year: '2024',
    role: 'Junior Full Stack Developer',
    company: 'Techvolt Software Pvt. Ltd.',
    description:
      'Built scalable full-stack apps with Python/Django/MySQL handling 500+ daily users. Designed REST APIs with JWT auth, integrated Node.js services reducing backend latency by 25%.',
    type: 'work',
  },
  {
    id: 2,
    year: '2025',
    role: 'Junior Web Developer',
    company: 'Magiva Technologies',
    description:
      'Built live customer app with React.js frontend + Node.js backend for 1000+ users/day. Delivered production features in Agile team with 99.9% uptime.',
    type: 'work',
  },
  {
    id: 3,
    year: '2024',
    role: 'B.Tech — Information Technology',
    company: 'Excel Engineering College, Tamil Nadu',
    description:
      'Graduated with CGPA 8.4. Specialized in web application development and backend system design.',
    type: 'education',
  },
  {
    id: 4,
    year: '2026',
    role: 'Freelance Developer',
    company: 'Open to Remote / Hybrid',
    description:
      'Available for selective collaborations across full stack development, API design, and web projects.',
    type: 'freelance',
  },
]

const testimonials = [
  {
    id: 1,
    quote:
      'It was great working with you on this project. Communication was clear, feedback was helpful, and the entire process went smoothly. Happy to be part of bringing your idea to life. Looking forward to more collaborations in the future.',
    name: 'Moovendhan',
    company: 'KMS Deccors',
    initials: 'M',
    rating: 5,
  },
]

const services = [
  { id: 1, title: 'Full Stack Development', icon: '⚡', description: 'End-to-end web applications with React frontend and Node.js/Django backend.' },
  { id: 2, title: 'REST API Design', icon: '🔗', description: 'Scalable, JWT-secured APIs with clean architecture and proper documentation.' },
  { id: 3, title: 'Database Design', icon: '🗄️', description: 'Efficient schema design for MySQL and other relational databases.' },
  { id: 4, title: 'UI / Frontend', icon: '🎨', description: 'Responsive, performant UIs with React, Tailwind CSS and modern tooling.' },
]

// ── Controllers ───────────────────────────────────────────────────────────────

exports.getProjects = (req, res) => {
  res.json({ success: true, data: projects, count: projects.length })
}

exports.getProject = (req, res) => {
  const project = projects.find((p) => p.id === parseInt(req.params.id))
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
  res.json({ success: true, data: project })
}

exports.getExperiences = (req, res) => {
  const { type } = req.query // ?type=work | education | freelance
  const data = type ? experiences.filter((e) => e.type === type) : experiences
  res.json({ success: true, data, count: data.length })
}

exports.getTestimonials = (req, res) => {
  res.json({ success: true, data: testimonials, count: testimonials.length })
}

exports.getServices = (req, res) => {
  res.json({ success: true, data: services, count: services.length })
}
