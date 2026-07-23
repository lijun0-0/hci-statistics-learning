const unit01Intro = {
  unitTitle: "Unit 1: From a Problem to a Research Question",

  pages: [
    {
      title: "A confusing map app",
      blocks: [
        {
          type: "image",
          src: "assets/image/1-1-1.jpg",
          alt: "A student looks confused while using an old campus map app."
        },
        {
          type: "text",
          text: "The student cannot find a classroom using the old campus map app..."
        },
        {
          type: "infoBox",
          text: "This is a simple HCI problem. A user is trying to complete a task, but the interface may not support them well."
        }
      ]
    },

    {
      title: "Can we judge by intuition?",
      autoNextWhenCorrect: true,

      blocks: [
        {
          type: "text",
          text: "The university wants to know which map app works better."
        },
        {
          type: "phoneComparison",
          leftLabel: "Version A",
          rightLabel: "Version B",
          leftImageSrc: "assets/image/1-2-1.jpg",
          rightImageSrc: "assets/image/1-2-2.jpg",
          leftImageAlt: "Old map app interface.",
          rightImageAlt: "New map app interface."
        },
        {
          type: "researchQuestion",
          text: "Does Version B help students find a classroom faster than Version A?"
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Alice",
              side: "left",
              text: "I think Version B is better."
            },
            {
              speaker: "Bob",
              side: "right",
              text: "I prefer Version A."
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "We cannot judge whether an interface is good or bad only by intuition."
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Why HCI experiments?",
          text: "In HCI, people may have different opinions about the same interface. An experiment helps us collect evidence from users, instead of only relying on personal feelings."
        },
        {
          type: "quiz",
          question: "Which research question is the best?",
          options: [
            "Is the app good?",
            "Do students find the classroom faster with Version B than Version A?",
            "Do students like technology?"
          ],
          correctAnswer: 1,
          feedback: "Correct. This question is specific and testable.",
          required: true
        }
      ]
    },

    {
      title: "From research question to hypothesis",

      blocks: [
        {
          type: "researchQuestion",
          text: "Does Version B help students find a classroom faster than Version A?"
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text:
                "We’ve defined our research question. What do we do next?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text:
                "Then we turn our open research question into a concrete, testable hypothesis."
            }
          ]
        },
        {
          type: "reveal",
          prompt: "Can you guess our possible hypothesis?",
          hiddenAnswer: "Students will find the classroom faster with Version B than with Version A.",
          required: true
        },
        {
          type: "tips",
          items: [
            "Research question = what we want to find out.",
            "Hypothesis = what we expect."
          ]
        }
      ]
    },

    {
      title: "Unit 1 summary",

      blocks: [
        {
          type: "summary",
          items: [
            "An HCI experiment helps us test an interface with evidence.",
            "A good research question should be specific and testable.",
            "A hypothesis is what we expect to happen in the study."
          ]
        },
        {
          type: "infoBox",
          text: "Next, we will decide what the researcher changes and what the researcher measures."
        }
      ]
    }
  ]
};