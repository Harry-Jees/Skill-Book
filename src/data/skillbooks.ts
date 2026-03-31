import { SkillBook } from "@/types/skillbook";

// Helper to generate courses compactly
const c = (
  id: string, name: string, desc: string, icon: string, color: string,
  category: string,
  tutorials: [string, string, string[], { term: string; url: string }[]][]
): SkillBook => ({
  id, skill_name: name, description: desc, icon, color, category,
  tutorials: tutorials.map(([step_title, text, youtube_links, wiki_links]) => ({
    step_title, text, youtube_links, wiki_links
  }))
});

export const categories = [
  "Programming", "Web Development", "Data & AI", "Design", "Music",
  "Photography & Video", "Business", "Languages", "Science", "Health & Fitness",
  "Cooking", "Crafts & DIY", "Writing", "Personal Development", "Mathematics"
];

export const skillBooks: SkillBook[] = [
  // ═══════ PROGRAMMING ═══════
  c("python", "Python Programming", "Master Python from basics to advanced including data structures, OOP, and automation.", "🐍", "hsl(145, 60%, 40%)", "Programming", [
    ["Getting Started with Python", "Python is one of the most popular and beginner-friendly programming languages. Install Python, set up your IDE, and write your first program.\n\nLearn about variables, data types, string formatting, and basic input/output operations.", ["https://www.youtube.com/watch?v=kqtD5dpn9C8","https://www.youtube.com/watch?v=rfscVS0vtbw","https://www.youtube.com/watch?v=eWRfhZUzrAc"], [{term:"Python",url:"https://en.wikipedia.org/wiki/Python_(programming_language)"},{term:"Programming Language",url:"https://en.wikipedia.org/wiki/Programming_language"}]],
    ["Control Flow & Functions", "Learn if/else statements, for/while loops, and functions. Understand scope, parameters, return values, and lambda functions.\n\nPractice writing clean, reusable functions with proper documentation.", ["https://www.youtube.com/watch?v=Zp5MuPOtsSY","https://www.youtube.com/watch?v=9Os0o3wzS_I"], [{term:"Control Flow",url:"https://en.wikipedia.org/wiki/Control_flow"},{term:"Function",url:"https://en.wikipedia.org/wiki/Subroutine"}]],
    ["Data Structures", "Master lists, tuples, dictionaries, and sets. Learn list comprehensions, dictionary methods, and nested data manipulation.\n\nUnderstand time complexity and when to use each structure.", ["https://www.youtube.com/watch?v=R-HLU9Fl5ug","https://www.youtube.com/watch?v=daefaLgNkw0"], [{term:"Data Structure",url:"https://en.wikipedia.org/wiki/Data_structure"},{term:"Hash Table",url:"https://en.wikipedia.org/wiki/Hash_table"}]],
    ["Object-Oriented Programming", "Learn classes, objects, inheritance, polymorphism, and encapsulation. Build real-world models using OOP principles.\n\nUnderstand magic methods, property decorators, and abstract classes.", ["https://www.youtube.com/watch?v=JeznW_7DlB0","https://www.youtube.com/watch?v=Ej_02ICOIgs"], [{term:"OOP",url:"https://en.wikipedia.org/wiki/Object-oriented_programming"}]],
    ["File I/O & Error Handling", "Read and write files, handle exceptions with try/except, and work with context managers.\n\nLearn to process CSV, JSON, and text files programmatically.", ["https://www.youtube.com/watch?v=Uh2ebFW8OYM","https://www.youtube.com/watch?v=NIWwJbo-9_8"], [{term:"Exception Handling",url:"https://en.wikipedia.org/wiki/Exception_handling"}]],
    ["Modules & Packages", "Organize code with modules and packages. Use pip to install third-party libraries and manage virtual environments.\n\nExplore popular packages like requests, beautifulsoup, and pandas.", ["https://www.youtube.com/watch?v=cONc0NcKE7s","https://www.youtube.com/watch?v=GqD6AiaRo3U"], [{term:"Python Package Index",url:"https://en.wikipedia.org/wiki/Python_Package_Index"}]],
    ["Build a Python Project", "Put it all together by building a complete project — a CLI tool, web scraper, or automation script.\n\nLearn about testing with pytest, code formatting, and best practices.", ["https://www.youtube.com/watch?v=SBB1YtwODT0","https://www.youtube.com/watch?v=x-5p4u9VDTs"], [{term:"Software Testing",url:"https://en.wikipedia.org/wiki/Software_testing"}]]
  ]),

  c("javascript", "JavaScript Mastery", "Learn JavaScript from fundamentals to advanced async patterns and modern ES6+ features.", "⚡", "hsl(50, 90%, 50%)", "Programming", [
    ["JavaScript Basics", "Learn variables (let, const), data types, operators, and type coercion. Understand how JavaScript runs in the browser.\n\nWrite your first interactive scripts and understand the console.", ["https://www.youtube.com/watch?v=W6NZfCO5SIk","https://www.youtube.com/watch?v=hdI2bqOjy3c"], [{term:"JavaScript",url:"https://en.wikipedia.org/wiki/JavaScript"}]],
    ["Functions & Scope", "Master function declarations, expressions, arrow functions, and closures. Understand hoisting, scope chains, and the 'this' keyword.\n\nLearn higher-order functions like map, filter, and reduce.", ["https://www.youtube.com/watch?v=PkZNo7MFNFg","https://www.youtube.com/watch?v=iLWTnMzWtj4"], [{term:"Closure",url:"https://en.wikipedia.org/wiki/Closure_(computer_programming)"}]],
    ["DOM Manipulation", "Select, create, modify, and remove HTML elements with JavaScript. Handle events like clicks, inputs, and keyboard interactions.\n\nBuild interactive UI components without frameworks.", ["https://www.youtube.com/watch?v=y17RuWkWdn8","https://www.youtube.com/watch?v=0ik6X4DJKCc"], [{term:"DOM",url:"https://en.wikipedia.org/wiki/Document_Object_Model"}]],
    ["Async JavaScript", "Understand callbacks, promises, and async/await. Fetch data from APIs and handle loading/error states.\n\nLearn about the event loop and how JavaScript handles concurrency.", ["https://www.youtube.com/watch?v=PoRJizFvM7s","https://www.youtube.com/watch?v=_8gHHBlbziw"], [{term:"Asynchronous Programming",url:"https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)"}]],
    ["ES6+ Modern Features", "Destructuring, spread/rest operators, template literals, modules, symbols, iterators, and generators.\n\nWrite cleaner, more expressive code with modern JavaScript.", ["https://www.youtube.com/watch?v=NCwa_xi0Uuc","https://www.youtube.com/watch?v=nZ1DMMsyVyI"], [{term:"ECMAScript",url:"https://en.wikipedia.org/wiki/ECMAScript"}]],
    ["Error Handling & Debugging", "Use try/catch, custom errors, and debugging tools. Master Chrome DevTools for finding and fixing bugs.\n\nLearn about source maps, breakpoints, and performance profiling.", ["https://www.youtube.com/watch?v=H0XScE08hy8"], [{term:"Debugging",url:"https://en.wikipedia.org/wiki/Debugging"}]]
  ]),

  c("rust", "Rust Programming", "Learn systems programming with Rust — memory safety without garbage collection.", "🦀", "hsl(15, 80%, 50%)", "Programming", [
    ["Why Rust & Setup", "Install Rust with rustup, understand Cargo, and write your first program. Learn why Rust's ownership model matters.\n\nExplore the Rust ecosystem and community resources.", ["https://www.youtube.com/watch?v=BpPEoZW5IiY","https://www.youtube.com/watch?v=5C_HPTJg5ek"], [{term:"Rust",url:"https://en.wikipedia.org/wiki/Rust_(programming_language)"}]],
    ["Ownership & Borrowing", "Master Rust's unique ownership system, borrowing rules, and lifetimes. Understand why the borrow checker prevents bugs.\n\nLearn to think about memory in a new way.", ["https://www.youtube.com/watch?v=VFIOSWy93H0"], [{term:"Memory Safety",url:"https://en.wikipedia.org/wiki/Memory_safety"}]],
    ["Structs, Enums & Pattern Matching", "Define custom types with structs and enums. Use pattern matching with match expressions for elegant control flow.\n\nImplement methods and traits for your types.", ["https://www.youtube.com/watch?v=n3bPhdiJm9I"], [{term:"Algebraic Data Type",url:"https://en.wikipedia.org/wiki/Algebraic_data_type"}]],
    ["Error Handling & Collections", "Use Result and Option types for safe error handling. Work with vectors, hash maps, and strings.\n\nUnderstand the ? operator and custom error types.", ["https://www.youtube.com/watch?v=wM6o70NAWUI"], [{term:"Type Safety",url:"https://en.wikipedia.org/wiki/Type_safety"}]],
    ["Concurrency & Async", "Use threads, channels, and async/await for concurrent programming. Understand Send/Sync traits.\n\nBuild a multi-threaded application safely.", ["https://www.youtube.com/watch?v=ThjvMReOXYM"], [{term:"Concurrency",url:"https://en.wikipedia.org/wiki/Concurrency_(computer_science)"}]],
    ["Build a Rust Project", "Create a CLI tool or web server with Rust. Use popular crates like serde, tokio, and clap.\n\nPublish your crate and write documentation.", ["https://www.youtube.com/watch?v=XZtlD_m59sM"], [{term:"Package Manager",url:"https://en.wikipedia.org/wiki/Package_manager"}]]
  ]),

  c("go-lang", "Go Programming", "Build fast, reliable backend services with Go's simplicity and powerful concurrency.", "🔵", "hsl(195, 70%, 45%)", "Programming", [
    ["Go Basics", "Install Go, understand packages, and write your first program. Learn variables, types, and control structures.\n\nUnderstand Go's opinionated formatting and project structure.", ["https://www.youtube.com/watch?v=YS4e4q9oBaU","https://www.youtube.com/watch?v=un6ZyFkqFKo"], [{term:"Go",url:"https://en.wikipedia.org/wiki/Go_(programming_language)"}]],
    ["Functions & Structs", "Define functions with multiple returns, create custom types with structs, and implement interfaces.\n\nLearn about methods, embedding, and composition over inheritance.", ["https://www.youtube.com/watch?v=YzLrWHZa-Kc"], [{term:"Interface",url:"https://en.wikipedia.org/wiki/Protocol_(object-oriented_programming)"}]],
    ["Goroutines & Channels", "Master Go's lightweight concurrency with goroutines and channels. Build concurrent pipelines and fan-out patterns.\n\nUnderstand select statements and context cancellation.", ["https://www.youtube.com/watch?v=LvgVSSpwND8"], [{term:"Goroutine",url:"https://en.wikipedia.org/wiki/Go_(programming_language)#Concurrency"}]],
    ["Building Web APIs", "Create REST APIs with the net/http package or Gin framework. Handle routing, middleware, and JSON serialization.\n\nConnect to databases and deploy your API.", ["https://www.youtube.com/watch?v=jFfo23yIWac"], [{term:"REST",url:"https://en.wikipedia.org/wiki/Representational_state_transfer"}]],
    ["Testing & Tooling", "Write unit tests, benchmarks, and use Go's built-in testing tools. Master go vet, golint, and the race detector.\n\nBuild and distribute Go binaries.", ["https://www.youtube.com/watch?v=FjkSJ1iXKpg"], [{term:"Unit Testing",url:"https://en.wikipedia.org/wiki/Unit_testing"}]]
  ]),

  c("cpp", "C++ Programming", "Learn C++ for game development, systems programming, and high-performance applications.", "⚙️", "hsl(210, 50%, 40%)", "Programming", [
    ["C++ Fundamentals", "Set up your compiler, learn variables, data types, and basic I/O with cin/cout.\n\nUnderstand header files, compilation, and the build process.", ["https://www.youtube.com/watch?v=vLnPwxZdW4Y","https://www.youtube.com/watch?v=18c3MTX0PK0"], [{term:"C++",url:"https://en.wikipedia.org/wiki/C%2B%2B"}]],
    ["Pointers & Memory", "Master pointers, references, dynamic memory allocation, and smart pointers.\n\nUnderstand stack vs heap, memory leaks, and RAII.", ["https://www.youtube.com/watch?v=kiUGf_Z08RQ"], [{term:"Pointer",url:"https://en.wikipedia.org/wiki/Pointer_(computer_programming)"}]],
    ["OOP in C++", "Learn classes, inheritance, polymorphism, virtual functions, and operator overloading.\n\nDesign robust class hierarchies with proper encapsulation.", ["https://www.youtube.com/watch?v=wN0x9eZLix4"], [{term:"Polymorphism",url:"https://en.wikipedia.org/wiki/Polymorphism_(computer_science)"}]],
    ["STL & Templates", "Use the Standard Template Library: vectors, maps, sets, algorithms, and iterators.\n\nWrite generic code with function and class templates.", ["https://www.youtube.com/watch?v=RRoVPUEGbC4"], [{term:"Standard Template Library",url:"https://en.wikipedia.org/wiki/Standard_Template_Library"}]],
    ["Modern C++ Features", "Explore C++11/14/17/20: lambda expressions, move semantics, ranges, and concepts.\n\nWrite safer, more expressive modern C++ code.", ["https://www.youtube.com/watch?v=xnqTKD8uD64"], [{term:"C++11",url:"https://en.wikipedia.org/wiki/C%2B%2B11"}]]
  ]),

  c("java", "Java Development", "Build enterprise applications, Android apps, and backend services with Java.", "☕", "hsl(20, 70%, 45%)", "Programming", [
    ["Java Basics", "Install JDK, understand the JVM, and write your first Java program. Learn syntax, types, and OOP fundamentals.\n\nSet up IntelliJ IDEA or VS Code for Java development.", ["https://www.youtube.com/watch?v=GoXwIVyNvX0","https://www.youtube.com/watch?v=eIrMbAQSU34"], [{term:"Java",url:"https://en.wikipedia.org/wiki/Java_(programming_language)"}]],
    ["OOP & Design Patterns", "Master inheritance, interfaces, abstract classes, and generics. Learn common design patterns.\n\nBuild modular, maintainable Java applications.", ["https://www.youtube.com/watch?v=IUqKuGNasdM"], [{term:"Design Pattern",url:"https://en.wikipedia.org/wiki/Software_design_pattern"}]],
    ["Collections & Streams", "Use List, Set, Map, and Queue implementations. Process data with Java Streams and lambda expressions.\n\nUnderstand the Collections framework deeply.", ["https://www.youtube.com/watch?v=Q93JsQ8vcwY"], [{term:"Java Collections",url:"https://en.wikipedia.org/wiki/Java_collections_framework"}]],
    ["Exception Handling & I/O", "Handle checked and unchecked exceptions. Work with files, streams, and serialization.\n\nBuild robust applications with proper error management.", ["https://www.youtube.com/watch?v=1XAfapkBQjk"], [{term:"Exception Handling",url:"https://en.wikipedia.org/wiki/Exception_handling"}]],
    ["Spring Boot Basics", "Build REST APIs with Spring Boot. Understand dependency injection, annotations, and MVC architecture.\n\nConnect to databases with JPA and deploy your application.", ["https://www.youtube.com/watch?v=9SGDpanrc8U"], [{term:"Spring Framework",url:"https://en.wikipedia.org/wiki/Spring_Framework"}]]
  ]),

  c("typescript", "TypeScript", "Add type safety to JavaScript with TypeScript for more reliable, scalable code.", "💎", "hsl(210, 80%, 55%)", "Programming", [
    ["TypeScript Basics", "Install TypeScript, configure tsconfig, and learn basic type annotations for variables and functions.\n\nUnderstand type inference and why types matter.", ["https://www.youtube.com/watch?v=BwuLxPH8IDs","https://www.youtube.com/watch?v=d56mG7DezGs"], [{term:"TypeScript",url:"https://en.wikipedia.org/wiki/TypeScript"}]],
    ["Interfaces & Type Aliases", "Define object shapes with interfaces and type aliases. Learn about optional properties, readonly, and index signatures.\n\nCompose complex types from simpler ones.", ["https://www.youtube.com/watch?v=crjIq7LEAYw"], [{term:"Type System",url:"https://en.wikipedia.org/wiki/Type_system"}]],
    ["Generics & Utility Types", "Write reusable code with generics. Master built-in utility types: Partial, Required, Pick, Omit, Record.\n\nCreate your own generic types and constraints.", ["https://www.youtube.com/watch?v=nViEqpgwxHE"], [{term:"Generic Programming",url:"https://en.wikipedia.org/wiki/Generic_programming"}]],
    ["Advanced Patterns", "Discriminated unions, conditional types, mapped types, and template literal types.\n\nLearn to model complex domains with TypeScript's type system.", ["https://www.youtube.com/watch?v=dLPgQRbVquo"], [{term:"Type Theory",url:"https://en.wikipedia.org/wiki/Type_theory"}]],
    ["TypeScript in Practice", "Configure TypeScript with React, Node.js, or other frameworks. Set up linting, testing, and CI/CD.\n\nMigrate a JavaScript project to TypeScript incrementally.", ["https://www.youtube.com/watch?v=1jMJDbq7ZX4"], [{term:"Static Analysis",url:"https://en.wikipedia.org/wiki/Static_program_analysis"}]]
  ]),

  c("swift", "Swift Programming", "Build iOS and macOS apps with Apple's modern, safe, and expressive language.", "🍎", "hsl(10, 80%, 55%)", "Programming", [
    ["Swift Fundamentals", "Learn Swift syntax, optionals, type safety, and basic data types. Set up Xcode and create your first playground.\n\nUnderstand value types vs reference types.", ["https://www.youtube.com/watch?v=comQ1-x2a1Q","https://www.youtube.com/watch?v=CwA1VWP0Ldw"], [{term:"Swift",url:"https://en.wikipedia.org/wiki/Swift_(programming_language)"}]],
    ["SwiftUI Basics", "Build user interfaces declaratively with SwiftUI. Learn views, modifiers, stacks, and state management.\n\nCreate responsive layouts that work across Apple devices.", ["https://www.youtube.com/watch?v=F2ojC6TNwws"], [{term:"SwiftUI",url:"https://en.wikipedia.org/wiki/SwiftUI"}]],
    ["Data Flow & Navigation", "Manage app state with @State, @Binding, @ObservedObject, and @EnvironmentObject.\n\nImplement navigation stacks, tab views, and modal presentations.", ["https://www.youtube.com/watch?v=HYfClpPx2cc"], [{term:"MVC",url:"https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller"}]],
    ["Networking & Persistence", "Fetch data from APIs with URLSession and async/await. Store data locally with UserDefaults, Core Data, or SwiftData.\n\nHandle JSON decoding with Codable.", ["https://www.youtube.com/watch?v=MBCX1atOvdA"], [{term:"Core Data",url:"https://en.wikipedia.org/wiki/Core_Data"}]],
    ["Publishing Your App", "Test on simulator and real devices. Prepare app store assets, handle provisioning profiles, and submit to the App Store.\n\nLearn about TestFlight and app review guidelines.", ["https://www.youtube.com/watch?v=xKg-rB3_eQk"], [{term:"App Store",url:"https://en.wikipedia.org/wiki/App_Store_(Apple)"}]]
  ]),

  c("kotlin", "Kotlin Development", "Modern JVM language for Android development and server-side applications.", "🟣", "hsl(270, 60%, 55%)", "Programming", [
    ["Kotlin Basics", "Learn null safety, data classes, extension functions, and Kotlin's concise syntax.\n\nSet up IntelliJ IDEA and write your first Kotlin program.", ["https://www.youtube.com/watch?v=F9UC9DY-vIU","https://www.youtube.com/watch?v=EExSSotojVI"], [{term:"Kotlin",url:"https://en.wikipedia.org/wiki/Kotlin_(programming_language)"}]],
    ["Functions & Collections", "Higher-order functions, lambdas, and powerful collection processing with map, filter, fold.\n\nWrite expressive functional-style Kotlin code.", ["https://www.youtube.com/watch?v=dLPgQRbVquo"], [{term:"Functional Programming",url:"https://en.wikipedia.org/wiki/Functional_programming"}]],
    ["Coroutines & Async", "Use coroutines for structured concurrency. Understand suspend functions, flows, and channels.\n\nBuild responsive apps that handle async operations elegantly.", ["https://www.youtube.com/watch?v=BOHK_w09pVA"], [{term:"Coroutine",url:"https://en.wikipedia.org/wiki/Coroutine"}]],
    ["Android with Kotlin", "Build Android apps using Jetpack Compose, ViewModels, and Navigation. Implement MVVM architecture.\n\nCreate modern, Material Design 3 Android applications.", ["https://www.youtube.com/watch?v=cDabx3SjuOY"], [{term:"Android",url:"https://en.wikipedia.org/wiki/Android_(operating_system)"}]],
    ["Testing & Best Practices", "Write unit tests with JUnit and MockK. Follow Kotlin coding conventions and anti-patterns to avoid.\n\nBuild production-ready Kotlin applications.", ["https://www.youtube.com/watch?v=phiCkP_tXqQ"], [{term:"Test-Driven Development",url:"https://en.wikipedia.org/wiki/Test-driven_development"}]]
  ]),

  c("csharp", "C# & .NET", "Build desktop, web, and game applications with C# and the .NET ecosystem.", "🔷", "hsl(260, 70%, 50%)", "Programming", [
    ["C# Fundamentals", "Learn C# syntax, value/reference types, and the .NET runtime. Set up Visual Studio or VS Code.\n\nWrite console applications and understand the project structure.", ["https://www.youtube.com/watch?v=GhQdlMFylQ8","https://www.youtube.com/watch?v=ravLFzIGuCM"], [{term:"C Sharp",url:"https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"}]],
    ["OOP & LINQ", "Master classes, interfaces, generics, and Language Integrated Query (LINQ) for data processing.\n\nWrite fluent, expressive data transformations.", ["https://www.youtube.com/watch?v=yClSNQdsts0"], [{term:"LINQ",url:"https://en.wikipedia.org/wiki/Language_Integrated_Query"}]],
    ["Async Programming", "Use async/await for non-blocking operations. Understand Task, ValueTask, and asynchronous streams.\n\nBuild responsive applications that handle I/O efficiently.", ["https://www.youtube.com/watch?v=il9gl8MN17s"], [{term:"Async/Await",url:"https://en.wikipedia.org/wiki/Async/await"}]],
    ["ASP.NET Web APIs", "Build RESTful APIs with ASP.NET Core. Learn dependency injection, middleware, and Entity Framework Core.\n\nDeploy to Azure or other cloud platforms.", ["https://www.youtube.com/watch?v=sdlt3-ptt9g"], [{term:"ASP.NET",url:"https://en.wikipedia.org/wiki/ASP.NET"}]],
    ["Unity Game Dev", "Create games with Unity and C#. Learn about GameObjects, MonoBehaviours, physics, and UI systems.\n\nBuild a 2D game from scratch.", ["https://www.youtube.com/watch?v=gB1F9G0JXOo"], [{term:"Unity",url:"https://en.wikipedia.org/wiki/Unity_(game_engine)"}]]
  ]),

  // ═══════ WEB DEVELOPMENT ═══════
  c("web-dev", "Web Development", "Learn HTML, CSS, and JavaScript to build modern websites from scratch.", "🌐", "hsl(210, 70%, 50%)", "Web Development", [
    ["Introduction to HTML", "HTML is the standard markup language for creating web pages. Learn tags, elements, attributes, and semantic HTML.\n\nBuild your first webpage with headings, paragraphs, links, images, lists, and forms.", ["https://www.youtube.com/watch?v=UB1O30fR-EE","https://www.youtube.com/watch?v=pQN-pnXPaVg","https://www.youtube.com/watch?v=qz0aGYrrlhU"], [{term:"HTML",url:"https://en.wikipedia.org/wiki/HTML"},{term:"Markup Language",url:"https://en.wikipedia.org/wiki/Markup_language"}]],
    ["Styling with CSS", "CSS controls visual presentation. Learn selectors, the box model, flexbox, grid, and responsive design.\n\nCreate beautiful layouts that work on all screen sizes.", ["https://www.youtube.com/watch?v=yfoY53QXEnI","https://www.youtube.com/watch?v=1Rs2ND1ryYc","https://www.youtube.com/watch?v=OXGznpKZ_sA"], [{term:"CSS",url:"https://en.wikipedia.org/wiki/CSS"},{term:"Responsive Design",url:"https://en.wikipedia.org/wiki/Responsive_web_design"}]],
    ["JavaScript Fundamentals", "Make web pages interactive with JavaScript. Learn variables, functions, DOM manipulation, and events.\n\nModern ES6+ includes arrow functions, template literals, and modules.", ["https://www.youtube.com/watch?v=W6NZfCO5SIk","https://www.youtube.com/watch?v=hdI2bqOjy3c","https://www.youtube.com/watch?v=PkZNo7MFNFg"], [{term:"JavaScript",url:"https://en.wikipedia.org/wiki/JavaScript"},{term:"DOM",url:"https://en.wikipedia.org/wiki/Document_Object_Model"}]],
    ["CSS Frameworks & Preprocessors", "Speed up development with Tailwind CSS, Bootstrap, or SASS. Learn utility-first vs component-based approaches.\n\nBuild rapid prototypes and production-ready styles.", ["https://www.youtube.com/watch?v=ft30zcMlFao","https://www.youtube.com/watch?v=_kqN4hl9bGc"], [{term:"Tailwind CSS",url:"https://en.wikipedia.org/wiki/Tailwind_CSS"},{term:"Bootstrap",url:"https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)"}]],
    ["React Basics", "Build modern UIs with React. Learn components, JSX, props, state, hooks, and component lifecycle.\n\nCreate reusable, declarative user interface components.", ["https://www.youtube.com/watch?v=Tn6-PIqc4UM","https://www.youtube.com/watch?v=bMknfKXIFA8"], [{term:"React",url:"https://en.wikipedia.org/wiki/React_(JavaScript_library)"}]],
    ["APIs & Fetch", "Connect your frontend to backends using fetch, Axios, and REST APIs. Handle JSON data and async operations.\n\nBuild apps that display real-time data from external services.", ["https://www.youtube.com/watch?v=cuEtnrL9-H0"], [{term:"API",url:"https://en.wikipedia.org/wiki/API"}]],
    ["Building & Deploying", "Use build tools like Vite, deploy with Vercel/Netlify. Learn Git, version control, and CI/CD basics.\n\nLaunch your website for the world to see.", ["https://www.youtube.com/watch?v=ZxKM3DCV2kE","https://www.youtube.com/watch?v=SBB1YtwODT0"], [{term:"Git",url:"https://en.wikipedia.org/wiki/Git"},{term:"Web Development",url:"https://en.wikipedia.org/wiki/Web_development"}]]
  ]),

  c("react-adv", "Advanced React", "Master React hooks, state management, performance optimization, and testing.", "⚛️", "hsl(195, 90%, 50%)", "Web Development", [
    ["Custom Hooks", "Extract reusable logic into custom hooks. Build hooks for forms, API calls, local storage, and more.\n\nUnderstand hook composition and dependencies.", ["https://www.youtube.com/watch?v=J-g9ZJha8FE"], [{term:"React Hooks",url:"https://en.wikipedia.org/wiki/React_(JavaScript_library)#Hooks"}]],
    ["State Management", "Compare Context, Redux Toolkit, Zustand, and Jotai. Choose the right solution for your app's complexity.\n\nManage global state efficiently without prop drilling.", ["https://www.youtube.com/watch?v=5-1LM2NySR0"], [{term:"State Management",url:"https://en.wikipedia.org/wiki/State_management"}]],
    ["Performance Optimization", "Use React.memo, useMemo, useCallback, and code splitting. Profile with React DevTools.\n\nBuild apps that stay fast as they scale.", ["https://www.youtube.com/watch?v=uojLJFt9SzY"], [{term:"Web Performance",url:"https://en.wikipedia.org/wiki/Web_performance"}]],
    ["Testing React Apps", "Write unit tests with Vitest, component tests with Testing Library, and E2E tests with Playwright.\n\nBuild confidence in your code with comprehensive test coverage.", ["https://www.youtube.com/watch?v=8Xwq35cPwYg"], [{term:"Software Testing",url:"https://en.wikipedia.org/wiki/Software_testing"}]],
    ["Server Components & SSR", "Understand server-side rendering, static generation, and React Server Components.\n\nBuild full-stack React apps with Next.js or Remix.", ["https://www.youtube.com/watch?v=TQQPAU21ZUw"], [{term:"Server-side Rendering",url:"https://en.wikipedia.org/wiki/Server-side_scripting"}]]
  ]),

  c("nextjs", "Next.js Full Stack", "Build production-ready React apps with Next.js: routing, SSR, API routes, and deployment.", "▲", "hsl(0, 0%, 20%)", "Web Development", [
    ["Next.js Setup & Routing", "Create a Next.js project, understand the App Router, and build pages with file-based routing.\n\nLearn layouts, loading states, and error boundaries.", ["https://www.youtube.com/watch?v=ZVnjOPwW4ZA"], [{term:"Next.js",url:"https://en.wikipedia.org/wiki/Next.js"}]],
    ["Data Fetching", "Fetch data with Server Components, use React Suspense, and implement streaming.\n\nUnderstand static generation vs server-side rendering tradeoffs.", ["https://www.youtube.com/watch?v=gSSsZReIFRk"], [{term:"Static Site Generation",url:"https://en.wikipedia.org/wiki/Static_site_generator"}]],
    ["API Routes & Server Actions", "Build backend endpoints with Route Handlers and use Server Actions for mutations.\n\nHandle forms, file uploads, and database operations.", ["https://www.youtube.com/watch?v=dDpZfOQBMaU"], [{term:"REST API",url:"https://en.wikipedia.org/wiki/Representational_state_transfer"}]],
    ["Authentication & Middleware", "Add user authentication with NextAuth.js. Protect routes with middleware and handle sessions.\n\nImplement OAuth, credentials, and magic link sign-in.", ["https://www.youtube.com/watch?v=md65iBX6AkY"], [{term:"Authentication",url:"https://en.wikipedia.org/wiki/Authentication"}]],
    ["Deployment & Optimization", "Deploy to Vercel with automatic previews. Optimize images, fonts, and bundle size.\n\nMonitor performance and set up analytics.", ["https://www.youtube.com/watch?v=sIVL4JMqRfc"], [{term:"CDN",url:"https://en.wikipedia.org/wiki/Content_delivery_network"}]]
  ]),

  c("css-animations", "CSS Animations", "Create stunning animations and transitions with pure CSS.", "✨", "hsl(300, 70%, 55%)", "Web Development", [
    ["Transitions", "Smooth property changes with CSS transitions. Control timing, easing, and delays.\n\nAnimate hover effects, color changes, and layout shifts.", ["https://www.youtube.com/watch?v=8kK-cA99SA0"], [{term:"CSS Transitions",url:"https://en.wikipedia.org/wiki/CSS_animations"}]],
    ["Keyframe Animations", "Create complex multi-step animations with @keyframes. Control direction, fill mode, and iteration.\n\nBuild loading spinners, attention-grabbers, and decorative effects.", ["https://www.youtube.com/watch?v=f1WMjDx4snI"], [{term:"Animation",url:"https://en.wikipedia.org/wiki/Animation"}]],
    ["Transforms & 3D", "Rotate, scale, skew, and translate elements. Create 3D effects with perspective and transform-style.\n\nBuild card flips, parallax effects, and immersive experiences.", ["https://www.youtube.com/watch?v=FeJEEE3zc4U"], [{term:"3D Computer Graphics",url:"https://en.wikipedia.org/wiki/3D_computer_graphics"}]],
    ["Scroll Animations", "Trigger animations on scroll with Intersection Observer and scroll-driven animations.\n\nCreate engaging scrollytelling experiences.", ["https://www.youtube.com/watch?v=T33NN_pPeNI"], [{term:"Parallax Scrolling",url:"https://en.wikipedia.org/wiki/Parallax_scrolling"}]],
    ["Performance & Best Practices", "Animate only transform and opacity for 60fps. Use will-change wisely and respect reduced-motion.\n\nBuild accessible, performant animations.", ["https://www.youtube.com/watch?v=N5EW4HnF6FU"], [{term:"Frame Rate",url:"https://en.wikipedia.org/wiki/Frame_rate"}]]
  ]),

  c("nodejs", "Node.js Backend", "Build scalable backend services with Node.js, Express, and MongoDB.", "🟢", "hsl(120, 50%, 40%)", "Web Development", [
    ["Node.js Basics", "Understand the Node.js runtime, event loop, and module system. Build your first server.\n\nLearn npm, package.json, and dependency management.", ["https://www.youtube.com/watch?v=TlB_eWDSMt4","https://www.youtube.com/watch?v=ENrzD9HAZK4"], [{term:"Node.js",url:"https://en.wikipedia.org/wiki/Node.js"}]],
    ["Express Framework", "Create REST APIs with Express. Implement routing, middleware, error handling, and validation.\n\nStructure your project with MVC or service-based architecture.", ["https://www.youtube.com/watch?v=SccSCuHhOw0"], [{term:"Express.js",url:"https://en.wikipedia.org/wiki/Express.js"}]],
    ["Database Integration", "Connect to MongoDB with Mongoose or PostgreSQL with Prisma. Design schemas and write queries.\n\nImplement CRUD operations and data validation.", ["https://www.youtube.com/watch?v=DZBGEVgL2eE"], [{term:"MongoDB",url:"https://en.wikipedia.org/wiki/MongoDB"}]],
    ["Authentication & Security", "Implement JWT authentication, password hashing with bcrypt, and role-based access control.\n\nProtect against common vulnerabilities: XSS, CSRF, injection.", ["https://www.youtube.com/watch?v=mbsmsi7l3r4"], [{term:"JSON Web Token",url:"https://en.wikipedia.org/wiki/JSON_Web_Token"}]],
    ["Deployment & Scaling", "Deploy with Docker, set up CI/CD, and configure production environments.\n\nLearn about clustering, load balancing, and monitoring.", ["https://www.youtube.com/watch?v=RE2PLyFqCzE"], [{term:"Docker",url:"https://en.wikipedia.org/wiki/Docker_(software)"}]]
  ]),

  c("tailwindcss", "Tailwind CSS", "Build beautiful, responsive UIs rapidly with utility-first CSS.", "🎨", "hsl(195, 85%, 50%)", "Web Development", [
    ["Utility-First Approach", "Understand the utility-first philosophy. Set up Tailwind and build your first responsive layout.\n\nLearn the most common utility classes for spacing, colors, and typography.", ["https://www.youtube.com/watch?v=ft30zcMlFao","https://www.youtube.com/watch?v=dFgzHOX84xQ"], [{term:"Tailwind CSS",url:"https://en.wikipedia.org/wiki/Tailwind_CSS"}]],
    ["Responsive Design", "Use breakpoint prefixes for responsive layouts. Master flex, grid, and container utilities.\n\nBuild mobile-first designs that look great on every screen.", ["https://www.youtube.com/watch?v=2MUUNFJ351c"], [{term:"Responsive Design",url:"https://en.wikipedia.org/wiki/Responsive_web_design"}]],
    ["Customization & Themes", "Configure tailwind.config for custom colors, fonts, and spacing. Create design tokens and dark mode.\n\nBuild a consistent design system with Tailwind.", ["https://www.youtube.com/watch?v=pfaSUYaSgRo"], [{term:"Design System",url:"https://en.wikipedia.org/wiki/Design_system"}]],
    ["Component Patterns", "Build reusable UI patterns: navbars, cards, modals, forms. Use @apply for repeated patterns.\n\nCombine Tailwind with component libraries like shadcn/ui.", ["https://www.youtube.com/watch?v=T-Zv73yZ_QI"], [{term:"Component-based Architecture",url:"https://en.wikipedia.org/wiki/Component-based_software_engineering"}]],
    ["Animation & Polish", "Add transitions, transforms, and keyframe animations with Tailwind. Use the animate utilities.\n\nCreate polished, production-ready interfaces.", ["https://www.youtube.com/watch?v=6BKUMqpO8SM"], [{term:"CSS Animation",url:"https://en.wikipedia.org/wiki/CSS_animations"}]]
  ]),

  c("graphql", "GraphQL", "Build flexible, efficient APIs with GraphQL — query exactly the data you need.", "💜", "hsl(320, 70%, 50%)", "Web Development", [
    ["GraphQL Fundamentals", "Understand the difference between REST and GraphQL. Learn schema definition, types, and queries.\n\nSet up a GraphQL server with Apollo Server.", ["https://www.youtube.com/watch?v=eIQh02xuVw4"], [{term:"GraphQL",url:"https://en.wikipedia.org/wiki/GraphQL"}]],
    ["Queries & Mutations", "Write queries to fetch data, mutations to modify it, and use variables and fragments.\n\nUnderstand resolvers and how data flows through a GraphQL API.", ["https://www.youtube.com/watch?v=DQe2LdW1SY4"], [{term:"Query Language",url:"https://en.wikipedia.org/wiki/Query_language"}]],
    ["Subscriptions & Real-time", "Add real-time functionality with GraphQL subscriptions. Use WebSockets for live data.\n\nBuild chat features, live dashboards, and notifications.", ["https://www.youtube.com/watch?v=E3NHd-PkLrQ"], [{term:"WebSocket",url:"https://en.wikipedia.org/wiki/WebSocket"}]],
    ["Client-Side Integration", "Use Apollo Client with React. Implement caching, optimistic updates, and pagination.\n\nManage local and remote state with Apollo.", ["https://www.youtube.com/watch?v=YyUWW04HwKY"], [{term:"Cache",url:"https://en.wikipedia.org/wiki/Cache_(computing)"}]],
    ["Schema Design & Best Practices", "Design scalable schemas, handle N+1 problems with DataLoader, and implement authentication.\n\nBuild production-ready GraphQL APIs.", ["https://www.youtube.com/watch?v=s0QG1GlXm3Y"], [{term:"API Design",url:"https://en.wikipedia.org/wiki/API"}]]
  ]),

  // ═══════ DATA & AI ═══════
  c("data-science", "Data Science", "Analyze data, build visualizations, and extract insights with Python.", "📊", "hsl(200, 70%, 50%)", "Data & AI", [
    ["Intro to Data Science", "Understand the data science workflow: collect, clean, explore, model, and communicate.\n\nSet up Jupyter notebooks and the Python data science stack.", ["https://www.youtube.com/watch?v=ua-CiDNNj30","https://www.youtube.com/watch?v=LHBE6Q9XlzI"], [{term:"Data Science",url:"https://en.wikipedia.org/wiki/Data_science"}]],
    ["NumPy & Pandas", "Process numerical data with NumPy arrays and tabular data with Pandas DataFrames.\n\nClean, filter, merge, and transform datasets efficiently.", ["https://www.youtube.com/watch?v=QUT1VHiLmmI","https://www.youtube.com/watch?v=vmEHCJofslg"], [{term:"NumPy",url:"https://en.wikipedia.org/wiki/NumPy"},{term:"Pandas",url:"https://en.wikipedia.org/wiki/Pandas_(software)"}]],
    ["Data Visualization", "Create charts with Matplotlib, Seaborn, and Plotly. Build dashboards that tell data stories.\n\nChoose the right visualization for your data and audience.", ["https://www.youtube.com/watch?v=UO98lJQ3QGI"], [{term:"Data Visualization",url:"https://en.wikipedia.org/wiki/Data_visualization"}]],
    ["Statistics & Probability", "Learn descriptive statistics, probability distributions, hypothesis testing, and confidence intervals.\n\nMake data-driven decisions with statistical rigor.", ["https://www.youtube.com/watch?v=xxpc-HPKN28"], [{term:"Statistics",url:"https://en.wikipedia.org/wiki/Statistics"}]],
    ["Machine Learning Basics", "Train your first ML models: linear regression, decision trees, and clustering.\n\nUse scikit-learn for model building and evaluation.", ["https://www.youtube.com/watch?v=7eh4d6sabA0"], [{term:"Machine Learning",url:"https://en.wikipedia.org/wiki/Machine_learning"}]],
    ["Real-World Projects", "Build end-to-end data science projects: EDA, feature engineering, modeling, and presentation.\n\nCreate a portfolio of data science case studies.", ["https://www.youtube.com/watch?v=MpF9HENQjDo"], [{term:"Feature Engineering",url:"https://en.wikipedia.org/wiki/Feature_engineering"}]]
  ]),

  c("machine-learning", "Machine Learning", "Build intelligent systems that learn from data — from theory to deployment.", "🤖", "hsl(180, 60%, 45%)", "Data & AI", [
    ["ML Fundamentals", "Understand supervised vs unsupervised learning, overfitting, and the bias-variance tradeoff.\n\nSet up your ML environment with scikit-learn.", ["https://www.youtube.com/watch?v=7eh4d6sabA0","https://www.youtube.com/watch?v=Gv9_4yMHFhI"], [{term:"Machine Learning",url:"https://en.wikipedia.org/wiki/Machine_learning"}]],
    ["Regression & Classification", "Build linear/logistic regression, SVMs, and ensemble methods. Evaluate with precision, recall, and ROC curves.\n\nTune hyperparameters with cross-validation.", ["https://www.youtube.com/watch?v=YMJtsYIp4rg"], [{term:"Classification",url:"https://en.wikipedia.org/wiki/Statistical_classification"}]],
    ["Neural Networks", "Understand perceptrons, backpropagation, and activation functions. Build neural nets with TensorFlow/PyTorch.\n\nTrain deep learning models on image and text data.", ["https://www.youtube.com/watch?v=aircAruvnKk"], [{term:"Neural Network",url:"https://en.wikipedia.org/wiki/Artificial_neural_network"}]],
    ["NLP & Computer Vision", "Process text with tokenization, embeddings, and transformers. Classify images with CNNs.\n\nBuild sentiment analyzers and image classifiers.", ["https://www.youtube.com/watch?v=fNxaJsNG3-s"], [{term:"Natural Language Processing",url:"https://en.wikipedia.org/wiki/Natural_language_processing"}]],
    ["Model Deployment", "Deploy ML models with FastAPI, Docker, and cloud services. Monitor model performance in production.\n\nBuild ML pipelines with MLflow and DVC.", ["https://www.youtube.com/watch?v=h5wLuVDr0oc"], [{term:"MLOps",url:"https://en.wikipedia.org/wiki/MLOps"}]]
  ]),

  c("sql", "SQL & Databases", "Master SQL queries, database design, and data manipulation.", "🗄️", "hsl(220, 60%, 50%)", "Data & AI", [
    ["SQL Basics", "Write SELECT, INSERT, UPDATE, DELETE queries. Filter with WHERE, sort with ORDER BY.\n\nUnderstand tables, columns, data types, and primary keys.", ["https://www.youtube.com/watch?v=HXV3zeQKqGY","https://www.youtube.com/watch?v=7S_tz1z_5bA"], [{term:"SQL",url:"https://en.wikipedia.org/wiki/SQL"}]],
    ["Joins & Relationships", "Master INNER, LEFT, RIGHT, and FULL joins. Understand one-to-one, one-to-many, and many-to-many relationships.\n\nCombine data from multiple tables effectively.", ["https://www.youtube.com/watch?v=9yeOJ0ZMUYw"], [{term:"Join",url:"https://en.wikipedia.org/wiki/Join_(SQL)"}]],
    ["Aggregation & Subqueries", "GROUP BY, HAVING, aggregate functions (COUNT, SUM, AVG). Write subqueries and CTEs.\n\nAnalyze data patterns and generate reports.", ["https://www.youtube.com/watch?v=m1KcNV-Zhmc"], [{term:"Aggregate Function",url:"https://en.wikipedia.org/wiki/Aggregate_function"}]],
    ["Database Design", "Normalize databases to 3NF, create ER diagrams, and design efficient schemas.\n\nBalance normalization with query performance.", ["https://www.youtube.com/watch?v=ztHopE5Wnpc"], [{term:"Database Normalization",url:"https://en.wikipedia.org/wiki/Database_normalization"}]],
    ["Indexing & Optimization", "Create indexes, analyze query plans, and optimize slow queries.\n\nUnderstand B-trees, hash indexes, and query optimization strategies.", ["https://www.youtube.com/watch?v=BIlFTFGV9Do"], [{term:"Database Index",url:"https://en.wikipedia.org/wiki/Database_index"}]]
  ]),

  c("ai-prompting", "AI & Prompt Engineering", "Master the art of working with AI models — write effective prompts and build AI-powered apps.", "🧠", "hsl(270, 70%, 55%)", "Data & AI", [
    ["Understanding LLMs", "How large language models work: tokenization, attention, and generation. Understand capabilities and limitations.\n\nExplore GPT, Claude, and open-source models.", ["https://www.youtube.com/watch?v=zjkBMFhNj_g"], [{term:"Large Language Model",url:"https://en.wikipedia.org/wiki/Large_language_model"}]],
    ["Prompt Engineering", "Write clear, effective prompts. Use techniques like few-shot learning, chain-of-thought, and role-playing.\n\nGet consistent, high-quality outputs from AI models.", ["https://www.youtube.com/watch?v=_ZvnD96BbJI"], [{term:"Prompt Engineering",url:"https://en.wikipedia.org/wiki/Prompt_engineering"}]],
    ["Building AI Apps", "Integrate AI APIs into applications. Use the OpenAI API, handle streaming responses, and manage tokens.\n\nBuild chatbots, content generators, and AI assistants.", ["https://www.youtube.com/watch?v=uRQH2CFvedY"], [{term:"Chatbot",url:"https://en.wikipedia.org/wiki/Chatbot"}]],
    ["RAG & Embeddings", "Retrieval-Augmented Generation: combine AI with your own data using embeddings and vector databases.\n\nBuild AI that answers questions about your documents.", ["https://www.youtube.com/watch?v=T-D1OfcDW1M"], [{term:"Information Retrieval",url:"https://en.wikipedia.org/wiki/Information_retrieval"}]],
    ["AI Ethics & Safety", "Understand bias, hallucination, and responsible AI use. Implement safety guardrails.\n\nBuild AI applications that are helpful, harmless, and honest.", ["https://www.youtube.com/watch?v=0uQqMxXoNVs"], [{term:"AI Ethics",url:"https://en.wikipedia.org/wiki/Ethics_of_artificial_intelligence"}]]
  ]),

  c("deep-learning", "Deep Learning", "Build neural networks for computer vision, NLP, and generative AI.", "🔮", "hsl(280, 75%, 50%)", "Data & AI", [
    ["Neural Network Basics", "Understand neurons, layers, activation functions, and forward/backpropagation.\n\nBuild a neural network from scratch in NumPy.", ["https://www.youtube.com/watch?v=aircAruvnKk"], [{term:"Neural Network",url:"https://en.wikipedia.org/wiki/Artificial_neural_network"}]],
    ["PyTorch Fundamentals", "Learn tensors, autograd, and building models with PyTorch. Train and evaluate networks.\n\nUse GPU acceleration for faster training.", ["https://www.youtube.com/watch?v=V_xro1bcAuA"], [{term:"PyTorch",url:"https://en.wikipedia.org/wiki/PyTorch"}]],
    ["CNNs for Vision", "Build Convolutional Neural Networks for image classification, object detection, and segmentation.\n\nUse transfer learning with pre-trained models like ResNet.", ["https://www.youtube.com/watch?v=YRhxdVk_sIs"], [{term:"Convolutional Neural Network",url:"https://en.wikipedia.org/wiki/Convolutional_neural_network"}]],
    ["Transformers & NLP", "Understand self-attention, transformers, and BERT/GPT architectures.\n\nFine-tune language models for text classification and generation.", ["https://www.youtube.com/watch?v=SZorAJ4I-sA"], [{term:"Transformer",url:"https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)"}]],
    ["Generative AI", "Build GANs, VAEs, and diffusion models. Generate images, text, and music.\n\nUnderstand the latest in generative AI research.", ["https://www.youtube.com/watch?v=TBCRlnwJtZU"], [{term:"Generative AI",url:"https://en.wikipedia.org/wiki/Generative_artificial_intelligence"}]]
  ]),

  // ═══════ DESIGN ═══════
  c("ui-design", "UI/UX Design", "Design beautiful, user-friendly interfaces with modern design principles.", "🎨", "hsl(330, 70%, 55%)", "Design", [
    ["Design Principles", "Learn hierarchy, contrast, alignment, proximity, and repetition. These universal principles make designs work.\n\nStudy great design examples and understand why they succeed.", ["https://www.youtube.com/watch?v=YqQx75OPRa0","https://www.youtube.com/watch?v=tRpoI6vkqLs"], [{term:"Visual Design",url:"https://en.wikipedia.org/wiki/Visual_design_elements_and_principles"}]],
    ["Color Theory", "Choose effective color palettes using color wheel relationships. Understand contrast ratios for accessibility.\n\nCreate mood and meaning through strategic color use.", ["https://www.youtube.com/watch?v=_2LLXnUdUIc"], [{term:"Color Theory",url:"https://en.wikipedia.org/wiki/Color_theory"}]],
    ["Typography", "Pair fonts effectively, set proper hierarchy, and ensure readability. Learn about type scales and spacing.\n\nCreate personality and clarity through typography choices.", ["https://www.youtube.com/watch?v=sByzHoiYFX0"], [{term:"Typography",url:"https://en.wikipedia.org/wiki/Typography"}]],
    ["Wireframing & Prototyping", "Sketch ideas, create wireframes, and build interactive prototypes with Figma or similar tools.\n\nTest designs before building them with user feedback.", ["https://www.youtube.com/watch?v=FTFaQWZBqQ8"], [{term:"Prototype",url:"https://en.wikipedia.org/wiki/Prototype"}]],
    ["UX Research & Testing", "Conduct user interviews, usability tests, and A/B experiments. Make data-informed design decisions.\n\nBuild products that truly serve user needs.", ["https://www.youtube.com/watch?v=qr0bWHWqj5Q"], [{term:"User Experience",url:"https://en.wikipedia.org/wiki/User_experience"}]],
    ["Design Systems", "Build scalable design systems with tokens, components, and documentation.\n\nEnsure consistency across large products and teams.", ["https://www.youtube.com/watch?v=wIuVvCuiJhU"], [{term:"Design System",url:"https://en.wikipedia.org/wiki/Design_system"}]]
  ]),

  c("figma", "Figma Mastery", "Design professional interfaces and prototypes with Figma.", "🖌️", "hsl(340, 65%, 50%)", "Design", [
    ["Figma Interface", "Navigate Figma's interface, use frames, shapes, and text tools. Understand layers, groups, and components.\n\nSet up your workspace for efficient design work.", ["https://www.youtube.com/watch?v=FTFaQWZBqQ8","https://www.youtube.com/watch?v=kbZejnPXyLM"], [{term:"Figma",url:"https://en.wikipedia.org/wiki/Figma_(software)"}]],
    ["Components & Variants", "Create reusable components with variants, properties, and nested instances.\n\nBuild a component library that speeds up design work.", ["https://www.youtube.com/watch?v=y29Xwt9dET0"], [{term:"Component",url:"https://en.wikipedia.org/wiki/Component-based_software_engineering"}]],
    ["Auto Layout & Constraints", "Build responsive designs with Auto Layout. Use constraints for resizable frames.\n\nDesign screens that adapt to different sizes.", ["https://www.youtube.com/watch?v=TyaGpGDFczw"], [{term:"Responsive Design",url:"https://en.wikipedia.org/wiki/Responsive_web_design"}]],
    ["Prototyping & Interactions", "Add transitions, smart animate, and micro-interactions. Build clickable prototypes.\n\nPresent designs with realistic interactive flows.", ["https://www.youtube.com/watch?v=iBkXf6u8Mzc"], [{term:"Interaction Design",url:"https://en.wikipedia.org/wiki/Interaction_design"}]],
    ["Collaboration & Handoff", "Use comments, version history, and dev mode for design-developer handoff.\n\nStreamline the design-to-code workflow.", ["https://www.youtube.com/watch?v=b-xDRjf5B-8"], [{term:"Design Handoff",url:"https://en.wikipedia.org/wiki/Design_system"}]]
  ]),

  c("3d-design", "3D Design with Blender", "Create 3D models, animations, and renders with the free Blender software.", "🎲", "hsl(25, 80%, 50%)", "Design", [
    ["Blender Basics", "Navigate Blender's interface, understand the viewport, and learn basic object manipulation.\n\nCreate simple 3D shapes and combine them into models.", ["https://www.youtube.com/watch?v=nIoXOplUvAw"], [{term:"Blender",url:"https://en.wikipedia.org/wiki/Blender_(software)"}]],
    ["Modeling Techniques", "Learn mesh editing: extrude, loop cuts, bevels, and subdivision surfaces.\n\nBuild characters, environments, and product models.", ["https://www.youtube.com/watch?v=Hf2esGA7vCc"], [{term:"3D Modeling",url:"https://en.wikipedia.org/wiki/3D_modeling"}]],
    ["Materials & Textures", "Create realistic materials with the Principled BSDF shader. Apply UV maps and textures.\n\nMake objects look like metal, wood, glass, and more.", ["https://www.youtube.com/watch?v=fZSD7pVIUkY"], [{term:"Texture Mapping",url:"https://en.wikipedia.org/wiki/Texture_mapping"}]],
    ["Lighting & Rendering", "Set up three-point lighting, HDRI environments, and understand render engines (Cycles vs EEVEE).\n\nCreate photorealistic and stylized renders.", ["https://www.youtube.com/watch?v=5UCc3Z_-ibs"], [{term:"Rendering",url:"https://en.wikipedia.org/wiki/Rendering_(computer_graphics)"}]],
    ["Animation Basics", "Keyframe objects and cameras. Use the graph editor for smooth motion. Add particle effects.\n\nCreate short animated sequences.", ["https://www.youtube.com/watch?v=SZJjSooksXs"], [{term:"Computer Animation",url:"https://en.wikipedia.org/wiki/Computer_animation"}]]
  ]),

  c("graphic-design", "Graphic Design", "Create logos, posters, and brand identities with design fundamentals.", "🖼️", "hsl(355, 70%, 55%)", "Design", [
    ["Design Fundamentals", "Learn balance, contrast, emphasis, movement, pattern, rhythm, and unity.\n\nAnalyze professional designs to understand what makes them work.", ["https://www.youtube.com/watch?v=YqQx75OPRa0"], [{term:"Graphic Design",url:"https://en.wikipedia.org/wiki/Graphic_design"}]],
    ["Logo Design", "Understand logo types, research techniques, and iteration process. Create logos that communicate brand identity.\n\nLearn from iconic logos and their design stories.", ["https://www.youtube.com/watch?v=j5IBkCKMTSA"], [{term:"Logo",url:"https://en.wikipedia.org/wiki/Logo"}]],
    ["Layout & Composition", "Master grid systems, whitespace, and visual hierarchy for print and digital layouts.\n\nDesign posters, brochures, and social media graphics.", ["https://www.youtube.com/watch?v=a5KYlHNKQB8"], [{term:"Page Layout",url:"https://en.wikipedia.org/wiki/Page_layout"}]],
    ["Brand Identity", "Develop complete brand identities: color palette, typography system, imagery style, and brand guidelines.\n\nCreate cohesive visual experiences across touchpoints.", ["https://www.youtube.com/watch?v=lGrMilG1tTY"], [{term:"Brand",url:"https://en.wikipedia.org/wiki/Brand"}]],
    ["Portfolio Building", "Curate your best work, write compelling case studies, and present your design process.\n\nBuild an online portfolio that gets you hired.", ["https://www.youtube.com/watch?v=0V7gxbO_2WQ"], [{term:"Portfolio",url:"https://en.wikipedia.org/wiki/Portfolio_(creative)"}]]
  ]),

  // ═══════ MUSIC ═══════
  c("guitar", "Guitar Playing", "Pick up the guitar and learn chords, strumming, fingerpicking, and your first songs.", "🎸", "hsl(20, 80%, 50%)", "Music", [
    ["Guitar Anatomy & Tuning", "Understand headstock, neck, frets, body, strings. Standard tuning E-A-D-G-B-E.\n\nProper posture and hand position prevent injuries.", ["https://www.youtube.com/watch?v=BBz-Jyr23M4","https://www.youtube.com/watch?v=rk0pJI13fRc"], [{term:"Guitar",url:"https://en.wikipedia.org/wiki/Guitar"},{term:"Guitar Tunings",url:"https://en.wikipedia.org/wiki/Guitar_tunings"}]],
    ["Open Chords", "Learn E minor, A minor, C, G, D major. These five chords play hundreds of songs.\n\nPractice smooth transitions with a metronome.", ["https://www.youtube.com/watch?v=4sSBMbOkb7o","https://www.youtube.com/watch?v=BSKkNPZEBxY","https://www.youtube.com/watch?v=Dgu40aNaiGo"], [{term:"Chord",url:"https://en.wikipedia.org/wiki/Chord_(music)"},{term:"Open Chord",url:"https://en.wikipedia.org/wiki/Open_chord"}]],
    ["Strumming Patterns", "Learn down strokes, down-up patterns, and syncopated rhythms.\n\nPlay your first songs with basic strumming.", ["https://www.youtube.com/watch?v=jMVWh5MzzLI","https://www.youtube.com/watch?v=k3KsswNEGY0"], [{term:"Strumming",url:"https://en.wikipedia.org/wiki/Strumming"}]],
    ["Barre Chords", "Master the F and B barre chord shapes. Move them up the neck for any chord.\n\nBuild finger strength and clean chord voicing.", ["https://www.youtube.com/watch?v=LiDGfbSoFJc"], [{term:"Barre Chord",url:"https://en.wikipedia.org/wiki/Barre_chord"}]],
    ["Fingerpicking", "Learn Travis picking, arpeggios, and classical guitar patterns.\n\nPlay beautiful fingerstyle arrangements.", ["https://www.youtube.com/watch?v=yOrbMG0q2ek"], [{term:"Fingerstyle Guitar",url:"https://en.wikipedia.org/wiki/Fingerstyle_guitar"}]],
    ["Music Theory for Guitar", "Understand scales, intervals, and the CAGED system. Build solos and improvise.\n\nConnect theory to the fretboard.", ["https://www.youtube.com/watch?v=GfRj_dCr07c"], [{term:"Music Theory",url:"https://en.wikipedia.org/wiki/Music_theory"}]]
  ]),

  c("piano", "Piano & Keyboard", "Learn piano from scratch — read sheet music, play chords, and perform songs.", "🎹", "hsl(250, 50%, 50%)", "Music", [
    ["Piano Basics", "Learn the keyboard layout, note names, and proper hand position. Play your first simple melodies.\n\nUnderstand intervals and how keys relate to each other.", ["https://www.youtube.com/watch?v=QBH6IpRnVRs","https://www.youtube.com/watch?v=827jmswqnEA"], [{term:"Piano",url:"https://en.wikipedia.org/wiki/Piano"}]],
    ["Reading Sheet Music", "Understand treble and bass clef, note values, time signatures, and dynamics.\n\nRead and play simple sheet music with both hands.", ["https://www.youtube.com/watch?v=R0JKCYZ8hng"], [{term:"Musical Notation",url:"https://en.wikipedia.org/wiki/Musical_notation"}]],
    ["Chords & Progressions", "Play major, minor, and seventh chords. Learn common progressions like I-IV-V-I.\n\nAccompany songs with chord patterns.", ["https://www.youtube.com/watch?v=M8eOwKaZKjI"], [{term:"Chord Progression",url:"https://en.wikipedia.org/wiki/Chord_progression"}]],
    ["Scales & Technique", "Practice major, minor, and pentatonic scales. Build finger independence and speed.\n\nDevelop a daily practice routine for steady improvement.", ["https://www.youtube.com/watch?v=3eF0-USmFR4"], [{term:"Musical Scale",url:"https://en.wikipedia.org/wiki/Scale_(music)"}]],
    ["Playing Your First Songs", "Combine everything to play complete songs. Start with simple pieces and build up.\n\nLearn songs you love to stay motivated.", ["https://www.youtube.com/watch?v=rzz0HMi5uCs"], [{term:"Repertoire",url:"https://en.wikipedia.org/wiki/Repertoire"}]]
  ]),

  c("music-production", "Music Production", "Create professional music with a DAW — from beat-making to mixing and mastering.", "🎧", "hsl(160, 70%, 45%)", "Music", [
    ["DAW Basics", "Choose and learn a DAW (Ableton, FL Studio, Logic). Understand the interface, tracks, and MIDI.\n\nCreate your first beat with built-in instruments.", ["https://www.youtube.com/watch?v=HE-GHPcGMjE","https://www.youtube.com/watch?v=RSuDRPJGCGU"], [{term:"DAW",url:"https://en.wikipedia.org/wiki/Digital_audio_workstation"}]],
    ["Sound Design", "Create sounds from scratch with synthesis: subtractive, FM, and wavetable.\n\nDesign unique basses, leads, pads, and effects.", ["https://www.youtube.com/watch?v=NJLIS2MkFe4"], [{term:"Sound Synthesis",url:"https://en.wikipedia.org/wiki/Synthesizer"}]],
    ["Arrangement & Composition", "Structure songs with intro, verse, chorus, bridge. Build tension and release.\n\nWrite melodies, basslines, and harmonies that work together.", ["https://www.youtube.com/watch?v=1E9xPR10LFk"], [{term:"Song Structure",url:"https://en.wikipedia.org/wiki/Song_structure"}]],
    ["Mixing", "Balance levels, use EQ, compression, reverb, and delay. Create space and clarity in your mix.\n\nMake every element sit perfectly in the stereo field.", ["https://www.youtube.com/watch?v=TEjOdqZFvhY"], [{term:"Audio Mixing",url:"https://en.wikipedia.org/wiki/Audio_mixing"}]],
    ["Mastering & Release", "Prepare your final mix for distribution. Apply mastering EQ, compression, and limiting.\n\nDistribute on Spotify, Apple Music, and SoundCloud.", ["https://www.youtube.com/watch?v=PnON7yOA1TI"], [{term:"Audio Mastering",url:"https://en.wikipedia.org/wiki/Audio_mastering"}]]
  ]),

  c("singing", "Singing & Vocals", "Develop your voice with proper technique, breath control, and performance skills.", "🎤", "hsl(340, 75%, 55%)", "Music", [
    ["Vocal Basics", "Understand your vocal anatomy, find your range, and learn proper posture.\n\nDevelop awareness of your natural voice and its potential.", ["https://www.youtube.com/watch?v=FmOB5h_NR_E"], [{term:"Singing",url:"https://en.wikipedia.org/wiki/Singing"}]],
    ["Breath Control", "Master diaphragmatic breathing, breath support, and stamina.\n\nSustain notes longer and sing with more power and control.", ["https://www.youtube.com/watch?v=ORiZJXsz3jE"], [{term:"Breath Control",url:"https://en.wikipedia.org/wiki/Vocal_pedagogy"}]],
    ["Pitch & Ear Training", "Sing in tune, develop relative pitch, and improve your musical ear.\n\nPractice intervals, scales, and sight-singing.", ["https://www.youtube.com/watch?v=9QGPjdgWaWE"], [{term:"Pitch",url:"https://en.wikipedia.org/wiki/Pitch_(music)"}]],
    ["Vocal Techniques", "Learn vibrato, runs, belting, and falsetto. Expand your dynamic range.\n\nDevelop versatility across different styles.", ["https://www.youtube.com/watch?v=2S_FJwJwwxU"], [{term:"Vocal Register",url:"https://en.wikipedia.org/wiki/Vocal_register"}]],
    ["Performance", "Overcome stage fright, connect with your audience, and use microphone technique.\n\nPerform with confidence and authenticity.", ["https://www.youtube.com/watch?v=mC3UVmqn7SU"], [{term:"Stage Fright",url:"https://en.wikipedia.org/wiki/Stage_fright"}]]
  ]),

  c("drums", "Drumming", "Learn rhythm, beats, fills, and coordination to become a solid drummer.", "🥁", "hsl(5, 75%, 50%)", "Music", [
    ["Getting Started", "Set up your kit, learn grip technique, and understand basic drum notation.\n\nPlay your first beats on the snare.", ["https://www.youtube.com/watch?v=9UslqZ4bEIY"], [{term:"Drum",url:"https://en.wikipedia.org/wiki/Drum"}]],
    ["Basic Rock Beats", "Learn the foundational rock beat and common variations. Coordinate hi-hat, snare, and kick drum.\n\nPlay along with songs at different tempos.", ["https://www.youtube.com/watch?v=qsiG-MqN8mE"], [{term:"Beat",url:"https://en.wikipedia.org/wiki/Beat_(music)"}]],
    ["Fills & Transitions", "Move around the kit with fills. Connect different sections of a song smoothly.\n\nBuild a vocabulary of fills for different musical situations.", ["https://www.youtube.com/watch?v=J5_3Vc4k9U0"], [{term:"Drum Fill",url:"https://en.wikipedia.org/wiki/Fill_(music)"}]],
    ["Styles & Grooves", "Explore funk, jazz, blues, and Latin rhythms. Develop feel and groove.\n\nAdapt your playing to different musical contexts.", ["https://www.youtube.com/watch?v=nKNMzRKnlLo"], [{term:"Groove",url:"https://en.wikipedia.org/wiki/Groove_(music)"}]],
    ["Advanced Coordination", "Independence exercises, polyrhythms, and odd time signatures.\n\nPush your coordination limits and musicality.", ["https://www.youtube.com/watch?v=kw8VcPVYfx8"], [{term:"Polyrhythm",url:"https://en.wikipedia.org/wiki/Polyrhythm"}]]
  ]),

  // ═══════ PHOTOGRAPHY & VIDEO ═══════
  c("photography", "Digital Photography", "Master composition, lighting, and editing for stunning photographs.", "📷", "hsl(280, 60%, 50%)", "Photography & Video", [
    ["Camera Basics & Exposure", "Master the exposure triangle: aperture, shutter speed, and ISO. Shoot in manual mode.\n\nUnderstand how each setting affects your image.", ["https://www.youtube.com/watch?v=LxO-6rlihSg","https://www.youtube.com/watch?v=V7z7BAZdt2M","https://www.youtube.com/watch?v=F8T94sdiNjc"], [{term:"Exposure",url:"https://en.wikipedia.org/wiki/Exposure_(photography)"},{term:"Aperture",url:"https://en.wikipedia.org/wiki/Aperture"}]],
    ["Composition", "Rule of thirds, leading lines, symmetry, framing, and negative space.\n\nLearn the rules, then break them creatively.", ["https://www.youtube.com/watch?v=VArISvUuyr0","https://www.youtube.com/watch?v=7ZVyNjKSr0M"], [{term:"Rule of Thirds",url:"https://en.wikipedia.org/wiki/Rule_of_thirds"},{term:"Composition",url:"https://en.wikipedia.org/wiki/Composition_(visual_arts)"}]],
    ["Lighting", "Natural light, golden hour, diffusers, and reflectors. Understand hard vs soft light.\n\nUse light to create mood and dimension.", ["https://www.youtube.com/watch?v=niysptkETf0"], [{term:"Lighting",url:"https://en.wikipedia.org/wiki/Photographic_lighting"}]],
    ["Portrait Photography", "Direct subjects, choose flattering angles, and create beautiful portrait lighting.\n\nCapture personality and emotion in portraits.", ["https://www.youtube.com/watch?v=kmi9TPQ57Mo"], [{term:"Portrait",url:"https://en.wikipedia.org/wiki/Portrait_photography"}]],
    ["Photo Editing", "Edit in Lightroom: exposure, color, contrast, and local adjustments.\n\nDevelop your editing style for a consistent look.", ["https://www.youtube.com/watch?v=6jmPHHVMoD8","https://www.youtube.com/watch?v=O-semeO3bHE"], [{term:"Image Editing",url:"https://en.wikipedia.org/wiki/Image_editing"},{term:"Adobe Lightroom",url:"https://en.wikipedia.org/wiki/Adobe_Lightroom"}]],
    ["Genre Exploration", "Try landscape, street, macro, and astrophotography. Find your creative niche.\n\nBuild a diverse portfolio of compelling images.", ["https://www.youtube.com/watch?v=iS0hEK6bMac"], [{term:"Photography Genres",url:"https://en.wikipedia.org/wiki/Photography#Genres"}]]
  ]),

  c("video-editing", "Video Editing", "Edit professional videos with cuts, transitions, effects, and color grading.", "🎬", "hsl(350, 70%, 50%)", "Photography & Video", [
    ["Editing Software Setup", "Choose your editor (DaVinci Resolve is free). Learn the interface and project setup.\n\nImport media and organize your editing timeline.", ["https://www.youtube.com/watch?v=63Ln33O4p4c"], [{term:"Video Editing",url:"https://en.wikipedia.org/wiki/Video_editing"}]],
    ["Cuts & Transitions", "Master the fundamental cuts: J-cut, L-cut, jump cut, and match cut.\n\nUse transitions purposefully to enhance storytelling.", ["https://www.youtube.com/watch?v=O6GBj7ibtOU"], [{term:"Film Editing",url:"https://en.wikipedia.org/wiki/Film_editing"}]],
    ["Color Grading", "Correct white balance, exposure, and color. Create cinematic looks with grading.\n\nUse color to set mood and visual style.", ["https://www.youtube.com/watch?v=zP14WJII_T8"], [{term:"Color Grading",url:"https://en.wikipedia.org/wiki/Color_grading"}]],
    ["Audio & Sound Design", "Sync audio, add music, sound effects, and voiceover. Balance levels for clarity.\n\nUse audio to enhance emotional impact.", ["https://www.youtube.com/watch?v=SaNUFp9gJns"], [{term:"Sound Design",url:"https://en.wikipedia.org/wiki/Sound_design"}]],
    ["Export & Distribution", "Choose the right export settings for YouTube, social media, and cinema.\n\nOptimize quality vs file size for your platform.", ["https://www.youtube.com/watch?v=u5P9IMJRGKI"], [{term:"Video Codec",url:"https://en.wikipedia.org/wiki/Video_codec"}]]
  ]),

  c("cinematography", "Cinematography", "Tell stories through camera movement, framing, and visual language.", "🎥", "hsl(35, 60%, 45%)", "Photography & Video", [
    ["Camera Movement", "Learn dolly, pan, tilt, crane, and handheld techniques. Each movement creates meaning.\n\nUse stabilizers and gimbals for smooth shots.", ["https://www.youtube.com/watch?v=1qSTcxt2t74"], [{term:"Camera Movement",url:"https://en.wikipedia.org/wiki/Camera_movement"}]],
    ["Shot Composition", "Understand close-ups, wide shots, over-the-shoulder, and establishing shots.\n\nCompose frames that guide the viewer's eye.", ["https://www.youtube.com/watch?v=cIvGRi3E6MY"], [{term:"Shot",url:"https://en.wikipedia.org/wiki/Shot_(filmmaking)"}]],
    ["Lighting for Film", "Three-point lighting, practical lights, and motivated lighting for narrative.\n\nCreate atmosphere and mood with light.", ["https://www.youtube.com/watch?v=jd2qlPLe2bQ"], [{term:"Cinematography Lighting",url:"https://en.wikipedia.org/wiki/Lighting#Film_and_television"}]],
    ["Lens Language", "Wide, normal, and telephoto — each lens tells a different story.\n\nChoose lenses based on emotional and narrative needs.", ["https://www.youtube.com/watch?v=sCiYIGSNcME"], [{term:"Camera Lens",url:"https://en.wikipedia.org/wiki/Camera_lens"}]],
    ["Visual Storytelling", "Combine all elements to tell compelling visual stories. Study iconic cinematography.\n\nDevelop your unique visual style.", ["https://www.youtube.com/watch?v=n3CiMpa6bXE"], [{term:"Visual Storytelling",url:"https://en.wikipedia.org/wiki/Visual_narrative"}]]
  ]),

  // ═══════ BUSINESS ═══════
  c("entrepreneurship", "Entrepreneurship", "Start and grow a business — from idea validation to scaling.", "🚀", "hsl(40, 85%, 55%)", "Business", [
    ["Finding Ideas", "Identify problems worth solving. Validate ideas with customer interviews and market research.\n\nMove from vague concept to specific opportunity.", ["https://www.youtube.com/watch?v=mKSGR24qXnM"], [{term:"Entrepreneurship",url:"https://en.wikipedia.org/wiki/Entrepreneurship"}]],
    ["Business Planning", "Write a lean business plan. Define your value proposition, target market, and revenue model.\n\nSet milestones and measure progress.", ["https://www.youtube.com/watch?v=Fqch5OrUPvA"], [{term:"Business Plan",url:"https://en.wikipedia.org/wiki/Business_plan"}]],
    ["MVP & Launch", "Build a minimum viable product, gather feedback, and iterate fast.\n\nLaunch to your first customers and learn from real usage.", ["https://www.youtube.com/watch?v=QoAOzMTLP5s"], [{term:"Minimum Viable Product",url:"https://en.wikipedia.org/wiki/Minimum_viable_product"}]],
    ["Marketing & Growth", "Content marketing, social media, SEO, and paid ads. Build a growth engine.\n\nAcquire customers profitably and build brand awareness.", ["https://www.youtube.com/watch?v=H3xERHwgdFw"], [{term:"Marketing",url:"https://en.wikipedia.org/wiki/Marketing"}]],
    ["Funding & Scaling", "Bootstrap, angel investors, or venture capital? Understand funding options and when to raise.\n\nScale your team, operations, and revenue.", ["https://www.youtube.com/watch?v=677ZtSMr4-4"], [{term:"Venture Capital",url:"https://en.wikipedia.org/wiki/Venture_capital"}]]
  ]),

  c("digital-marketing", "Digital Marketing", "Master SEO, social media, email marketing, and paid advertising.", "📱", "hsl(200, 80%, 50%)", "Business", [
    ["Marketing Fundamentals", "Understand the marketing funnel, customer journey, and key metrics.\n\nDefine your target audience and unique value proposition.", ["https://www.youtube.com/watch?v=bixR-KIJKYM"], [{term:"Digital Marketing",url:"https://en.wikipedia.org/wiki/Digital_marketing"}]],
    ["SEO", "On-page and off-page optimization, keyword research, and technical SEO.\n\nRank higher in search results and drive organic traffic.", ["https://www.youtube.com/watch?v=MYE6T_gd7H0"], [{term:"SEO",url:"https://en.wikipedia.org/wiki/Search_engine_optimization"}]],
    ["Social Media Marketing", "Create content strategies for Instagram, TikTok, LinkedIn, and Twitter.\n\nBuild engaged communities around your brand.", ["https://www.youtube.com/watch?v=I2pwcAVonKI"], [{term:"Social Media Marketing",url:"https://en.wikipedia.org/wiki/Social_media_marketing"}]],
    ["Email Marketing", "Build email lists, write compelling campaigns, and automate sequences.\n\nConvert subscribers into customers with strategic email flows.", ["https://www.youtube.com/watch?v=qU-sYAfAIiA"], [{term:"Email Marketing",url:"https://en.wikipedia.org/wiki/Email_marketing"}]],
    ["Paid Advertising", "Run Google Ads and social media ad campaigns. Understand bidding, targeting, and ROI.\n\nScale profitable ad campaigns systematically.", ["https://www.youtube.com/watch?v=pmNS9P6SBZA"], [{term:"Pay-per-click",url:"https://en.wikipedia.org/wiki/Pay-per-click"}]],
    ["Analytics & Optimization", "Track results with Google Analytics, A/B test, and optimize conversion rates.\n\nMake data-driven marketing decisions.", ["https://www.youtube.com/watch?v=gBtBr_kI_oM"], [{term:"Web Analytics",url:"https://en.wikipedia.org/wiki/Web_analytics"}]]
  ]),

  c("investing", "Investing & Finance", "Understand stocks, bonds, ETFs, and build long-term wealth.", "💰", "hsl(120, 60%, 40%)", "Business", [
    ["Financial Basics", "Understand income, expenses, budgeting, compound interest, and time value of money.\n\nBuild a solid financial foundation before investing.", ["https://www.youtube.com/watch?v=p7HKvqRI_Bo"], [{term:"Personal Finance",url:"https://en.wikipedia.org/wiki/Personal_finance"}]],
    ["Stock Market Fundamentals", "How stock exchanges work, market indices, and reading financial statements.\n\nUnderstand what drives stock prices up and down.", ["https://www.youtube.com/watch?v=p7HKvqRI_Bo"], [{term:"Stock Market",url:"https://en.wikipedia.org/wiki/Stock_market"}]],
    ["Investment Strategies", "Value investing, growth investing, index funds, and dollar-cost averaging.\n\nBuild a diversified portfolio aligned with your goals.", ["https://www.youtube.com/watch?v=gFQNPmLKj1k"], [{term:"Investment Strategy",url:"https://en.wikipedia.org/wiki/Investment_strategy"}]],
    ["Bonds & Fixed Income", "Understand bond types, yields, and the role of bonds in a portfolio.\n\nBalance risk and return with fixed-income investments.", ["https://www.youtube.com/watch?v=IuyejHOGCro"], [{term:"Bond",url:"https://en.wikipedia.org/wiki/Bond_(finance)"}]],
    ["Risk Management", "Diversification, asset allocation, and rebalancing. Protect your portfolio from major losses.\n\nDevelop a risk-appropriate investment plan.", ["https://www.youtube.com/watch?v=FDYBmFaCVlg"], [{term:"Risk Management",url:"https://en.wikipedia.org/wiki/Financial_risk_management"}]]
  ]),

  c("product-management", "Product Management", "Lead product development from discovery to delivery and growth.", "📋", "hsl(175, 60%, 45%)", "Business", [
    ["PM Fundamentals", "Understand the PM role, product thinking, and stakeholder management.\n\nLearn frameworks for prioritization and decision making.", ["https://www.youtube.com/watch?v=xi3DClfsBqU"], [{term:"Product Management",url:"https://en.wikipedia.org/wiki/Product_management"}]],
    ["User Research", "Conduct interviews, surveys, and usability tests. Build user personas and journey maps.\n\nDevelop deep empathy for your users' needs.", ["https://www.youtube.com/watch?v=Ovj4hFxko7c"], [{term:"User Research",url:"https://en.wikipedia.org/wiki/User_research"}]],
    ["Roadmapping", "Create product roadmaps, define OKRs, and prioritize features with RICE/MoSCoW.\n\nAlign stakeholders and communicate product vision.", ["https://www.youtube.com/watch?v=cCy1q0Gm-Bc"], [{term:"Product Roadmap",url:"https://en.wikipedia.org/wiki/Technology_roadmap"}]],
    ["Agile & Scrum", "Run sprints, write user stories, and facilitate ceremonies. Ship iteratively.\n\nBuild high-performing cross-functional teams.", ["https://www.youtube.com/watch?v=502ILHjX9EE"], [{term:"Scrum",url:"https://en.wikipedia.org/wiki/Scrum_(software_development)"}]],
    ["Metrics & Growth", "Define KPIs, analyze funnels, and run experiments. Use data to drive product decisions.\n\nGrow engagement, retention, and revenue.", ["https://www.youtube.com/watch?v=Z5vxRC8dFos"], [{term:"KPI",url:"https://en.wikipedia.org/wiki/Performance_indicator"}]]
  ]),

  // ═══════ LANGUAGES ═══════
  c("spanish", "Learn Spanish", "Speak Spanish from day one — grammar, vocabulary, and conversation skills.", "🇪🇸", "hsl(50, 80%, 50%)", "Languages", [
    ["Spanish Basics", "Learn the alphabet, pronunciation, greetings, and numbers. Start with essential phrases.\n\nBuild confidence with simple conversations.", ["https://www.youtube.com/watch?v=DAp_v7EH9AA","https://www.youtube.com/watch?v=TnpJCfovSRw"], [{term:"Spanish",url:"https://en.wikipedia.org/wiki/Spanish_language"}]],
    ["Present Tense & Vocabulary", "Conjugate regular and common irregular verbs. Build vocabulary for daily life.\n\nDescribe your routine, family, and interests.", ["https://www.youtube.com/watch?v=1oySFKGjqfg"], [{term:"Spanish Verbs",url:"https://en.wikipedia.org/wiki/Spanish_verbs"}]],
    ["Past Tenses", "Learn preterite and imperfect tenses. Tell stories about past events.\n\nUnderstand when to use each past tense.", ["https://www.youtube.com/watch?v=e3DIVqpHBio"], [{term:"Spanish Grammar",url:"https://en.wikipedia.org/wiki/Spanish_grammar"}]],
    ["Conversational Spanish", "Practice real conversations: ordering food, asking directions, making plans.\n\nDevelop listening comprehension with native speakers.", ["https://www.youtube.com/watch?v=TJCGbNMLrsU"], [{term:"Language Acquisition",url:"https://en.wikipedia.org/wiki/Language_acquisition"}]],
    ["Advanced Grammar", "Subjunctive mood, conditional, commands, and relative pronouns.\n\nExpress complex ideas and opinions in Spanish.", ["https://www.youtube.com/watch?v=0mls0hH3JYU"], [{term:"Subjunctive",url:"https://en.wikipedia.org/wiki/Subjunctive_mood"}]]
  ]),

  c("japanese", "Learn Japanese", "Read hiragana, katakana, basic kanji, and hold everyday conversations.", "🇯🇵", "hsl(0, 70%, 50%)", "Languages", [
    ["Hiragana & Katakana", "Master the two basic writing systems. Learn all 46 hiragana and 46 katakana characters.\n\nRead and write basic Japanese words.", ["https://www.youtube.com/watch?v=6p9Il_j0zjc","https://www.youtube.com/watch?v=s6DKRp-bFLE"], [{term:"Hiragana",url:"https://en.wikipedia.org/wiki/Hiragana"},{term:"Katakana",url:"https://en.wikipedia.org/wiki/Katakana"}]],
    ["Basic Grammar", "Learn sentence structure (SOV), particles (は, が, を, に, で), and polite forms.\n\nMake basic sentences about yourself and your surroundings.", ["https://www.youtube.com/watch?v=wkPWC6T6sFE"], [{term:"Japanese Grammar",url:"https://en.wikipedia.org/wiki/Japanese_grammar"}]],
    ["Essential Vocabulary", "Numbers, dates, time, colors, family, food, and everyday objects.\n\nBuild the vocabulary you need for daily communication.", ["https://www.youtube.com/watch?v=p4iU8QcVxSo"], [{term:"Japanese Vocabulary",url:"https://en.wikipedia.org/wiki/Japanese_language"}]],
    ["Beginner Kanji", "Learn your first 100 kanji characters with mnemonics. Understand radicals and readings.\n\nRead simple signs, menus, and messages.", ["https://www.youtube.com/watch?v=SCKGo7Pzajc"], [{term:"Kanji",url:"https://en.wikipedia.org/wiki/Kanji"}]],
    ["Conversation Practice", "Common phrases for travel, shopping, restaurants, and making friends.\n\nPractice natural Japanese conversations.", ["https://www.youtube.com/watch?v=bFCZqNgwdGc"], [{term:"Japanese Honorifics",url:"https://en.wikipedia.org/wiki/Japanese_honorifics"}]]
  ]),

  c("french", "Learn French", "Master French pronunciation, grammar, and conversation for travel and life.", "🇫🇷", "hsl(220, 60%, 55%)", "Languages", [
    ["French Basics", "Learn pronunciation rules, nasal vowels, and silent letters. Master greetings and essential phrases.\n\nDevelop a good French accent from day one.", ["https://www.youtube.com/watch?v=hh8V5dEONPE"], [{term:"French",url:"https://en.wikipedia.org/wiki/French_language"}]],
    ["Grammar Foundations", "Articles, gender, adjective agreement, and present tense conjugations.\n\nBuild correct sentences about everyday topics.", ["https://www.youtube.com/watch?v=vEa9pjHnIJQ"], [{term:"French Grammar",url:"https://en.wikipedia.org/wiki/French_grammar"}]],
    ["Past & Future Tenses", "Passé composé, imparfait, and futur proche. Express time naturally in French.\n\nTell stories and make plans in French.", ["https://www.youtube.com/watch?v=M6E_VXuLGYA"], [{term:"French Verbs",url:"https://en.wikipedia.org/wiki/French_verbs"}]],
    ["Conversational French", "Order in restaurants, shop at markets, ask for directions, and make small talk.\n\nSurvive and thrive in French-speaking countries.", ["https://www.youtube.com/watch?v=nReFRbpPIuY"], [{term:"Francophonie",url:"https://en.wikipedia.org/wiki/Organisation_internationale_de_la_Francophonie"}]],
    ["Advanced Expression", "Subjunctive, conditional, complex pronouns, and idiomatic expressions.\n\nExpress nuanced thoughts and debate in French.", ["https://www.youtube.com/watch?v=kzAH1bUmVAs"], [{term:"French Literature",url:"https://en.wikipedia.org/wiki/French_literature"}]]
  ]),

  c("german", "Learn German", "Build German skills from Hallo to fluency with grammar and conversation.", "🇩🇪", "hsl(45, 70%, 48%)", "Languages", [
    ["German Basics", "Pronunciation, alphabet, basic greetings, and essential phrases.\n\nGet comfortable with German sounds and rhythm.", ["https://www.youtube.com/watch?v=HImAPirAhuo"], [{term:"German",url:"https://en.wikipedia.org/wiki/German_language"}]],
    ["Cases & Articles", "Master der/die/das, nominative, accusative, dative cases.\n\nUnderstand the German case system that confuses many learners.", ["https://www.youtube.com/watch?v=QEPeD1H0-W8"], [{term:"German Grammar",url:"https://en.wikipedia.org/wiki/German_grammar"}]],
    ["Verb Conjugation", "Regular verbs, irregular verbs, separable verbs, and modal verbs.\n\nBuild sentences with proper word order.", ["https://www.youtube.com/watch?v=C_rcjhIfP6A"], [{term:"German Verbs",url:"https://en.wikipedia.org/wiki/German_verbs"}]],
    ["Everyday Conversations", "Shopping, dining, travel, and workplace phrases.\n\nCommunicate confidently in German-speaking countries.", ["https://www.youtube.com/watch?v=WOzWr6yz1Gk"], [{term:"German Culture",url:"https://en.wikipedia.org/wiki/Culture_of_Germany"}]],
    ["Advanced Grammar", "Genitive case, passive voice, relative clauses, and Konjunktiv II.\n\nExpress complex ideas fluently.", ["https://www.youtube.com/watch?v=2z2AjkTyYoM"], [{term:"German Dialects",url:"https://en.wikipedia.org/wiki/German_dialects"}]]
  ]),

  c("mandarin", "Learn Mandarin Chinese", "Master tones, characters, and conversational Mandarin from scratch.", "🇨🇳", "hsl(0, 80%, 50%)", "Languages", [
    ["Tones & Pinyin", "Master the four tones and neutral tone. Learn Pinyin romanization system.\n\nCorrect tone pronunciation is critical for being understood.", ["https://www.youtube.com/watch?v=3wV8B4bx1lM"], [{term:"Standard Chinese",url:"https://en.wikipedia.org/wiki/Standard_Chinese"}]],
    ["Basic Characters", "Learn your first 100 most common characters. Understand radicals and stroke order.\n\nRead basic signs, labels, and simple texts.", ["https://www.youtube.com/watch?v=syTxW9Nf_gg"], [{term:"Chinese Characters",url:"https://en.wikipedia.org/wiki/Chinese_characters"}]],
    ["Grammar Basics", "SVO sentence structure, particles (的/了/过), measure words, and questions.\n\nBuild grammatically correct Mandarin sentences.", ["https://www.youtube.com/watch?v=yVPnEFBYfRM"], [{term:"Chinese Grammar",url:"https://en.wikipedia.org/wiki/Chinese_grammar"}]],
    ["Daily Conversations", "Introductions, shopping, ordering food, asking directions, and numbers.\n\nSurvive daily life in Chinese-speaking environments.", ["https://www.youtube.com/watch?v=j7kk6FPimMQ"], [{term:"Chinese Culture",url:"https://en.wikipedia.org/wiki/Chinese_culture"}]],
    ["Reading & Writing", "Expand character knowledge to 300+. Read simple articles and write short messages.\n\nUse Chinese input methods on your devices.", ["https://www.youtube.com/watch?v=s_HBxFfTmkM"], [{term:"Chinese Writing",url:"https://en.wikipedia.org/wiki/Written_Chinese"}]]
  ]),

  c("korean", "Learn Korean", "Read Hangul, learn grammar patterns, and speak conversational Korean.", "🇰🇷", "hsl(210, 70%, 50%)", "Languages", [
    ["Hangul Alphabet", "Learn the Korean alphabet in a few hours. It's one of the most logical writing systems.\n\nRead and write any Korean word with Hangul.", ["https://www.youtube.com/watch?v=s5aobqyEaMQ"], [{term:"Hangul",url:"https://en.wikipedia.org/wiki/Hangul"}]],
    ["Basic Grammar", "Sentence structure (SOV), particles, and polite speech levels.\n\nBuild your first Korean sentences.", ["https://www.youtube.com/watch?v=03ET4gFm2BQ"], [{term:"Korean Grammar",url:"https://en.wikipedia.org/wiki/Korean_grammar"}]],
    ["Essential Vocabulary", "Common words for food, travel, family, work, and daily life.\n\nK-drama and K-pop can help reinforce vocabulary.", ["https://www.youtube.com/watch?v=bvQ03cPOpHY"], [{term:"Korean Language",url:"https://en.wikipedia.org/wiki/Korean_language"}]],
    ["Verb Conjugation", "Present, past, and future tenses. Formal, informal, and casual speech.\n\nMatch your speech level to the social context.", ["https://www.youtube.com/watch?v=2k7RfBIKdbU"], [{term:"Korean Honorifics",url:"https://en.wikipedia.org/wiki/Korean_honorifics"}]],
    ["Conversation Practice", "Order at restaurants, shop, take transit, and make friends.\n\nBuild confidence in real Korean conversations.", ["https://www.youtube.com/watch?v=qr7SVXZ1c1E"], [{term:"Korean Culture",url:"https://en.wikipedia.org/wiki/Culture_of_Korea"}]]
  ]),

  // ═══════ SCIENCE ═══════
  c("physics", "Physics", "Understand the fundamental laws of nature — from mechanics to quantum physics.", "⚛️", "hsl(200, 60%, 45%)", "Science", [
    ["Classical Mechanics", "Newton's laws, forces, energy, momentum, and motion. Solve real-world physics problems.\n\nUnderstand why things move the way they do.", ["https://www.youtube.com/watch?v=ZM8ECpBuQYE"], [{term:"Classical Mechanics",url:"https://en.wikipedia.org/wiki/Classical_mechanics"}]],
    ["Thermodynamics", "Heat, temperature, entropy, and the laws of thermodynamics.\n\nUnderstand energy transfer and efficiency.", ["https://www.youtube.com/watch?v=UyRoIhiUw7g"], [{term:"Thermodynamics",url:"https://en.wikipedia.org/wiki/Thermodynamics"}]],
    ["Electromagnetism", "Electric fields, magnetic fields, circuits, and electromagnetic waves.\n\nUnderstand the force that powers our technology.", ["https://www.youtube.com/watch?v=rtlJoXxlSFE"], [{term:"Electromagnetism",url:"https://en.wikipedia.org/wiki/Electromagnetism"}]],
    ["Waves & Optics", "Sound waves, light, interference, diffraction, and the electromagnetic spectrum.\n\nUnderstand how waves carry energy and information.", ["https://www.youtube.com/watch?v=7eBgJRcQQ_8"], [{term:"Wave",url:"https://en.wikipedia.org/wiki/Wave"}]],
    ["Modern Physics", "Special relativity, quantum mechanics basics, and nuclear physics.\n\nExplore the strange world of the very fast and very small.", ["https://www.youtube.com/watch?v=7vc-Uvp3vwg"], [{term:"Quantum Mechanics",url:"https://en.wikipedia.org/wiki/Quantum_mechanics"}]]
  ]),

  c("astronomy", "Astronomy", "Explore the universe — planets, stars, galaxies, and the cosmos.", "🔭", "hsl(240, 50%, 40%)", "Science", [
    ["The Solar System", "Explore planets, moons, asteroids, and comets. Understand orbits and planetary formation.\n\nLearn to identify planets in the night sky.", ["https://www.youtube.com/watch?v=libKVRa01L8"], [{term:"Solar System",url:"https://en.wikipedia.org/wiki/Solar_System"}]],
    ["Stars & Stellar Evolution", "How stars are born, live, and die. Main sequence, red giants, supernovae, and neutron stars.\n\nUnderstand the stellar lifecycle and nucleosynthesis.", ["https://www.youtube.com/watch?v=ld75W1dz-h0"], [{term:"Stellar Evolution",url:"https://en.wikipedia.org/wiki/Stellar_evolution"}]],
    ["Galaxies & Cosmology", "Galaxy types, the Milky Way, dark matter, and dark energy.\n\nUnderstand the large-scale structure of the universe.", ["https://www.youtube.com/watch?v=rENyyRwxpHo"], [{term:"Galaxy",url:"https://en.wikipedia.org/wiki/Galaxy"}]],
    ["Telescopes & Observation", "Choose and use telescopes, binoculars, and apps for stargazing.\n\nObserve the Moon, planets, and deep-sky objects.", ["https://www.youtube.com/watch?v=FP3_6Yz2JHU"], [{term:"Telescope",url:"https://en.wikipedia.org/wiki/Telescope"}]],
    ["The Big Bang & Beyond", "The origin of the universe, cosmic microwave background, and fate of the cosmos.\n\nExplore the biggest questions in physics.", ["https://www.youtube.com/watch?v=wNDGgL73ihY"], [{term:"Big Bang",url:"https://en.wikipedia.org/wiki/Big_Bang"}]]
  ]),

  c("biology", "Biology", "Understand life from cells to ecosystems — genetics, evolution, and anatomy.", "🧬", "hsl(150, 60%, 40%)", "Science", [
    ["Cell Biology", "Structure and function of cells: organelles, membranes, and cell division.\n\nUnderstand the building blocks of all life.", ["https://www.youtube.com/watch?v=URUJD5NEXC8"], [{term:"Cell Biology",url:"https://en.wikipedia.org/wiki/Cell_biology"}]],
    ["Genetics & DNA", "DNA structure, gene expression, inheritance, and mutations.\n\nUnderstand how traits are passed from parents to offspring.", ["https://www.youtube.com/watch?v=8m6hHRlKwxY"], [{term:"Genetics",url:"https://en.wikipedia.org/wiki/Genetics"}]],
    ["Evolution", "Natural selection, adaptation, speciation, and the tree of life.\n\nUnderstand the diversity of life on Earth.", ["https://www.youtube.com/watch?v=GcjgWov7mTM"], [{term:"Evolution",url:"https://en.wikipedia.org/wiki/Evolution"}]],
    ["Human Anatomy", "Major organ systems: skeletal, muscular, nervous, cardiovascular, and digestive.\n\nUnderstand how the human body works.", ["https://www.youtube.com/watch?v=uBGl2BujkPQ"], [{term:"Human Anatomy",url:"https://en.wikipedia.org/wiki/Human_body"}]],
    ["Ecology", "Ecosystems, food webs, biodiversity, and environmental science.\n\nUnderstand relationships between organisms and their environment.", ["https://www.youtube.com/watch?v=izRvPaAWgyw"], [{term:"Ecology",url:"https://en.wikipedia.org/wiki/Ecology"}]]
  ]),

  c("chemistry", "Chemistry", "Understand matter, reactions, and the molecular world around you.", "🧪", "hsl(170, 65%, 40%)", "Science", [
    ["Atoms & Elements", "Atomic structure, periodic table, electron configuration, and chemical bonding.\n\nUnderstand what everything is made of.", ["https://www.youtube.com/watch?v=FSyAehMdpyI"], [{term:"Atom",url:"https://en.wikipedia.org/wiki/Atom"}]],
    ["Chemical Reactions", "Balancing equations, reaction types, stoichiometry, and limiting reagents.\n\nPredict products and quantify chemical changes.", ["https://www.youtube.com/watch?v=eNsVaUCzvLA"], [{term:"Chemical Reaction",url:"https://en.wikipedia.org/wiki/Chemical_reaction"}]],
    ["Acids, Bases & Solutions", "pH scale, neutralization, buffers, and solution concentration.\n\nUnderstand the chemistry of everyday solutions.", ["https://www.youtube.com/watch?v=ANi709MYnWg"], [{term:"Acid–Base Chemistry",url:"https://en.wikipedia.org/wiki/Acid%E2%80%93base_reaction"}]],
    ["Organic Chemistry Basics", "Carbon chemistry, functional groups, hydrocarbons, and basic organic reactions.\n\nExplore the chemistry of life's molecules.", ["https://www.youtube.com/watch?v=bSMx0NS0XfY"], [{term:"Organic Chemistry",url:"https://en.wikipedia.org/wiki/Organic_chemistry"}]],
    ["Thermochemistry", "Energy in chemical reactions, enthalpy, entropy, and Gibbs free energy.\n\nPredict whether reactions will occur spontaneously.", ["https://www.youtube.com/watch?v=GqtUWyDR1fg"], [{term:"Thermochemistry",url:"https://en.wikipedia.org/wiki/Thermochemistry"}]]
  ]),

  // ═══════ HEALTH & FITNESS ═══════
  c("fitness", "Strength Training", "Build muscle and strength with proper technique, programming, and nutrition.", "💪", "hsl(0, 70%, 50%)", "Health & Fitness", [
    ["Getting Started", "Learn gym etiquette, warm-up routines, and basic movement patterns.\n\nBuild the habits for consistent training.", ["https://www.youtube.com/watch?v=U9ENCvFf9yQ"], [{term:"Strength Training",url:"https://en.wikipedia.org/wiki/Strength_training"}]],
    ["Compound Lifts", "Master squat, bench press, deadlift, overhead press, and row with proper form.\n\nThese exercises build the most muscle efficiently.", ["https://www.youtube.com/watch?v=nhoikoUEI8U"], [{term:"Squat",url:"https://en.wikipedia.org/wiki/Squat_(exercise)"}]],
    ["Programming", "Design training splits, progressive overload, and periodization.\n\nFollow proven programs for steady strength gains.", ["https://www.youtube.com/watch?v=y1r9toPQNkM"], [{term:"Exercise Programming",url:"https://en.wikipedia.org/wiki/Strength_training#Training_practices"}]],
    ["Nutrition for Muscle", "Calculate macros, meal timing, and supplements. Eat to support your training goals.\n\nBuild muscle while managing body composition.", ["https://www.youtube.com/watch?v=d8V9ZaSq9Oc"], [{term:"Sports Nutrition",url:"https://en.wikipedia.org/wiki/Sports_nutrition"}]],
    ["Recovery & Injury Prevention", "Sleep, stretching, mobility work, and deload weeks. Prevent common training injuries.\n\nTrain sustainably for the long term.", ["https://www.youtube.com/watch?v=g_tea8ZNk5A"], [{term:"Sports Medicine",url:"https://en.wikipedia.org/wiki/Sports_medicine"}]]
  ]),

  c("yoga", "Yoga", "Build flexibility, strength, and mindfulness through yoga practice.", "🧘", "hsl(280, 45%, 55%)", "Health & Fitness", [
    ["Yoga Foundations", "Learn basic poses, breathing techniques, and yoga philosophy.\n\nSet up your practice space and routine.", ["https://www.youtube.com/watch?v=v7AYKMP6rOE"], [{term:"Yoga",url:"https://en.wikipedia.org/wiki/Yoga"}]],
    ["Sun Salutations", "Master Surya Namaskar A and B. Build flowing sequences linking breath to movement.\n\nDevelop the foundation for all vinyasa practices.", ["https://www.youtube.com/watch?v=73sjOu0g58M"], [{term:"Sun Salutation",url:"https://en.wikipedia.org/wiki/Surya_Namaskar"}]],
    ["Standing & Balance Poses", "Warrior I, II, III, Tree Pose, and balancing sequences.\n\nBuild leg strength and stability.", ["https://www.youtube.com/watch?v=brjAjq4-gog"], [{term:"Asana",url:"https://en.wikipedia.org/wiki/Asana"}]],
    ["Flexibility & Backbends", "Forward folds, hip openers, and safe backbending progression.\n\nIncrease range of motion gradually and safely.", ["https://www.youtube.com/watch?v=g_tea8ZNk5A"], [{term:"Flexibility",url:"https://en.wikipedia.org/wiki/Flexibility_(anatomy)"}]],
    ["Meditation & Pranayama", "Guided meditation, breathing exercises, and mindfulness techniques.\n\nCultivate mental clarity and inner peace.", ["https://www.youtube.com/watch?v=inpok4MKVLM"], [{term:"Pranayama",url:"https://en.wikipedia.org/wiki/Pranayama"}]]
  ]),

  c("running", "Running", "From couch to 5K to marathon — train smart and enjoy the run.", "🏃", "hsl(30, 75%, 50%)", "Health & Fitness", [
    ["Getting Started", "Choose shoes, learn proper form, and start with walk/run intervals.\n\nBuild a consistent running habit without injury.", ["https://www.youtube.com/watch?v=kVnyY17VS9Y"], [{term:"Running",url:"https://en.wikipedia.org/wiki/Running"}]],
    ["Couch to 5K", "Follow a progressive training plan from walking to running 5 kilometers.\n\nBuild endurance over 8-12 weeks.", ["https://www.youtube.com/watch?v=2OWHxZ4oHQo"], [{term:"5K Run",url:"https://en.wikipedia.org/wiki/5K_run"}]],
    ["Running Form & Efficiency", "Cadence, foot strike, arm swing, and breathing. Run easier and faster with good form.\n\nPrevent common running injuries.", ["https://www.youtube.com/watch?v=brFHyOtTwH4"], [{term:"Running Biomechanics",url:"https://en.wikipedia.org/wiki/Gait_(human)"}]],
    ["Speed & Intervals", "Tempo runs, fartleks, and track intervals. Get faster with structured speed work.\n\nBalance easy running with hard efforts.", ["https://www.youtube.com/watch?v=VhB5S0EhLsc"], [{term:"Interval Training",url:"https://en.wikipedia.org/wiki/Interval_training"}]],
    ["Race Training", "Prepare for 10K, half marathon, or marathon. Taper, fuel, and race day strategy.\n\nCross your finish line strong.", ["https://www.youtube.com/watch?v=u-CShW0Oqbg"], [{term:"Marathon",url:"https://en.wikipedia.org/wiki/Marathon"}]]
  ]),

  c("meditation", "Meditation", "Calm your mind, reduce stress, and build focus with meditation practice.", "🕊️", "hsl(200, 40%, 55%)", "Health & Fitness", [
    ["What is Meditation?", "Understand different traditions and styles. Set up your space and posture.\n\nStart with 5-minute sessions and build up.", ["https://www.youtube.com/watch?v=inpok4MKVLM"], [{term:"Meditation",url:"https://en.wikipedia.org/wiki/Meditation"}]],
    ["Breath Awareness", "Focus on the breath as an anchor. Notice when the mind wanders and gently return.\n\nBuild the core skill of sustained attention.", ["https://www.youtube.com/watch?v=wTBSGgbIvsY"], [{term:"Mindfulness",url:"https://en.wikipedia.org/wiki/Mindfulness"}]],
    ["Body Scan", "Systematically relax each part of the body. Release tension you didn't know you had.\n\nDeepen the mind-body connection.", ["https://www.youtube.com/watch?v=15q-N-_kkrU"], [{term:"Body Scan",url:"https://en.wikipedia.org/wiki/Body_scan_meditation"}]],
    ["Loving-Kindness", "Generate feelings of compassion for yourself and others. Metta meditation transforms relationships.\n\nCultivate empathy and emotional resilience.", ["https://www.youtube.com/watch?v=sz7cpV7ERsM"], [{term:"Mettā",url:"https://en.wikipedia.org/wiki/Mett%C4%81"}]],
    ["Building a Daily Practice", "Overcome resistance, track progress, and make meditation a habit.\n\nIntegrate mindfulness into daily life.", ["https://www.youtube.com/watch?v=o-kMJBWk9E0"], [{term:"Habit",url:"https://en.wikipedia.org/wiki/Habit"}]]
  ]),

  // ═══════ COOKING ═══════
  c("cooking", "Cooking Fundamentals", "Master essential cooking techniques, knife skills, and classic recipes.", "👨‍🍳", "hsl(0, 70%, 50%)", "Cooking", [
    ["Kitchen Setup & Knife Skills", "Essential tools and master the basic cuts: dice, julienne, mince, and chiffonade.\n\nA sharp knife is safer than a dull one.", ["https://www.youtube.com/watch?v=20gwf7YttQM","https://www.youtube.com/watch?v=G-Fg7l7G1zw"], [{term:"Knife Skills",url:"https://en.wikipedia.org/wiki/Culinary_arts"},{term:"Mise en place",url:"https://en.wikipedia.org/wiki/Mise_en_place"}]],
    ["Cooking Methods", "Dry heat (roasting, grilling, sautéing) and wet heat (boiling, steaming, braising).\n\nLearn to control heat — it's the most important variable.", ["https://www.youtube.com/watch?v=nHmBYMhk3cQ","https://www.youtube.com/watch?v=Jz5v12j4pYI"], [{term:"Cooking",url:"https://en.wikipedia.org/wiki/Cooking"},{term:"Maillard Reaction",url:"https://en.wikipedia.org/wiki/Maillard_reaction"}]],
    ["Sauces & Seasonings", "Master the five mother sauces, vinaigrettes, and seasoning principles.\n\nTransform simple dishes with proper sauce technique.", ["https://www.youtube.com/watch?v=SYS3xez8dYs"], [{term:"Sauce",url:"https://en.wikipedia.org/wiki/Sauce"}]],
    ["Baking Basics", "Understand flour, leavening, and temperature. Bake bread, cookies, and simple cakes.\n\nBaking is science — precision matters.", ["https://www.youtube.com/watch?v=JjbbJhYjF2Q"], [{term:"Baking",url:"https://en.wikipedia.org/wiki/Baking"}]],
    ["Meal Planning & Prep", "Plan balanced meals, prep ingredients ahead, and reduce food waste.\n\nCook efficiently for the whole week.", ["https://www.youtube.com/watch?v=bJUiWdM__Qw","https://www.youtube.com/watch?v=1UYC7XnwOBE"], [{term:"Meal Planning",url:"https://en.wikipedia.org/wiki/Meal_preparation"}]],
    ["World Cuisines", "Explore Italian, Asian, Mexican, and Mediterranean cooking. Learn signature dishes and techniques.\n\nExpand your culinary repertoire globally.", ["https://www.youtube.com/watch?v=JZPXzMCA_2A"], [{term:"Cuisine",url:"https://en.wikipedia.org/wiki/Cuisine"}]]
  ]),

  c("baking", "Baking & Pastry", "Create breads, pastries, cakes, and desserts with professional techniques.", "🍰", "hsl(340, 60%, 55%)", "Cooking", [
    ["Baking Science", "Understand how flour, sugar, fats, eggs, and leavening agents interact.\n\nWhy precision and technique matter in baking.", ["https://www.youtube.com/watch?v=W3WBH_4bSgA"], [{term:"Baking",url:"https://en.wikipedia.org/wiki/Baking"}]],
    ["Bread Making", "Master yeast breads: kneading, proofing, shaping, and baking.\n\nBake your first loaf of homemade bread.", ["https://www.youtube.com/watch?v=lipLAgZkWN0"], [{term:"Bread",url:"https://en.wikipedia.org/wiki/Bread"}]],
    ["Cookies & Bars", "Classic chocolate chip, shortbread, brownies, and decorative cookies.\n\nMaster mixing methods for perfect textures.", ["https://www.youtube.com/watch?v=wyuec0PPz68"], [{term:"Cookie",url:"https://en.wikipedia.org/wiki/Cookie"}]],
    ["Cakes & Frosting", "Layer cakes, sponges, and buttercream. Level, fill, and frost like a pro.\n\nCreate stunning celebration cakes.", ["https://www.youtube.com/watch?v=5VGqkr2LKWA"], [{term:"Cake",url:"https://en.wikipedia.org/wiki/Cake"}]],
    ["Pastry Techniques", "Puff pastry, choux, pie crust, and tart shells.\n\nMaster the foundational pastry doughs.", ["https://www.youtube.com/watch?v=bJxDH_DnA8c"], [{term:"Pastry",url:"https://en.wikipedia.org/wiki/Pastry"}]]
  ]),

  // ═══════ CRAFTS & DIY ═══════
  c("woodworking", "Woodworking", "Build furniture and projects with hand tools and power tools.", "🪵", "hsl(30, 50%, 40%)", "Crafts & DIY", [
    ["Tools & Safety", "Essential hand tools and power tools. Workshop safety rules and proper tool maintenance.\n\nSet up your first woodworking workspace.", ["https://www.youtube.com/watch?v=M_0oVaVnvgE"], [{term:"Woodworking",url:"https://en.wikipedia.org/wiki/Woodworking"}]],
    ["Wood Selection", "Hardwoods vs softwoods, grain patterns, and lumber grading.\n\nChoose the right wood for each project.", ["https://www.youtube.com/watch?v=yLpZMj2TxSg"], [{term:"Lumber",url:"https://en.wikipedia.org/wiki/Lumber"}]],
    ["Joinery Basics", "Butt joints, pocket holes, dowels, biscuits, and mortise-and-tenon.\n\nChoose the right joint for strength and aesthetics.", ["https://www.youtube.com/watch?v=RJa_ZiFvKwg"], [{term:"Woodworking Joints",url:"https://en.wikipedia.org/wiki/Woodworking_joints"}]],
    ["Finishing", "Sanding progression, stains, oils, and polyurethane finishes.\n\nProtect and beautify your projects.", ["https://www.youtube.com/watch?v=l0yJTWzVTxs"], [{term:"Wood Finishing",url:"https://en.wikipedia.org/wiki/Wood_finishing"}]],
    ["First Projects", "Build a cutting board, shelf, or simple table. Apply all your skills.\n\nGrow from beginner to confident woodworker.", ["https://www.youtube.com/watch?v=KnATygLINnk"], [{term:"Furniture",url:"https://en.wikipedia.org/wiki/Furniture"}]]
  ]),

  c("electronics", "Electronics & Arduino", "Build circuits and program microcontrollers for DIY projects.", "🔌", "hsl(120, 70%, 40%)", "Crafts & DIY", [
    ["Circuit Basics", "Voltage, current, resistance, and Ohm's law. Read circuit diagrams and use a multimeter.\n\nBuild your first LED circuit on a breadboard.", ["https://www.youtube.com/watch?v=mc979OhitAg"], [{term:"Electronic Circuit",url:"https://en.wikipedia.org/wiki/Electronic_circuit"}]],
    ["Components", "Resistors, capacitors, transistors, diodes, and ICs. Understand what each component does.\n\nBuild circuits with sensors and actuators.", ["https://www.youtube.com/watch?v=6Maq5IyHSuc"], [{term:"Electronic Component",url:"https://en.wikipedia.org/wiki/Electronic_component"}]],
    ["Arduino Programming", "Set up Arduino IDE, write your first sketch, and control LEDs and motors.\n\nRead sensors and make things move.", ["https://www.youtube.com/watch?v=zJ-LqeX_fLU"], [{term:"Arduino",url:"https://en.wikipedia.org/wiki/Arduino"}]],
    ["IoT Projects", "Connect Arduino to WiFi, send data to the cloud, and build smart devices.\n\nCreate home automation and monitoring projects.", ["https://www.youtube.com/watch?v=G6CqvhXpBKM"], [{term:"Internet of Things",url:"https://en.wikipedia.org/wiki/Internet_of_things"}]],
    ["Advanced Projects", "Build robots, weather stations, and interactive art installations.\n\nCombine electronics, code, and creativity.", ["https://www.youtube.com/watch?v=fPLEncYrl4Q"], [{term:"Robotics",url:"https://en.wikipedia.org/wiki/Robotics"}]]
  ]),

  c("sewing", "Sewing", "Create garments and projects from fabric — from basics to your own designs.", "🧵", "hsl(320, 50%, 50%)", "Crafts & DIY", [
    ["Sewing Basics", "Thread a needle, learn basic hand stitches, and understand fabric types.\n\nSet up and use a sewing machine.", ["https://www.youtube.com/watch?v=BuQk7X-F4rw"], [{term:"Sewing",url:"https://en.wikipedia.org/wiki/Sewing"}]],
    ["Reading Patterns", "Understand pattern pieces, markings, and sizing. Cut fabric accurately.\n\nFollow commercial patterns for your first projects.", ["https://www.youtube.com/watch?v=A9hOKOPL9cM"], [{term:"Pattern",url:"https://en.wikipedia.org/wiki/Pattern_(sewing)"}]],
    ["Machine Techniques", "Seam finishes, zippers, buttonholes, and hems.\n\nMaster the essential sewing machine techniques.", ["https://www.youtube.com/watch?v=3u1kP0YRTE4"], [{term:"Sewing Machine",url:"https://en.wikipedia.org/wiki/Sewing_machine"}]],
    ["Simple Projects", "Tote bags, cushion covers, skirts, and simple tops.\n\nBuild skills progressively with each project.", ["https://www.youtube.com/watch?v=3p4e_b5yKWM"], [{term:"Dressmaking",url:"https://en.wikipedia.org/wiki/Dressmaking"}]],
    ["Alterations & Fitting", "Adjust garments for perfect fit. Take in, let out, hem, and restyle clothing.\n\nMake your wardrobe fit you perfectly.", ["https://www.youtube.com/watch?v=1DhOdQ1yzug"], [{term:"Tailoring",url:"https://en.wikipedia.org/wiki/Tailoring"}]]
  ]),

  // ═══════ WRITING ═══════
  c("creative-writing", "Creative Writing", "Write compelling stories, develop characters, and find your voice.", "✍️", "hsl(45, 70%, 50%)", "Writing", [
    ["Finding Your Voice", "Discover your writing style through exercises. Read widely and write daily.\n\nOvercome the blank page and build a writing habit.", ["https://www.youtube.com/watch?v=VNh13i1bHe0"], [{term:"Creative Writing",url:"https://en.wikipedia.org/wiki/Creative_writing"}]],
    ["Character Development", "Create complex, believable characters with desires, flaws, and arcs.\n\nMake readers care about your characters.", ["https://www.youtube.com/watch?v=pU9sHwNKc2c"], [{term:"Character",url:"https://en.wikipedia.org/wiki/Character_(arts)"}]],
    ["Plot & Structure", "Three-act structure, hero's journey, and scene/sequel pattern.\n\nBuild stories that keep readers turning pages.", ["https://www.youtube.com/watch?v=nU-xRbEdN6I"], [{term:"Plot",url:"https://en.wikipedia.org/wiki/Plot_(narrative)"}]],
    ["Dialogue & Description", "Write natural dialogue and vivid descriptions. Show, don't tell.\n\nBalance action, dialogue, and exposition.", ["https://www.youtube.com/watch?v=dGlQEhMoE-g"], [{term:"Dialogue",url:"https://en.wikipedia.org/wiki/Dialogue"}]],
    ["Revision & Publishing", "Edit your work ruthlessly. Get feedback, revise, and polish.\n\nExplore traditional publishing and self-publishing options.", ["https://www.youtube.com/watch?v=o7VqGjDHMU4"], [{term:"Editing",url:"https://en.wikipedia.org/wiki/Editing"}]]
  ]),

  c("copywriting", "Copywriting", "Write persuasive copy that sells — ads, emails, landing pages, and more.", "📝", "hsl(15, 75%, 50%)", "Writing", [
    ["Copywriting Fundamentals", "Understand the psychology of persuasion. AIDA framework, features vs benefits.\n\nWrite copy that compels action.", ["https://www.youtube.com/watch?v=8wKf4YJXZ5A"], [{term:"Copywriting",url:"https://en.wikipedia.org/wiki/Copywriting"}]],
    ["Headlines & Hooks", "Write magnetic headlines that stop the scroll. Learn proven headline formulas.\n\nThe headline is 80% of your copy's success.", ["https://www.youtube.com/watch?v=4eFxFTQ4sSQ"], [{term:"Headline",url:"https://en.wikipedia.org/wiki/Headline"}]],
    ["Email Copy", "Subject lines, body copy, and CTAs that get opens and clicks.\n\nWrite email sequences that nurture and convert.", ["https://www.youtube.com/watch?v=qU-sYAfAIiA"], [{term:"Direct Mail",url:"https://en.wikipedia.org/wiki/Direct_mail"}]],
    ["Landing Pages", "Structure landing pages for maximum conversion. Hero, social proof, CTA placement.\n\nWrite pages that turn visitors into customers.", ["https://www.youtube.com/watch?v=V1nTxzo0dGE"], [{term:"Landing Page",url:"https://en.wikipedia.org/wiki/Landing_page"}]],
    ["Brand Voice & Storytelling", "Develop a consistent brand voice. Use storytelling to connect emotionally.\n\nMake your brand memorable and relatable.", ["https://www.youtube.com/watch?v=Nj-hdQMa3uA"], [{term:"Brand",url:"https://en.wikipedia.org/wiki/Brand"}]]
  ]),

  c("blogging", "Blogging & Content", "Build an audience with strategic content creation and SEO.", "📰", "hsl(190, 60%, 45%)", "Writing", [
    ["Starting Your Blog", "Choose a niche, set up your blog platform, and create your first posts.\n\nDefine your unique angle and target audience.", ["https://www.youtube.com/watch?v=9bo-ZUfhD4I"], [{term:"Blog",url:"https://en.wikipedia.org/wiki/Blog"}]],
    ["Content Strategy", "Plan content calendars, research topics, and understand what your audience needs.\n\nBalance evergreen and trending content.", ["https://www.youtube.com/watch?v=M-F4Z-V2PCg"], [{term:"Content Strategy",url:"https://en.wikipedia.org/wiki/Content_strategy"}]],
    ["SEO Writing", "Keyword research, on-page optimization, and writing for both humans and search engines.\n\nRank higher and get organic traffic.", ["https://www.youtube.com/watch?v=MYE6T_gd7H0"], [{term:"SEO",url:"https://en.wikipedia.org/wiki/Search_engine_optimization"}]],
    ["Growing Your Audience", "Email lists, social media promotion, guest posting, and community building.\n\nTurn readers into a loyal audience.", ["https://www.youtube.com/watch?v=GPHgz_Q-MkY"], [{term:"Content Marketing",url:"https://en.wikipedia.org/wiki/Content_marketing"}]],
    ["Monetization", "Ads, affiliates, products, courses, and sponsored content.\n\nTurn your blog into a sustainable business.", ["https://www.youtube.com/watch?v=LpjBBN2sOFA"], [{term:"Monetization",url:"https://en.wikipedia.org/wiki/Monetization"}]]
  ]),

  // ═══════ PERSONAL DEVELOPMENT ═══════
  c("public-speaking", "Public Speaking", "Speak with confidence — structure talks, engage audiences, and overcome fear.", "🎙️", "hsl(10, 70%, 50%)", "Personal Development", [
    ["Overcoming Fear", "Understand why public speaking feels scary and practical techniques to manage anxiety.\n\nReframe nervousness as excitement.", ["https://www.youtube.com/watch?v=xSp78RwcAS4"], [{term:"Glossophobia",url:"https://en.wikipedia.org/wiki/Glossophobia"}]],
    ["Structuring Your Talk", "Open with a hook, deliver three key points, and close with a call to action.\n\nMake your message clear and memorable.", ["https://www.youtube.com/watch?v=MnIPk3dCzYE"], [{term:"Public Speaking",url:"https://en.wikipedia.org/wiki/Public_speaking"}]],
    ["Storytelling", "Use personal stories, metaphors, and vivid details to connect with your audience.\n\nStories are the most powerful communication tool.", ["https://www.youtube.com/watch?v=Nj-hdQMa3uA"], [{term:"Storytelling",url:"https://en.wikipedia.org/wiki/Storytelling"}]],
    ["Delivery & Body Language", "Master voice projection, pacing, pauses, eye contact, and gestures.\n\nYour body speaks louder than your words.", ["https://www.youtube.com/watch?v=HAnw168huqA"], [{term:"Body Language",url:"https://en.wikipedia.org/wiki/Body_language"}]],
    ["Q&A & Improvisation", "Handle tough questions, think on your feet, and manage difficult audiences.\n\nStay composed under pressure.", ["https://www.youtube.com/watch?v=1cQbMP3I5Sk"], [{term:"Impromptu Speaking",url:"https://en.wikipedia.org/wiki/Impromptu_speaking"}]]
  ]),

  c("productivity", "Productivity Systems", "Get more done with less stress — systems, habits, and focus techniques.", "⏰", "hsl(35, 80%, 50%)", "Personal Development", [
    ["Time Management", "Eisenhower matrix, time blocking, and the Pomodoro technique.\n\nSpend time on what matters most.", ["https://www.youtube.com/watch?v=iONDebHX9qk"], [{term:"Time Management",url:"https://en.wikipedia.org/wiki/Time_management"}]],
    ["Note-Taking Systems", "Build a second brain with Zettelkasten, Cornell method, or digital tools like Notion.\n\nCapture, organize, and retrieve knowledge effectively.", ["https://www.youtube.com/watch?v=nX-xshA_0m8"], [{term:"Note-taking",url:"https://en.wikipedia.org/wiki/Note-taking"}]],
    ["Habit Building", "Use habit stacking, environment design, and the two-minute rule.\n\nBuild systems that make good habits automatic.", ["https://www.youtube.com/watch?v=PZ7lDrwYdZc"], [{term:"Habit",url:"https://en.wikipedia.org/wiki/Habit"}]],
    ["Deep Work & Focus", "Eliminate distractions, practice deep work, and build focus stamina.\n\nProduce your best work in less time.", ["https://www.youtube.com/watch?v=ZD7dXfdDPfg"], [{term:"Deep Work",url:"https://en.wikipedia.org/wiki/Deep_work"}]],
    ["Energy Management", "Align tasks with energy levels. Exercise, sleep, and nutrition for peak performance.\n\nManage energy, not just time.", ["https://www.youtube.com/watch?v=PZ7lDrwYdZc"], [{term:"Energy Management",url:"https://en.wikipedia.org/wiki/Energy_management"}]]
  ]),

  c("negotiation", "Negotiation Skills", "Get better outcomes in business and life through effective negotiation.", "🤝", "hsl(220, 50%, 45%)", "Personal Development", [
    ["Negotiation Basics", "Understand BATNA, ZOPA, and win-win vs zero-sum thinking.\n\nPrepare for any negotiation systematically.", ["https://www.youtube.com/watch?v=RfTalFEeKKE"], [{term:"Negotiation",url:"https://en.wikipedia.org/wiki/Negotiation"}]],
    ["Active Listening", "Use mirroring, labeling emotions, and calibrated questions.\n\nUnderstand the other party's true needs.", ["https://www.youtube.com/watch?v=MjhDkNmtjy0"], [{term:"Active Listening",url:"https://en.wikipedia.org/wiki/Active_listening"}]],
    ["Making Offers", "Anchor effectively, use ranges, and frame proposals persuasively.\n\nCreate value before claiming it.", ["https://www.youtube.com/watch?v=D3fBnZIGnMk"], [{term:"Anchoring",url:"https://en.wikipedia.org/wiki/Anchoring_(cognitive_bias)"}]],
    ["Handling Objections", "Respond to pushback, navigate impasses, and find creative solutions.\n\nTurn 'no' into 'not yet' and then into 'yes'.", ["https://www.youtube.com/watch?v=7NJ5-4kYzmk"], [{term:"Persuasion",url:"https://en.wikipedia.org/wiki/Persuasion"}]],
    ["Salary Negotiation", "Research your worth, time your ask, and negotiate the full package.\n\nEarn what you deserve with confidence.", ["https://www.youtube.com/watch?v=XY5SeCl_8NE"], [{term:"Salary",url:"https://en.wikipedia.org/wiki/Salary"}]]
  ]),

  c("leadership", "Leadership", "Lead teams effectively with communication, strategy, and emotional intelligence.", "👑", "hsl(45, 85%, 50%)", "Personal Development", [
    ["Leadership Styles", "Understand servant leadership, transformational, and situational approaches.\n\nFind your authentic leadership style.", ["https://www.youtube.com/watch?v=18UVXW-x2_8"], [{term:"Leadership",url:"https://en.wikipedia.org/wiki/Leadership"}]],
    ["Communication", "Give clear direction, provide feedback, and facilitate productive meetings.\n\nCommunicate with clarity and empathy.", ["https://www.youtube.com/watch?v=HAnw168huqA"], [{term:"Communication",url:"https://en.wikipedia.org/wiki/Communication"}]],
    ["Team Building", "Hire, motivate, and develop high-performing teams. Handle conflict constructively.\n\nCreate psychological safety and trust.", ["https://www.youtube.com/watch?v=RyTQ5-SQYTo"], [{term:"Team Building",url:"https://en.wikipedia.org/wiki/Team_building"}]],
    ["Decision Making", "Use frameworks for better decisions under uncertainty. Avoid cognitive biases.\n\nMake timely decisions with incomplete information.", ["https://www.youtube.com/watch?v=pDrcH-YQIis"], [{term:"Decision-making",url:"https://en.wikipedia.org/wiki/Decision-making"}]],
    ["Strategic Thinking", "Set vision, align resources, and execute strategy. Think long-term while acting short-term.\n\nNavigate complexity and drive results.", ["https://www.youtube.com/watch?v=iCvmsMzlF7o"], [{term:"Strategic Planning",url:"https://en.wikipedia.org/wiki/Strategic_planning"}]]
  ]),

  // ═══════ MATHEMATICS ═══════
  c("calculus", "Calculus", "Understand derivatives, integrals, and the mathematics of change.", "📐", "hsl(210, 55%, 50%)", "Mathematics", [
    ["Limits & Continuity", "Understand limits intuitively and formally. Evaluate limits and understand continuity.\n\nThis is the foundation that makes calculus work.", ["https://www.youtube.com/watch?v=WUvTyaaNkzM"], [{term:"Limit",url:"https://en.wikipedia.org/wiki/Limit_(mathematics)"}]],
    ["Derivatives", "Rate of change, slope of tangent lines, and differentiation rules (power, chain, product).\n\nFind how things change with derivatives.", ["https://www.youtube.com/watch?v=rAof9Ld5sOg"], [{term:"Derivative",url:"https://en.wikipedia.org/wiki/Derivative"}]],
    ["Applications of Derivatives", "Optimization, related rates, and curve sketching. Solve real-world problems.\n\nUse calculus to find maximum and minimum values.", ["https://www.youtube.com/watch?v=rjLJIVoQxz4"], [{term:"Optimization",url:"https://en.wikipedia.org/wiki/Mathematical_optimization"}]],
    ["Integration", "Antiderivatives, definite integrals, and the Fundamental Theorem of Calculus.\n\nCalculate areas, volumes, and accumulated quantities.", ["https://www.youtube.com/watch?v=rfG8ce4nNh0"], [{term:"Integral",url:"https://en.wikipedia.org/wiki/Integral"}]],
    ["Integration Techniques", "Substitution, integration by parts, partial fractions, and trig substitution.\n\nSolve complex integrals with systematic methods.", ["https://www.youtube.com/watch?v=2qkYmFBBKSs"], [{term:"Integration by Parts",url:"https://en.wikipedia.org/wiki/Integration_by_parts"}]]
  ]),

  c("statistics", "Statistics", "Analyze data, understand probability, and make data-driven decisions.", "📉", "hsl(170, 50%, 45%)", "Mathematics", [
    ["Descriptive Statistics", "Mean, median, mode, standard deviation, and data visualization.\n\nSummarize and describe data effectively.", ["https://www.youtube.com/watch?v=xxpc-HPKN28"], [{term:"Descriptive Statistics",url:"https://en.wikipedia.org/wiki/Descriptive_statistics"}]],
    ["Probability", "Basic probability, conditional probability, Bayes' theorem, and distributions.\n\nQuantify uncertainty mathematically.", ["https://www.youtube.com/watch?v=uzkc-qNVoOk"], [{term:"Probability",url:"https://en.wikipedia.org/wiki/Probability"}]],
    ["Hypothesis Testing", "Null and alternative hypotheses, p-values, confidence intervals, and t-tests.\n\nMake statistically sound conclusions from data.", ["https://www.youtube.com/watch?v=0oc49DyA3hU"], [{term:"Hypothesis Testing",url:"https://en.wikipedia.org/wiki/Statistical_hypothesis_testing"}]],
    ["Regression Analysis", "Linear regression, multiple regression, and R-squared. Model relationships in data.\n\nPredict outcomes based on input variables.", ["https://www.youtube.com/watch?v=zPG4NjIkCjc"], [{term:"Regression Analysis",url:"https://en.wikipedia.org/wiki/Regression_analysis"}]],
    ["Experimental Design", "Control groups, randomization, sample size, and A/B testing.\n\nDesign experiments that yield reliable results.", ["https://www.youtube.com/watch?v=NyWru7Bnayc"], [{term:"Experimental Design",url:"https://en.wikipedia.org/wiki/Design_of_experiments"}]]
  ]),

  c("linear-algebra", "Linear Algebra", "Vectors, matrices, and transformations — essential for graphics, ML, and engineering.", "🔢", "hsl(250, 60%, 50%)", "Mathematics", [
    ["Vectors & Spaces", "Understand vectors, vector operations, and vector spaces.\n\nVisualize linear algebra geometrically.", ["https://www.youtube.com/watch?v=fNk_zzaMoSs"], [{term:"Vector Space",url:"https://en.wikipedia.org/wiki/Vector_space"}]],
    ["Matrices", "Matrix operations, row reduction, and solving systems of equations.\n\nRepresent and solve linear systems efficiently.", ["https://www.youtube.com/watch?v=XkY2DOUCWMU"], [{term:"Matrix",url:"https://en.wikipedia.org/wiki/Matrix_(mathematics)"}]],
    ["Linear Transformations", "Understand how matrices transform space. Rotation, scaling, shearing, and projection.\n\nConnect abstract math to geometric intuition.", ["https://www.youtube.com/watch?v=kYB8IZa5AuE"], [{term:"Linear Map",url:"https://en.wikipedia.org/wiki/Linear_map"}]],
    ["Eigenvalues & Eigenvectors", "Find eigenvalues and eigenvectors. Understand their significance in applications.\n\nKey concept for PCA, differential equations, and more.", ["https://www.youtube.com/watch?v=PFDu9oVAE-g"], [{term:"Eigenvalue",url:"https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors"}]],
    ["Applications", "Linear algebra in computer graphics, machine learning, and quantum computing.\n\nSee how this math powers modern technology.", ["https://www.youtube.com/watch?v=uQhTuRlWMxw"], [{term:"Applied Mathematics",url:"https://en.wikipedia.org/wiki/Applied_mathematics"}]]
  ]),

  // ═══════ EXTRAS ═══════
  c("git", "Git & Version Control", "Track changes, collaborate, and manage code with Git and GitHub.", "🌿", "hsl(15, 70%, 45%)", "Programming", [
    ["Git Basics", "Initialize repos, stage changes, commit, and view history.\n\nUnderstand the fundamental Git workflow.", ["https://www.youtube.com/watch?v=RGOj5yH7evk","https://www.youtube.com/watch?v=SWYqp7iY_Tc"], [{term:"Git",url:"https://en.wikipedia.org/wiki/Git"}]],
    ["Branching & Merging", "Create branches, switch between them, and merge changes. Resolve conflicts.\n\nWork on features without breaking main.", ["https://www.youtube.com/watch?v=e2IbNHi4uCI"], [{term:"Branching",url:"https://en.wikipedia.org/wiki/Branching_(version_control)"}]],
    ["GitHub Collaboration", "Pull requests, code review, issues, and project boards.\n\nCollaborate effectively with other developers.", ["https://www.youtube.com/watch?v=iv8rSLsi1xo"], [{term:"GitHub",url:"https://en.wikipedia.org/wiki/GitHub"}]],
    ["Advanced Git", "Rebase, cherry-pick, stash, and interactive rebase. Rewrite history safely.\n\nMaster advanced workflows for clean project history.", ["https://www.youtube.com/watch?v=f1wnYdLEpgI"], [{term:"Version Control",url:"https://en.wikipedia.org/wiki/Version_control"}]],
    ["CI/CD with Git", "Set up GitHub Actions for automated testing and deployment.\n\nAutomate your development workflow.", ["https://www.youtube.com/watch?v=R8_veQiYBjI"], [{term:"CI/CD",url:"https://en.wikipedia.org/wiki/CI/CD"}]]
  ]),

  c("docker", "Docker & Containers", "Package and deploy applications with Docker containers.", "🐳", "hsl(205, 80%, 45%)", "Programming", [
    ["Container Basics", "Understand containers vs VMs. Install Docker and run your first container.\n\nLearn images, containers, and the Docker CLI.", ["https://www.youtube.com/watch?v=fqMOX6JJhGo","https://www.youtube.com/watch?v=3c-iBn73dDE"], [{term:"Docker",url:"https://en.wikipedia.org/wiki/Docker_(software)"}]],
    ["Dockerfiles", "Write Dockerfiles to build custom images. Understand layers, caching, and multi-stage builds.\n\nPackage your applications for any environment.", ["https://www.youtube.com/watch?v=WmcdMiyqfZs"], [{term:"Containerization",url:"https://en.wikipedia.org/wiki/Containerization_(computing)"}]],
    ["Docker Compose", "Define multi-container apps with docker-compose.yml. Network containers and manage volumes.\n\nRun complex application stacks locally.", ["https://www.youtube.com/watch?v=SXwC9fSwct8"], [{term:"Microservices",url:"https://en.wikipedia.org/wiki/Microservices"}]],
    ["Networking & Volumes", "Bridge networks, port mapping, and persistent storage with volumes.\n\nConnect containers and preserve data.", ["https://www.youtube.com/watch?v=bKFMS5C4CG0"], [{term:"Computer Network",url:"https://en.wikipedia.org/wiki/Computer_network"}]],
    ["Production Deployment", "Optimize images, security best practices, and container orchestration with Kubernetes basics.\n\nDeploy containerized apps at scale.", ["https://www.youtube.com/watch?v=X48VuDVv0do"], [{term:"Kubernetes",url:"https://en.wikipedia.org/wiki/Kubernetes"}]]
  ]),

  c("cybersecurity", "Cybersecurity", "Protect systems and data — learn ethical hacking, defense, and security principles.", "🔒", "hsl(0, 0%, 30%)", "Programming", [
    ["Security Fundamentals", "CIA triad, threat modeling, and attack surfaces. Think like an attacker to defend better.\n\nUnderstand the cybersecurity landscape.", ["https://www.youtube.com/watch?v=z5nc9MDbvkw"], [{term:"Computer Security",url:"https://en.wikipedia.org/wiki/Computer_security"}]],
    ["Network Security", "Firewalls, VPNs, IDS/IPS, and network monitoring. Secure network infrastructure.\n\nDetect and prevent network-based attacks.", ["https://www.youtube.com/watch?v=E03gh1huvW4"], [{term:"Network Security",url:"https://en.wikipedia.org/wiki/Network_security"}]],
    ["Web Security", "OWASP Top 10: XSS, SQL injection, CSRF, and authentication flaws.\n\nSecure web applications against common attacks.", ["https://www.youtube.com/watch?v=F5KJVuii0Yw"], [{term:"OWASP",url:"https://en.wikipedia.org/wiki/OWASP"}]],
    ["Cryptography", "Symmetric/asymmetric encryption, hashing, digital signatures, and certificates.\n\nProtect data in transit and at rest.", ["https://www.youtube.com/watch?v=jhXCTbFnK8o"], [{term:"Cryptography",url:"https://en.wikipedia.org/wiki/Cryptography"}]],
    ["Ethical Hacking", "Penetration testing methodology, reconnaissance, and vulnerability assessment.\n\nFind security holes before attackers do.", ["https://www.youtube.com/watch?v=3Kq1MIfTWCE"], [{term:"Penetration Testing",url:"https://en.wikipedia.org/wiki/Penetration_test"}]]
  ]),

  c("cloud-computing", "Cloud Computing", "Master AWS, Azure, or GCP — deploy and scale applications in the cloud.", "☁️", "hsl(210, 70%, 55%)", "Programming", [
    ["Cloud Basics", "IaaS, PaaS, SaaS — understand cloud service models and major providers.\n\nSet up your first cloud account and explore the console.", ["https://www.youtube.com/watch?v=M988_fsOSWo"], [{term:"Cloud Computing",url:"https://en.wikipedia.org/wiki/Cloud_computing"}]],
    ["Compute & Storage", "Virtual machines, serverless functions, object storage, and databases.\n\nDeploy applications and store data in the cloud.", ["https://www.youtube.com/watch?v=JIbIYCM48to"], [{term:"Cloud Storage",url:"https://en.wikipedia.org/wiki/Cloud_storage"}]],
    ["Networking & Security", "VPCs, load balancers, DNS, and IAM. Secure your cloud infrastructure.\n\nDesign reliable, secure cloud architectures.", ["https://www.youtube.com/watch?v=hiKPPy584Mg"], [{term:"Virtual Private Cloud",url:"https://en.wikipedia.org/wiki/Virtual_private_cloud"}]],
    ["DevOps & Infrastructure as Code", "Terraform, CloudFormation, and automated deployments. Version control your infrastructure.\n\nAutomate everything for repeatability.", ["https://www.youtube.com/watch?v=SLB_c_ayRMo"], [{term:"Infrastructure as Code",url:"https://en.wikipedia.org/wiki/Infrastructure_as_code"}]],
    ["Cost Optimization", "Monitor spending, right-size resources, and use reserved/spot instances.\n\nGet the most value from your cloud budget.", ["https://www.youtube.com/watch?v=OPJ5VGi7W_M"], [{term:"Cloud Economics",url:"https://en.wikipedia.org/wiki/Cloud_computing#Economics"}]]
  ]),

  c("chess", "Chess", "Master the royal game — openings, tactics, strategy, and endgames.", "♟️", "hsl(30, 20%, 30%)", "Personal Development", [
    ["Rules & Piece Movement", "Learn how each piece moves, special moves (castling, en passant), and checkmate.\n\nPlay your first complete chess game.", ["https://www.youtube.com/watch?v=OCSbzArwB10"], [{term:"Chess",url:"https://en.wikipedia.org/wiki/Chess"}]],
    ["Basic Tactics", "Forks, pins, skewers, and discovered attacks. Tactical patterns win material.\n\nSolve puzzles to sharpen tactical vision.", ["https://www.youtube.com/watch?v=Ao9ipmsDaMo"], [{term:"Chess Tactics",url:"https://en.wikipedia.org/wiki/Chess_tactic"}]],
    ["Opening Principles", "Control the center, develop pieces, and castle early. Learn 2-3 opening systems.\n\nGet good positions from the start.", ["https://www.youtube.com/watch?v=3VR0hRNnZKs"], [{term:"Chess Opening",url:"https://en.wikipedia.org/wiki/Chess_opening"}]],
    ["Strategy & Planning", "Piece activity, pawn structure, weak squares, and long-term plans.\n\nThink strategically beyond individual moves.", ["https://www.youtube.com/watch?v=BKlj0K5oEFw"], [{term:"Chess Strategy",url:"https://en.wikipedia.org/wiki/Chess_strategy"}]],
    ["Endgames", "King and pawn endings, rook endgames, and theoretical positions.\n\nConvert advantages into wins.", ["https://www.youtube.com/watch?v=jq3vWcHV9Uo"], [{term:"Chess Endgame",url:"https://en.wikipedia.org/wiki/Chess_endgame"}]]
  ]),

  c("drawing", "Drawing", "Learn to draw from observation — line, shading, perspective, and composition.", "✏️", "hsl(0, 0%, 45%)", "Design", [
    ["Lines & Shapes", "Control your pencil, draw confident lines, and break subjects into basic shapes.\n\nBuild hand-eye coordination through daily practice.", ["https://www.youtube.com/watch?v=ewMksAbgZBo"], [{term:"Drawing",url:"https://en.wikipedia.org/wiki/Drawing"}]],
    ["Value & Shading", "Create the illusion of form with light and shadow. Learn shading techniques.\n\nMake flat drawings look three-dimensional.", ["https://www.youtube.com/watch?v=V3WmrWUEIJo"], [{term:"Shading",url:"https://en.wikipedia.org/wiki/Shading"}]],
    ["Perspective", "One-point, two-point, and three-point perspective. Draw rooms, buildings, and scenes.\n\nCreate convincing depth and space.", ["https://www.youtube.com/watch?v=d_6mBdGMB_s"], [{term:"Perspective",url:"https://en.wikipedia.org/wiki/Perspective_(graphical)"}]],
    ["Figure Drawing", "Gesture drawing, proportions, and anatomy basics. Capture the human form.\n\nDraw people with life and movement.", ["https://www.youtube.com/watch?v=74HR59yFZ7Y"], [{term:"Figure Drawing",url:"https://en.wikipedia.org/wiki/Figure_drawing"}]],
    ["Developing Style", "Experiment with different media, subjects, and approaches. Find your artistic voice.\n\nBuild a portfolio and share your work.", ["https://www.youtube.com/watch?v=Ei_yYBCfWiQ"], [{term:"Art Style",url:"https://en.wikipedia.org/wiki/Style_(visual_arts)"}]]
  ]),

  c("game-dev", "Game Development", "Build video games with Unity or Godot — from concept to playable game.", "🎮", "hsl(280, 70%, 50%)", "Programming", [
    ["Game Design Basics", "Core loops, player motivation, level design, and game feel.\n\nDesign games that are fun to play.", ["https://www.youtube.com/watch?v=zQvWMdWhFCc"], [{term:"Game Design",url:"https://en.wikipedia.org/wiki/Game_design"}]],
    ["Game Engine Setup", "Install Unity or Godot. Learn the editor, scene hierarchy, and project structure.\n\nCreate your first interactive scene.", ["https://www.youtube.com/watch?v=nAh_Kx5Zh5Q"], [{term:"Game Engine",url:"https://en.wikipedia.org/wiki/Game_engine"}]],
    ["Player Movement & Physics", "Implement character controllers, physics, collision, and input handling.\n\nMake characters move and interact with the world.", ["https://www.youtube.com/watch?v=K1xZ-rycYY8"], [{term:"Game Physics",url:"https://en.wikipedia.org/wiki/Game_physics"}]],
    ["Game Art & Audio", "Create or find sprites, models, animations, sound effects, and music.\n\nBring your game world to life.", ["https://www.youtube.com/watch?v=mH-UP0d6GPo"], [{term:"Game Art",url:"https://en.wikipedia.org/wiki/Video_game_art"}]],
    ["Polish & Publishing", "Add UI, menus, save systems, and juice. Playtest and iterate.\n\nPublish on itch.io or Steam.", ["https://www.youtube.com/watch?v=AX8YU2hLBUg"], [{term:"Video Game Development",url:"https://en.wikipedia.org/wiki/Video_game_development"}]]
  ]),

  c("blockchain", "Blockchain & Web3", "Understand blockchain technology, smart contracts, and decentralized apps.", "⛓️", "hsl(230, 65%, 50%)", "Programming", [
    ["Blockchain Fundamentals", "How blockchains work: blocks, hashing, consensus mechanisms, and decentralization.\n\nUnderstand the technology behind cryptocurrencies.", ["https://www.youtube.com/watch?v=SSo_EIwHSd4"], [{term:"Blockchain",url:"https://en.wikipedia.org/wiki/Blockchain"}]],
    ["Smart Contracts", "Write and deploy smart contracts with Solidity on Ethereum.\n\nAutomate trustless agreements on the blockchain.", ["https://www.youtube.com/watch?v=M576WGiDBdQ"], [{term:"Smart Contract",url:"https://en.wikipedia.org/wiki/Smart_contract"}]],
    ["DeFi & Tokens", "Understand DeFi protocols, ERC-20 tokens, and NFTs.\n\nBuild decentralized financial applications.", ["https://www.youtube.com/watch?v=17QRFlml4pA"], [{term:"Decentralized Finance",url:"https://en.wikipedia.org/wiki/Decentralized_finance"}]],
    ["dApp Development", "Build full-stack decentralized apps with React and ethers.js.\n\nConnect frontends to smart contracts.", ["https://www.youtube.com/watch?v=gyMwXuJrbJQ"], [{term:"Decentralized Application",url:"https://en.wikipedia.org/wiki/Decentralized_application"}]],
    ["Security & Best Practices", "Common smart contract vulnerabilities and auditing practices.\n\nBuild secure blockchain applications.", ["https://www.youtube.com/watch?v=pqxNmdwEHio"], [{term:"Blockchain Security",url:"https://en.wikipedia.org/wiki/Blockchain#Security"}]]
  ]),

  c("data-viz", "Data Visualization", "Turn data into compelling visual stories with charts, maps, and dashboards.", "📈", "hsl(160, 55%, 45%)", "Data & AI", [
    ["Visualization Principles", "Choose the right chart type for your data. Understand visual encoding and perception.\n\nAvoid common visualization mistakes.", ["https://www.youtube.com/watch?v=5Zg-C8AAIGg"], [{term:"Data Visualization",url:"https://en.wikipedia.org/wiki/Data_visualization"}]],
    ["Charts & Graphs", "Bar, line, scatter, pie, and area charts. When to use each and how to design them well.\n\nCreate clear, effective standard charts.", ["https://www.youtube.com/watch?v=UO98lJQ3QGI"], [{term:"Chart",url:"https://en.wikipedia.org/wiki/Chart"}]],
    ["Interactive Visualizations", "Build interactive charts with D3.js or Plotly. Add tooltips, zoom, and filtering.\n\nLet users explore data themselves.", ["https://www.youtube.com/watch?v=_8V5o2UHG0E"], [{term:"D3.js",url:"https://en.wikipedia.org/wiki/D3.js"}]],
    ["Dashboards", "Design dashboards that tell a story. Layout, KPIs, and real-time data.\n\nBuild executive and operational dashboards.", ["https://www.youtube.com/watch?v=8yLZaaMIQC4"], [{term:"Dashboard",url:"https://en.wikipedia.org/wiki/Dashboard_(business)"}]],
    ["Data Storytelling", "Combine narrative, visuals, and data for compelling presentations.\n\nPersuade with data-driven stories.", ["https://www.youtube.com/watch?v=r5_34YnCmMY"], [{term:"Data Storytelling",url:"https://en.wikipedia.org/wiki/Data_storytelling"}]]
  ]),

  c("mobile-dev", "Mobile App Development", "Build cross-platform mobile apps with React Native or Flutter.", "📲", "hsl(195, 70%, 50%)", "Programming", [
    ["Mobile Development Basics", "Understand native vs cross-platform, iOS vs Android, and choose your framework.\n\nSet up your development environment.", ["https://www.youtube.com/watch?v=0-S5a0eXPoc"], [{term:"Mobile App Development",url:"https://en.wikipedia.org/wiki/Mobile_app_development"}]],
    ["React Native Setup", "Create a React Native project, understand the component model, and build your first screen.\n\nLeverage your React knowledge for mobile.", ["https://www.youtube.com/watch?v=0-S5a0eXPoc"], [{term:"React Native",url:"https://en.wikipedia.org/wiki/React_Native"}]],
    ["Navigation & Layout", "Implement stack, tab, and drawer navigation. Build responsive mobile layouts.\n\nCreate intuitive user flows.", ["https://www.youtube.com/watch?v=npe3Wf4t0SY"], [{term:"Mobile UI",url:"https://en.wikipedia.org/wiki/Mobile_user_interface"}]],
    ["Native Features", "Access camera, GPS, push notifications, and device storage.\n\nBuild apps that leverage the full power of mobile devices.", ["https://www.youtube.com/watch?v=bWWCzBgoSJg"], [{term:"Mobile Device",url:"https://en.wikipedia.org/wiki/Mobile_device"}]],
    ["Publishing", "Prepare for App Store and Google Play. Handle certificates, screenshots, and review.\n\nGet your app into users' hands.", ["https://www.youtube.com/watch?v=oBWBDaqLOFc"], [{term:"App Store",url:"https://en.wikipedia.org/wiki/App_store"}]]
  ]),

  c("excel", "Excel & Spreadsheets", "Master Excel for data analysis, reporting, and automation.", "📊", "hsl(120, 70%, 35%)", "Business", [
    ["Excel Basics", "Navigate the interface, enter data, format cells, and use basic formulas.\n\nBuild clean, organized spreadsheets.", ["https://www.youtube.com/watch?v=rwbho0CgEAE"], [{term:"Microsoft Excel",url:"https://en.wikipedia.org/wiki/Microsoft_Excel"}]],
    ["Formulas & Functions", "VLOOKUP, IF, SUMIFS, INDEX/MATCH, and text functions.\n\nAutomate calculations and data processing.", ["https://www.youtube.com/watch?v=6lCCAdWPJe0"], [{term:"Spreadsheet",url:"https://en.wikipedia.org/wiki/Spreadsheet"}]],
    ["Pivot Tables", "Summarize large datasets, create reports, and analyze trends with pivot tables.\n\nThe most powerful feature in Excel.", ["https://www.youtube.com/watch?v=m0wI61ahfLc"], [{term:"Pivot Table",url:"https://en.wikipedia.org/wiki/Pivot_table"}]],
    ["Charts & Dashboards", "Create professional charts and build interactive dashboards.\n\nVisualize data for clear communication.", ["https://www.youtube.com/watch?v=K74_FNnlIF8"], [{term:"Chart",url:"https://en.wikipedia.org/wiki/Chart"}]],
    ["Macros & VBA", "Automate repetitive tasks with macros and VBA programming.\n\nSupercharge Excel with custom automation.", ["https://www.youtube.com/watch?v=IJQHMFLXk_c"], [{term:"VBA",url:"https://en.wikipedia.org/wiki/Visual_Basic_for_Applications"}]]
  ]),

  c("devops", "DevOps", "Automate development pipelines, infrastructure, and deployment.", "🔄", "hsl(190, 65%, 45%)", "Programming", [
    ["DevOps Culture", "Understand CI/CD, infrastructure as code, and the DevOps mindset.\n\nBridge the gap between development and operations.", ["https://www.youtube.com/watch?v=Xrgk023l4lI"], [{term:"DevOps",url:"https://en.wikipedia.org/wiki/DevOps"}]],
    ["CI/CD Pipelines", "Set up automated build, test, and deploy pipelines with GitHub Actions or Jenkins.\n\nShip code faster with confidence.", ["https://www.youtube.com/watch?v=R8_veQiYBjI"], [{term:"CI/CD",url:"https://en.wikipedia.org/wiki/CI/CD"}]],
    ["Infrastructure as Code", "Manage servers with Terraform, Ansible, or Pulumi.\n\nVersion control and automate your infrastructure.", ["https://www.youtube.com/watch?v=SLB_c_ayRMo"], [{term:"Infrastructure as Code",url:"https://en.wikipedia.org/wiki/Infrastructure_as_code"}]],
    ["Monitoring & Logging", "Set up Prometheus, Grafana, and centralized logging.\n\nDetect and respond to issues before users notice.", ["https://www.youtube.com/watch?v=QcaVnBOke48"], [{term:"Application Performance Management",url:"https://en.wikipedia.org/wiki/Application_performance_management"}]],
    ["Site Reliability", "SLOs, SLIs, error budgets, and incident management.\n\nKeep systems reliable at scale.", ["https://www.youtube.com/watch?v=uTEL8Ff1Zvk"], [{term:"Site Reliability Engineering",url:"https://en.wikipedia.org/wiki/Site_reliability_engineering"}]]
  ]),

  c("ux-writing", "UX Writing", "Write clear, helpful microcopy that guides users through digital products.", "💬", "hsl(260, 50%, 55%)", "Writing", [
    ["UX Writing Basics", "Understand microcopy, voice & tone, and how words shape user experience.\n\nEvery word in your UI is a design decision.", ["https://www.youtube.com/watch?v=UKMIueYL0vk"], [{term:"UX Writing",url:"https://en.wikipedia.org/wiki/User_experience_design"}]],
    ["Button & CTA Copy", "Write clear, action-oriented button labels and calls-to-action.\n\nGuide users to take the next step.", ["https://www.youtube.com/watch?v=6DKyEWDB4U0"], [{term:"Call to Action",url:"https://en.wikipedia.org/wiki/Call_to_action_(marketing)"}]],
    ["Error Messages", "Write helpful, human error messages that guide users to solutions.\n\nTurn frustrating moments into helpful ones.", ["https://www.youtube.com/watch?v=pRx4bbfz4VU"], [{term:"Error Message",url:"https://en.wikipedia.org/wiki/Error_message"}]],
    ["Onboarding Copy", "Welcome users, explain features, and reduce friction in first-time experiences.\n\nMake getting started feel effortless.", ["https://www.youtube.com/watch?v=7OW3TDn3iSk"], [{term:"User Onboarding",url:"https://en.wikipedia.org/wiki/User_onboarding"}]],
    ["Content Design Systems", "Build voice & tone guidelines, writing patterns, and terminology standards.\n\nEnsure consistent communication across products.", ["https://www.youtube.com/watch?v=d2OzLUh2CME"], [{term:"Style Guide",url:"https://en.wikipedia.org/wiki/Style_guide"}]]
  ]),

  c("personal-finance", "Personal Finance", "Budget, save, invest, and build wealth with sound financial habits.", "🏦", "hsl(150, 50%, 40%)", "Business", [
    ["Budgeting", "Track income and expenses. Use the 50/30/20 rule or zero-based budgeting.\n\nKnow where your money goes.", ["https://www.youtube.com/watch?v=HQzoZfc3GwQ"], [{term:"Budget",url:"https://en.wikipedia.org/wiki/Budget"}]],
    ["Emergency Fund & Debt", "Build an emergency fund, understand good vs bad debt, and create a payoff strategy.\n\nAchieve financial security.", ["https://www.youtube.com/watch?v=dGd3gOrjJIw"], [{term:"Emergency Fund",url:"https://en.wikipedia.org/wiki/Emergency_fund"}]],
    ["Saving & Compound Interest", "Automate savings, understand compound interest, and set financial goals.\n\nMake your money work for you.", ["https://www.youtube.com/watch?v=wf91rEGw88Q"], [{term:"Compound Interest",url:"https://en.wikipedia.org/wiki/Compound_interest"}]],
    ["Retirement Planning", "401(k), IRA, Roth accounts — understand tax-advantaged retirement savings.\n\nPlan for financial independence.", ["https://www.youtube.com/watch?v=M-w1_mMZdbM"], [{term:"Retirement Planning",url:"https://en.wikipedia.org/wiki/Retirement_planning"}]],
    ["Tax Basics", "Understand income tax, deductions, credits, and tax-efficient strategies.\n\nKeep more of what you earn.", ["https://www.youtube.com/watch?v=UxGzsKhXBz4"], [{term:"Income Tax",url:"https://en.wikipedia.org/wiki/Income_tax"}]]
  ]),
];
