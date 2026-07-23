const unit02Variables = {
  unitTitle: "Unit 2: Variables in an HCI Experiment",

  pages: [
    {
      title: "Independent variable: What do we change?",

      blocks: [
        {
          type: "phoneComparison",
          leftLabel: "Version A",
          rightLabel: "Version B",
          leftImageSrc: "assets/image/1-2-1.jpg",
          rightImageSrc: "assets/image/1-2-2.jpg",
          leftImageAlt: "Placeholder for the old map app interface.",
          rightImageAlt: "Placeholder for the new map app interface."
        },
        {
          type: "quiz",
          question: "What does the researcher change in this study?",
          options: [
            "Interface version",
            "Task completion time",
            "Number of participants"
          ],
          correctAnswer: 0,
          feedback: "Correct. The researcher changes or compares the app version.",
          required: true,
          unlocks: ["iv-explanation", "iv-levels"]
        },
        {
          type: "conceptBox",
          blockId: "iv-explanation",
          initiallyHidden: true,
          title: "Independent variable (IV)",
          text: "The independent variable is the thing the researcher changes or compares.<br><span class='key-line'>IV = what we change</span>"
        },
        {
          type: "infoBox",
          blockId: "iv-levels",
          initiallyHidden: true,
          text: "In this example, the IV is <strong>interface version</strong>. Its levels are <strong>Version A</strong> and <strong>Version B</strong>."
        }
      ]
    },

    {
      title: "Dependent variable: What do we measure?",

      blocks: [
        {
          type: "phoneComparison",
          leftLabel: "Version A",
          rightLabel: "Version B",
          leftImageSrc: "assets/image/1-2-1.jpg",
          rightImageSrc: "assets/image/1-2-2.jpg",
          leftImageAlt: "Placeholder for the old map app interface.",
          rightImageAlt: "Placeholder for the new map app interface."
        },
        {
          type: "multiSelectQuiz",
          question: "What could the researcher measure in this study?",
          instruction: "Select all possible dependent variables.",
          options: [
            {
              text: "Interface version",
              correct: false
            },
            {
              text: "Time to find the classroom",
              correct: true
            },
            {
              text: "App colour",
              correct: false
            },
            {
              text: "Number of errors",
              correct: true
            },
            {
              text: "Success rate",
              correct: true
            }
          ],
          feedback: "Correct. Time, errors, and success rate can all be dependent variables because they are measured.",
          required: true,
          unlocks: ["dv-explanation"]
        },
        {
          type: "conceptBox",
          blockId: "dv-explanation",
          initiallyHidden: true,
          title: "Dependent variable (DV)",
          text: "The dependent variable is the thing the researcher measures in the experiment.<br><span class='key-line'>DV = what we measure</span>"
        }
      ]
    },

    {
      title: "Unit 2 summary",

      blocks: [
        {
          type: "summary",
          items: [
            "The independent variable is what the researcher changes or compares.",
            "In this example, the IV is interface version.",
            "The levels of the IV are Version A and Version B.",
            "The dependent variable is what the researcher measures.",
            "In this example, possible DVs include task completion time, number of errors, and success rate."
          ]
        },
        {
          type: "infoBox",
          text: "<strong>Let’s do some more practice</strong>. <br/>For each HCI experiment below, think about: What is the independent variable, and what is the dependent variable?"
        },
        {
          type: "reveal",
          prompt: `
            <strong>Practice 1:</strong> A researcher compares a top navigation bar 
            with a side navigation menu. They measure how long users take to find 
            the Settings page.<br><br>
            What are the IV and DV?
          `,
          hiddenAnswer: `
            <strong>IV:</strong> Navigation menu position 
            (top navigation or side navigation).<br>
            <strong>DV:</strong> Time taken to find the Settings page.
          `
        },
        {
          type: "reveal",
          prompt: `
            <strong>Practice 2:</strong> A researcher asks users to complete the same 
            task using either small buttons or large buttons. They record the number 
            of times users tap the wrong button.<br><br>
            What are the IV and DV?
          `,
          hiddenAnswer: `
            <strong>IV:</strong> Button size 
            (small buttons or large buttons).<br>
            <strong>DV:</strong> Number of incorrect taps.
          `
        },
        {
          type: "reveal",
          prompt: `
            <strong>Practice 3:</strong> A researcher compares written instructions 
            with a video tutorial. They record whether users successfully complete 
            the setup task.<br><br>
            What are the IV and DV?
          `,
          hiddenAnswer: `
            <strong>IV:</strong> Type of instruction 
            (written instructions or video tutorial).<br>
            <strong>DV:</strong> Task success rate.
          `
        },
        {
          type: "reveal",
          prompt: `
            <strong>Practice 4:</strong> Users read the same article using either 
            light mode or dark mode. Afterwards, they rate their eye comfort 
            from 1 to 5.<br><br>
            What are the IV and DV?
          `,
          hiddenAnswer: `
            <strong>IV:</strong> Screen mode 
            (light mode or dark mode).<br>
            <strong>DV:</strong> Eye comfort rating.
          `
        },
        {
          type: "reveal",
          prompt: `
            <strong>Practice 5:</strong> A researcher asks users to search for a 
            restaurant using either voice search or typed search. They measure how 
            long it takes users to find a suitable result.<br><br>
            What are the IV and DV?
          `,
          hiddenAnswer: `
            <strong>IV:</strong> Search input method 
            (voice search or typed search).<br>
            <strong>DV:</strong> Time taken to find a suitable result.
          `
        }
      ]
    }
  ]
};