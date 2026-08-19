import { Project, SkillCategory, ChapterInfo, ExperienceLog, HonorAward, LinguisticCapability } from '../types';

export const DEVELOPER_PROFILE = {
  name: "Abdellah Bichlifen",
  shortName: "Abdellah",
  title: "Machine Learning MSc Student & Software Engineer",
  subtitle: "Full-Stack Web Development, Interactive GUIs, Databases & Intelligent Systems",
  tagline: "Machine Learning MSc Student at Pázmány Péter Catholic University (Pázmány ITK) and Software Engineer based in Budapest, Hungary, bridging full-stack web development, interactive GUIs, database-driven backends, and intelligent systems.",
  heroSubtitle: "Machine Learning MSc Student at Pázmány Péter Catholic University (Pázmány ITK) & Software Engineer based in Budapest, Hungary.",
  email: "Abdellahbichlifen@gmail.com",
  formspreeEndpoint: "https://formspree.io/f/xeajpzvn",
  resumeUrl: "https://resume-60bb3.web.app/",
  linkedin: "https://linkedin.com/in/abdellah-bichlifen",
  github: "https://github.com/Abdellah-Bi",
  location: "Budapest, Hungary",
  timezone: "Europe/Budapest (CET)",
  imageUrl: "/assets/Profile_Img.png",
  fallbackImageUrl: "/assets/Profile_Img.png",
  backgroundVideoUrl: "/Vid.mp4",
  statusTags: [
    "Machine Learning MSc",
    "Software Engineer",
    "Pázmány ITK",
    "SH Scholar"
  ],
  experienceYears: "Applied Software & Intelligent Systems",
  bio: "Machine Learning MSc Student at Pázmány Péter Catholic University (Pázmány ITK) and Software Engineer based in Budapest, Hungary, bridging full-stack web development, interactive GUIs, database-driven backends, and intelligent systems.",
  pillars: [
    {
      title: "Full-Stack & Database-Driven Systems",
      latin: "Machina Scalabilis",
      desc: "Building high-performance web platforms, real-time WebSocket state synchronization, and robust database architectures with MySQL, MongoDB, and PostgreSQL.",
      stat: "React, Express & Databases",
      statLabel: "Full-Stack Web & Data"
    },
    {
      title: "Machine Learning & Econometrics",
      latin: "Ars Predictiva",
      desc: "Developing hedonic pricing models, gradient boosting pipelines (XGBoost), spatial econometrics, and clean analytical data pipelines.",
      stat: "XGBoost & Python",
      statLabel: "Predictive Analytics & ML"
    },
    {
      title: "Embedded Systems & Interactive GUIs",
      latin: "Ars Systematis",
      desc: "Architecting low-latency microcontroller firmware in C/C++, sensor fusion (sonar & IR arrays), system diagnostics, and interactive GUI tooling.",
      stat: "C/C++, Python & AVR",
      statLabel: "Firmware & Interactive GUIs"
    }
  ]
};

export const EXPERIENCE_LOGS: ExperienceLog[] = [
  {
    title: "Software Engineer",
    organization: "Diamond Diagnostics",
    period: "03/2026 – Present",
    location: "Budapest, Hungary",
    tag: "Active Mission",
    responsibilities: [
      "Software and firmware engineering for high-precision diagnostic and laboratory instrumentation.",
      "Deterministic data processing, sensor and hardware communication, and system diagnostics.",
      "Real-time diagnostic algorithms and telemetry monitoring for clinical analysis systems."
    ]
  },
  {
    title: "Operations Manager & Chef",
    organization: "Hoff House",
    period: "2024 – 2026",
    location: "Budapest, Hungary",
    tag: "Operations & Leadership",
    responsibilities: [
      "Purchasing orders, inventory receiving, and supplier coordination to ensure seamless operations.",
      "Staff scheduling, team shift planning, and kitchen workforce coordination.",
      "Event handling, organization, and hospitality management for private functions and venue gatherings."
    ]
  },
  {
    title: "Website Admin & Developer",
    organization: "Rental Car Co",
    period: "2023 – 2024",
    location: "Agadir, Morocco",
    tag: "Production Delivery",
    responsibilities: [
      "Booking optimization and customer conversion funnel re-architecture.",
      "System performance tuning, database indexing, and query optimization.",
      "Full-stack maintenance, responsive UI enhancements, and server reliability management."
    ]
  },
  {
    title: "International E-commerce Manager",
    organization: "eBay Store",
    period: "2018 – 2020",
    location: "EU / US Markets",
    tag: "Operations & Scale",
    responsibilities: [
      "Cross-border storefront operations managing high-volume international listings.",
      "Client relations, dispute resolution workflows, and high customer satisfaction ratings.",
      "Inventory automation, fulfillment synchronization, and dynamic pricing strategy."
    ]
  }
];

