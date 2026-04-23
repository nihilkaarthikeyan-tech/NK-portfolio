export type ProjectType = 'web' | 'ai' | 'hardware' | 'mobile'

export interface Project {
  title: string
  tagline: string
  problem: string
  solution: string
  impact: string
  tags: string[]
  link: string
  type: ProjectType
}

export const projects: Project[] = [
  {
    title: 'Portable Non-Contact Tonometer',
    tagline: 'Home-based IOP monitoring device for glaucoma — final year project',
    problem: 'Glaucoma affects 80M+ people worldwide yet IOP fluctuates throughout the day, peaking outside clinic hours. Clinical tonometers cost ₹3.5–15 Lakh, require anesthesia, corneal contact, and trained personnel — making continuous monitoring impossible for most patients.',
    solution: 'A handheld, battery-powered tonometer using an air-puff solenoid valve + TOF sensor (VL53L0X) to detect corneal applanation non-invasively. An ESP32 calculates IOP, displays it on an OLED, and transmits wirelessly via Bluetooth — all in a 3D-printed enclosure at a total BOM cost of ₹3,430.',
    impact: 'Enables 24/7 home-based IOP monitoring without clinical visits. Accessible to elderly, rural, and immobile patients. Bridges clinical accuracy and home convenience at 1% of the cost of existing devices.',
    tags: ['ESP32', 'Embedded C', 'TOF Sensor', 'Bluetooth', 'Fusion 360', 'Arduino IDE', '3D Printing'],
    link: '#',
    type: 'hardware',
  },
  {
    title: 'AI Lead Generator',
    tagline: 'AI-powered sales prospecting at scale',
    problem: 'Sales teams waste hours manually researching and qualifying leads from multiple sources.',
    solution: 'Built an intelligent pipeline using Next.js + Express that scrapes, scores, and ranks prospects using GPT-powered analysis with real-time dashboards.',
    impact: 'Reduced lead research time by ~70% for target users in early testing.',
    tags: ['Next.js', 'Express.js', 'OpenAI', 'React', 'Tailwind CSS'],
    link: '#',
    type: 'ai',
  },
  {
    title: 'Publicationmart',
    tagline: 'Full-stack academic publishing marketplace',
    problem: 'Authors and publishers lacked a streamlined platform to connect, submit, and manage academic publications.',
    solution: 'Designed and built a full-stack marketplace using Laravel + Inertia.js + React with role-based access, publication workflows, and admin controls.',
    impact: 'End-to-end platform handling submission, review, and publication lifecycle.',
    tags: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'PHP'],
    link: 'https://publicationmart.com/',
    type: 'web',
  },
  {
    title: 'InkMyBook',
    tagline: 'Freelancing marketplace across 700+ service categories',
    problem: 'Finding qualified freelancers across diverse domains — from book editing and scientific writing to web development and patents — is fragmented, slow, and lacks accountability for both clients and professionals.',
    solution: 'Built a full-stack freelancing marketplace where clients post projects, freelancers bid, and work is completed through a secure three-step flow: post → select talent → pay safely. Includes real-time messaging, freelancer verification, dispute resolution, and a safe payment system that releases funds only on client approval.',
    impact: 'Live platform covering 700+ categories including book services, scientific writing, website development, patents & trademarks, design, and SEO — with 24/7 support and verified freelancer profiles.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    link: 'https://inkmybook.com/',
    type: 'web',
  },
  {
    title: 'Digital Signage System',
    tagline: 'Android-based remote digital signage',
    problem: 'Businesses needed a cost-effective way to manage and schedule digital displays remotely without proprietary hardware.',
    solution: 'Built an Android APK with Kotlin + Media3 ExoPlayer that fetches scheduled content from a backend, plays media, and auto-updates via WorkManager.',
    impact: 'Full media scheduling, offline fallback, and remote management on commodity Android hardware.',
    tags: ['Kotlin', 'Media3 ExoPlayer', 'WorkManager', 'Android'],
    link: '#',
    type: 'mobile',
  },
  {
    title: 'Line Follower Robot',
    tagline: 'Autonomous IR-guided navigation system',
    problem: 'Needed a hands-on demonstration of embedded control systems for autonomous path tracking.',
    solution: 'Designed and programmed an Arduino-based robot with dual IR sensors, PID-style motor control, and real-time line detection.',
    impact: 'Achieved reliable path following at competitive speeds in college tech fest.',
    tags: ['Arduino', 'C', 'IR Sensors', 'Robotics', 'Embedded'],
    link: '#',
    type: 'hardware',
  },
  {
    title: 'Hand Gesture Robot',
    tagline: 'Sensor-fused gesture-controlled rover',
    problem: 'Traditional RC robots require a complex controller; gesture control creates an intuitive alternative.',
    solution: 'Built a rover controlled by hand tilt using an accelerometer-based transmitter communicating wirelessly to the robot receiver.',
    impact: 'Demonstrated gesture-to-motion control with <100ms latency.',
    tags: ['Arduino', 'Accelerometer', 'RF Module', 'Robotics'],
    link: '#',
    type: 'hardware',
  },
  {
    title: 'Temp-Controlled Fan',
    tagline: 'Arduino thermoelectric cooling system',
    problem: 'Electronics enclosures suffer thermal throttling due to passive cooling limitations.',
    solution: 'Built a closed-loop temperature control system using a Peltier module + thermistor + PWM fan speed regulation via Arduino.',
    impact: 'Maintained target temperature ±2°C in a closed enclosure.',
    tags: ['Arduino', 'C', 'Peltier Module', 'PWM', 'Temperature Control'],
    link: '#',
    type: 'hardware',
  },
]
