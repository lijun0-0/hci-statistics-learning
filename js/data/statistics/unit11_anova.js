const Unit11ANOVA = {
  unitTitle: "Unit 10: ANOVA Intuition",

  pages: [
    {
      title: "Three interfaces, three sample means",
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
                  text: "In the last unit, we asked whether two interfaces are really different."
                },
                {
                  speaker: "Student",
                  side: "right",
                  text: "But now we have three interfaces: A, B, and C."
                },
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "Exactly. Their sample means are different, but we need to ask whether the difference is large enough to suggest a real population effect."
                }
              ]
            },
            {
              type: "conceptBox",
              title: "Research question",
              text: "Do the three map interfaces lead to different <strong>population mean task times</strong>?"
            }
          ],
          right: [
            {
              type: "simpleTable",
              title: "Sample result",
              headers: ["Interface", "Mean task time"],
              rows: [
                ["A", "365s"],
                ["B", "290s"],
                ["C", "245s"]
              ]
            },
            {
              type: "infoBox",
              text: "The independent variable is <strong>interface type</strong>. It has three levels: A, B, and C. <br><br>The dependent variable is <strong>task time</strong>."
            }
          ]
        },
        {
          type: "infoBox",
          text: "When we compare more than two group means, we often use <strong>ANOVA</strong>. <br><br>ANOVA asks whether the differences between group means are large compared with the variation inside the groups."
        }
      ]
    },

    {
      title: "What hypotheses does ANOVA test?",
      blocks: [
        {
          type: "text",
          text: "ANOVA is still a kind of hypothesis testing. <br/>We start with a null hypothesis and ask whether the observed group differences are too large to be explained by random variation."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Null hypothesis, H0",
              text: "All population means are equal.<br><br><strong>H0: μA = μB = μC</strong><br><br>This means the three interfaces do not have a real effect on task time."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Alternative hypothesis, H1",
              text: "Not all population means are equal.<br><br><strong>H1: at least one mean is different</strong><br><br>This means at least one interface may lead to a different task time."
            }
          ]
        },
        {
          type: "infoBox",
          text: "ANOVA first answers an overall question: <strong>is there any evidence of a group difference?</strong> <br><br>It does not immediately tell us exactly which two groups are different."
        }
      ]
    },

    {
      title: "ANOVA is built on variance",
      blocks: [
        {
          type: "text",
          text: "Before understanding ANOVA, we need to remember what variance means. Variance describes how spread out values are around the mean."
        },
        {
          type: "conceptBox",
          title: "Variance idea",
          text: "<span class='formula-line'><strong>s² = </strong><span class='math-fraction'><span class='math-top'>Σ(xᵢ − x̄)²</span><span class='math-bar'></span><span class='math-bottom'>n − 1</span></span></span>"
        },
        {
          type: "simpleTable",
          title: "How to read the formula",
          headers: ["Part", "Meaning"],
          rows: [
            ["<strong>(xᵢ − x̄)²</strong>", "Squared distance from the mean"],
            ["<strong>Σ(xᵢ − x̄)²</strong>", "Sum of squared distances, often called <strong>SS</strong>"],
            ["<strong>n − 1</strong>", "Degrees of freedom, often called <strong>df</strong>"],
            ["<strong>SS / df</strong>", "Mean square, often called <strong>MS</strong>"]
          ]
        },
        {
          type: "infoBox",
          text: "A simple way to remember it is: <strong>variance-like quantity = SS / df</strong>. <br><br>ANOVA works by splitting the total variation into different parts."
        }
      ]
    },

    {
      title: "Between-group variation and within-group variation",
      blocks: [
        {
          type: "image",
          src: "assets/image/11-4-1.jpg",
          alt: "Comparison of large between-group variation and large within-group variation",
          caption: "Left: group curves are separate and narrow. Right: group curves are wide and overlap a lot."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Between-group variation",
              text: "Variation between group means. <br/>In this example, it may reflect the effect of using different interfaces."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Within-group variation",
              text: "Variation inside each group. <br/>Even when people use the same interface, they may still have different task times because of individual differences or random error."
            }
          ]
        },
        {
          type: "infoBox",
          text: "The key ANOVA idea is this: if <strong>between-group variation</strong> is much larger than <strong>within-group variation</strong>, the interface effect looks more convincing."
        }
      ]
    },

    {
      title: "F ratio: desired difference divided by random noise",
      blocks: [
        {
          type: "image",
          src: "assets/image/11-5-1.jpg",
          alt: "Hand-drawn F ratio formula",
          caption: "F compares the variation we care about with the variation caused by random chance."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "If F is near 1",
              text: "The group difference is about the same size as the random variation. This is not strong evidence against H0."
            },
            {
              type: "conceptBox",
              title: "If F is much larger than 1",
              text: "The group difference is large compared with the random variation. This gives stronger evidence against H0."
            }
          ],
          right: [
            {
              type: "image",
              src: "assets/image/11-5-2.jpg",
              alt: "F distribution with rejection region",
              caption: "Under H0, very large F values are rare and fall in the right-tail rejection region."
            }
          ]
        },
        {
          type: "infoBox",
          text: "F is judged using an <strong>F distribution</strong>. If the observed F falls in the rejection region, the result is unlikely under H0, so we reject H0."
        }
      ]
    },

    {
      title: "One-way between-subjects ANOVA",
      blocks: [
        {
          type: "splitLayout",
          left: [
            {
              type: "image",
              src: "assets/image/11-6-1.jpg",
              alt: "Between-subjects example with three different interface groups",
              caption: "Between-subjects design: different participants use Interface A, B, or C."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Between-subjects design",
              text: "In a one-way completely randomised between-subjects design, each participant only belongs to <strong>one</strong> interface group. <br><br>The factor is <strong>interface type</strong>, and the levels are A, B, and C."
            }
          ]
        },
        {
          type: "image",
          src: "assets/image/11-6-2.jpg",
          alt: "Tree diagram showing SS total equals SS between plus SS within",
          caption: "For a between-subjects ANOVA, total variation is split into between-group variation and within-group variation."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "SSbetween",
              text: "This is the variation between the group means. <br/>In this example, it is the variation that may be explained by different interfaces."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "SSwithin",
              text: "This is the variation inside each group. <br/>It is often treated as background variation, individual differences, or random error."
            }
          ]
        },
        {
          type: "simpleTable",
          title: "Basic one-way between-subjects ANOVA table",
          headers: ["Source", "SS", "df", "MS", "F"],
          rows: [
            ["Between groups", "SSbetween", "k − 1", "MSbetween", "MSbetween / MSwithin"],
            ["Within groups", "SSwithin", "N − k", "MSwithin", ""],
            ["Total", "SStotal", "N − 1", "", ""]
          ]
        }
      ]
    },

    {
      title: "Quick calculation: find F",
      blocks: [
        {
          type: "text",
          text: "Now we use a very small ANOVA table to practise the calculation logic. <br/>The goal is not to memorise every formula, but to understand the flow: <strong>SS → MS → F</strong>."
        },
        {
          type: "simpleTable",
          title: "Given information",
          tableClass: "unit11-anova-table",
          headers: ["Source", "SS", "df"],
          rows: [
            ["Between groups", "360", "2"],
            ["Within groups", "480", "12"]
          ]
        },
        {
          type: "conceptBox",
          title: "Question",
          text: "Use the table to calculate <strong>F</strong>.<br><br>Hint: <br/>first calculate <strong>MSbetween = SSbetween / dfbetween</strong> and <strong>MSwithin = SSwithin / dfwithin</strong>. <br/>Then calculate <strong>F = MSbetween / MSwithin</strong>."
        },
        {
          type: "reveal",
          prompt: "Click to reveal the calculation.",
          hiddenAnswer: "MSbetween = 360 / 2 = 180.  MSwithin = 480 / 12 = 40.  F = 180 / 40 = 4.5.  This means the between-group variation is 4.5 times the within-group variation."
        },
        {
          type: "infoBox",
          text: "After calculating F, researchers compare it with the F distribution or use a p-value. <br><br>In this prototype, the important idea is that F compares <strong>group difference</strong> with <strong>random/background variation</strong>."
        }
      ]
    },

    {
      title: "One-way within-subjects ANOVA",
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
                  text: "What if the same participants try Interface A, B, and C?"
                },
                {
                  speaker: "Student",
                  side: "right",
                  text: "Then some people may always be faster, and some people may always be slower."
                },
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "Exactly. In a within-subjects design, we can separate stable participant differences from the treatment effect."
                }
              ]
            }
          ],
          right: [
            {
              type: "image",
              src: "assets/image/11-8-1.jpg",
              alt: "Within-subjects ANOVA scene with the same participants trying three interfaces",
              caption: "Within-subjects design: the same participants try all three interfaces."
            }
          ]
        },
        {
          type: "image",
          src: "assets/image/11-8-2.jpg",
          alt: "Tree diagram showing within-subjects sum of squares decomposition",
          caption: "SStotal = SSbetween-subjects + SSwithin-subjects = SSbetween-subjects + SStreatment + SSresidual."
        },
        {
          type: "simpleTable",
          title: "What each part means",
          headers: ["Part", "Meaning"],
          rows: [
            ["SSbetween-subjects", "Stable differences between participants. Some people are generally fast; some are generally slow."],
            ["SStreatment", "Differences caused by the interface conditions A, B, and C."],
            ["SSresidual", "Remaining unexplained variation after separating participant differences and treatment differences."]
          ]
        },
        {
          type: "infoBox",
          text: "The important within-subjects idea is that participant differences can be separated out. This can make the treatment effect easier to see."
        }
      ]
    },

    {
      title: "Quick check: ANOVA intuition",
      blocks: [
        {
          type: "reveal",
          prompt: "Question 1: In ANOVA, what does between-group variation represent in the interface example?",
          hiddenAnswer: "It represents variation between the mean task times of Interface A, B, and C. It may reflect the effect of the interface type."
        },
        {
          type: "reveal",
          prompt: "Question 2: If F is close to 1, what does that suggest?",
          hiddenAnswer: "It suggests that the between-group variation is about the same size as the within-group variation. The group difference may not be strong enough to reject H0."
        },
        {
          type: "reveal",
          prompt: "Question 3: In a between-subjects design, do the same participants use all three interfaces?",
          hiddenAnswer: "No. In a between-subjects design, different participants are assigned to different interface groups."
        },
        {
          type: "reveal",
          prompt: "Question 4: Why does within-subjects ANOVA separate participant differences?",
          hiddenAnswer: "Because the same participants try all conditions. Some people may always be faster or slower, so we separate those stable participant differences from the treatment effect."
        },
        {
          type: "summary",
          items: [
            "ANOVA compares more than two group means.",
            "H0 says all population means are equal.",
            "H1 says at least one population mean is different.",
            "ANOVA compares between-group variation with within-group variation.",
            "F is large when group differences are large compared with random/background variation.",
            "Between-subjects and within-subjects ANOVA split variation in different ways."
          ]
        }
      ]
    }
  ]
};