import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, BadgeCheck, Users, Globe, Award } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'UX Designer at Google',
    initials: 'SM',
    rating: 5,
    text: 'ProResume transformed my job search. The templates are incredibly polished and the real-time editor made it so easy to fine-tune every detail. Landed my dream role within weeks!',
    gradient: 'from-violet-500 to-indigo-600',
    verified: true,
  },
  {
    name: 'James Rodriguez',
    role: 'Software Engineer',
    initials: 'JR',
    rating: 5,
    text: 'Built my resume in under 10 minutes. The real-time preview is a game-changer — I could see exactly how my resume would look while editing. Highly recommended for developers!',
    gradient: 'from-cyan-500 to-blue-600',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager at Adobe',
    initials: 'PS',
    rating: 5,
    text: "I've tried many resume builders but ProResume stands out with its clean design and ATS-optimized templates. The export quality is superb — my recruiters were impressed.",
    gradient: 'from-amber-500 to-orange-600',
    verified: true,
  },
  {
    name: 'Alex Chen',
    role: 'Data Scientist at Meta',
    initials: 'AC',
    rating: 5,
    text: 'Clean, professional, and ATS-friendly. Got 3 interview calls within the first week of sending out my ProResume-built CV. The best free resume tool out there.',
    gradient: 'from-emerald-500 to-teal-600',
    verified: true,
  },
  {
    name: 'Emily Watson',
    role: 'Product Manager at Stripe',
    initials: 'EW',
    rating: 5,
    text: 'The export quality is fantastic. My recruiter specifically complimented my resume layout. ProResume makes you look like you hired a professional designer.',
    gradient: 'from-pink-500 to-rose-600',
    verified: true,
  },
  {
    name: 'David Kim',
    role: 'Full Stack Developer',
    initials: 'DK',
    rating: 5,
    text: 'As a developer, I appreciate the attention to detail. The multiple template options, instant PDF export, and the overall UX are top-tier. This is how tools should be built.',
    gradient: 'from-indigo-500 to-purple-600',
    verified: true,
  },
  {
    name: 'Olivia Martinez',
    role: 'HR Director at Netflix',
    initials: 'OM',
    rating: 5,
    text: "From the recruiter's side, resumes built with ProResume genuinely stand out. The formatting is clean, consistent, and ATS-optimized. I recommend it to every candidate.",
    gradient: 'from-fuchsia-500 to-pink-600',
    verified: true,
  },
  {
    name: 'Raj Patel',
    role: 'DevOps Engineer at AWS',
    initials: 'RP',
    rating: 5,
    text: 'I was skeptical about free tools, but ProResume blew me away. The templates look premium, the builder is fast, and the PDF output is pixel-perfect. 10/10 would recommend.',
    gradient: 'from-sky-500 to-cyan-600',
    verified: true,
  },
  {
    name: 'Lisa Thompson',
    role: 'Graphic Designer',
    initials: 'LT',
    rating: 5,
    text: "As a designer, I'm picky about aesthetics. ProResume's templates are beautifully balanced with perfect typography and whitespace. Finally, a resume builder with taste!",
    gradient: 'from-rose-500 to-red-600',
    verified: false,
  },
  {
    name: 'Michael Brown',
    role: 'Project Manager at Microsoft',
    initials: 'MB',
    rating: 5,
    text: 'Created resumes for my entire team during a restructure. ProResume saved us hours of formatting headaches. The batch workflow with demo data is incredibly efficient.',
    gradient: 'from-teal-500 to-emerald-600',
    verified: true,
  },
  {
    name: 'Ananya Gupta',
    role: 'Frontend Developer',
    initials: 'AG',
    rating: 5,
    text: 'Love how responsive the builder is! Works perfectly on my laptop and even on my tablet. The live preview with template switching is addictive — I made 3 versions!',
    gradient: 'from-purple-500 to-violet-600',
    verified: false,
  },
  {
    name: 'Chris Anderson',
    role: 'Startup Founder',
    initials: 'CA',
    rating: 5,
    text: "Used ProResume for my YC application. The clean, professional output helped me present my background with confidence. Worth every second — and it's free. Unbelievable.",
    gradient: 'from-orange-500 to-amber-600',
    verified: true,
  },
];

const row1 = reviews.slice(0, 6);
const row2 = reviews.slice(6, 12);

const StarRating = ({ rating }) => (
  <div className="testimonial-card-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={13}
        className={i < rating ? 'text-amber-400 fill-amber-400' : ''}
        style={{ color: i < rating ? '#fbbf24' : '#e2e8f0', fill: i < rating ? '#fbbf24' : 'none' }}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="testimonial-card">
    {/* Stars */}
    <StarRating rating={review.rating} />

    {/* Review text */}
    <p className="testimonial-text">
      &ldquo;{review.text}&rdquo;
    </p>

    {/* User info */}
    <div className="testimonial-user">
      <div
        className="testimonial-avatar"
        style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))' }}
      >
        {review.initials}
      </div>
      <div className="testimonial-meta">
        <div className="testimonial-user-name">
          <span>{review.name}</span>
          {review.verified && (
            <BadgeCheck size={14} className="testimonial-verified-badge" />
          )}
        </div>
        <p className="testimonial-user-role">{review.role}</p>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 35 }) => {
  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${direction}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((review, idx) => (
          <ReviewCard key={`a-${idx}`} review={review} />
        ))}
      </div>
      <div
        className={`marquee-track ${direction}`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {items.map((review, idx) => (
          <ReviewCard key={`b-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-orbs">
        <div style={{ position: 'absolute', top: '-40px', left: '25%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.03)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', right: '25%', width: '500px', height: '500px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.03)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      </div>

      <div>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-badge">
            <Star size={12} className="fill-primary" style={{ color: 'var(--primary-color)' }} />
            Trusted by Thousands
          </span>
          <h2 className="font-outfit section-title">
            Loved by Job Seekers{' '}
            <span className="gradient-text">
              Worldwide
            </span>
          </h2>
          <p className="section-desc">
            See what our users have to say about building their dream resumes with ProResume.
          </p>
        </motion.div>

        {/* Marquee Rows */}
        <div className="marquee-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MarqueeRow items={row1} direction="left" speed={40} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MarqueeRow items={row2} direction="right" speed={45} />
          </motion.div>
        </div>

        {/* Social proof stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="stats-row container"
        >
          {[
            { icon: <Users size={20} />, value: '50,000+', label: 'Resumes Created' },
            { icon: <Star size={20} style={{ color: '#fbbf24', fill: '#fbbf24' }} />, value: '4.9/5', label: 'Average Rating' },
            { icon: <Globe size={20} />, value: '120+', label: 'Countries' },
            { icon: <Award size={20} />, value: '#1', label: 'Free Builder' },
          ].map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
