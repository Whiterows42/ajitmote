import { useState, useEffect, useRef, useCallback } from 'react';
import './Terminal.css';

const AdvancedTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const [isTyping, setIsTyping] = useState(false);
  const [ghostText, setGhostText] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // ASCII Art Header
  const asciiHeader = `
 █████╗      ██╗██╗████████╗    ███╗   ███╗ ██████╗ ████████╗███████╗
██╔══██╗     ██║██║╚══██╔══╝    ████╗ ████║██╔═══██╗╚══██╔══╝██╔════╝
███████║     ██║██║   ██║       ██╔████╔██║██║   ██║   ██║   █████╗  
██╔══██║██   ██║██║   ██║       ██║╚██╔╝██║██║   ██║   ██║   ██╔══╝  
██║  ██║╚█████╔╝██║   ██║       ██║ ╚═╝ ██║╚██████╔╝   ██║   ███████╗
╚═╝  ╚═╝ ╚════╝ ╚═╝   ╚═╝       ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚══════╝
`;

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return `Welcome! Here are all the available commands:

  about     banner    contact   date      education email     experience
  github    help      history   linkedin  ls        neofetch  projects  
  pwd       repo      resume    skills    social    sumfetch  whoami    
  clear     exit      

[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.

Interactive Commands:
• linkedin  - Opens LinkedIn profile in new tab
• github    - Opens GitHub profile in new tab  
• email     - Opens email client to send message
• repo      - Opens GitHub repositories

Type 'sumfetch' to display summary.`;
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
│                                                            │
│ I'm a passionate full-stack developer with expertise in   │
│ modern web technologies. I enjoy building scalable        │
│ applications and solving complex problems with clean,     │
│ efficient code.                                           │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    banner: {
      description: 'Display banner',
      execute: () => {
        return asciiHeader + `
Full Stack Developer | Problem Solver | Tech Enthusiast

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click here for the Github repository.`;
      }
    },
    sumfetch: {
      description: 'Display summary',
      execute: () => {
        return `
┌─────────────────────────────────────────────────────────────┐
│                       SYSTEM INFO                          │
├─────────────────────────────────────────────────────────────┤
│ User@Portfolio:~$                                          │
│ ────────────────────────────────────────────────────────── │
│ OS: Portfolio Terminal v1.0                               │
│ Host: Ajit Raghunath Mote                                 │
│ Role: Full Stack Developer                                 │
│ Location: Sangola, Solapur, India                         │
│ Languages: Java, C#, JavaScript, TypeScript               │
│ Frameworks: Spring Boot, .NET, React.js                   │
│ Databases: PostgreSQL, MongoDB                            │
│ Tools: Docker, AWS, Azure                                 │
│ Experience: 1+ years                                      │
│ Status: Available for opportunities                        │
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
# =============================================
#        WORK EXPERIENCE: AJIT MOTE
# =============================================

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ██████╗ ██╗██╗   ██╗ █████╗ ██╗      █████╗ ██╗   ██╗████████╗██╗   ██╗   │
│   ██╔══██╗██║╚██╗ ██╔╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝╚══██╔══╝╚██╗ ██╔╝   │
│   ██████╔╝██║ ╚████╔╝ ███████║██║     ███████║ ╚████╔╝    ██║    ╚████╔╝    │
│   ██╔══██╗██║  ╚██╔╝  ██╔══██║██║     ██╔══██║  ╚██╔╝     ██║     ╚██╔╝     │
│   ██║  ██║██║   ██║   ██║  ██║███████╗██║  ██║   ██║      ██║      ██║      │
│   ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝      ╚═╝      │
│                                                                              │
│   ███████╗ ██████╗ ████████╗██╗██╗  ██╗ █████╗ ████████╗███████╗            │
│   ██╔════╝██╔═══██╗╚══██╔══╝██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝            │
│   ███████╗██║   ██║   ██║   ██║███████║███████║   ██║   █████╗              │
│   ╚════██║██║   ██║   ██║   ██║██╔══██║██╔══██║   ██║   ██╔══╝              │
│   ███████║╚██████╔╝   ██║   ██║██║  ██║██║  ██║   ██║   ███████╗            │
│   ╚══════╝ ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘


Riyality Softwares | Sangola, India  
Frontend Developer (Intern) | Feb 2024 – Jul 2024  

Project: Arthaleap – Banking Web Application  
▌Tech Stack: HTML5 | CSS3 | JavaScript | React.js  
▌Tools: GitHub | Postman  
▌Team: 4 members | 6 months duration  

Key Contributions:  
- Built 15+ UI components for transaction dashboards and account management  
- Integrated 8+ REST APIs with React frontend (Axios)  
- Implemented form validation for KYC workflows  
- Reduced page load time by 40% through code splitting  


┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ██╗    ██╗██╗███╗   ██╗ ██████╗ ███████╗██████╗ ██╗ █████╗                │
│   ██║    ██║██║████╗  ██║██╔════╝ ██╔════╝██╔══██╗██║██╔══██╗               │
│   ██║ █╗ ██║██║██╔██╗ ██║██║  ███╗███████╗██████╔╝██║███████║               │
│   ██║███╗██║██║██║╚██╗██║██║   ██║╚════██║██╔══██╗██║██╔══██║               │
│   ╚███╔███╔╝██║██║ ╚████║╚██████╔╝███████║██║  ██║██║██║  ██║               │
│    ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝               │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘


 WingsBi Pvt. Ltd. | Pune, India  
Full Stack Developer | Jan 2024 – Present  

Project 1: WingsTalk – AI Chat Platform  

▌Tech Stack: FastAPI | React.js | PostgreSQL | SeaweedFS | LangChain | LLaMA  
▌Tools: Docker | Jira | GitHub  
▌Team: 6 members | Ongoing  

Key Contributions:  
- Developed WebSocket-based real-time chat with 99.8% uptime  
- Implemented document vectorization pipeline (200+ docs/min processing)  
- Created dynamic tag management system with 10+ filter combinations  
- Reduced LLM response latency by 35% through query optimization  

Project 2: Document Merge Microservice (C#)  

▌Tech Stack: C# | .NET | OpenXML SDK  
▌Tools: Docker | GitHub  
▌Team: Solo project | 6 months  

Key Achievements:  
- Automated merging of 50+ report templates monthly  
- Achieved 95%+ test coverage with xUnit tests  
- Resolved 15+ edge cases in OpenXML document handling  

Project 3: Business Excellence Report System  

▌Tech Stack: .NET | React.js | IIES  
▌Team: 4 members | Ongoing  

Current Work:  
- Building dynamic report generator supporting 12+ data formats  
- Developing admin dashboard with role-based access control  
- Implementing CI/CD pipeline for IIES deployment  
`;
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
│                                                            │
│ 🔗 LinkedIn: https://www.linkedin.com/in/ajit-mote/        │
│ 💼 GitHub: https://github.com/Whiterows42                  │
│ 📧 Email: moteajit10@gmail.com                            │
│ 🌐 Portfolio: You're already here!                       │
│                                                            │
│ 📱 Phone: 7796288582 / 9075694678                        │
│ 📍 Location: Sangola, Solapur, India                     │
│                                                            │
│ Follow me for updates on my latest projects and insights  │
│ into Full Stack Development, React.js, and .NET!         │
│                                                            │
│ Currently working on:                                     │
│ • Chat & Document QA Platform                            │
│ • Business Excellence Report System                      │
│ • Exploring AI/ML integrations                           │
│                                                            │
│ Type 'linkedin' or 'github' to open profiles directly!   │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    linkedin: {
      description: 'Open LinkedIn profile',
      execute: () => {
        window.open('https://www.linkedin.com/in/ajit-mote/', '_blank');
        return `
┌─────────────────────────────────────────────────────────────┐
│                    LINKEDIN PROFILE                        │
├─────────────────────────────────────────────────────────────┤
│                                                            │
│ 🔗 Opening LinkedIn profile in new tab...                 │
│                                                            │
│ Profile: https://www.linkedin.com/in/ajit-mote/           │
│                                                            │
│ Connect with me to:                                        │
│ • View my professional experience                         │
│ • See my latest projects and achievements                  │
│ • Network with other developers                           │
│ • Stay updated on my career journey                       │
│                                                            │
│ Let's connect and grow together! 🚀                       │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    github: {
      description: 'Open GitHub profile',
      execute: () => {
        window.open('https://github.com/Whiterows42', '_blank');
        return `
┌─────────────────────────────────────────────────────────────┐
│                     GITHUB PROFILE                         │
├─────────────────────────────────────────────────────────────┤
│                                                            │
│ 🐙 Opening GitHub profile in new tab...                   │
│                                                            │
│ Profile: https://github.com/Whiterows42                   │
│                                                            │
│ Explore my repositories:                                   │
│ • 25-React-Project (JavaScript)                           │
│ • Core-Java (Java)                                        │
│ • Hotel-Jay-Bhavani (HTML/CSS)                            │
│ • RiyalitySoftwares (JavaScript)                          │
│ • Weather-App (HTML/CSS/JS)                               │
│ • soptify (JavaScript)                                    │
│                                                            │
│ ⭐ Star repositories you find interesting!                 │
│ 🍴 Fork projects to contribute or learn from them!        │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    email: {
      description: 'Send me an email',
      execute: () => {
        window.open('mailto:moteajit10@gmail.com?subject=Hello from Portfolio Terminal!&body=Hi Ajit,\n\nI visited your portfolio terminal and would like to connect.\n\nBest regards,', '_blank');
        return `
┌─────────────────────────────────────────────────────────────┐
│                      EMAIL CONTACT                         │
├─────────────────────────────────────────────────────────────┤
│                                                            │
│ 📧 Opening email client...                                │
│                                                            │
│ Email: moteajit10@gmail.com                               │
│                                                            │
│ Feel free to reach out for:                               │
│ • Job opportunities                                       │
│ • Project collaborations                                  │
│ • Technical discussions                                   │
│ • General inquiries                                       │
│                                                            │
│ I typically respond within 24 hours! 📬                   │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    resume: {
      description: 'Download resume',
      execute: () => {
        // Open the PDF file in a new tab
        window.open('/resume/Ajit_Mote_Resume.pdf', '_blank');
        return `
┌─────────────────────────────────────────────────────────────┐
│                    RESUME DOWNLOAD                         │
├─────────────────────────────────────────────────────────────┤
│                                                            │
│ 📄 Opening resume in new tab...                           │
│                                                            │
│ File: Ajit_Mote_Resume.pdf                                │
│ Size: 445 KB                                             │
│ Last Updated: ${new Date().toLocaleDateString()}                                      │
│                                                            │
│ [▓▓▓▓▓▓▓▓▓▓] 100% Loading Complete                       │
│                                                            │
│ Resume opened in new tab! 🚀                             │
│                                                            │
│ Contains:                                                 │
│ • Complete work experience at WingsBi & Riyality        │
│ • Technical skills in Java, React, .NET, C#             │
│ • Project details and achievements                       │
│ • Contact information and certifications                 │
│                                                           │
│ For the latest version, contact: moteajit10@gmail.com    │
│ Or connect on LinkedIn: linkedin.com/in/ajit-mote/       │
└─────────────────────────────────────────────────────────────┘`;
      }
    },
    repo: {
      description: 'View GitHub repository',
      execute: () => {
        window.open('https://github.com/Whiterows42', '_blank');
        return `
┌─────────────────────────────────────────────────────────────┐
│                   GITHUB REPOSITORY                        │
├─────────────────────────────────────────────────────────────┤
│                                                            │
│ 🚀 Opening GitHub repositories in new tab...              │
│                                                            │
│ Profile: https://github.com/Whiterows42                   │
│                                                            │
│ Featured Projects:                                         │
│ • 25-React-Project (JavaScript)                           │
│ • Core-Java (Java)                                        │
│ • Hotel-Jay-Bhavani (HTML/CSS)                            │
│ • RiyalitySoftwares (JavaScript)                          │
│ • Weather-App (HTML/CSS/JS)                               │
│ • soptify (JavaScript)                                    │
│                                                            │
│ 📊 33 repositories | 2 stars | 2 followers                │
│                                                            │
│ Feel free to explore, star, and contribute! 🌟            │
└─────────────────────────────────────────────────────────────┘`;
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

  // Get the best command match for ghost text
  const getGhostText = useCallback((inputValue) => {
    if (!inputValue.trim()) return '';
    
    const availableCommands = Object.keys(commands);
    const matchingCommand = availableCommands.find(cmd => 
      cmd.toLowerCase().startsWith(inputValue.toLowerCase()) && cmd.toLowerCase() !== inputValue.toLowerCase()
    );
    
    if (matchingCommand) {
      return matchingCommand.slice(inputValue.length);
    }
    
    return '';
  }, []);

  // Handle input change with ghost text
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Update ghost text
    const ghost = getGhostText(value);
    setGhostText(ghost);
  };

  // Execute command
  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const timestamp = new Date().toLocaleTimeString();
    
    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
    
    setOutput(prev => [...prev, {
      type: 'input',
      content: `welcome@portfolio:$ ${trimmedCmd}`,
      timestamp
    }]);

    const lowerCmd = trimmedCmd.toLowerCase();
    
    if (commands[lowerCmd]) {
      setIsTyping(true);
      
      // Simulate typing delay for realism
      setTimeout(() => {
        const result = commands[lowerCmd].execute();
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
      // Find closest matches for error message
      const availableCommands = Object.keys(commands);
      const suggestions = availableCommands.filter(cmd => 
        cmd.toLowerCase().includes(trimmedCmd.toLowerCase())
      ).slice(0, 3);
      
      setOutput(prev => [...prev, {
        type: 'error',
        content: `bash: ${trimmedCmd}: command not found\nType 'help' for available commands.${suggestions.length > 0 ? `\n\nDid you mean: ${suggestions.join(', ')}?` : ''}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
      setInput('');
      setGhostText('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate command history
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? 
          commandHistory.length - 1 : 
          Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const newInput = commandHistory[newIndex];
        setInput(newInput);
        setGhostText(getGhostText(newInput));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate command history
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? 
          historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        const newInput = newIndex === -1 ? '' : commandHistory[newIndex];
        setInput(newInput);
        setGhostText(getGhostText(newInput));
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (ghostText) {
        const newInput = input + ghostText;
        setInput(newInput);
        setGhostText('');
      }
    }
  };

  // Handle terminal click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Initialize terminal
  useEffect(() => {
    // Welcome message with new theme
    setOutput([{
      type: 'output',
      content: asciiHeader + `

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click here for the Github repository.`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Focus input on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  return (
    <div className="terminal-container" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">ajit@portfolio: ~</div>
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
        
        <div className="terminal-input-container">
          <div className="terminal-input-line">
            <span className="terminal-prompt">welcome@portfolio:~$ </span>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="terminal-input"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              {ghostText && (
                <span className="ghost-text">{ghostText}</span>
              )}
            </div>
            <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTerminal;