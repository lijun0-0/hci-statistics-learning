const unit03Participants = {
  unitTitle: "Unit 3: Participants and Samples",

  pages: [
    {
      title: "Participants and sample",

      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "What should we do next?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Next, we need to find people to take part in our experiment. Where should we find them?"
            },
            {
              speaker: "Student",
              side: "left",
              text: "The campus map app is designed for students, so students are the right people to ask. But there are so many students. Do we need to test all of them?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "No. We can choose a smaller group from the full student population. This smaller group is called a sample."
            }
          ]
        },
        {
          type: "samplingActivity",
          populationTitle: "All students",
          sampleTitle: "Sample",
          populationNote: "Only 20 students are shown. The actual population is much larger.",
          students: [
            "S1", "S2", "S3", "S4", "S5", "S6","S7", "S8", "S9", "S10", "S11", "S12","S13", "S14", "S15", "S16", "S17", "S18","S19","S20"
          ],
          sampleSize: 5
        },
        {
          type: "quiz",
          question: "Why do we test a sample, not everyone?",
          options: [
            "Because testing everyone is difficult.",
            "Because only 5 students matter.",
            "Because all students always use the app in exactly the same way."
          ],
          correctAnswer: 0,
          feedback:
            "Correct. Researchers often use a sample because testing everyone is difficult, expensive, or time-consuming.",
          required: true,
          unlocks: ["sample-explanation"]
        },
        {
          type: "conceptBox",
          blockId: "sample-explanation",
          initiallyHidden: true,
          title: "Participants and sample",
          text:
            "Participants are the people who take part in the study. A sample is the smaller group chosen from a larger population.<br><span class='key-line'>Participants = people in the study<br>Sample = the group we test</span>"
        },
        {
          type: "infoBox",
          text:
            "In this example, the 5 selected students are the participants. Together, they form the sample."
        }
      ]
    },

    {
      title: "Sampling methods",

      blocks: [
        {
          type: "text",
          text: "Researchers also need to decide how to choose participants."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "Can we just ask a few classmates who are nearby?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Yes, we can. That is called convenience sampling. It is quick and easy because we choose people who are easy to reach."
            },
            {
              speaker: "Student",
              side: "left",
              text: "But what if we want students from the larger group to have a fair chance to be chosen?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Then we can use random sampling. That means choosing people by chance from a larger group."
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Convenience sampling",
          text:
            "Convenience sampling means choosing people who are easy to reach, such as classmates or nearby students."
        },
        {
          type: "conceptBox",
          title: "Random sampling",
          text:
            "Random sampling means choosing people by chance from a larger group."
        },
        {
          type: "infoBox",
          text:
            "Convenience sampling is easier, but random sampling usually gives everyone a more equal chance to be chosen."
        }
      ]
    }
  ]
};