const unit04Designs = {
  unitTitle: "Unit 4: Experimental Designs",

  pages: [
    {
      title: "How should participants use the app versions?",

      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "Now we have recruited a group of participants, and we have two map app versions to compare. What should we do next?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Next, we need to decide how the participants will use Version A and Version B."
            },
            {
              speaker: "Student",
              side: "left",
              text: "Should we split them into two groups, or should everyone try both versions?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "That is exactly the question. The way we assign participants to different conditions is called the experimental design."
            }
          ]
        },
        {
          type: "infoBox",
          text: "<strong>Experimental design</strong> describes how participants are assigned to different conditions in an experiment."
        },
        {
          type: "conceptBox",
          title: "Three useful ideas",
          text:
            "<strong>Between-subjects design:</strong> different groups use different versions.<br><br><strong>Within-subjects design:</strong> the same participants use both versions.<br><br><strong>Counterbalancing:</strong> participants try the versions in different orders."
        }
      ]
    },

    {
      title: "Between-subjects design",

      blocks: [
        {
          type: "text",
          text:
            "One way is to split the sample into two groups. Group A uses Version A, and Group B uses Version B."
        },
        {
          type: "designFlow",
          rows: [
            {
              label: "Group A",
              steps: [
                { type: "group", text: "Group A" },
                { type: "phone", text: "Version A" }
              ]
            },
            {
              label: "Group B",
              steps: [
                { type: "group", text: "Group B" },
                { type: "phone", text: "Version B" }
              ]
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Between-subjects design",
          text:
            "In a between-subjects design, each participant only tries one condition. One group uses Version A, and another group uses Version B.<br><span class='key-line'>Different participants compare different conditions.</span>"
        },
        {
          type: "infoBox",
          text:
            "This design can reduce practice effects because participants do not repeat the same task with another version. However, the two groups may be different from each other."
        }
      ]
    },

    {
      title: "Within-subjects design",

      blocks: [
        {
          type: "text",
          text:
            "Another way is to let the same participants try both versions."
        },
        {
          type: "designFlow",
          rows: [
            {
              label: "Participant 1",
              steps: [
                { type: "person", text: "P1" },
                { type: "phone", text: "Version A" },
                { type: "phone", text: "Version B" }
              ]
            },
            {
              label: "Participant 2",
              steps: [
                { type: "person", text: "P2" },
                { type: "phone", text: "Version A" },
                { type: "phone", text: "Version B" }
              ]
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Within-subjects design",
          text:
            "In a within-subjects design, each participant tries all conditions. In this example, each participant uses both Version A and Version B.<br><span class='key-line'>The same participants compare different conditions.</span>"
        },
        {
          type: "quiz",
          question: "What problem might happen in this design?",
          options: [
            "Participants may get better simply because they practise.",
            "There are no dependent variables.",
            "The researcher cannot compare Version A and Version B."
          ],
          correctAnswer: 0,
          feedback:
            "Correct. Participants may perform better in the second condition because they have already practised the task.",
          required: true,
          unlocks: ["within-problem-explanation"]
        },
        {
          type: "infoBox",
          blockId: "within-problem-explanation",
          initiallyHidden: true,
          text:
            "This problem is called a practice effect or learning effect. It is one type of order effect."
        }
      ]
    },

    {
      title: "Order effects and counterbalancing",

      blocks: [
        {
          type: "designFlow",
          rows: [
            {
              label: "One group",
              steps: [
                { type: "group", text: "Group A" },
                { type: "phone", text: "Version A" },
                { type: "phone", text: "Version B" }
              ]
            }
          ]
        },
        {
          type: "infoBox",
          text:
            "For example, one group of students first uses <strong>Version A</strong> to find the target place and spends <strong>10 minutes</strong>. Then they return to the starting point and use <strong>Version B</strong> to find the same target place, spending only <strong>5 minutes</strong>."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text:
                "Is Version B really better? Or did the participant get better through practice?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text:
                "Good question. If everyone uses Version A first and Version B second, the order may affect the result."
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Order effect",
          text:
            "An order effect happens when the order of conditions affects participants' performance. For example, the second app version may look better because participants have already learned the task."
        },
        {
          type: "conceptBox",
          title: "Counterbalancing",
          text:
            "Counterbalancing means changing the order of conditions for different participants. This can make the experiment fairer."
        },
        {
          type: "designFlow",
          rows: [
            {
              label: "Half of participants",
              steps: [
                { type: "group", text: "Group A" },
                { type: "phone", text: "Version A" },
                { type: "phone", text: "Version B" }
              ]
            },
            {
              label: "Half of participants",
              steps: [
                { type: "group", text: "Group B" },
                { type: "phone", text: "Version B" },
                { type: "phone", text: "Version A" }
              ]
            }
          ]
        },
        {
          type: "infoBox",
          text:
            "This means some participants do A then B, while others do B then A. The aim is to reduce the unfair advantage caused by task order."
        }
      ]
    }
  ]
};