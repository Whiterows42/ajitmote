import { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return `Available commands:
  help        - Show this help message
  about       - Learn about me
  contact     - Get my contact information
  skills      - View my technical skills
  projects    - See my recent projects
  experience  - View my work experience
  education   - Check my educational background
  social      - Find me on social media
  resume      - Download my resume
  clear       - Clear the terminal
  whoami      - Display current user
  ls          - List directory contents
  pwd         - Show current directory
  date        - Show current date and time
  neofetch    - Display system information
  matrix      - Enter the matrix... 
  hack        - Initiate hacking sequence
  exit        - Exit terminal`;
      }
    },
    about: {
      description: 'Learn about me',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                        ABOUT ME                            │
├─────────────────────────────────────────────────────────────┤
│ Name: Ajit Raghunath Mote                                  │
│ Role: Full Stack Developer                                 │
│ Location: Sangola, Solapur, India                         │
│ Date of Birth: 20/10/2002                                 │
│ Languages: English, Hindi, Marathi                        │
│                                                           │
│ I am looking forward to join a progressive organization.   │
│ I have high level of personal morals and integrity.       │
│ I am Goal oriented, self-motivated and committed to the   │
│ successful outcome of the project. I am willing to work   │
│ hard and have a great desire to learn.                    │
│                                                           │
│ I present myself as a person who will definitely prove    │
│ fruitful to the organization with my sincerity and        │
│ ability.                                                  │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    contact: {
      description: 'Get contact information',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                      CONTACT INFO                          │
├─────────────────────────────────────────────────────────────┤
│ 📧 Email: moteajit10@gmail.com                            │
│ 📱 Phone: 7796288582 / 9075694678                        │
│ 🌐 Portfolio: https://ajitmote.dev                        │
│ 📍 Location: Sangola, Solapur, India - 414306            │
│                                                           │
│ Feel free to reach out! I'm always open to discussing    │
│ new opportunities and interesting projects.               │
│                                                           │
│ Available for full-time opportunities and freelance      │
│ projects. Let's build something amazing together!         │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    skills: {
      description: 'View technical skills',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                    TECHNICAL SKILLS                        │
├─────────────────────────────────────────────────────────────┤
│ Backend Technologies:                                     │
│ ▓▓▓▓▓▓▓▓▓▓ Java, JSP, Servlet                           │
│ ▓▓▓▓▓▓▓▓▓░ Spring, Spring Boot                          │
│ ▓▓▓▓▓▓▓▓░░ C#, .NET, Microservices                      │
│ ▓▓▓▓▓▓▓░░░ Hibernate, JPA                               │
│                                                           │
│ Frontend Technologies:                                    │
│ ▓▓▓▓▓▓▓▓▓▓ HTML5, CSS3, JavaScript                      │
│ ▓▓▓▓▓▓▓▓▓░ React.js, Redux                              │
│ ▓▓▓▓▓▓▓▓░░ Bootstrap, Tailwind CSS                      │
│ ▓▓▓▓▓▓▓░░░ Material UI, jQuery                          │
│                                                           │
│ Databases:                                                │
│ ▓▓▓▓▓▓▓▓▓░ MySQL, PostgreSQL                            │
│ ▓▓▓▓▓▓▓░░░ MongoDB                                       │
│                                                           │
│ Tools & Technologies:                                     │
│ ▓▓▓▓▓▓▓▓▓░ Docker, Git, GitHub                          │
│ ▓▓▓▓▓▓▓▓░░ Postman, Jira                                │
│ ▓▓▓▓▓▓▓░░░ AWS (S3, DynamoDB)                           │
│ ▓▓▓▓▓▓░░░░ Azure (Blob Storage, DevOps)                 │
│                                                           │
│ Operating Systems:                                        │
│ ▓▓▓▓▓▓▓▓▓░ Linux, Windows                               │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    projects: {
      description: 'See recent projects',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                     RECENT PROJECTS                        │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│ 🤖 WingsTalk - Chat & Document QA Platform               │
│    Real-time chat platform with intelligent Q&A over    │
│    uploaded documents using vector-based search.         │
│    Tech: FastAPI, React.js, PostgreSQL, SeaweedFS,       │
│          LangChain, LLaMA                                │
│    Duration: Jan 2024 – Present                          │
│                                                           │
│ 📄 Document Merge Microservice                           │
│    C# console application for automating document        │
│    merging with dynamic tables and images.               │
│    Tech: C#, .NET, OpenXML SDK                          │
│    Duration: Jan 2024 – Jun 2024                        │
│                                                           │
│ 📊 Business Excellence Report System                     │
│    Automated yearly business performance reports with    │
│    data integration and formatted document export.       │
│    Tech: .NET (Backend), React.js (Frontend), IIES      │
│    Duration: Jun 2024 – Present                         │
│                                                           │
│ 🏦 Arthaleap - Banking Web Application                   │
│    Digital banking platform for streamlined user         │
│    operations and enhanced banking accessibility.        │
│    Tech: HTML5, CSS3, JavaScript, React.js              │
│    Duration: Feb 2024 – Jul 2024                        │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    experience: {
      description: 'View work experience',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                   WORK EXPERIENCE                          │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│ 💼 Full Stack Developer                                   │
│    WingsBi Pvt. Ltd. | Pune, India                       │
│    Jan 2024 – Present                                    │
│    • Built real-time chat platform with React & FastAPI │
│    • Integrated SeaweedFS with LangChain for vector      │
│      search and document Q&A                             │
│    • Developed embedding-based document matching using   │
│      LLaMA and LangChain                                 │
│    • Designed many-to-many tagging system with           │
│      PostgreSQL for workspace-label mapping              │
│    • Delivered complete C# microservice independently    │
│      with 95%+ test coverage                             │
│                                                           │
│ 🌟 Frontend Developer (Intern)                           │
│    Riyality Softwares | Sangola, India                   │
│    Feb 2024 – Jul 2024                                  │
│    • Designed and implemented core UI components for     │
│      banking portal                                      │
│    • Integrated APIs for smooth frontend-backend        │
│      communication                                       │
│    • Gained hands-on experience in form handling,       │
│      state management, and API consumption               │
│    • Developed user-centric interface focused on        │
│      clarity, responsiveness, and banking usability      │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    education: {
      description: 'Check educational background',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                      EDUCATION                             │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│ 🎓 Bachelor of Computer Application (BCA)                 │
│    Punyashlok Ahilyadevi Holkar University, Solapur      │
│    Year: 2023                                            │
│                                                           │
│ 🏆 Certifications:                                        │
│    • Full Stack Developer                                │
│                                                           │
│ 📚 Core Competencies:                                     │
│    • Data Structures and Algorithms                      │
│    • Software Engineering                                │
│    • Database Systems                                     │
│    • Web Development                                      │
│    • Object-Oriented Programming                         │
│    • System Design                                       │
│                                                           │
│ 🌟 Interests:                                             │
│    • Coding and Software Development                     │
│    • Exploring new technologies                          │
│    • Open Source Contributions                           │
│    • Microservices Architecture                          │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    social: {
      description: 'Find me on social media',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                     SOCIAL MEDIA                           │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│ 🐙 GitHub: https://github.com/ajitmote                    │
│ 💼 LinkedIn: https://linkedin.com/in/ajit-mote            │
│ 📧 Email: moteajit10@gmail.com                            │
│ 🌐 Portfolio: https://ajitmote.dev                        │
│                                                           │
│ 📱 Phone: 7796288582 / 9075694678                        │
│ 📍 Location: Sangola, Solapur, India                     │
│                                                           │
│ Follow me for updates on my latest projects and insights  │
│ into Full Stack Development, React.js, and .NET!         │
│                                                           │
│ Currently working on:                                     │
│ • Chat & Document QA Platform                            │
│ • Business Excellence Report System                      │
│ • Exploring AI/ML integrations                           │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    resume: {
      description: 'Download resume',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                    RESUME DOWNLOAD                         │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│ 📄 Ajit_Mote_Resume.pdf                                   │
│ Size: 445 KB                                             │
│ Last Updated: ${new Date().toLocaleDateString()}                                      │
│                                                           │
│ [▓▓▓▓▓▓▓▓▓▓] 100% Download Complete                      │
│                                                           │
│ Download initiated! Check your downloads folder.         │
│                                                           │
│ Contains:                                                 │
│ • Complete work experience at WingsBi & Riyality        │
│ • Technical skills in Java, React, .NET, C#             │
│ • Project details and achievements                       │
│ • Contact information and certifications                 │
│                                                           │
│ Contact: moteajit10@gmail.com for latest version         │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    whoami: {
      description: 'Display current user',
      execute: () => 'ajit@portfolio.dev'
    },
    ls: {
      description: 'List directory contents',
      execute: () => {
        return `total 12
drwxr-xr-x  2 ajit ajit 4096 ${new Date().toLocaleDateString()} about/
drwxr-xr-x  2 ajit ajit 4096 ${new Date().toLocaleDateString()} contact/
drwxr-xr-x  2 ajit ajit 4096 ${new Date().toLocaleDateString()} projects/
drwxr-xr-x  2 ajit ajit 4096 ${new Date().toLocaleDateString()} skills/
drwxr-xr-x  2 ajit ajit 4096 ${new Date().toLocaleDateString()} experience/
-rw-r--r--  1 ajit ajit 445KB ${new Date().toLocaleDateString()} Ajit_Mote_Resume.pdf
-rw-r--r--  1 ajit ajit 2048 ${new Date().toLocaleDateString()} README.md`;
      }
    },
    pwd: {
      description: 'Show current directory',
      execute: () => `/home/ajit/${currentPath}`
    },
    date: {
      description: 'Show current date and time',
      execute: () => new Date().toString()
    },
    neofetch: {
      description: 'Display system information',
      execute: () => {
        return `
                   -\`                 ajit@portfolio.dev
                  .o+\`                ────────────────────
                 \`ooo/                OS: Portfolio OS 2.0
                \`+oooo:               Host: Ajit's Creative Portfolio
               \`+oooooo:              Kernel: React 19.1.0
               -+oooooo+:             Uptime: ${Math.floor(Math.random() * 100)} days
             \`/:-:++oooo+:            Packages: ${Math.floor(Math.random() * 50) + 200}
            \`/++++/+++++++:           Shell: terminal.jsx
           \`/++++++++++++++:          Resolution: ${window.innerWidth}x${window.innerHeight}
          \`/+++ooooooooooooo/\`        Terminal: HackerTerminal v2.0
         ./ooosssso++osssssso+\`       CPU: Full Stack Brain v1.0
        .oossssso-\`\`\`\`/ossssss+\`      GPU: React Renderer Engine
       -osssssso.      :ssssssso.     Memory: Unlimited Learning
      :osssssss/        osssso+++.    Stack: Java, React, .NET, C#
     /ossssssss/        +ssssooo/-    Location: Sangola, Solapur
   \`/ossssso+/:-        -:/+osssso+-  Experience: 1+ years
  \`+sso+:-\`                 \`.-/+oso: Current: WingsBi Pvt. Ltd.
 \`++:.                           \`-/+/
 .\`                                 \`/`;
      }
    },
    matrix: {
      description: 'Enter the matrix',
      execute: () => {
        return `
Wake up, Ajit...

The Code Matrix has you...

Follow the green terminal.

Knock, knock, Developer.

01000001 01101010 01101001 01110100
01001101 01101111 01110100 01100101

You take the blue pill... you stay in comfort zone.
You take the red pill... you become a Full Stack Master.

Choice is yours...

[MATRIX MODE ACTIVATED]
[REALITY: FULL STACK DEVELOPMENT]
[CURRENTLY LOADING: WINGS_TALK_PROJECT...]
[STATUS: BUILDING THE FUTURE...]`;
      }
    },
    hack: {
      description: 'Initiate hacking sequence',
      execute: () => {
        return `
[INITIATING HACK SEQUENCE...]

> Scanning WingsBi network... ████████████████████████████████ 100%
> Bypassing Riyality firewall... ████████████████████████████████ 100%
> Accessing portfolio mainframe... ████████████████████████████████ 100%
> Decrypting resume data... ████████████████████████████████ 100%

ACCESS GRANTED

Welcome to Ajit's Development Matrix, hacker.

Available systems:
- portfolio.exe
- wingstalk.db
- arthaleap.zip
- skills.json
- experience.log
- projects.tar.gz

CLASSIFIED INTEL:
- Currently developing AI-powered chat systems
- Mastering microservices architecture
- Building scalable React applications
- Exploring LangChain & LLaMA integration

[HACK COMPLETE - DEVELOPER SKILLS ACQUIRED]
[NEXT MISSION: FULL STACK MASTERY]`;
      }
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        setOutput([]);
        return '';
      }
    },
    exit: {
      description: 'Exit terminal',
      execute: () => 'Connection terminated. Thanks for visiting Ajit\'s Portfolio! 👋'
    }
  };

  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    
    setOutput(prev => [...prev, {
      type: 'input',
      content: `ajit@portfolio:${currentPath}$ ${cmd}`,
      timestamp
    }]);

    if (trimmedCmd === '') return;

    if (commands[trimmedCmd]) {
      setIsTyping(true);
      
      // Simulate typing delay for realism
      setTimeout(() => {
        const result = commands[trimmedCmd].execute();
        if (result) {
          setOutput(prev => [...prev, {
            type: 'output',
            content: result,
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        setIsTyping(false);
      }, Math.random() * 1000 + 500);
    } else {
      setOutput(prev => [...prev, {
        type: 'error',
        content: `bash: ${trimmedCmd}: command not found\nType 'help' for available commands.`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Welcome message
    setOutput([{
      type: 'output',
      content: `
┌─────────────────────────────────────────────────────────────┐
│              Welcome to Ajit's Portfolio Terminal          │
├─────────────────────────────────────────────────────────────┤
│                                                           │
│   █████╗      ██╗██╗████████╗    ███╗   ███╗ ██████╗ ████████╗███████╗ │
│  ██╔══██╗     ██║██║╚══██╔══╝    ████╗ ████║██╔═══██╗╚══██╔══╝██╔════╝ │
│  ███████║     ██║██║   ██║       ██╔████╔██║██║   ██║   ██║   █████╗   │
│  ██╔══██║██   ██║██║   ██║       ██║╚██╔╝██║██║   ██║   ██║   ██╔══╝   │
│  ██║  ██║╚█████╔╝██║   ██║       ██║ ╚═╝ ██║╚██████╔╝   ██║   ███████╗ │
│  ╚═╝  ╚═╝ ╚════╝ ╚═╝   ╚═╝       ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚══════╝ │
│                                                           │
│  Full Stack Developer | WingsBi Pvt. Ltd.                │
│  System initialized successfully...                       │
│  Type 'help' to see available commands                    │
│  Type 'about' to learn more about me                      │
│                                                           │
│  Current Status: Building the future, one line at a time │
└─────────────────────────────────────────────────────────────┘`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  return (
    <div className="terminal-container" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">Ajit's Portfolio Terminal - ajit@portfolio.dev</div>
      </div>
      
      <div className="terminal-content" ref={terminalRef}>
        {output.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            <pre>{item.content}</pre>
          </div>
        ))}
        
        {isTyping && (
          <div className="terminal-line typing">
            <span>Processing...</span>
            <span className="typing-cursor">█</span>
          </div>
        )}
        
        <div className="terminal-input-line">
          <span className="terminal-prompt">ajit@portfolio:{currentPath}$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
          <span className="terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 