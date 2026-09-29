const Unit09HypothesisTesting = {
  unitTitle: "Unit 9: Hypothesis Testing Basics",

  pages: [
    {
      title: "A difference in the sample… but what about the population?",
      blocks: [
        {
          type: "splitLayout",
          left: [
            {
              type: "dialogue",
              lines: [
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "In our study, Interface B looks faster than Interface A."
                },
                {
                  speaker: "Student",
                  side: "right",
                  text: "So can we say Interface B is better?"
                },
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "Not so fast. A difference in the sample does not always mean a real difference in the population."
                }
              ]
            }            
          ],
          right: [
            {
              type: "image",
              src: "assets/image/10-1-1.jpg",
              alt: "Interface A and Interface B mean task time comparison",
              caption: "The sample means are different, but is the population difference real?"
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Research question",
          text: "We want to know whether the <strong>population mean task times</strong> for Interface A and Interface B are really different."
        },
        {
          type: "infoBox",
          text: "The sample gives us evidence, but it does not give us perfect certainty. <strong>Hypothesis testing</strong> helps us judge whether the observed sample difference is convincing enough."
        }       
      ]
    },

    {
      title: "Why do we need hypothesis testing?",
      blocks: [
        {
          type: "text",
          text: "The purpose of an experiment is to test whether different values of the <strong>independent variable</strong> lead to different results on the <strong>dependent variable</strong>."
        },
        {
          type: "text",
          text: "For example, if Interface A and Interface B are different conditions, we may want to know whether they lead to different <strong>task times</strong>."
        },
        {
          type: "conceptBox",
          title: "Hypothesis testing",
          text: "Hypothesis testing uses <strong>sample data</strong> to judge whether a difference in <strong>population parameters</strong> is likely to exist."
        },
        {
          type: "summary",
          items: [
            "We observe a difference in the sample.",
            "But the sample difference may be caused by random variation.",
            "So we need a formal way to test whether the difference is strong enough.",
            "That formal method is called <strong>hypothesis testing</strong>."
          ]
        }
      ]
    },

    {
      title: "The alternative hypothesis H1",
      blocks: [
        {
          type: "conceptBox",
          title: "Alternative hypothesis, H1",
          text: "The <strong>alternative hypothesis</strong> says that there is a real effect or a real difference."
        },
        {
          type: "simpleTable",
          headers: ["In words", "In symbols", "Meaning"],
          rows: [
            [
              "Interface A and Interface B have different mean task times.",
              "μA ≠ μB",
              "There is a real population difference."
            ]
          ]
        },
        {
          type: "infoBox",
          text: "H1 is usually the claim that the researcher hopes to support. In this example, we may hope that the interface really affects task time."
        }
      ]
    },

    {
      title: "The null hypothesis H0",
      blocks: [
        {
          type: "conceptBox",
          title: "Null hypothesis, H0",
          text: "The <strong>null hypothesis</strong> says that there is <strong>no real difference</strong> or <strong>no real effect</strong>."
        },
        {
          type: "simpleTable",
          headers: ["In words", "In symbols", "Meaning"],
          rows: [
            [
              "Interface A and Interface B have the same mean task time.",
              "μA = μB",
              "There is <strong>no</strong> real population <strong>difference</strong>."
            ]
          ]
        },
        {
          type: "summary",
          items: [
            "We start by assuming <strong>H0 is true</strong>.",
            "We cannot directly prove μA ≠ μB (H1), so we test H0 to judge if H1 is true.",
            "Then we ask whether our sample result would still be reasonable under H0.",
            "If the sample result looks very unlikely under H0, we reject H0.",
            "If it is not unlikely enough, we <strong>fail to reject H0</strong>."
          ]
        },
        {
          type: "infoBox",
          text: "Be careful: <strong>fail to reject H0</strong> does not mean we have proved H0 is true. It only means we do not have enough evidence to reject it."
        }
      ]
    },

    {
      title: "The logic of hypothesis testing",
      blocks: [
        {
          type: "image",
          src: "assets/image/10-5-1.jpg",
          alt: "Six-panel comic showing the logic of hypothesis testing",
          caption: "Hypothesis testing starts by assuming H0 is true."
        },
        {
          "type": "infoBox",
          "text": "<strong>Figure Explanation</strong><br><br><strong>p-value:</strong> The probability of seeing our sample difference if H0 (μA=μB) is true.<br/><strong>p = 0.004:</strong> If H0 is true, there is only a 0.4% chance we randomly get a sample where Map B is 1 minute faster than Map A.<br/><strong>α = 0.05:</strong> The two far tail areas of the normal curve each take up 2.5%, adding up to 5%. This tail zone is called the rejection region.<br/><strong>p < α:</strong> Our sample difference lands in the rejection region → we reject H0.<br/><strong>· If p < α: </strong>our sample result falls in the far tail of the normal curve → reject H0.<br/><strong>· If p > α: </strong>our sample result lies in the main middle part of the curve → fail to reject H0."
        },
        {
          type: "summary",
          items: [
            "Assume <strong>H0 is true</strong>.",
            "Look at the observed sample difference.",
            "Ask whether this result would be common or rare under H0.",
            "If it is very rare, H0 becomes hard to believe.",
            "Then we reject H0.",
            "The result gives evidence for H1."
          ]
        },
        {
          type: "infoBox",
          text: "This uses the small-probability idea. If something would be very unlikely under H0, we treat it as evidence against H0. <br/>A common threshold is <strong>α = 0.05</strong>."
        }
      ]
    },

    {
      title: "Two kinds of mistakes",
      blocks: [
        {
          type: "text",
          text: "The true population situation is unknown. <br/>Because we use sample data to make a decision, our decision can be wrong."
        },
        {
          type: "simpleTable",
          title: "Possible outcomes of a hypothesis test",
          tableClass: "unit09-error-table",
          headers: ["Reality / Decision", "Fail to reject H0", "Reject H0"],
          rows: [
            [
              "H0 is true",
              "<strong>Correct</strong>",
              "<strong>Type I error</strong><br>Probability = α"
            ],
            [
              "H0 is false",
              "<strong>Type II error</strong><br>Probability = β",
              "<strong>Correct</strong>"
            ]
          ]
        },
        {
          type: "image",
          src: "assets/image/10-6-1.jpg",
          alt: "Two comics showing Type I error and Type II error",
          caption: "Two possible mistakes when we infer from a sample."
        },
        {
          type: "simpleTable",
          headers: ["Type I error", "Type II error"],
          rows: [
            [
              "We say the new interface works better, but actually it does not.",
              "The new interface really helps, but our study fails to show it."
            ]
          ]
        },
        {
          type: "infoBox",
          text: "In this unit, you only need to remember the stories. Type I error is like a false alarm. Type II error is like missing a real effect."
        }
      ]
    },

    {
      title: "Parametric and non-parametric tests",
      blocks: [
        {
          type: "text",
          text: "Different kinds of data and different assumptions may lead us to different families of statistical tests."
        },
        {
          type: "simpleTable",
          headers: ["Aspect", "Parametric tests", "Non-parametric tests"],
          rows: [
            [
              "Typical data",
              "Often used with numerical data",
              "Often used with ordinal or ranked data"
            ],
            [
              "What they often compare",
              "Means and other parameters",
              "Ranks, medians, or ordering"
            ],
            [
              "Assumptions",
              "Need some assumptions to be reasonably suitable",
              "Useful when parametric assumptions are not suitable"
            ],
            [
              "HCI example",
              "Task time or number of errors",
              "1–5 satisfaction ratings or preference rankings"
            ]
          ]
        },
        {
          type: "infoBox",
          text: "The difference is not simply whether the distribution is “known”. A better question is: <strong>what kind of data do we have, and are the assumptions reasonable?</strong>"
        },
        {
          type: "conceptBox",
          title: "For this course",
          text: "ANOVA is one example of a <strong>parametric test</strong>. We will use it to understand how researchers compare more than two group means."
        }
      ]
    },

    {
      title: "What if we have three interfaces?",
      blocks: [
        {
          type: "image",
          src: "assets/image/10-8-1.jpg",
          alt: "Comic asking what happens if there are three interfaces",
          caption: "Comparing more than two group means leads us to ANOVA."
        },
        {
          type: "infoBox",
          text: "So far, we have used A/B as the main example. But HCI studies may compare three or more interface designs."
        },
        {
          type: "conceptBox",
          title: "Bridge to ANOVA",
          text: "ANOVA helps us compare <strong>more than two group means</strong>. It asks whether the variation <strong>between groups</strong> is large compared with the variation <strong>within groups</strong>."
        },
        {
          type: "summary",
          items: [
            "Hypothesis testing helps us judge whether sample differences suggest population differences.",
            "H0 says there is no real difference.",
            "H1 says there is a real difference.",
            "α helps us set a decision threshold.",
            "When there are more than two groups, we need ANOVA."
          ]
        }
      ]
    }
  ]
};