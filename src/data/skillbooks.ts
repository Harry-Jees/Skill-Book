import { SkillBook } from "@/types/skillbook";

export const skillBooks: SkillBook[] = [
  {
    id: "web-dev",
    skill_name: "Web Development",
    description: "Learn HTML, CSS, and JavaScript to build modern websites from scratch.",
    icon: "🌐",
    color: "hsl(210, 70%, 50%)",
    tutorials: [
      {
        step_title: "Introduction to HTML",
        text: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements like headings, paragraphs, links, images, and more. Every website you visit is built with HTML at its core.\n\nStart by creating a simple HTML file with a doctype declaration, head, and body. Use tags like <h1> for headings, <p> for paragraphs, and <a> for links.",
        youtube_links: [
          "https://www.youtube.com/watch?v=UB1O30fR-EE",
          "https://www.youtube.com/watch?v=pQN-pnXPaVg",
          "https://www.youtube.com/watch?v=qz0aGYrrlhU"
        ],
        wiki_links: [
          { term: "HTML", url: "https://en.wikipedia.org/wiki/HTML" },
          { term: "Markup Language", url: "https://en.wikipedia.org/wiki/Markup_language" }
        ]
      },
      {
        step_title: "Styling with CSS",
        text: "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. With CSS you can change colors, fonts, spacing, layout, and create responsive designs that work on all screen sizes.\n\nLearn selectors, the box model, flexbox, and grid layout to create beautiful, responsive web pages.",
        youtube_links: [
          "https://www.youtube.com/watch?v=yfoY53QXEnI",
          "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          "https://www.youtube.com/watch?v=OXGznpKZ_sA"
        ],
        wiki_links: [
          { term: "CSS", url: "https://en.wikipedia.org/wiki/CSS" },
          { term: "Responsive Design", url: "https://en.wikipedia.org/wiki/Responsive_web_design" }
        ]
      },
      {
        step_title: "JavaScript Fundamentals",
        text: "JavaScript is the programming language of the web. It makes web pages interactive and dynamic. Learn variables, functions, loops, DOM manipulation, and event handling to bring your pages to life.\n\nModern JavaScript (ES6+) includes features like arrow functions, template literals, destructuring, and modules.",
        youtube_links: [
          "https://www.youtube.com/watch?v=W6NZfCO5SIk",
          "https://www.youtube.com/watch?v=hdI2bqOjy3c",
          "https://www.youtube.com/watch?v=PkZNo7MFNFg"
        ],
        wiki_links: [
          { term: "JavaScript", url: "https://en.wikipedia.org/wiki/JavaScript" },
          { term: "DOM", url: "https://en.wikipedia.org/wiki/Document_Object_Model" }
        ]
      },
      {
        step_title: "Building a Complete Project",
        text: "Put it all together by building a complete website. Combine HTML structure, CSS styling, and JavaScript interactivity to create a portfolio site or a simple web application.\n\nLearn about version control with Git, deploying your site, and best practices for web development.",
        youtube_links: [
          "https://www.youtube.com/watch?v=ZxKM3DCV2kE",
          "https://www.youtube.com/watch?v=SBB1YtwODT0"
        ],
        wiki_links: [
          { term: "Git", url: "https://en.wikipedia.org/wiki/Git" },
          { term: "Web Development", url: "https://en.wikipedia.org/wiki/Web_development" }
        ]
      }
    ]
  },
  {
    id: "python",
    skill_name: "Python Programming",
    description: "Master Python from basics to advanced concepts including data structures and automation.",
    icon: "🐍",
    color: "hsl(145, 60%, 40%)",
    tutorials: [
      {
        step_title: "Getting Started with Python",
        text: "Python is one of the most popular and beginner-friendly programming languages. It's used in web development, data science, AI, automation, and more.\n\nInstall Python, set up your development environment, and write your first program. Learn about variables, data types, and basic input/output.",
        youtube_links: [
          "https://www.youtube.com/watch?v=kqtD5dpn9C8",
          "https://www.youtube.com/watch?v=rfscVS0vtbw",
          "https://www.youtube.com/watch?v=eWRfhZUzrAc"
        ],
        wiki_links: [
          { term: "Python", url: "https://en.wikipedia.org/wiki/Python_(programming_language)" },
          { term: "Programming Language", url: "https://en.wikipedia.org/wiki/Programming_language" }
        ]
      },
      {
        step_title: "Control Flow & Functions",
        text: "Learn how to control program flow with if/else statements, loops (for and while), and functions. Functions help you organize code into reusable blocks.\n\nUnderstand scope, parameters, return values, and lambda functions.",
        youtube_links: [
          "https://www.youtube.com/watch?v=Zp5MuPOtsSY",
          "https://www.youtube.com/watch?v=9Os0o3wzS_I"
        ],
        wiki_links: [
          { term: "Control Flow", url: "https://en.wikipedia.org/wiki/Control_flow" },
          { term: "Function", url: "https://en.wikipedia.org/wiki/Subroutine" }
        ]
      },
      {
        step_title: "Data Structures",
        text: "Master Python's built-in data structures: lists, tuples, dictionaries, and sets. Learn when and how to use each one effectively.\n\nUnderstand list comprehensions, dictionary methods, and how to work with complex nested data.",
        youtube_links: [
          "https://www.youtube.com/watch?v=R-HLU9Fl5ug",
          "https://www.youtube.com/watch?v=daefaLgNkw0"
        ],
        wiki_links: [
          { term: "Data Structure", url: "https://en.wikipedia.org/wiki/Data_structure" },
          { term: "Hash Table", url: "https://en.wikipedia.org/wiki/Hash_table" }
        ]
      }
    ]
  },
  {
    id: "photography",
    skill_name: "Digital Photography",
    description: "Learn composition, lighting, and editing to capture stunning photographs.",
    icon: "📷",
    color: "hsl(280, 60%, 50%)",
    tutorials: [
      {
        step_title: "Camera Basics & Exposure",
        text: "Understanding the exposure triangle — aperture, shutter speed, and ISO — is the foundation of photography. These three settings control how much light reaches your camera sensor.\n\nLearn to shoot in manual mode and understand how each setting affects your image.",
        youtube_links: [
          "https://www.youtube.com/watch?v=LxO-6rlihSg",
          "https://www.youtube.com/watch?v=V7z7BAZdt2M",
          "https://www.youtube.com/watch?v=F8T94sdiNjc"
        ],
        wiki_links: [
          { term: "Exposure", url: "https://en.wikipedia.org/wiki/Exposure_(photography)" },
          { term: "Aperture", url: "https://en.wikipedia.org/wiki/Aperture" }
        ]
      },
      {
        step_title: "Composition Rules",
        text: "Composition is how you arrange elements in your frame. Learn the rule of thirds, leading lines, symmetry, framing, and negative space to create visually compelling images.\n\nPractice these rules, then learn when to break them for creative effect.",
        youtube_links: [
          "https://www.youtube.com/watch?v=VArISvUuyr0",
          "https://www.youtube.com/watch?v=7ZVyNjKSr0M"
        ],
        wiki_links: [
          { term: "Rule of Thirds", url: "https://en.wikipedia.org/wiki/Rule_of_thirds" },
          { term: "Composition", url: "https://en.wikipedia.org/wiki/Composition_(visual_arts)" }
        ]
      },
      {
        step_title: "Photo Editing Basics",
        text: "Post-processing is where good photos become great. Learn to adjust exposure, contrast, white balance, and color in tools like Lightroom or free alternatives.\n\nUnderstand non-destructive editing workflows and develop your own editing style.",
        youtube_links: [
          "https://www.youtube.com/watch?v=6jmPHHVMoD8",
          "https://www.youtube.com/watch?v=O-semeO3bHE"
        ],
        wiki_links: [
          { term: "Image Editing", url: "https://en.wikipedia.org/wiki/Image_editing" },
          { term: "Adobe Lightroom", url: "https://en.wikipedia.org/wiki/Adobe_Lightroom" }
        ]
      }
    ]
  },
  {
    id: "guitar",
    skill_name: "Guitar Playing",
    description: "Pick up the guitar and learn chords, strumming patterns, and your first songs.",
    icon: "🎸",
    color: "hsl(20, 80%, 50%)",
    tutorials: [
      {
        step_title: "Guitar Anatomy & Tuning",
        text: "Before playing, understand your instrument. Learn the parts of a guitar — headstock, neck, frets, body, and strings. Standard tuning is E-A-D-G-B-E.\n\nUse a tuner app or clip-on tuner to keep your guitar in tune. Proper posture and hand position prevent injuries.",
        youtube_links: [
          "https://www.youtube.com/watch?v=BBz-Jyr23M4",
          "https://www.youtube.com/watch?v=rk0pJI13fRc"
        ],
        wiki_links: [
          { term: "Guitar", url: "https://en.wikipedia.org/wiki/Guitar" },
          { term: "Guitar Tunings", url: "https://en.wikipedia.org/wiki/Guitar_tunings" }
        ]
      },
      {
        step_title: "Basic Chords",
        text: "Start with open chords: E minor, A minor, C major, G major, and D major. These five chords let you play hundreds of songs.\n\nPractice transitioning between chords smoothly. Use a metronome starting at a slow tempo and gradually increase speed.",
        youtube_links: [
          "https://www.youtube.com/watch?v=4sSBMbOkb7o",
          "https://www.youtube.com/watch?v=BSKkNPZEBxY",
          "https://www.youtube.com/watch?v=Dgu40aNaiGo"
        ],
        wiki_links: [
          { term: "Chord", url: "https://en.wikipedia.org/wiki/Chord_(music)" },
          { term: "Open Chord", url: "https://en.wikipedia.org/wiki/Open_chord" }
        ]
      },
      {
        step_title: "Strumming & Your First Song",
        text: "Learn basic strumming patterns: all downstrokes, then down-up patterns. Combine chords with strumming to play your first complete song.\n\nTry songs like 'Knockin' on Heaven's Door' (G-D-Am-C) or 'Horse With No Name' (Em-D6).",
        youtube_links: [
          "https://www.youtube.com/watch?v=jMVWh5MzzLI",
          "https://www.youtube.com/watch?v=k3KsswNEGY0"
        ],
        wiki_links: [
          { term: "Strumming", url: "https://en.wikipedia.org/wiki/Strumming" }
        ]
      }
    ]
  },
  {
    id: "cooking",
    skill_name: "Cooking Fundamentals",
    description: "Master essential cooking techniques, knife skills, and classic recipes.",
    icon: "👨‍🍳",
    color: "hsl(0, 70%, 50%)",
    tutorials: [
      {
        step_title: "Kitchen Setup & Knife Skills",
        text: "A well-organized kitchen and proper knife skills are the foundation of cooking. Learn the essential tools every kitchen needs and master the basic cuts: dice, julienne, mince, and chiffonade.\n\nAlways keep your knives sharp — a sharp knife is safer than a dull one.",
        youtube_links: [
          "https://www.youtube.com/watch?v=20gwf7YttQM",
          "https://www.youtube.com/watch?v=G-Fg7l7G1zw"
        ],
        wiki_links: [
          { term: "Knife Skills", url: "https://en.wikipedia.org/wiki/Culinary_arts" },
          { term: "Mise en place", url: "https://en.wikipedia.org/wiki/Mise_en_place" }
        ]
      },
      {
        step_title: "Cooking Methods",
        text: "Understand dry heat methods (roasting, grilling, sautéing) and wet heat methods (boiling, steaming, braising). Each technique brings out different flavors and textures.\n\nLearn to control heat — it's the most important variable in cooking.",
        youtube_links: [
          "https://www.youtube.com/watch?v=nHmBYMhk3cQ",
          "https://www.youtube.com/watch?v=Jz5v12j4pYI"
        ],
        wiki_links: [
          { term: "Cooking", url: "https://en.wikipedia.org/wiki/Cooking" },
          { term: "Maillard Reaction", url: "https://en.wikipedia.org/wiki/Maillard_reaction" }
        ]
      },
      {
        step_title: "Your First Complete Meal",
        text: "Put your skills together to cook a complete meal: a protein, a starch, and a vegetable. Learn to time your cooking so everything is ready at the same time.\n\nStart with something simple like pan-seared chicken with roasted vegetables and rice.",
        youtube_links: [
          "https://www.youtube.com/watch?v=bJUiWdM__Qw",
          "https://www.youtube.com/watch?v=1UYC7XnwOBE"
        ],
        wiki_links: [
          { term: "Recipe", url: "https://en.wikipedia.org/wiki/Recipe" }
        ]
      }
    ]
  }
];