export const HONORS_ARCHIVE: HonorAward[] = [
  {
    title: "Talent Day 1st Place",
    year: "2022",
    award: "1st Place Laureate",
    field: "Autonomous Navigation",
    description: "Awarded top honors for engineering an autonomous obstacle avoidance mobile robot featuring real-time sensor fusion and PID motor steering."
  },
  {
    title: "Scientific Conference 3rd Place",
    year: "2021",
    award: "3rd Place Podium",
    field: "Computer Vision",
    description: "Recognized for innovative machine vision research and spatial feature extraction methodologies presented at international academic symposium."
  },
  {
    title: "Stipendium Hungaricum Scholar (Pázmány ITK)",
    year: "BSc & MSc",
    award: "Full Academic Funding",
    field: "Higher Education Scholarship",
    description: "Awarded prestigious Hungarian governmental scholarship covering full tuition, research stipend, and academic funding for Machine Learning and Computer Science at Pázmány Péter Catholic University (Pázmány ITK)."
  }
];

export const TECHNICAL_PROTOCOLS = [
  { name: "C / C++", level: 90, category: "Low-Level & Embedded", desc: "Firmware, Memory Management, Microcontroller I/O" },
  { name: "Python", level: 88, category: "Data & Machine Learning", desc: "Scikit-Learn, XGBoost, Pandas, Matplotlib, NumPy" },
  { name: "Arduino / Embedded", level: 85, category: "Hardware & Robotics", desc: "AVR, Adafruit Motor Shield, PWM, HC-SR04, FC-51 IR" },
  { name: "Linux", level: 82, category: "Operating Systems", desc: "Kernel Tooling, Bash, Process Scheduling, Systemd" },
  { name: "Java / SQL", level: 80, category: "Enterprise & Databases", desc: "OOP, PostgreSQL, Schema Normalization, Query Tuning" },
  { name: "PHP / Web", level: 75, category: "Web Engineering", desc: "Full-Stack Development, REST Endpoints, Server Scripts" }
];

export const LINGUISTIC_CAPABILITIES: LinguisticCapability[] = [
  { language: "Arabic", proficiency: "Native Tongue", level: 100, type: "Native", note: "Mother tongue & literary proficiency" },
  { language: "Tachlhit (Berber)", proficiency: "Native Heritage", level: 100, type: "Native", note: "Indigenous North African mother language" },
  { language: "English", proficiency: "C1 Advanced Professional", level: 90, type: "Advanced", note: "Full academic & technical working fluency" },
  { language: "French", proficiency: "B2 Intermediate Working", level: 75, type: "Intermediate", note: "Technical & professional communication" }
];

export const CHAPTERS: ChapterInfo[] = [
  {
    id: "hero",
    numeral: "PROLOGUE",
    title: "The Renaissance Codex",
    latinTitle: "Principium Volatus",
    summary: "Takeoff and entry into the engineering atelier of Abdellah Bichlifen in Budapest.",
    progressRange: [0, 0.15]
  },
  {
    id: "atelier",
    numeral: "CHAPTER I",
    title: "The Atelier & Archive",
    latinTitle: "Officina & Chronicon",
    summary: "Engineering pillars, Diamond Diagnostics career log, and academic honors.",
    progressRange: [0.15, 0.40]
  },
  {
    id: "workshop",
    numeral: "CHAPTER II",
    title: "The Workshop & Matrix",
    latinTitle: "Artes Mechanicae",
    summary: "Technical protocols (C/C++, Python, Embedded, Linux, SQL) and linguistic mastery.",
    progressRange: [0.40, 0.65]
  },
  {
    id: "masterworks",
    numeral: "CHAPTER III",
    title: "The Masterworks",
    latinTitle: "Opus Magnum",
    summary: "Featured engineering projects: Project NAN, Hedonic ML Modeling, and Autonomous Unit.",
    progressRange: [0.65, 0.88]
  },
  {
    id: "dispatch",
    numeral: "CHAPTER IV",
    title: "The Dispatch",
    latinTitle: "Epistola & Inscriptio",
    summary: "Direct communication uplink, live Budapest CET clock, and resume access.",
    progressRange: [0.88, 1.0]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Embedded & Hardware Systems",
    latinName: "Ars Microcontroller",
    iconName: "Cpu",
    description: "Low-latency C/C++ firmware, AVR microcontroller register manipulation, sensor fusion, and actuator timing.",
    skills: [
      {
        name: "C / C++ & AVR",
        level: 90,
        experience: "Core Specialty",
        focus: "Deterministic loop timing, memory safety, pointer mechanics, interrupt routines",
        codeSnippet: `// Microcontroller Sensor Polling ISR
ISR(TIMER1_COMPA_vect) {
  uint16_t echo_us = read_ultrasonic_echo_us();
  pid_compute_steering(&pid_controller, echo_us, TARGET_CLEARANCE_CM);
}`
      },
      {
        name: "Arduino & Motor Actuation",
        level: 85,
        experience: "Hardware Systems",
        focus: "Adafruit Motor Shield v2.3, PWM speed ramping, HC-SR04 sonar, FC-51 IR arrays",
        codeSnippet: `AF_DCMotor motorLeft(1);
motorLeft.setSpeed(210);
if (irLeftTriggered && !irRightTriggered) {
  evadeObstacle(STEER_RIGHT, 350);
}`
      },
      {
        name: "Real-time Diagnostic Algorithms",
        level: 88,
        experience: "Diamond Diagnostics",
        focus: "Real-time error boundary detection, automated calibration, sensor drift correction",
        codeSnippet: `void calibrate_diagnostic_sensor(SensorBus* bus) {
  float baseline = sample_median_filter(bus, 64);
  bus->offset_mv = calculate_polynomial_drift(baseline);
}`
      }
    ]
  },
  {
    title: "Machine Learning & Spatial Data",
    latinName: "Ars Predictiva",
    iconName: "BrainCircuit",
    description: "Predictive econometric models, gradient boosting algorithms, feature importance ranking, and statistical pipelines.",
    skills: [
      {
        name: "Python & Scikit-Learn",
        level: 88,
        experience: "MSc Specialization",
        focus: "Data preprocessing, cross-validation, hyperparameter grid search, pipeline tuning",
        codeSnippet: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import RobustScaler
model = Pipeline([('scaler', RobustScaler()), ('xgb', XGBRegressor(n_estimators=500, learning_rate=0.03))])`
      },
      {
        name: "XGBoost & Hedonic Econometrics",
        level: 92,
        experience: "Advanced Modeling",
        focus: "Spatial weight matrices, feature attribution (Income 52%, Location 31%), residual diagnostics",
        codeSnippet: `import xgboost as xgb
importance = model.get_booster().get_score(importance_type='gain')
# Top Driver: Median Income (0.52), Lat/Lon Spatial Coordinates (0.31)`
      },
      {
        name: "Pandas & Matplotlib Visualization",
        level: 86,
        experience: "Analytics",
        focus: "Multivariate exploratory analysis, geospatial mapping, error distribution plots",
        codeSnippet: `df['price_per_room'] = df['median_house_value'] / df['total_rooms']
plt.scatter(df['longitude'], df['latitude'], c=df['predicted_price'], cmap='cividis')`
      }
    ]
  },
  {
    title: "Full-Stack & Distributed Data",
    latinName: "Machina Scalabilis",
    iconName: "Server",
    description: "High-concurrency web applications, relational schemas in PostgreSQL, in-memory Redis caching, and real-time WebSockets.",
    skills: [
      {
        name: "React 18 & Modern UI",
        level: 85,
        experience: "Frontend Architect",
        focus: "Component composition, reactive state hooks, WebSocket consumers, Tailwind styling",
        codeSnippet: `const { lastMessage } = useWebSocket('/ws/kitchen-stream');
const liveOrders = useMemo(() => parseOrderBuffer(lastMessage), [lastMessage]);`
      },
      {
        name: "Node.js, Express & WebSockets",
        level: 86,
        experience: "Backend Services",
        focus: "Asynchronous I/O, REST endpoints, bidirectional socket dispatch, token auth",
        codeSnippet: `io.on('connection', (socket) => {
  socket.on('ORDER_TRANSMIT', async (payload) => {
    await redis.lpush('kitchen_queue', JSON.stringify(payload));
    io.emit('KITCHEN_STATE_UPDATE', payload);
  });
});`
      },
      {
        name: "PostgreSQL & Redis",
        level: 82,
        experience: "Database Admin",
        focus: "Relational integrity, JSONB records, write-through caching, connection pooling",
        codeSnippet: `CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id INT NOT NULL,
  state VARCHAR(32) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
      },
      {
        name: "Linux & System Optimization",
        level: 82,
        experience: "Infrastructure",
        focus: "Bash scripting, process supervision, server tuning, resource telemetry",
        codeSnippet: `systemctl status diamond-diag.service
journalctl -u diamond-diag -f --lines=100`
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-nan",
    number: "OPUS I",
    title: "Project NAN (Full-Stack Web & Brand System)",
    subtitle: "Dining, Ordering & Kitchen Display Synchronization Platform",
    period: "Featured Opus",
    role: "Lead Full-Stack Developer & Systems Architect",
    imageUrl: "/assets/NAN_project.png",
    fallbackImageUrl: "/assets/NAN_project.png",
    description: "Dining, ordering, and kitchen display synchronization web platform with real-time WebSockets, robust database management, and responsive interfaces.",
    longDescription: "Engineered a full-scale restaurant operations platform uniting guest digital ordering with kitchen display systems (KDS). Features bidirectional WebSocket synchronization, sub-18ms Redis cache invalidation, structured database transaction management across MySQL, MongoDB, and PostgreSQL, and a responsive North African aesthetic brand system.",
    metrics: [
      { label: "Sync Latency", value: "< 18 ms" },
      { label: "Throughput", value: "1,200 orders/hr" },
      { label: "Cache Hit Rate", value: "99.4%" },
      { label: "Architecture", value: "Full-Stack Web" }
    ],
    tags: ["React", "Express", "MySQL", "MongoDB", "PostgreSQL", "Redis", "Socket.io", "Tailwind CSS"],
    features: [
      "Real-time bidirectional WebSocket order dispatch and kitchen prep queue",
      "In-memory Redis message broker for instant order state notifications",
      "Multi-database relational and document management (MySQL, MongoDB, PostgreSQL)",
      "Responsive North African Restaurant aesthetic UI with custom table management"
    ],
    architecture: {
      frontend: "React, Tailwind CSS, Lucide UI, WebSocket State Stream",
      backend: "Express REST API with Socket.io cluster",
      database: "MySQL, MongoDB & PostgreSQL with Redis write-through cache",
      cloud: "Dockerized deployment with reverse proxy & load balancer"
    },
    demoUrl: "https://github.com/Abdellah-Bi/NAN",
    githubUrl: "https://github.com/Abdellah-Bi/NAN",
    previewType: "nan"
  },
  {
    id: "hedonic-price-modeling",
    number: "OPUS II",
    title: "Hedonic Price Modeling & Data Pipelines",
    subtitle: "Real Estate Spatial Econometric Valuation Engine",
    period: "ML Engineering Opus",
    role: "Machine Learning Engineer & Data Scientist",
    imageUrl: "/assets/front_ML.png",
    fallbackImageUrl: "/assets/front_ML.png",
    description: "Real estate spatial econometric valuation engine using gradient boosting algorithms, paired with clean analytical data pipelines and persistent storage.",
    longDescription: "Constructed an econometric hedonic price prediction system on California housing distributions. Formulates multi-scale spatial features (latitude/longitude coordinates, median income, housing age, and structural room density) with gradient boosted regression trees, yielding strong R² generalization, clean analytical data pipelines, and persistent storage.",
    metrics: [
      { label: "Income Weight", value: "52%" },
      { label: "Spatial Weight", value: "31%" },
      { label: "Model Algorithm", value: "XGBoost Regressor" },
      { label: "Data Pipeline", value: "Scikit-Learn / MySQL" }
    ],
    tags: ["XGBoost", "Python", "Scikit-Learn", "Pandas", "MySQL", "Spatial Econometrics"],
    features: [
      "Gradient boosted tree regression (XGBoost) trained on multi-variable housing attributes",
      "Spatial econometric feature extraction identifying geographic price elasticity",
      "Feature importance ranking: Income (52%), Location (31%), Structure (11%), Age (6%)",
      "Analytical data pipelines and persistent database storage with MySQL"
    ],
    architecture: {
      frontend: "Interactive visualization widget with SVG California spatial map",
      backend: "Python / Scikit-Learn / XGBoost inference pipeline",
      database: "MySQL database storage normalized with Pandas DataFrames",
      cloud: "Serialized model artifacts with high-performance inference"
    },
    demoUrl: "https://resume-60bb3.web.app/",
    githubUrl: "https://github.com/Abdellah-Bi",
    previewType: "hedonic"
  },
  {
    id: "autonomous-unit",
    number: "OPUS III",
    title: "Autonomous Unit",
    subtitle: "Autonomous Vehicle Chassis & Obstacle-Avoidance 4WD Robotics",
    period: "Robotics & Software Opus",
    role: "Software Engineer",
    imageUrl: "/assets/car_img.png",
    fallbackImageUrl: "/assets/car_img.png",
    galleryImages: [
      {
        url: "/assets/car_img.png",
        label: "Autonomous Vehicle Chassis",
        caption: "Physical 4-wheel robotic vehicle chassis with ultrasonic pan bracket & dual IR edge detectors"
      },
      {
        url: "/assets/circuit.png",
        label: "Hardware & Circuit Schematic",
        caption: "AVR Microcontroller, Adafruit Motor Shield v2.3 & sensor fusion wiring diagram"
      }
    ],
    description: "Obstacle-avoidance 4WD mobile robot with sensor fusion, accompanied by robust control software and interface tooling.",
    longDescription: "Developed deterministic microcontroller firmware and interactive control software for a 4-wheel robotic vehicle capable of autonomous obstacle detection and navigation. Integrates an HC-SR04 ultrasonic rangefinder mounted on a sweeping servo bracket, dual FC-51 infrared proximity line sensors, and PWM motor drivers accompanied by interactive GUI diagnostics.",
    metrics: [
      { label: "Loop Latency", value: "< 5 ms" },
      { label: "Sonar Range", value: "2 cm - 400 cm" },
      { label: "Sensors", value: "HC-SR04 + Dual FC-51" },
      { label: "Control", value: "AVR + GUI Tooling" }
    ],
    tags: ["C / C++", "Python", "AVR Microcontrollers", "System Diagnostics", "Adafruit Shield", "GUI"],
    features: [
      "Low-latency ultrasonic sonar ping sweep measuring forward obstacle clearance",
      "Dual Left & Right FC-51 infrared proximity sensors for close-quarter edge detection",
      "Adafruit Motor Shield v2.3 4-channel DC motor control with smooth PWM speed ramping",
      "Interactive GUI tooling and real-time telemetry diagnostics"
    ],
    architecture: {
      frontend: "Interactive GUI control interface & real-time telemetry visualizer",
      backend: "C/C++ firmware compiled for AVR ATmega328P + Python diagnostic tooling",
      database: "Embedded EEPROM parameter storage for calibration constants",
      cloud: "Serial / Bluetooth telemetry uplink for remote monitor"
    },
    demoUrl: "https://resume-60bb3.web.app/",
    githubUrl: "https://github.com/Abdellah-Bi",
    previewType: "autonomous"
  }
];

export const CODEX_QUOTES = [
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    latin: "Simplicitas est summa perfectio."
  },
  {
    quote: "Study the science of art. Study the art of science. Develop your senses — especially learn how to see. Realize that everything connects to everything else.",
    author: "Leonardo da Vinci",
    latin: "Omnia inter se conexa sunt."
  },
  {
    quote: "He who loves practice without theory is like the sailor who boards ship without a rudder and compass.",
    author: "Leonardo da Vinci",
    latin: "Sine theoria, praxis caeca est."
  }
];

